import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

const base = process.env.BASE_PATH ?? '';

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      registerType: 'autoUpdate',
      // Registro é MANUAL no +layout.svelte (onMount): com prerender o 'auto'
      // não injeta script nenhum nos HTMLs — o SW ficava gerado mas nunca registrado.
      injectRegister: null,
      strategies: 'generateSW',
      // Sem isto o precache sai com {url:"/"} (raiz do DOMÍNIO → 404 no Pages →
      // install do SW aborta inteiro) e rotas sem a barra final que o app usa.
      kit: {
        trailingSlash: 'always',
        adapterFallback: '404.html',
        // spa injeta o 404.html (assets ABSOLUTOS) no precache — é ele o
        // navigateFallback: serve qualquer URL fora do precache (ex.: episódio
        // sem a barra final) sem entregar a home com assets relativos quebrados.
        // SÓ em prod: o GH Pages serve /404.html com status 200 (testado), mas o
        // vite preview local (sirv) responde 404 → o precache dele ABORTA o
        // install do SW. Local fica sem fallback (todas as rotas reais estão
        // no precache; só URL sem barra digitada à mão offline perde).
        spa: base ? true : undefined,
        // O plugin lê o base do VITE — mas o nosso vive no svelte.config
        // (kit.paths.base). Sem isto a home saía {url:"/"} ABSOLUTO no precache
        // (raiz do DOMÍNIO = 404 no Pages) e o install do SW abortava inteiro.
        // (Marcada deprecated, mas o código do plugin ainda a usa: base = kit.base ?? vite.base)
        base: `${base}/`
      },
      manifest: {
        name: '¡Dime! — Survival Spanish for Spain',
        short_name: '¡Dime!',
        description: 'Survival Spanish + culture for Spain · audio-first, works offline',
        lang: 'en-GB',
        theme_color: '#C84B31',
        background_color: '#FFF7EC',
        display: 'standalone',
        orientation: 'portrait',
        start_url: `${base}/`,
        scope: `${base}/`,
        id: `${base}/`,
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        // Precache SÓ o app shell (leve). Os ~2.300 mp3 + fotos (150 MB+) NÃO entram
        // no precache — no iOS isso estourava a cota e travava o app (erro 500).
        // Áudio e imagens são cacheados sob demanda (CacheFirst): tocou/abriu uma vez
        // com internet → fica offline depois.
        // png cobre os 3 ícones (as fotos dos cards são webp/jpg e ficam DE FORA,
        // cacheadas em runtime). Os padrões avulsos antigos (icon-*.png etc.) não
        // casavam nada e só geravam warnings — os ícones entram via manifest.
        // NUNCA definir manifestTransforms aqui: substituiria o transform interno
        // do plugin que converte prerendered/pages/*.html nas URLs finais.
        // Padrões COM prefixo client/: sem prefixo o plugin APPENDA um default
        // que inclui webp — e as 23 fotos dos cards (640KB+) entravam no
        // precache, contra o design (fotos são cache de RUNTIME, sob demanda).
        globPatterns: [
          'client/**/*.{js,css,svg,ico,png,woff2,txt}',
          'prerendered/**/*.html'
        ],
        globIgnores: ['client/img/**'],
        // Fallback de navegação = 404.html do adapter (asset paths absolutos),
        // não a home (relativa — quebrava em /episodio/x sem barra final).
        // null no local: sem o 404.html no precache não há handler possível.
        navigateFallback: base ? '404.html' : null,
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // O índice que decide premium vs TTS — sem ele cacheado, offline o app
            // "esquece" que tem áudio premium mesmo com os mp3 no cache.
            urlPattern: /\/audio\/index\.json$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'audio-index',
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // samples/ = amostras da página /vozes. rangeRequests: o Safari do iOS
            // pede áudio com Range (206) — o plugin fatia o 200 cacheado; sem ele,
            // request com Range contra o cache falha.
            urlPattern: /\/(?:audio|samples)\/[^?]+\.mp3$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'audio-clips',
              expiration: { maxEntries: 6000, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
              rangeRequests: true
            }
          },
          {
            urlPattern: /\/img\/[^?]+\.(?:jpg|jpeg|png|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'card-img',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      },
      devOptions: { enabled: false }
    })
  ]
});
