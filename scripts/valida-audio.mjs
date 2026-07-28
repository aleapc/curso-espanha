#!/usr/bin/env node
// PORTÃO DE ÁUDIO — Kit de Bordo
//
//   node scripts/valida-audio.mjs   → sai 1 se algum clipe no disco não corresponder ao texto atual
//
// Roda no prebuild. Barra três falhas que já aconteceram ou quase aconteceram:
//
//   1. TEXTO À FRENTE DO ÁUDIO — o episódio foi editado e ninguém rodou `npm run audio`.
//      O app toca a versão velha da frase, calado. Foi assim que o curso alemão
//      ficou com 938 clipes em inglês sob chaves alemãs: o manifesto herdado do
//      curso inglês nunca foi confrontado com o roteiro alemão.
//   2. CLIPE FALTANDO — a chave existe no episódio, o mp3 não existe no disco.
//      Vira silêncio no meio da aula, e só o usuário descobre.
//   3. MP3 ÓRFÃO — sobrou no disco depois que a parte foi reescrita. Não quebra
//      nada e NÃO entra no precache (áudio é cache de runtime) — o custo é de
//      deploy: vai para o repositório e para o Pages. Sai como aviso, com o MB.
//
// Não chama a API nem precisa da chave: compara disco × manifesto × episódios.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectJobs, manifestPath } from './lib/collect-audio.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const audioDir = join(root, 'static', 'audio');

const jobs = collectJobs(root);
const man = existsSync(manifestPath(root))
  ? JSON.parse(readFileSync(manifestPath(root), 'utf8'))
  : {};

const semArquivo = [];
const textoMudou = [];
const semManifesto = [];

for (const j of jobs) {
  const mp3 = join(audioDir, `${j.key}.mp3`);
  if (!existsSync(mp3)) {
    semArquivo.push(j);
    continue;
  }
  if (!(j.key in man)) {
    semManifesto.push(j);
    continue;
  }
  if (man[j.key] !== j.text) textoMudou.push(j);
}

const chavesVivas = new Set(jobs.map((j) => j.key));
const orfaos = existsSync(audioDir)
  ? readdirSync(audioDir)
      .filter((f) => f.endsWith('.mp3'))
      .map((f) => f.replace(/\.mp3$/, ''))
      .filter((k) => !chavesVivas.has(k))
  : [];

const corta = (s, n = 70) => (s.length > n ? s.slice(0, n) + '…' : s);

console.log(`\nvalida-audio · ${jobs.length} clipes esperados · ${Object.keys(man).length} no manifesto`);

if (orfaos.length) {
  const bytes = orfaos.reduce((a, k) => {
    const p = join(audioDir, `${k}.mp3`);
    return a + (existsSync(p) ? statSync(p).size : 0);
  }, 0);
  console.log(`\n⚠ ${orfaos.length} mp3 órfão(s) no disco (nenhum episódio os referencia) — ${(bytes / 1048576).toFixed(1)} MB:`);
  console.log('  ' + orfaos.slice(0, 12).join(', ') + (orfaos.length > 12 ? ' …' : ''));
  // NÃO entram no precache: o globPatterns do vite.config só pega
  // js/css/svg/ico/png/woff2/txt e o html prerenderizado — mp3 é cache de
  // RUNTIME, sob demanda. O custo real é outro e é de deploy: eles vão para o
  // repositório e para o GitHub Pages junto com tudo. (Este aviso já disse
  // "entram no precache", que era falso — conferido no vite.config.)
  console.log('  Não quebram a build e não entram no precache (áudio é cache de runtime).');
  console.log('  O custo é de deploy: vão para o repositório e para o Pages. Apague quando confirmar.');
}

const erros = semArquivo.length + textoMudou.length + semManifesto.length;
if (!erros) {
  console.log('\n✓ todo clipe no disco corresponde ao texto atual do curso.\n');
  process.exit(0);
}

if (semArquivo.length) {
  console.log(`\n✗ ${semArquivo.length} clipe(s) SEM MP3 — virariam silêncio no app:`);
  for (const j of semArquivo.slice(0, 15)) console.log(`   ${j.key} (${j.voice}) "${corta(j.text)}"`);
  if (semArquivo.length > 15) console.log(`   … e mais ${semArquivo.length - 15}`);
}

if (textoMudou.length) {
  console.log(`\n✗ ${textoMudou.length} clipe(s) com TEXTO À FRENTE DO ÁUDIO — o mp3 diz outra coisa:`);
  for (const j of textoMudou.slice(0, 15)) {
    console.log(`   ${j.key} (${j.voice})`);
    console.log(`      gravado: "${corta(man[j.key])}"`);
    console.log(`      roteiro: "${corta(j.text)}"`);
  }
  if (textoMudou.length > 15) console.log(`   … e mais ${textoMudou.length - 15}`);
}

if (semManifesto.length) {
  console.log(`\n✗ ${semManifesto.length} mp3 sem registro no manifesto — não dá para saber o que foi gravado:`);
  for (const j of semManifesto.slice(0, 15)) console.log(`   ${j.key} "${corta(j.text)}"`);
  if (semManifesto.length > 15) console.log(`   … e mais ${semManifesto.length - 15}`);
  console.log('  Se os mp3 atuais ESTÃO certos, registre a baseline: node scripts/generate-audio.mjs --snapshot');
}

console.log(`\nRode: npm run audio     (gera só o que falta ou mudou)\n`);
process.exit(1);
