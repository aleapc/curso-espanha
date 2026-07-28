import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),
    paths: {
      // relative:true evita o bug "Unable to preload CSS" (caminho duplicado
      // .../entry/_app/immutable/assets/...) que dava 500 no app de produção
      // quando há CSS de componente/rota (cards, players). Caminhos relativos à
      // página resolvem certo sob o base /curso-espanol do GitHub Pages.
      relative: true,
      base: process.env.BASE_PATH ?? ''
    },
    prerender: {
      // As "fotos" dos cards (static/img/<id>.jpg) são opcionais — geradas depois
      // pelo usuário. Sem elas o card cai no emoji (onerror no runtime). Não deixar
      // o prerender quebrar por causa desses 404.
      handleHttpError: ({ path, message }) => {
        if (path.includes('/img/')) return;
        throw new Error(message);
      },
      // Fase de scaffold: as rotas /episodio/[id] e /quiz/[id] existem mas ainda
      // não têm NENHUMA página (entries derivam dos arquivos de conteúdo, que
      // serão produzidos). Sem isto o kit 2.69 aborta o build.
      handleUnseenRoutes: 'ignore'
    }
  }
};

export default config;
