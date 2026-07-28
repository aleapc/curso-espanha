// MODO AVIÃO — o kit inteiro em UM botão.
//
// Separado do "save this part offline" do treino de propósito: quem está
// arrumando a mala não quer 938 clipes de narração, quer as frases que vai usar
// na mesa. São dois botões porque são duas decisões.
//
// POR QUE FETCH E NÃO TOCAR CADA CLIPE: no iOS o `<audio>` pede os mp3 com Range
// (206), e resposta 206 NÃO popula o cache. O fetch normal (200) vai direto para
// o cache do service worker, que é o mesmo balde ('audio-clips') que o runtime
// caching do Workbox usa — baixado aqui, o clipe toca offline depois.

import { base } from '$app/paths';
import { urlDoClipe } from '$lib/audio';
import { chavesDeAudioDoKit } from './indice';

export interface ProgressoKit {
  feitos: number;
  total: number;
}

export type ResultadoKit =
  | { estado: 'pronto'; total: number }
  | { estado: 'parcial'; total: number; falhas: number }
  | { estado: 'sem-suporte' };

const BALDE = 'audio-clips';

/** Já está tudo no cache? Responder isto é o que deixa o botão honesto. */
export async function kitJaBaixado(): Promise<boolean> {
  if (typeof caches === 'undefined') return false;
  const chaves = chavesDeAudioDoKit();
  if (!chaves.length) return false;
  try {
    const cache = await caches.open(BALDE);
    for (const k of chaves) if (!(await cache.match(urlDoClipe(k)))) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Baixa o índice de áudio + todos os mp3 do modo consulta. Nunca lança: um
 * aparelho sem Cache API devolve 'sem-suporte' e a tela diz isso em vez de
 * fingir que salvou.
 */
export async function baixarKit(
  aoProgredir?: (p: ProgressoKit) => void
): Promise<ResultadoKit> {
  if (typeof caches === 'undefined') return { estado: 'sem-suporte' };
  const chaves = chavesDeAudioDoKit();
  const total = chaves.length;
  let falhas = 0;
  let feitos = 0;

  try {
    const cache = await caches.open(BALDE);

    // O índice premium primeiro: sem ele cacheado, offline o app "esquece" que
    // tem mp3 e cai na voz do navegador com sotaque de gringo.
    try {
      const idx = await caches.open('audio-index');
      const url = `${base}/audio/index.json`;
      const r = await fetch(url);
      if (r.ok) await idx.put(url, r);
    } catch {
      /* o índice é otimização; os clipes é que importam */
    }

    for (const k of chaves) {
      const url = urlDoClipe(k);
      try {
        if (!(await cache.match(url))) {
          const r = await fetch(url);
          if (r.ok) await cache.put(url, r);
          else falhas++;
        }
      } catch {
        falhas++;
      }
      feitos++;
      aoProgredir?.({ feitos, total });
    }
  } catch {
    return { estado: 'parcial', total, falhas: total - feitos + falhas };
  }

  return falhas ? { estado: 'parcial', total, falhas } : { estado: 'pronto', total };
}
