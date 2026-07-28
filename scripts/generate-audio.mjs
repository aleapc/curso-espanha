#!/usr/bin/env node
// Gera os mp3 premium do curso via ElevenLabs.
//
//   node scripts/generate-audio.mjs --list   → lista as vozes da sua conta (pra escolher por ouvido)
//   node scripts/generate-audio.mjs           → gera o que falta (idempotente: pula o que já existe)
//
// Lê a chave de .env (ELEVENLABS_API_KEY) e os IDs de voz de audio.config.json.
// Usa o modelo Flash v2.5 (~0,5 crédito por caractere).

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { collectJobs } from './lib/collect-audio.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function loadEnv() {
  const p = join(root, '.env');
  if (!existsSync(p)) return;
  for (const raw of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const m = line.match(/^([A-Za-z0-9_]+)\s*=\s*(.*)$/);
    if (m) {
      if (process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
      }
    } else if (line.startsWith('sk_') && process.env.ELEVENLABS_API_KEY === undefined) {
      // tolera .env com só a chave colada (sem o prefixo ELEVENLABS_API_KEY=)
      process.env.ELEVENLABS_API_KEY = line;
    }
  }
}
loadEnv();

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY || API_KEY.includes('COLE_SUA_CHAVE')) {
  console.error('\n⚠  Falta a chave. Edite .env e coloque:\n   ELEVENLABS_API_KEY=sk_xxx\n');
  process.exit(1);
}

const API = 'https://api.elevenlabs.io/v1';

function loadConfig() {
  const p = join(root, 'audio.config.json');
  if (existsSync(p)) {
    try {
      return JSON.parse(readFileSync(p, 'utf8'));
    } catch {
      /* usa default */
    }
  }
  return {};
}
const CFG = loadConfig();
const MODEL = CFG.model || 'eleven_flash_v2_5';
// Mandarim usa multilingual_v2: fidelidade TONAL do flash cai (pesquisa-shuo §8.1)
// e tom errado ensina errado. A Bia (PT, o grosso dos caracteres) fica no flash.
const MODEL_ZH = CFG.modelZh || 'eleven_multilingual_v2';
const perChar = (model) => (/flash|turbo/.test(model) ? 0.5 : 1);

// Vozes PT-BR (narração) são "expressivas" e oscilam de ritmo com estabilidade baixa.
// zh: stability alta + style 0 = entrega neutra (stability baixa gera prosódia
// "dramática" que distorce a percepção dos tons — pesquisa-shuo §8.5).
// Vozes-GUIA (falam a língua do aluno — inglês britânico neste curso). Modelo flash:
// é narração longa, sem exigência de sotaque estrangeiro, e custa metade.
// As vozes-ALVO (espanhol peninsular) caem no multilingual_v2, que segura melhor o
// sotaque. INV-5: guia nunca fala espanhol, nativa nunca fala inglês.
const PT_VOICES = new Set(['Alice', 'George', 'narrador']);
const ZH_SETTINGS = { stability: 0.65, similarity_boost: 0.75, style: 0, use_speaker_boost: true, speed: 1.0 };
const PT_SETTINGS = { stability: 0.8, similarity_boost: 0.9, style: 0, use_speaker_boost: true, speed: 1.0 };
function settingsFor(voz) {
  return PT_VOICES.has(voz) ? PT_SETTINGS : ZH_SETTINGS;
}
function modelFor(voz) {
  return PT_VOICES.has(voz) ? MODEL : MODEL_ZH;
}

async function listVoices() {
  const r = await fetch(`${API}/voices`, { headers: { 'xi-api-key': API_KEY } });
  if (!r.ok) {
    console.error(r.status, await r.text());
    process.exit(1);
  }
  const j = await r.json();
  const voices = j.voices || [];
  console.log(`\n${voices.length} vozes disponíveis na sua conta:\n`);
  for (const v of voices) {
    const l = v.labels || {};
    const tag = [l.language, l.accent, l.gender, l.descriptive].filter(Boolean).join(' · ');
    console.log(`  ${String(v.name).padEnd(22)} ${v.voice_id}   ${tag}`);
  }
  console.log('\nOuça no site, escolha as latino-americanas e ponha os IDs em audio.config.json');
  console.log('(narrador = frases-chave, Ana = voz feminina do diálogo, Diego = voz masculina).\n');
}

