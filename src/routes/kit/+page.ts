import type { PageLoad } from './$types';
import { quantosNoTile, tiles, totalDeCards } from '$lib/consulta/indice';

export const prerender = true;

// A tela 0 não busca nada: os 12 tiles são estrutura, não conteúdo, e existem
// mesmo com o índice de cards vazio. É essa separação que faz o kit abrir
// instantâneo — e continuar abrindo enquanto a marcação dos episódios acontece.
export const load: PageLoad = () => ({
  tiles: tiles.map((tile) => ({ tile, cards: quantosNoTile(tile.id) })),
  total: totalDeCards
});
