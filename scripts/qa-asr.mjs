#!/usr/bin/env node
// QA de tom/leitura por ASR round-trip (pesquisa-shuo §8.6): ninguém do time tem
// ouvido pra tom — então cada clipe zh gerado é transcrito de volta (ElevenLabs
// Scribe) e comparado ao hanzi esperado VIA PINYIN (tolera homófonos do swap;
// pega ~90% dos misreads: se o TTS falou o tom errado, o ASR "ouve" outro hanzi
// e o pinyin diverge).
//
//   node scripts/qa-asr.mjs --battery         → bateria de casting (§8.5) nas vozes Mei/Chen
//   node scripts/qa-asr.mjs --clips           → audita TODOS os clipes zh de static/audio
//   node scripts/qa-asr.mjs --clips m01       → só clipes cujos eps começam com m01

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { pinyin } from 'pinyin-pro';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function loadEnv() {
  const p = join(root, '.env');
  if (!existsSync(p)) return;
  for (const raw of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const m = line.match(/^([A-Za-z0-9_]+)\s*=\s*(.*)$/);
    if (m) {
      if (process.env[m[1]] === undefined)
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
    } else if (line.startsWith('sk_') && process.env.ELEVENLABS_API_KEY === undefined) {
      process.env.ELEVENLABS_API_KEY = line;
    }
  }
}
loadEnv();
const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error('Falta ELEVENLABS_API_KEY no .env');
  process.exit(1);
}
const API = 'https://api.elevenlabs.io/v1';
const CFG = JSON.parse(readFileSync(join(root, 'audio.config.json'), 'utf8'));

