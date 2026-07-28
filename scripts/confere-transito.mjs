#!/usr/bin/env node
// PROVA QUE O CONTEÚDO EM TRÂNSITO MIGROU — antes de apagar qualquer arquivo.
//
//   node scripts/confere-transito.mjs
//
// Um `ep-*.json` com `dissolveEm` declara que seu conteúdo está sendo repartido
// entre outros slots. Quando a obra termina, ele é apagado. Mas "a obra terminou"
// é afirmação, e apagar com base em afirmação é como se perde conteúdo bom.
//
// Este script vira a afirmação em medida: para cada arquivo em trânsito, ele
// mede QUANTO da fala-alvo dele reaparece nos slots de destino. Fala-alvo (o
// espanhol) é a régua certa — a narração é reescrita por desenho, então compará-la
// só produziria ruído; já uma frase que o aluno aprendia a DIZER e que sumiu do
// curso é perda de verdade.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'lib', 'course');

const partes = [];
for (const f of readdirSync(dir).filter((x) => /^ep-.*\.json$/.test(x)))
  partes.push({ f, j: JSON.parse(readFileSync(join(dir, f), 'utf8')) });

// Normaliza para comparar por CONTEÚDO e não por pontuação/caixa: o mesmo pedido
// reescrito com outra vírgula continua sendo o mesmo pedido.
const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9ñ ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const alvosDe = (p) => {
  const out = new Set();
  for (const s of p.j.steps || [])
    if (s.es && (s.tipo === 'responde' || s.tipo === 'ouvir' || s.tipo === 'shadow'))
      out.add(norm(s.es));
  out.delete('');
  return out;
};

// O universo é tudo que NÃO está em trânsito: é o curso que vai ficar.
const vivos = new Set();
for (const p of partes.filter((x) => !x.j.dissolveEm))
  for (const a of alvosDe(p)) vivos.add(a);

const transito = partes.filter((p) => p.j.dissolveEm);
if (!transito.length) {
  console.log('\nNenhum arquivo em trânsito. Nada a conferir.\n');
  process.exit(0);
}

console.log(`\nCONFERÊNCIA DE MIGRAÇÃO — ${transito.length} arquivo(s) em trânsito`);
console.log(`Universo vivo: ${vivos.size} frases-alvo únicas em ${partes.length - transito.length} partes\n`);

let totalPerdidas = 0;
const relatorio = [];

for (const p of transito.sort((a, b) => a.f.localeCompare(b.f))) {
  const meus = [...alvosDe(p)];
  const perdidas = meus.filter((a) => !vivos.has(a));
  const pct = meus.length ? Math.round(((meus.length - perdidas.length) / meus.length) * 100) : 100;
  totalPerdidas += perdidas.length;
  relatorio.push({ f: p.f, destinos: p.j.dissolveEm, n: meus.length, perdidas, pct });

  const marca = perdidas.length === 0 ? '✓' : '⚠';
  console.log(
    `  ${marca} ${p.f.padEnd(18)} ${String(pct).padStart(3)}% migrado · ${meus.length - perdidas.length}/${meus.length} frases · → ${p.j.dissolveEm.join(', ')}`
  );
  for (const a of perdidas.slice(0, 8)) console.log(`        sem destino: "${a}"`);
  if (perdidas.length > 8) console.log(`        … e mais ${perdidas.length - 8}`);
}

console.log();
if (!totalPerdidas) {
  console.log('✓ TODA fala-alvo dos arquivos em trânsito existe em alguma parte viva.');
  console.log('  Apagar os 9 não perde nada que o aluno aprendia a dizer.\n');
  process.exit(0);
}

console.log(`⚠ ${totalPerdidas} frase(s)-alvo só existem em arquivo em trânsito.`);
console.log('  Apagar agora as tira do curso. Decida uma a uma: ou migram para o slot');
console.log('  de destino, ou a saída é deliberada e vale escrever por quê.\n');
process.exit(1);