async function findVoices(lang, preferRe) {
  const r = await fetch(`${API}/shared-voices?page_size=100&language=${lang}`, {
    headers: { 'xi-api-key': API_KEY }
  });
  if (!r.ok) {
    console.error(r.status, await r.text());
    process.exit(1);
  }
  const j = await r.json();
  const list = j.voices || [];
  const score = (v) => {
    const s = `${v.name} ${v.accent || ''} ${v.description || ''} ${v.descriptive || ''}`.toLowerCase();
    return preferRe && preferRe.test(s) ? 0 : 1; // sotaque preferido primeiro
  };
  list.sort((a, b) => score(a) - score(b) || (a.cloned_by_count > b.cloned_by_count ? -1 : 1));
  console.log(`\n${list.length} vozes (${lang}) na biblioteca pública:\n`);
  for (const v of list.slice(0, 30)) {
    const tag = [v.accent, v.gender, v.age, v.descriptive].filter(Boolean).join(' · ');
    console.log(`  ${String(v.name).padEnd(26)} ${tag}\n      id:${v.voice_id}`);
  }
  console.log('\nNo site (Voice Library) busque pelo nome, ouça e clique "Add" nas que curtir.');
}

async function balance() {
  const r = await fetch(`${API}/user/subscription`, { headers: { 'xi-api-key': API_KEY } });
  if (!r.ok) {
    console.error(r.status, await r.text());
    process.exit(1);
  }
  const j = await r.json();
  const used = j.character_count ?? 0;
  const limit = j.character_limit ?? 0;
  const left = limit - used;
  console.log(`Créditos ElevenLabs: ${used} / ${limit} usados · restam ${left}`);
  console.log(`(em Flash, 0,5/char, isso dá ~${Math.floor(left / 0.5)} caracteres de áudio)`);
}

function loadVoiceMap() {
  const def = {
    narrador: 'FGY2WhTYpPnrIDTdsKH5', // Laura (placeholder — troque por voz LatAm)
    Ana: 'EXAVITQu4vr4xnSDxMaL', // Sarah (placeholder feminina)
    Diego: 'nPczCjzI2devNBz1zQrb' // Brian (placeholder masculina)
  };
  return { ...def, ...CFG };
}