// ── helpers ──────────────────────────────────────────────────────────────────
// Normaliza ANTES de comparar: ASR devolve dígitos ("1398") pro que foi falado
// como 幺三九八 — converter dígito→hanzi e 幺→一 nos DOIS lados evita falso positivo.
const DIGITOS = { 0: '〇', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九' };
const soHanzi = (s) =>
  (s || '')
    .replace(/[0-9]/g, (d) => DIGITOS[d])
    .replace(/幺/g, '一')
    .replace(/[^一-鿿〇]/g, '');
// pinyin numérico com sandhi — a régua de comparação
const toPinyin = (s) =>
  pinyin(soHanzi(s), { toneType: 'num', type: 'array', toneSandhi: true }).join(' ');
// segunda régua, sem tom: separa "leu a PALAVRA errada" (grave) de "ASR/polyfone
// divergiu no tom da transcrição" (aviso)
const toPinyinSemTom = (s) =>
  pinyin(soHanzi(s), { toneType: 'none', type: 'array' }).join(' ');

async function stt(mp3Path) {
  const fd = new FormData();
  fd.append('model_id', 'scribe_v1');
  fd.append('language_code', 'zho');
  fd.append('file', new Blob([readFileSync(mp3Path)], { type: 'audio/mpeg' }), 'clip.mp3');
  const r = await fetch(`${API}/speech-to-text`, {
    method: 'POST',
    headers: { 'xi-api-key': API_KEY },
    body: fd
  });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  return (await r.json()).text || '';
}

async function ttsZh(voiceId, text, outPath) {
  const r = await fetch(`${API}/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': API_KEY, 'content-type': 'application/json' },
    body: JSON.stringify({
      text,
      model_id: CFG.modelZh || 'eleven_multilingual_v2',
      voice_settings: { stability: 0.65, similarity_boost: 0.75, style: 0, use_speaker_boost: true, speed: 1.0 },
      seed: 4242,
      apply_text_normalization: 'off'
    })
  });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  writeFileSync(outPath, Buffer.from(await r.arrayBuffer()));
}

function compara(esperado, ouvido) {
  const pe = toPinyin(esperado);
  const po = toPinyin(ouvido);
  const ok = pe === po && pe.length > 0;
  // 'aviso' = mesmas sílabas-base, tom divergente na transcrição (pode ser
  // polyfonia do pinyin-pro ou tom sutil — vai pra escuta manual, não bloqueia)
  const aviso = !ok && toPinyinSemTom(esperado) === toPinyinSemTom(ouvido);
  return { ok, aviso, pe, po };
}

// ── bateria de casting (§8.5) ────────────────────────────────────────────────
const BATERIA = [
  { k: 'tons-ma', zh: '妈妈骑马。马慢，妈妈骂马。' },
  { k: 'tons-maimai', zh: '我买一个，他卖一个。' },
  { k: 'sandhi-nihao', zh: '你好！我很好。' },
  { k: 'sandhi-bu-yi', zh: '不是，不去。一个，一起，第一。' },
  { k: 'num-4x10', zh: '四十四，十四，四十。' },
  { k: 'num-dinheiro', zh: '三十五块。两百块。' },
  { k: 'num-yao', zh: '尾号幺三九八。' },
  { k: 'marca-hanzi', zh: '我用微信支付。' },
  { k: 'duoyin-hang-xing', zh: '银行在哪里？这样行吗？' },
  { k: 'duoyin-de', zh: '我得走了。他说得很好。' },
  { k: 'minpair-jiao', zh: '我要睡觉，不要水饺。' }
];

async function bateria() {
  const outDir = join(root, 'static', 'samples', 'bateria');
  mkdirSync(outDir, { recursive: true });
  // Mei/Chen = escolha do usuário; ZiYue/Adrian/Vincent = recomendadas pela
  // pesquisa (§8.4), aqui como CONTROLE: item que falha em TODAS as vozes é
  // artefato do teste/ASR, não defeito da voz.
  const vozes = [
    { nome: 'Mei', id: CFG.Mei },
    { nome: 'Chen', id: CFG.Chen },
    { nome: 'ZiYue', id: '5qr5FEpvZGzmVOPBS55W' },
    { nome: 'Adrian', id: 'agczkAUlHLowaNnL72Cc' },
    { nome: 'Vincent', id: 'WkcRFJo38X9XEP8kGExm' }
  ];
  const linhas = [];
  const placar = {};
  for (const v of vozes) {
    console.log(`\n=== ${v.nome} (${v.id}) ===`);
    let ok = 0;
    let avisos = 0;
    for (const item of BATERIA) {
      const mp3 = join(outDir, `${v.nome.toLowerCase()}-${item.k}.mp3`);
      try {
        if (!existsSync(mp3)) await ttsZh(v.id, item.zh, mp3);
        const ouvido = await stt(mp3);
        const c = compara(item.zh, ouvido);
        ok += c.ok ? 1 : 0;
        avisos += c.aviso ? 1 : 0;
        const marca = c.ok ? '✓' : c.aviso ? '~' : '✗';
        console.log(`  ${marca} ${item.k}: "${item.zh}" → ASR "${ouvido}"`);
        if (!c.ok && !c.aviso)
          console.log(`      pinyin esperado: ${c.pe}\n      pinyin ouvido:   ${c.po}`);
        linhas.push({ voz: v.nome, ...item, ouvido, ...c });
      } catch (e) {
        console.log(`  ✗ ${item.k}: ERRO ${e.message}`);
        linhas.push({ voz: v.nome, ...item, erro: e.message, ok: false });
      }
    }
    placar[v.nome] = `${ok} ok · ${avisos} avisos · ${BATERIA.length - ok - avisos} falhas`;
    console.log(`  → ${v.nome}: ${placar[v.nome]}`);
  }
  console.log('\n=== PLACAR ===');
  for (const [n, p] of Object.entries(placar)) console.log(`  ${n}: ${p}`);
  writeFileSync(join(outDir, 'relatorio.json'), JSON.stringify(linhas, null, 2));
  console.log(`\nRelatório: static/samples/bateria/relatorio.json (mp3 na mesma pasta pra ouvir)`);
}

// ── auditoria dos clipes zh do curso ─────────────────────────────────────────
const ZH_VOICES = new Set(['Mei', 'Chen']);

function clipesZh(prefixo) {
  const dir = join(root, 'src', 'lib', 'course');
  const alvo = new Map(); // key → hanzi esperado (o texto TTS)
  const add = (key, voz, texto) => {
    if (key && texto && ZH_VOICES.has(voz) && !alvo.has(key)) alvo.set(key, texto);
  };
  for (const f of readdirSync(dir).filter((x) => /^ep-.*\.json$/.test(x))) {
    if (prefixo && !f.includes(prefixo)) continue;
    const ep = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    for (const s of ep.steps || []) {
      if (s.tipo === 'ouvir' || s.tipo === 'shadow') add(s.audioKey, s.voz || 'Mei', s.tts ?? s.es);
      else if (s.tipo === 'responde') {
        add(s.promptAudioKey, s.promptVoz || 'Bia', s.promptTts ?? s.promptPt);
        add(s.audioKey, s.voz || 'Mei', s.tts ?? s.es);
      }
    }
  }
  for (const f of readdirSync(dir).filter((x) => /^quiz-.*\.json$/.test(x))) {
    if (prefixo && !f.includes(prefixo)) continue;
    const q = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    for (const d of q.dialogo || []) add(d.audioKey, d.voz || 'Mei', d.tts ?? d.es);
  }
  return alvo;
}

async function auditaClipes(prefixo) {
  const alvo = clipesZh(prefixo);
  const audioDir = join(root, 'static', 'audio');
  console.log(`Auditando ${alvo.size} clipes zh${prefixo ? ` (filtro ${prefixo})` : ''}…`);
  const falhas = [];
  let i = 0;
  for (const [key, esperado] of alvo) {
    const mp3 = join(audioDir, `${key}.mp3`);
    i++;
    if (!existsSync(mp3)) {
      console.log(`  ? ${key}: mp3 não existe`);
      continue;
    }
    try {
      const ouvido = await stt(mp3);
      const c = compara(esperado, ouvido);
      if (!c.ok) {
        falhas.push({ key, esperado, ouvido, ...c });
        console.log(`  ✗ ${key}: "${esperado}" → ASR "${ouvido}"`);
        console.log(`      pinyin esperado: ${c.pe}\n      pinyin ouvido:   ${c.po}`);
      } else if (i % 20 === 0) {
        console.log(`  … ${i}/${alvo.size} ok`);
      }
    } catch (e) {
      console.log(`  ✗ ${key}: ERRO ${e.message}`);
      falhas.push({ key, esperado, erro: e.message });
    }
  }
  writeFileSync(join(root, 'static', 'audio', 'qa-asr.json'), JSON.stringify(falhas, null, 2));
  console.log(`\n${alvo.size - falhas.length}/${alvo.size} clipes OK · falhas: ${falhas.length}`);
  if (falhas.length) console.log('Detalhe: static/audio/qa-asr.json — regerar com outro seed ou homophone swap.');
}

if (process.argv.includes('--battery')) bateria();
else if (process.argv.includes('--clips')) auditaClipes(process.argv[process.argv.indexOf('--clips') + 1]);
else console.log('use --battery ou --clips [prefixo]');
