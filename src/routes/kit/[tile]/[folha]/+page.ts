import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import { cardsDaFolha, folhaPorId, folhas, slugDaFolha, tilePorId } from '$lib/consulta/indice';

export const prerender = true;

// Uma entrada por folha da taxonomia — inclusive as que ainda não têm card.
// Folha vazia tem que ter página: quem chega por busca ou por link precisa de um
// estado vazio honesto, não de um 404 que parece app quebrado.
export const entries: EntryGenerator = () =>
  folhas.map((f) => ({ tile: f.tile, folha: slugDaFolha(f.id) }));

export const load: PageLoad = ({ params }) => {
  const folha = folhaPorId(`${params.tile}/${params.folha}`);
  const tile = tilePorId(params.tile);
  if (!folha || !tile) throw error(404, 'Not part of the kit');
  return { tile, folha, cards: cardsDaFolha(folha.id) };
};
