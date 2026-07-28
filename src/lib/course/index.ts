import type { ModuloOutline } from '../types';
import { outline } from './outline.gen';

// A LINHA DIVISÓRIA DESTE ARQUIVO.
//
// `outline` é GERADO (outline.gen.ts): título, ordem e módulo saem dos próprios
// episódios e do contrato de slots, porque título copiado à mão em dois lugares
// já fez duas partes reescritas aparecerem na tela com o nome antigo.
//
// O que está ABAIXO é apresentação — como as partes se agrupam em cards na
// home, o nome e o emoji de cada grupo. Isso é decisão visual, é escrita à mão,
// e não se mexe sem pedir.

export { outline };
export type { ModuloOutline };

// Nome e emoji de cada grupo de cards. A chave é o prefixo do id da parte
// (`e01a` → `e01`). Parte cujo prefixo não estiver aqui vira um card sozinho
// com o próprio título — degradação de propósito: durante o retrofit nascem
// partes com id novo (`b06`, `b08`) antes de alguém decidir em que card elas
// moram, e é melhor a home mostrá-las sozinhas do que escondê-las.
const EP_META: Record<string, { nome: string; emoji: string }> = {
  e01: { nome: 'Sounds, rhythm and the repair kit', emoji: '🗣️' },
  e02: { nome: 'Before you fly, and the border', emoji: '✈️' },
  e03: { nome: 'Bar, table and the bill', emoji: '🍺' },
  e04: { nome: 'Allergy and the invisible ingredient', emoji: '⚠️' },
  e05: { nome: 'Money and the card machine', emoji: '💳' },
  e06: { nome: 'Getting around', emoji: '🚇' },
  e07: { nome: 'Rooms and wheels', emoji: '🏨' },
  e08: { nome: 'When it goes wrong', emoji: '🆘' },
  c01: { nome: 'The Spanish clock', emoji: '🕘' },
  c02: { nome: 'Money manners and the con', emoji: '💶' },
  c03: { nome: 'Rules with a price tag', emoji: '⚖️' }
};

export interface ParteCard {
  id: string;
  letra: string;
  titulo: string;
  pronta: boolean;
}
export interface EpisodioCard {
  id: string;
  nome: string;
  emoji: string;
  partes: ParteCard[];
}
export interface NivelCards {
  nivel: string;
  nome: string;
  cor: string;
  descricao: string;
  episodios: EpisodioCard[];
}

export const niveis: NivelCards[] = outline.map((mod) => {
  const groups: Record<string, EpisodioCard> = {};
  const ordem: string[] = [];
  for (const l of mod.licoes) {
    // O agrupamento em cards nasceu do id LEGADO, que era "episódio + parte":
    // `e01a` e `e01b` são a parte A e a parte B do episódio `e01`. Cortar a
    // última letra funcionava porque todo id tinha essa forma.
    //
    // Os ids do contrato de slots não têm: `b06` é uma parte inteira, e cortar a
    // última letra dela dá `b0` — que colide com `b08`. Foi o que aconteceu na
    // primeira vez que a home rodou com as partes novas: duas aulas sem nenhuma
    // relação apareceram como um card só, com o título da primeira, e a segunda
    // sumiu da tela sem erro nenhum em lugar nenhum.
    //
    // Então só agrupa quem tem a forma legada; parte de slot é card sozinha.
    const legado = /^[a-z]\d{2}[a-z]$/.test(l.id);
    const epId = legado ? l.id.slice(0, -1) : l.id;
    if (!groups[epId]) {
      const meta = EP_META[epId] ?? { nome: l.titulo, emoji: '🎧' };
      groups[epId] = { id: epId, nome: meta.nome, emoji: meta.emoji, partes: [] };
      ordem.push(epId);
    }
    const titulo = l.titulo.includes('—') ? l.titulo.split('—').pop()!.trim() : l.titulo;
    groups[epId].partes.push({
      id: l.id,
      // A "letra" é o rótulo da parte dentro do card (A, B, C). Numa parte de
      // slot, que é card sozinha, não há parte B — o rótulo seria um "6" solto.
      letra: legado ? l.id.slice(-1).toUpperCase() : '',
      titulo,
      pronta: l.pronta
    });
  }
  return {
    nivel: mod.nivel,
    nome: mod.nome,
    cor: mod.cor,
    descricao: mod.descricao,
    episodios: ordem.map((id) => groups[id])
  };
});
