// FONTE ÚNICA da derivação key→(voz, texto) a partir dos episódios.
//
// Existe porque dois consumidores precisam concordar EXATAMENTE sobre qual texto
// pertence a cada clipe: o gerador (que grava) e o validador (que barra a build
// quando o mp3 no disco não corresponde mais ao texto do episódio). Quando essa
// derivação estava duplicada, o curso alemão ficou com 938 mp3 em INGLÊS sob
// chaves alemãs e nada acusou — a build passava e publicava um app alemão que
// falava inglês. Um extractor só, importado pelos dois, fecha esse buraco.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// `tts` (opcional) = texto REAL enviado ao TTS quando difere do exibido (`es`):
// homophone swaps de 多音字, números por extenso, marcas em hanzi, e as pausas
// `<break time="0.8s"/>` que separam os tons (o ponto final não gera silêncio).
// `vozAlvo` = voz nativa padrão dos passos que não declaram `voz`. Varia por curso
// (Mei no mandarim/tailandês/espanhol peninsular, Ana no rioplatense) e é a única
// diferença legítima entre os cursos nesta derivação.
export function collectJobs(root, { vozAlvo = 'Mei', vozGuia = 'Bia' } = {}) {
  const dir = join(root, 'src', 'lib', 'course');
  const jobs = [];
  const seen = new Set();
  const push = (key, voice, text) => {
    if (!key || !text || seen.has(key)) return;
    seen.add(key);
    jobs.push({ key, voice, text });
  };

  for (const f of readdirSync(dir).filter((x) => /^ep-.*\.json$/.test(x))) {
    const ep = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    for (const s of ep.steps || []) {
      if (s.tipo === 'intro' || s.tipo === 'recap') push(s.audioKey, s.voz || vozGuia, s.pt);
      else if (s.tipo === 'ouvir' || s.tipo === 'shadow')
        push(s.audioKey, s.voz || vozAlvo, s.tts ?? s.es);
      else if (s.tipo === 'responde') {
        push(s.promptAudioKey, s.promptVoz || vozGuia, s.promptTts ?? s.promptPt);
        push(s.audioKey, s.voz || vozAlvo, s.tts ?? s.es);
      }
    }
  }

  // Quizzes: intro na voz-guia + diálogo em vozes nativas. Perguntas ficam em texto.
  for (const f of readdirSync(dir).filter((x) => /^quiz-.*\.json$/.test(x))) {
    const q = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    push(q.introAudioKey, vozGuia, q.introPt);
    for (const d of q.dialogo || []) push(d.audioKey, d.voz || vozAlvo, d.tts ?? d.es);
  }

  return jobs;
}

export function manifestPath(root) {
  return join(root, 'static', 'audio', 'manifest.json');
}
