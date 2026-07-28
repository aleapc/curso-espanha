#!/usr/bin/env node
// VALIDADOR DE ESTRUTURA — Kit de Bordo
//
//   node scripts/valida-estrutura.mjs           → valida e sai 1 se houver erro
//   node scripts/valida-estrutura.mjs --estrito → slot de módulo travado ainda
//                                                 vazio também é ERRO
//   node scripts/valida-estrutura.mjs --mapa    → só imprime o mapa de slots preenchidos
//
// Existe porque documento não segura agente. O contrato de estrutura
// (src/lib/course/slots.json) é CRAVADO EM PEDRA: 36 slots, mesma ordem, mesmos
// módulos, em todo destino e para todo comprador. O que varia é o recheio.
// Este script roda no prebuild e quebra a build se um curso divergir.
//
// ── OS DOIS MODOS, E POR QUE ELES EXISTEM ───────────────────────────────────
// PRODUTO.md §3.2, regra 10: "enquanto um módulo travado tiver slot vazio, o
// validador de estrutura roda em MODO AVISO (--estrito desligado). Ligar o modo
// estrito é o último passo da produção de um SKU, não o primeiro — senão o build
// fica vermelho durante a obra inteira e a equipe aprende a ignorar o vermelho,
// que é como se perde um portão para sempre."
//
// O que o modo governa é SÓ a completude ("este slot ainda não foi escrito"):
//   · módulo travado com slot faltando   → aviso  (erro com --estrito)
//   · módulo com faixa abaixo do mínimo  → aviso  (erro com --estrito)
// Tudo que é DIVERGÊNCIA DE CONTRATO continua sendo erro duro nos dois modos:
// arquivo sem `slot` e sem `dissolveEm`, slot inexistente, slot preenchido duas
// vezes, `nivel` divergente do módulo, `dissolveEm` para slot inventado, B13
// ausente. Obra em andamento é aviso; contrato violado é erro.
//
// QUANDO O ESTRITO LIGA NO ¡Dime! (EN → Espanha): ao FIM DA ONDA 3 da grade
// (docs/GRADE-36-ESPANHA.md §7) — quando B14, B10 e B18 fecharem os 18 slots de
// ME VIRO. A partir daí `prebuild` passa a chamar `estrutura:estrito`.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'lib', 'course');
const erros = [];
const avisos = [];

// Modo estrito: slot de módulo travado ainda vazio deixa de ser aviso e vira erro.
// Desligado por padrão — ver o cabeçalho e PRODUTO.md §3.2, regra 10.
const estrito = process.argv.includes('--estrito');
// `incompleto` é a única categoria que muda de gravidade com o modo.
const incompleto = (msg) => (estrito ? erros : avisos).push(msg);

const contrato = JSON.parse(readFileSync(join(dir, 'slots.json'), 'utf8'));
const porId = new Map(contrato.slots.map((s) => [s.id, s]));

// ── 1. carrega as partes do curso ───────────────────────────────────────────
const arquivos = readdirSync(dir).filter((f) => /^ep-.*\.json$/.test(f));
const partes = [];
for (const f of arquivos) {
  let j;
  try {
    j = JSON.parse(readFileSync(join(dir, f), 'utf8'));
  } catch (e) {
    erros.push(`${f}: JSON inválido — ${e.message}`);
    continue;
  }
  partes.push({ f, j });
}

// ── 2. todo arquivo declara um slot canônico ────────────────────────────────
const vistos = new Map();
// `dissolveEm` = estado de TRÂNSITO declarado. O arquivo não preenche slot nenhum
// porque seu conteúdo está sendo repartido entre slots que ainda estão sendo
// escritos (ex.: e08b vira B17 + B10 + B18). Não é erro — é obra em andamento, e
// o curso continua no ar enquanto ela corre. Quando o conteúdo migra, o arquivo é
// apagado. O que seria erro é o arquivo simplesmente não dizer nada.
const emTransito = [];

for (const { f, j } of partes) {
  const slot = j.slot;
  if (!slot) {
    if (Array.isArray(j.dissolveEm) && j.dissolveEm.length) {
      emTransito.push({ f, destinos: j.dissolveEm });
      continue;
    }
    erros.push(`${f}: sem campo "slot". Todo episódio declara o slot canônico que preenche.`);
    continue;
  }
  const def = porId.get(slot);
  if (!def) {
    erros.push(`${f}: slot "${slot}" não existe no contrato v${contrato.versao}.`);
    continue;
  }
  if (vistos.has(slot)) {
    erros.push(`slot ${slot} preenchido DUAS vezes: ${vistos.get(slot)} e ${f}`);
    continue;
  }
  vistos.set(slot, f);

  // o módulo declarado no arquivo tem que bater com o do contrato
  if (j.nivel !== def.modulo) {
    erros.push(`${f}: slot ${slot} pertence ao módulo "${def.modulo}", mas o arquivo diz nivel "${j.nivel}".`);
  }
}

