// Quanto de um SKU é ATIVO DE DESTINO (reusa em todo comprador) e quanto é
// ATIVO DE PAR (refaz a cada comprador novo). É o número que decide se francês,
// alemão e italiano sobre a Espanha são baratos ou não.
import fs from 'node:fs';
import { collectJobs } from './lib/collect-audio.mjs';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jobs = collectJobs(root);
const GUIA = new Set(['Alice', 'George', 'narrador', 'Bia']);

// Durante um retrofit o total mede uma MISTURA e engana: as partes legadas
// carregam a narração de 578 chars/clipe e escondem o efeito das novas. Separar
// por estado da obra é o que mostra para onde o número está indo — e o "já
// reescrito" é a projeção honesta do curso pronto, porque é feito das partes
// que de fato já obedecem à régua.
import { readdirSync as _rd } from 'node:fs';
const cursoDir = `${root}/src/lib/course`;
const estadoDaChave = new Map();
for (const f of _rd(cursoDir).filter((x) => /^ep-.*\.json$/.test(x))) {
  const j = JSON.parse(fs.readFileSync(`${cursoDir}/${f}`, 'utf8'));
  const estado = j.dissolveEm ? 'transito' : j.cena ? 'novo' : 'legado';
  const chaves = [];
  for (const s of j.steps || []) {
    if (s.audioKey) chaves.push(s.audioKey);
    if (s.promptAudioKey) chaves.push(s.promptAudioKey);
  }
  for (const k of chaves) if (!estadoDaChave.has(k)) estadoDaChave.set(k, estado);
}

let g = 0, a = 0, gc = 0, ac = 0, gb = 0, ab = 0;
for (const j of jobs) {
  const p = `${root}/static/audio/${j.key}.mp3`;
  const b = fs.existsSync(p) ? fs.statSync(p).size : 0;
  if (GUIA.has(j.voice)) { g++; gc += j.text.length; gb += b; }
  else { a++; ac += j.text.length; ab += b; }
}
const cg = Math.round(gc * 0.5), ca = Math.round(ac * 1.0), tot = cg + ca;

console.log('\nVOZ-GUIA — ativo de PAR, refaz a cada comprador novo');
console.log(`  ${g} clipes · ${gc.toLocaleString()} chars · ${cg.toLocaleString()} créditos · ${(gb / 1048576).toFixed(1)} MB`);
console.log('FALA-ALVO — ativo de DESTINO, reusa em TODOS os compradores');
console.log(`  ${a} clipes · ${ac.toLocaleString()} chars · ${ca.toLocaleString()} créditos · ${(ab / 1048576).toFixed(1)} MB`);
console.log(`\nTOTAL ${tot.toLocaleString()} cr → guia ${(cg / tot * 100).toFixed(1)}% · alvo ${(ca / tot * 100).toFixed(1)}%`);
console.log(`bytes de áudio: guia ${(gb / (gb + ab) * 100).toFixed(1)}%\n`);
console.log('CONSEQUÊNCIA para os SKUs derivados sobre o mesmo acervo peninsular:');
console.log(`  1º curso (EN)      : ${tot.toLocaleString()} cr`);
console.log(`  cada derivado      : ${cg.toLocaleString()} cr  (${(cg / tot * 100).toFixed(0)}% do primeiro)`);
console.log(`  FR + DE + IT       : ${(cg * 3).toLocaleString()} cr`);
console.log(`  4 cursos no total  : ${(tot + cg * 3).toLocaleString()} cr — contra ${(tot * 4).toLocaleString()} se cada um fosse do zero`);
console.log(`  economia           : ${(tot * 4 - (tot + cg * 3)).toLocaleString()} cr (${((1 - (tot + cg * 3) / (tot * 4)) * 100).toFixed(0)}%)\n`);

// ── por estado da obra ──────────────────────────────────────────────────────
const porEstado = { novo: { g: 0, a: 0, ng: 0 }, legado: { g: 0, a: 0, ng: 0 }, transito: { g: 0, a: 0, ng: 0 } };
for (const j of jobs) {
  const e = porEstado[estadoDaChave.get(j.key) || 'legado'];
  if (GUIA.has(j.voice)) { e.g += j.text.length; e.ng++; } else e.a += j.text.length;
}
const rot = { novo: 'já reescrito', legado: 'ainda legado', transito: 'em trânsito' };
console.log('POR ESTADO DA OBRA — o total acima mede uma mistura e engana:');
for (const k of ['novo', 'legado', 'transito']) {
  const e = porEstado[k];
  if (!e.ng && !e.a) continue;
  const c = Math.round(e.g * 0.5) + e.a;
  const pctG = c ? (Math.round(e.g * 0.5) / c) * 100 : 0;
  const media = e.ng ? Math.round(e.g / e.ng) : 0;
  console.log(
    `  ${rot[k].padEnd(14)} ${c.toLocaleString().padStart(8)} cr · guia ${pctG.toFixed(1).padStart(5)}% · ${String(media).padStart(4)} chars por clipe de guia`
  );
}
console.log('\n  O "já reescrito" é a projeção honesta do curso pronto: são as partes que');
console.log('  de fato obedecem à régua hoje.\n');
