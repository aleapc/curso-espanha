import { error } from '@sveltejs/kit';
import type { Episode } from '$lib/types';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

// Import DINÂMICO por episódio: cada ep-*.json vira um chunk próprio (~6 KB).
// O import estático antigo (episodes.ts) punha os 69 JSONs num chunk único de
// ~376 KB que TODA página de episódio baixava — e editar 1 episódio invalidava
// o chunk inteiro nos aparelhos.
const mods = import.meta.glob<{ default: Episode }>('$lib/course/ep-*.json');

// Entries vêm dos ARQUIVOS reais (não do outline): uma lição futura listada no
// outline com pronta:false e sem ep-*.json não pode quebrar o prerender.
export const entries: EntryGenerator = () =>
  Object.keys(mods).map((k) => ({
    id: k.slice('/src/lib/course/ep-'.length, -'.json'.length)
  }));

export const load: PageLoad = async ({ params }) => {
  const mod = mods[`/src/lib/course/ep-${params.id}.json`];
  if (!mod) throw error(404, 'Episódio não encontrado');
  return { episodio: (await mod()).default };
};
