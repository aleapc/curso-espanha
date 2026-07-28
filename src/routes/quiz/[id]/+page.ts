import { error } from '@sveltejs/kit';
import type { Quiz } from '$lib/types';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

// Import dinâmico: um chunk pequeno por quiz (o import estático antigo punha
// os 26 quiz-*.json num chunk de ~98 KB que a home e toda página de quiz baixavam).
const mods = import.meta.glob<{ default: Quiz }>('$lib/course/quiz-*.json');

// id → arquivo: q-basico/q-intermediario/q-avancado = provas (quiz-<nivel>.json);
// o resto são quizzes de episódio (quiz-ep-<ep>.json).
function fileFor(id: string): string {
  if (/^q-(basico|intermediario|avancado)$/.test(id)) {
    return `/src/lib/course/quiz-${id.slice(2)}.json`;
  }
  return `/src/lib/course/quiz-ep-${id.replace(/^q-/, '')}.json`;
}

// Entries dos ARQUIVOS reais (quiz-nav assume q-<ep> pra todo episódio do
// outline; um episódio novo sem quiz ainda gravado não pode quebrar o build).
export const entries: EntryGenerator = () =>
  Object.keys(mods).map((k) => {
    const f = k.slice('/src/lib/course/quiz-'.length, -'.json'.length); // 'ep-b01' | 'basico'
    return { id: f.startsWith('ep-') ? `q-${f.slice(3)}` : `q-${f}` };
  });

export const load: PageLoad = async ({ params }) => {
  const mod = mods[fileFor(params.id)];
  if (!mod) throw error(404, 'Quiz não encontrado');
  return { quiz: (await mod()).default };
};
