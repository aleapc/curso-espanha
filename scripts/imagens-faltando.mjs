#!/usr/bin/env node
// LISTA OS CARDS SEM IMAGEM, com o nome e as partes de cada um.
//
//   node scripts/imagens-faltando.mjs
//
// A home mostra uma foto por card e, quando o arquivo não existe, cai no emoji
// sobre degradê. Depois da reestruturação de 24 para 36 partes, os nomes de
// arquivo antigos (e01…e08, c01…c03) deixaram de cobrir os cards novos.
// Este script é o pedido de produção: diz exatamente quais arquivos criar, com
// que nome, e o que cada card é — para quem for gerar as imagens não precisar
// deduzir nada do código.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'lib', 'course');

const contrato = JSON.parse(readFileSync(join(dir, 'slots.json'), 'utf8'));
const ordemDoSlot = new Map(contrato.slots.map((s, i) => [s.id, i]));
const funcaoDoSlot = new Map(contrato.slots.map((s) => [s.id, s.funcao]));
const nomeMod = Object.fromEntries(contrato.modulos.map((m) => [m.id, m.nome_en || m.nome_pt]));

const partes = [];
for (const f of readdirSync(dir).filter((x) => /^ep-.*\.json$/.test(x))) {
  const j = JSON.parse(readFileSync(join(dir, f), 'utf8'));
  if (!j.slot) continue;
  partes.push(j);
}
partes.sort((a, b) => (ordemDoSlot.get(a.slot) ?? 999) - (ordemDoSlot.get(b.slot) ?? 999));

// O mesmo agrupamento da home: id legado (e01a) agrupa pelo prefixo; id de slot
// (b06) é card sozinho.
const legado = (id) => /^[a-z]\d{2}[a-z]$/.test(id);
const grupos = new Map();
for (const p of partes) {
  const g = legado(p.id) ? p.id.slice(0, -1) : p.id;
  if (!grupos.has(g)) grupos.set(g, { id: g, modulo: p.nivel, partes: [] });
  grupos.get(g).partes.push(p);
}

const imgDir = join(root, 'static', 'img');
const tem = new Set(
  existsSync(imgDir)
    ? readdirSync(imgDir).filter((f) => /\.(webp|png|jpg|jpeg)$/i.test(f)).map((f) => f.replace(/\.[^.]+$/, ''))
    : []
);

const faltam = [...grupos.values()].filter((g) => !tem.has(g.id));
const orfas = [...tem].filter((t) => !grupos.has(t));

console.log(`\nCARDS SEM IMAGEM — ${faltam.length} de ${grupos.size}\n`);
let mod = '';
for (const g of faltam) {
  if (g.modulo !== mod) {
    mod = g.modulo;
    console.log(`\n── ${nomeMod[mod]} ──\n`);
  }
  const p = g.partes[0];
  console.log(`${g.id}.webp`);
  console.log(`   card: ${p.titulo}`);
  console.log(`   função canônica: ${funcaoDoSlot.get(p.slot) || '—'}`);
  if (p.cena) console.log(`   cena: ${String(p.cena).slice(0, 150)}`);
  if (g.partes.length > 1) console.log(`   (agrupa ${g.partes.length} partes)`);
  console.log();
}

if (orfas.length) {
  console.log(`\nIMAGENS ÓRFÃS (${orfas.length}) — nenhum card as usa:`);
  console.log('  ' + orfas.join(', '));
  console.log('  São do agrupamento antigo. Podem sair, ou ser renomeadas se servirem a um card novo.\n');
}
