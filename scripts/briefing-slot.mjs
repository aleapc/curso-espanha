#!/usr/bin/env node
// BRIEFING DE UM SLOT — derivado do contrato, não digitado.
//
//   node scripts/briefing-slot.mjs I03
//   node scripts/briefing-slot.mjs --todos   → um por linha, para conferir cobertura
//
// POR QUE ISTO EXISTE, e é um erro meu de processo, não de código.
//
// Ao despachar as ondas 2 e 3 eu escrevi à mão, em cada briefing, quais moldes a
// parte devia carregar. Divergiu do roster: mandei o autor do B09 "redisparar
// QUERIA, PUEDO, DONDE" quando o roster também prometia YA-ESTA ali, e mandei o
// do B16 sem YA-ESTA nem ME-HE-DEJADO. Os autores fizeram exatamente o que foi
// pedido; o portão G9c acusou quatro promessas quebradas e a build ficou
// vermelha. É a mesma doença que já apareceu três vezes hoje — duas canônicas
// para a mesma informação — só que desta vez no PROCESSO, e não no código.
//
// Este script é a cura: o briefing de moldes de qualquer slot passa a ser
// GERADO do `moldes.json`. Quem despacha uma onda cola a saída daqui em vez de
// lembrar de cabeça.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'lib', 'course');
const cat = JSON.parse(readFileSync(join(dir, 'moldes.json'), 'utf8'));
const contrato = JSON.parse(readFileSync(join(dir, 'slots.json'), 'utf8'));

// As `previas` são strings "B09 — o que acontece ali". O slot é o primeiro token,
// e é assim que o autor de B09 fica sabendo que a parte dele TOCA o QUERIA sem
// ser dona dele — informação que sumiria se ela só existisse nos `redisparos`.
const previaDoSlot = (m, slot) =>
  (m.previas || []).filter((p) => String(p).trim().split(/[\s—–-]/)[0] === slot);

function paraSlot(slot) {
  const casa = cat.moldes.filter((m) => m.casa === slot);
  const red = cat.moldes.filter((m) => (m.redisparos || []).includes(slot));
  const prev = cat.moldes.filter((m) => previaDoSlot(m, slot).length);
  const ensinados = (cat._regras?.ensinados_mas_nao_declarados?.lista || []).filter(
    (x) => x.casa === slot
  );
  return { casa, red, prev, ensinados };
}

if (process.argv.includes('--todos')) {
  console.log(`\nCOBERTURA DE MOLDES POR SLOT — contrato v${contrato.versao} · roster v${cat.versao}\n`);
  for (const s of contrato.slots) {
    const { casa, red, prev, ensinados } = paraSlot(s.id);
    if (!casa.length && !red.length && !prev.length && !ensinados.length) continue;
    const p = [];
    if (casa.length) p.push('CASA ' + casa.map((m) => m.id).join('+'));
    if (red.length) p.push('redispara ' + red.map((m) => m.id).join(', '));
    if (prev.length) p.push('prévia de ' + prev.map((m) => m.id).join(', '));
    if (ensinados.length) p.push('ensina s/ declarar ' + ensinados.map((m) => m.forma.split(' ')[0]).join(', '));
    console.log(`  ${s.id}  ${p.join('  ·  ')}`);
  }
  console.log();
  process.exit(0);
}

const slot = (process.argv[2] || '').toUpperCase();
const def = contrato.slots.find((s) => s.id === slot);
if (!def) {
  console.error(`\nSlot "${slot}" não existe no contrato v${contrato.versao}.`);
  console.error(`Use: node scripts/briefing-slot.mjs B09   ou   --todos\n`);
  process.exit(1);
}

const { casa, red, prev, ensinados } = paraSlot(slot);

console.log(`\n═══ ${slot} · ${def.funcao}`);
console.log(`    módulo ${def.modulo} · dono ${def.dono}${def.fase ? ` · fase "${def.fase}"` : ''}\n`);

if (casa.length) {
  console.log('CASA — ensine nos QUATRO TEMPOS (nomear o molde → nomear a peça que troca →');
  console.log('trocar na frente do aluno, por voz nativa → mandar o aluno trocar num responde).');
  console.log('Mínimo 2 substituições; mire em 4.\n');
  for (const m of casa) {
    console.log(`  ${m.id}  ${m.forma}`);
    console.log(`      encaixe: ${m.encaixe}`);
    console.log(`      exemplos: ${(m.exemplos || []).slice(0, 6).join(' · ')}`);
    if (m.nota) console.log(`      nota: ${m.nota}`);
    console.log();
  }
}

if (red.length) {
  console.log('REDISPAROS — o molde VOLTA aqui com encaixe NOVO, sem reapresentação e sem');
  console.log('aviso. Não é ensinar de novo: é o que faz o molde atravessar a viagem em vez');
  console.log('de morrer na aula que o criou. O portão G9c quebra a build se faltar.\n');
  for (const m of red) console.log(`  ${m.id.padEnd(14)} ${m.forma}`);
  console.log();
}

if (prev.length) {
  console.log('PRÉVIAS — o molde APARECE aqui e a casa dele vem DEPOIS. Não é redisparo e não');
  console.log('conta em P5. Regra de redação: frase inteira, modelo nativo em `ouvir` ANTES do');
  console.log('responde, e nada na narração dizendo que o aluno já tem a peça — porque não tem.\n');
  for (const m of prev) {
    console.log(`  ${m.id.padEnd(14)} ${m.forma}   (casa: ${m.casa})`);
    for (const p of previaDoSlot(m, slot)) console.log(`      ${p}`);
  }
  console.log();
}

if (ensinados.length) {
  console.log('ENSINADOS E NÃO DECLARADOS — a parte ensina com ≥2 encaixes, mas o molde NÃO');
  console.log('entra no roster (o teto de 12 operacionais é lei). Não conta no G9.\n');
  for (const x of ensinados) {
    console.log(`  ${x.forma}`);
    console.log(`      ${x.porque_fora.slice(0, 150)}…`);
  }
  console.log();
}

if (!casa.length && !red.length && !prev.length && !ensinados.length)
  console.log('Nenhum molde ancorado neste slot pelo roster.\n');
