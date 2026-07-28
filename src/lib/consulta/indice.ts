// O ÍNDICE DO MODO CONSULTA, do jeito que as telas precisam dele.
//
// DUAS FONTES, e a divisão importa:
//  · a ESTRUTURA (12 tiles + folhas) vem de `taxonomia.ts`, que é TS tipado, tem
//    o ícone de cada tile e é lei de catálogo — a ordem dos 12 é fixa para sempre;
//  · os CARDS vêm de `consulta.json`, que é GERADO (`npm run consulta`) a partir
//    da marcação nos episódios e é reescrito toda vez que uma parte é marcada.
//
// Hoje `cards` está vazio de propósito: a marcação está sendo feita em paralelo.
// Tudo aqui tem que funcionar com o índice cheio e degradar com dignidade com ele
// vazio — folha sem card é um estado vazio honesto, nunca uma tela quebrada.

import dados from '$lib/course/consulta.json';
import { FOLHAS, TILES } from './taxonomia';
import type { Card, Folha, Tile, TileId } from './tipos';

/** Os 12, na ordem fixa. */
export const tiles: Tile[] = [...TILES].sort((a, b) => a.ordem - b.ordem);

export const folhas: Folha[] = FOLHAS;

// O JSON é gerado: enquanto `cards` está vazio o TS infere `never[]`, e quando
// encher vai inferir o literal (com `quem: string`, que não é 'voce' | 'ele').
// O contrato de verdade é o `Card` de tipos.ts, e quem o garante é o gerador.
export const cards: Card[] = (dados as { cards: unknown[] }).cards as Card[];

const porFolha = new Map<string, Card[]>();
for (const c of cards) {
  // Multigrafo, não árvore: o mesmo card pendura em várias folhas de propósito.
  for (const f of c.folhas ?? []) {
    const lista = porFolha.get(f);
    if (lista) lista.push(c);
    else porFolha.set(f, [c]);
  }
}

export function tilePorId(id: string): Tile | undefined {
  return tiles.find((t) => t.id === id);
}

export function folhaPorId(id: string): Folha | undefined {
  return folhas.find((f) => f.id === id);
}

/** `chegar/entrar` → `entrar`. É o segundo pedaço da rota /kit/[tile]/[folha]. */
export function slugDaFolha(id: string): string {
  return id.slice(id.indexOf('/') + 1);
}

/**
 * As folhas de um tile na ORDEM DO ARCO DA CENA, com as reativas ("algo deu
 * errado") sempre por último. A taxonomia já as escreve nessa ordem; a
 * estabilização aqui é para que uma folha reativa inserida no meio do arco por
 * engano não apareça no meio da lista de quem está com pressa.
 */
export function folhasDoTile(tile: TileId | string): Folha[] {
  const doTile = folhas.filter((f) => f.tile === tile);
  return [...doTile.filter((f) => !f.reativa), ...doTile.filter((f) => f.reativa)];
}

export function cardsDaFolha(folhaId: string): Card[] {
  return porFolha.get(folhaId) ?? [];
}

export function quantosNaFolha(folhaId: string): number {
  return porFolha.get(folhaId)?.length ?? 0;
}

/** Cards distintos de um tile (o mesmo card em duas folhas conta uma vez). */
export function quantosNoTile(tile: TileId | string): number {
  const vistos = new Set<string>();
  for (const f of folhasDoTile(tile)) for (const c of cardsDaFolha(f.id)) vistos.add(c.id);
  return vistos.size;
}

// ── busca ───────────────────────────────────────────────────────────────────
// Não é a entrada primária (PRODUTO.md §6: "nunca busca como entrada primária"),
// é a saída de emergência de quem já sabe a palavra. Casa sem acento e sem caixa
// porque ninguém digita «ración» com uma mão no sol.

function chave(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export type Achado =
  | { tipo: 'card'; card: Card; folha: Folha | undefined; trecho: string }
  | { tipo: 'folha'; folha: Folha; tile: Tile | undefined };

const cardsIndexados = cards.map((c) => ({
  card: c,
  texto: chave(
    [c.titulo, ...(c.troca ?? []).flatMap((t) => [t.es, t.en, t.pron ?? '']), c.info ?? ''].join(' ')
  ),
  inicio: chave((c.troca ?? []).find((t) => t.quem === 'voce')?.es ?? c.titulo)
}));

const folhasIndexadas = folhas.map((f) => ({
  folha: f,
  texto: chave(`${f.rotulo} ${tilePorId(f.tile)?.rotulo ?? ''} ${f.id.replace('/', ' ')}`)
}));

/**
 * Cards primeiro, folhas depois — com o índice vazio a busca ainda leva a algum
 * lugar (o tile certo) em vez de devolver "nada encontrado" e parecer quebrada.
 */
export function buscar(q: string, limite = 12): Achado[] {
  const termo = chave(q);
  if (termo.length < 2) return [];
  const achados: { peso: number; achado: Achado }[] = [];

  for (const item of cardsIndexados) {
    const i = item.texto.indexOf(termo);
    if (i < 0) continue;
    const primeiraFolha = item.card.folhas?.[0];
    achados.push({
      // Quem casa no COMEÇO da sua própria fala vem antes de quem casa numa
      // tradução no meio do card.
      peso: item.inicio.startsWith(termo) ? 0 : item.inicio.includes(termo) ? 1 : 2,
      achado: {
        tipo: 'card',
        card: item.card,
        folha: primeiraFolha ? folhaPorId(primeiraFolha) : undefined,
        trecho: (item.card.troca ?? []).find((t) => t.quem === 'voce')?.es ?? item.card.titulo
      }
    });
  }

  for (const item of folhasIndexadas) {
    if (!item.texto.includes(termo)) continue;
    achados.push({
      peso: 3 + (item.texto.startsWith(termo) ? 0 : 1),
      achado: { tipo: 'folha', folha: item.folha, tile: tilePorId(item.folha.tile) }
    });
  }

  return achados
    .sort((a, b) => a.peso - b.peso)
    .slice(0, limite)
    .map((x) => x.achado);
}

// ── áudio do kit ────────────────────────────────────────────────────────────

/** Toda chave de áudio que o modo consulta pode tocar, sem repetição. */
export function chavesDeAudioDoKit(): string[] {
  const s = new Set<string>();
  for (const c of cards) for (const t of c.troca ?? []) if (t.audioKey) s.add(t.audioKey);
  return [...s];
}

/** Total de cards do índice — é o número que a tela usa para se explicar. */
export const totalDeCards = cards.length;