async function tts(voiceId, text, outPath, settings = ZH_SETTINGS, model = MODEL_ZH) {
  const r = await fetch(`${API}/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': API_KEY, 'content-type': 'application/json' },
    body: JSON.stringify({
      text,
      model_id: model,
      voice_settings: settings,
      // Determinismo entre regerações + normalização NOSSA (números já vão por
      // extenso em hanzi no tts_text — pesquisa-shuo §8.2/§8.5).
      seed: 4242,
      apply_text_normalization: 'off'
    })
  });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  writeFileSync(outPath, Buffer.from(await r.arrayBuffer()));
  return Math.ceil(text.length * perChar(model));
}

// A derivação key→(voz, texto) mora em scripts/lib/collect-audio.mjs porque o
// validador de áudio precisa da MESMA regra. Duplicá-la foi o que deixou 938
// clipes ingleses passarem por alemães sem ninguém notar.

// Manifesto key→texto: deixa o gerador idempotente no TEXTO (não só na existência
// do arquivo). Se o texto de um clipe mudou (ex.: correção de portunhol), ele é
// regerado automaticamente. `--snapshot` grava o manifesto do estado atual sem
// chamar a API (assume que os mp3 atuais batem com o texto atual).
function manifestPath() {
  return join(root, 'static', 'audio', 'manifest.json');
}
function loadManifest() {
  const p = manifestPath();
  if (existsSync(p)) {
    try {
      return JSON.parse(readFileSync(p, 'utf8'));
    } catch {
      /* recomeça */
    }
  }
  return {};
}

function snapshot() {
  const jobs = collectJobs(root);
  const outDir = join(root, 'static', 'audio');
  const man = {};
  let n = 0;
  for (const job of jobs) {
    if (existsSync(join(outDir, `${job.key}.mp3`))) {
      man[job.key] = job.text;
      n++;
    }
  }
  writeFileSync(manifestPath(), JSON.stringify(man, null, 0));
  console.log(`Snapshot: ${n} clipes registrados no manifesto (baseline).`);
}

async function generate() {
  const jobs = collectJobs(root);
  const voices = loadVoiceMap();
  const outDir = join(root, 'static', 'audio');
  mkdirSync(outDir, { recursive: true });
  const man = loadManifest();

  let made = 0;
  let regen = 0;
  let skipped = 0;
  let chars = 0;
  for (const job of jobs) {
    const out = join(outDir, `${job.key}.mp3`);
    const exists = existsSync(out);
    const textChanged = man[job.key] !== undefined && man[job.key] !== job.text;
    if (exists && !textChanged) {
      skipped++;
      man[job.key] = job.text;
      continue;
    }
    if (exists && textChanged) regen++;
    const voiceId = voices[job.voice] || voices.narrador;
    process.stdout.write(`→ ${job.key} (${job.voice})${textChanged ? ' [texto mudou]' : ''}: "${job.text}" ... `);
    try {
      chars += await tts(voiceId, job.text, out, settingsFor(job.voice), modelFor(job.voice));
      made++;
      man[job.key] = job.text;
      console.log('ok');
    } catch (e) {
      console.log('FALHOU:', e.message);
    }
  }

  const keys = readdirSync(outDir)
    .filter((f) => f.endsWith('.mp3'))
    .map((f) => f.replace(/\.mp3$/, ''));
  writeFileSync(join(outDir, 'index.json'), JSON.stringify(keys));
  writeFileSync(manifestPath(), JSON.stringify(man, null, 0));

  console.log(`\nGerados: ${made} (novos + ${regen} regerados por mudança de texto) · já existiam: ${skipped}`);
  console.log(`Custo estimado: ~${chars} créditos (guia=${MODEL} · alvo=${MODEL_ZH})`);
  console.log(`Índice: static/audio/index.json (${keys.length} áudios no total)`);
}

// Gera amostras de voz (mesma frase em várias vozes) pra escolher de ouvido.
// Lê scripts/voice-samples.json → static/samples/<key>.mp3
async function genSamples() {
  const cfgS = JSON.parse(readFileSync(join(root, 'scripts', 'voice-samples.json'), 'utf8'));
  const outDir = join(root, 'static', 'samples');
  mkdirSync(outDir, { recursive: true });
  for (const v of cfgS.vozes) {
    const out = join(outDir, `${v.key}.mp3`);
    if (existsSync(out)) {
      console.log('já existe:', v.key);
      continue;
    }
    process.stdout.write(`→ ${v.key} (${v.name}) ... `);
    try {
      await tts(v.voiceId, cfgS.text, out, settingsFor(v.name), modelFor(v.name));
      console.log('ok');
    } catch (e) {
      console.log('FALHOU', e.message);
    }
  }
  console.log('Amostras em static/samples/');
}

if (process.argv.includes('--balance')) balance();
else if (process.argv.includes('--snapshot')) snapshot();
else if (process.argv.includes('--list')) listVoices();
else if (process.argv.includes('--find-zh')) findVoices('zh', /mandarin|chinese|beijing|putonghua|standard/i);
else if (process.argv.includes('--find-pt')) findVoices('pt', /bras|brazil/);
// A 5ª voz do SKU: uma andaluza para o EAR MODULE (A01), onde o aluno treina
// ouvir o sul. Hoje o Emilio faz Madri E o sul, e ele é o modelo masculino
// padrão dos outros 23 episódios — o que contamina o modelo. A regra já estava
// escrita no syllabus: "só no ear module, nunca como modelo".
else if (process.argv.includes('--find-es'))
  findVoices('es', /andalu|sevill|málaga|malaga|cádiz|cadiz|granada|córdoba|cordoba|southern|sur\b/i);
else if (process.argv.includes('--samples')) genSamples();
else generate();