// ── 3. nenhum slot obrigatório pode faltar ──────────────────────────────────
const porModulo = {};
for (const s of contrato.slots) (porModulo[s.modulo] ??= []).push(s);

for (const mod of contrato.modulos) {
  const doMod = porModulo[mod.id] || [];
  const faltando = doMod.filter((s) => !vistos.has(s.id));
  const preenchidos = doMod.length - faltando.length;

  if (mod.travado && faltando.length) {
    incompleto(
      `módulo ${mod.nome_pt}: faltam ${faltando.length} de ${doMod.length} slots — ${faltando.map((s) => s.id).join(', ')}`
    );
  } else if (!mod.travado) {
    // módulo com faixa (M3: 8 a 10)
    if (preenchidos < (mod.min ?? doMod.length)) {
      incompleto(`módulo ${mod.nome_pt}: ${preenchidos} partes, mínimo é ${mod.min}.`);
    }
    if (faltando.length) {
      avisos.push(`módulo ${mod.nome_pt}: slots ainda vazios — ${faltando.map((s) => s.id).join(', ')}`);
    }
  }
}

// ── 4. a ordem dos slots dentro do módulo tem que ser a canônica ────────────
// (o app ordena pelo outline; isto pega o caso de alguém renumerar "parte")
for (const mod of contrato.modulos) {
  const doMod = (porModulo[mod.id] || []).filter((s) => vistos.has(s.id));
  let anterior = null;
  for (const s of doMod) {
    const f = vistos.get(s.id);
    const j = partes.find((p) => p.f === f).j;
    if (anterior && typeof j.numero === 'number' && typeof anterior.numero === 'number' && j.numero < anterior.numero) {
      avisos.push(`${f} (${s.id}): "numero" ${j.numero} vem depois de ${anterior.numero} na ordem canônica — confira.`);
    }
    anterior = j;
  }
}

// ── 5. B13 é intocável ──────────────────────────────────────────────────────
if (!vistos.has('B13')) {
  erros.push('B13 (alergia e restrição) ausente. É intocável em todo destino — ver regras do contrato.');
}

// ── 6. relatório ────────────────────────────────────────────────────────────
const mapa = () => {
  for (const mod of contrato.modulos) {
    const doMod = porModulo[mod.id] || [];
    const n = doMod.filter((s) => vistos.has(s.id)).length;
    console.log(`\n  ${mod.nome_pt}  (${n}/${doMod.length})`);
    for (const s of doMod) {
      const f = vistos.get(s.id);
      const marca = f ? '✓' : '·';
      const dono = s.dono === 'par' ? 'par    ' : 'destino';
      console.log(`   ${marca} ${s.id}  ${dono}  ${s.funcao.slice(0, 62).padEnd(62)} ${f ? '' : '(vazio)'}`);
    }
  }
};

if (process.argv.includes('--mapa')) {
  console.log(`\nCONTRATO v${contrato.versao} — ${contrato.total} slots`);
  mapa();
  process.exit(0);
}

console.log(
  `\nvalida-estrutura · contrato v${contrato.versao} · ${partes.length} partes encontradas · modo ${estrito ? 'ESTRITO' : 'AVISO (--estrito desligado)'}`
);
if (emTransito.length) {
  console.log(`\n${emTransito.length} arquivo(s) em trânsito (conteúdo sendo repartido, some ao fim):`);
  for (const t of emTransito) console.log(`  → ${t.f} dissolve em ${t.destinos.join(', ')}`);
  // Um destino declarado que não existe no contrato é erro de verdade: alguém
  // está mandando conteúdo para um slot inventado.
  for (const t of emTransito)
    for (const d of t.destinos)
      if (!porId.has(d)) erros.push(`${t.f}: dissolveEm aponta para "${d}", que não existe no contrato.`);
}
if (avisos.length) {
  console.log(`\n${avisos.length} aviso(s):`);
  avisos.forEach((a) => console.log('  ⚠ ' + a));
}
if (erros.length) {
  console.log(`\n${erros.length} ERRO(S) — a estrutura diverge do contrato:`);
  erros.forEach((e) => console.log('  ✗ ' + e));
  mapa();
  console.log('\nO contrato de slots é cravado em pedra: 36 slots, mesma ordem, todo destino.');
  console.log('Um slot que "não se aplica" muda de conteúdo — nunca é excluído.\n');
  process.exit(1);
}
if (!estrito && avisos.some((a) => /faltam|mínimo é/.test(a))) {
  console.log(
    '\n✓ nenhuma divergência de contrato. Slots ainda vazios são AVISO neste modo —' +
      '\n  o SKU não está pronto. Rode com --estrito ao fim da Onda 3 para cobrá-los.\n'
  );
} else {
  console.log('\n✓ estrutura conforme o contrato.\n');
}
