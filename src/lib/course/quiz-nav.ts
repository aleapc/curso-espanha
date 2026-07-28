// Navegação de quizzes SEM importar nenhum JSON de conteúdo.
// Os mapas só apontam pra quizzes/provas que EXISTEM como arquivo — assim a home
// não linka uma página que ainda não foi produzida (o prerender derivava 404).
// import.meta.glob com eager:false dá só as CHAVES (caminhos), zero bytes de conteúdo.

const arquivos = import.meta.glob('./quiz-*.json');
const existentes = new Set(
  Object.keys(arquivos).map((k) => {
    const f = k.slice('./quiz-'.length, -'.json'.length); // 'ep-m01' | 'basico'
    return f.startsWith('ep-') ? `q-${f.slice(3)}` : `q-${f}`;
  })
);

// epId ('m01') → 'q-m01', só se o arquivo quiz-ep-m01.json existir.
export const quizDoEpisodio: Record<string, string> = Object.fromEntries(
  [...existentes]
    .filter((id) => !/^q-(basico|intermediario|avancado)$/.test(id))
    .map((id) => [id.slice(2), id])
);

// nível → prova, só se quiz-<nivel>.json existir.
export const examDoNivel: Record<string, string> = Object.fromEntries(
  ['basico', 'intermediario', 'avancado']
    .filter((n) => existentes.has(`q-${n}`))
    .map((n) => [n, `q-${n}`])
);
