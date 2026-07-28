// Áudio do curso, em duas camadas:
//  1) Premium (ElevenLabs): mp3 pré-gerados em static/audio/<key>.mp3, listados
//     em static/audio/index.json. Usado pra diálogos, frases-chave e escuta.
//  2) Voz do navegador (Web Speech API): grátis e ilimitada, pro "toque na
//     palavra e ouça". Também é o fallback quando o mp3 premium ainda não existe.

import { base } from '$app/paths';
import { pararAudio, tocarClipe } from '$lib/audio';

let premium: Set<string> | null = null;
let carregando: Promise<Set<string>> | null = null;

// Memoiza a PROMISE (não um Set vazio): chamadas concorrentes esperam o mesmo
// fetch, e uma falha (offline no cold start) NÃO fica cacheada — o próximo
// toque tenta de novo. Antes, uma falha desligava o áudio premium da sessão.
function loadIndex(): Promise<Set<string>> {
  if (premium) return Promise.resolve(premium);
  if (carregando) return carregando;
  carregando = (async () => {
    try {
      const r = await fetch(`${base}/audio/index.json`);
      if (r.ok) {
        premium = new Set<string>(await r.json());
        return premium;
      }
    } catch {
      /* offline → tenta de novo no próximo toque */
    }
    carregando = null;
    return new Set<string>();
  })();
  return carregando;
}

/**
 * Toca o mp3 premium da `key` se existir; senão, fala com a voz do navegador.
 * Retorna 'premium' | 'tts' | 'mudo' (quando não há áudio premium nem voz de espanhol).
 *
 * O mp3 sai pelo elemento COMPARTILHADO ($lib/audio.ts) — antes cada toque criava
 * um `new Audio()`, que o player de episódio não conhecia (e vice-versa): os dois
 * tocavam juntos. Resolve quando o som COMEÇA, não quando acaba, porque quem
 * chama é um botão que só precisa saber se saiu som.
 */
export async function playKey(
  key: string | undefined,
  fallbackText: string
): Promise<'premium' | 'tts' | 'mudo'> {
  const idx = await loadIndex();
  if (key && idx.has(key)) {
    // Para também o TTS: sem isto, um botão que caiu pra TTS + um premium
    // em sequência tocavam os dois sobrepostos.
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    const ok = await new Promise<boolean>((resolve) => {
      void tocarClipe(key, resolve);
    });
    if (ok) return 'premium';
    /* falhou (autoplay/arquivo) → cai pro TTS */
  }
  // Fallback TTS: para o mp3 que estiver tocando (simetria com o caminho
  // premium, que cancela o TTS) — senão voz do navegador e mp3 se sobrepõem.
  pararAudio();
  return speak(fallbackText) ? 'tts' : 'mudo';
}

/**
 * Fala um texto com a melhor voz de espanhol do aparelho, priorizando sotaque
 * rioplatense (Uruguai/Argentina). Se NÃO houver nenhuma voz de espanhol, não
 * fala — o navegador leria com sotaque de inglês ("gringo"), e o áudio premium
 * (ElevenLabs) é a fonte de verdade. Retorna true se realmente falou.
 */
export function speak(text: string): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  const v = pickSpanishVoice();
  if (!v) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.voice = v;
  u.lang = v.lang;
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
  return true;
}

function pickSpanishVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const byLang = (l: string) =>
    voices.find((v) => v.lang.toLowerCase().replace('_', '-') === l);
  // Ordem de preferência: rioplatense primeiro, depois neutro/LatAm, por último qualquer es.
  return (
    byLang('es-uy') ||
    byLang('es-ar') ||
    byLang('es-419') ||
    byLang('es-cl') ||
    byLang('es-mx') ||
    byLang('es-us') ||
    byLang('es-es') ||
    voices.find((v) => v.lang.toLowerCase().startsWith('es'))
  );
}

export function speechSupported(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return !!pickSpanishVoice();
}

/** Reconhecimento de fala (pra exercícios de pronúncia). Rejeita se não houver suporte. */
export function recognizeOnce(lang = 'es-MX'): Promise<string> {
  return new Promise((resolve, reject) => {
    const SR =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;
    if (!SR) return reject(new Error('unsupported'));
    const r = new SR();
    r.lang = lang;
    r.interimResults = false;
    r.maxAlternatives = 1;
    r.onresult = (e: any) => resolve(String(e.results[0][0].transcript || ''));
    r.onerror = (e: any) => reject(new Error(e.error || 'error'));
    try {
      r.start();
    } catch (err) {
      reject(err as Error);
    }
  });
}

export function recognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
  return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
}

/** Normaliza pra comparar fala reconhecida com o alvo (ignora acento, caixa e pontuação). */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
}
