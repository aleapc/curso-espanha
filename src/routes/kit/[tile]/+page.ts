import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import { folhasDoTile, quantosNaFolha, slugDaFolha, tilePorId, tiles } from '$lib/consulta/indice';

export const prerender = true;

// Doze entradas, sempre as mesmas em todo SKU. Não derivam dos cards: uma folha
// ainda sem card marcado não pode sumir do índice — ela é o mapa, não o conteúdo.
export const entries: EntryGenerator = () => tiles.map((t) => ({ tile: t.id }));

export const load: PageLoad = ({ params }) => {
  const tile = tilePorId(params.tile);
  if (!tile) throw error(404, 'Not part of the kit');
  return {
    tile,
    folhas: folhasDoTile(tile.id).map((folha) => ({
      folha,
      slug: slugDaFolha(folha.id),
      cards: quantosNaFolha(folha.id)
    }))
  };
};
