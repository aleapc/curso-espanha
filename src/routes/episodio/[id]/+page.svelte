<script lang="ts">
  import { base } from '$app/paths';
  import EpisodioPlayer from '$lib/components/EpisodioPlayer.svelte';
  import type { PageData } from './$types';

  import { outline } from '$lib/course';

  let { data }: { data: PageData } = $props();
  const ep = data.episodio;

  // O nome do módulo vem do outline, que vem do contrato de slots — não de um
  // mapa fixo aqui. Este arquivo trazia 'Básico / Intermediário / Avançado'
  // codificado em PORTUGUÊS num curso vendido para britânicos: resíduo do
  // original, nunca traduzido, e invisível para quem lê o código em português.
  // Derivar mata as duas coisas de uma vez — a língua errada e a segunda
  // canônica para o nome do módulo.
  const nivelLabel = outline.find((m) => m.nivel === ep.nivel)?.nome ?? '';
</script>

<a href="{base}/" class="text-sm text-oceano">← back</a>

<header class="mt-2">
  <p class="text-xs font-semibold uppercase tracking-wide text-terracota">
    {nivelLabel}{ep.parte ? ` · Part ${ep.parte}` : ''}
  </p>
  <h1 class="text-2xl font-extrabold leading-tight">{ep.titulo}</h1>
  <p class="text-carvao/70">{ep.subtitulo}</p>
</header>

<div class="mt-4">
  <EpisodioPlayer episodio={ep} />
</div>

{#if ep.aprofundar}
  <details class="card mt-8 p-4">
    <summary class="cursor-pointer font-bold text-oceano">
      📚 Going deeper — {ep.aprofundar.titulo}
    </summary>
    <p class="mt-1 text-xs text-carvao/50">
      The detail, if you want it. Entirely optional — the course works without it.
    </p>
    <div class="mt-3 space-y-4">
      {#each ep.aprofundar.secoes as sec}
        <div>
          <h3 class="font-semibold text-carvao">{sec.titulo}</h3>
          <p class="mt-1 text-sm text-carvao/80">{sec.corpo}</p>
          {#if sec.exemplos}
            <div class="mt-2 space-y-1">
              {#each sec.exemplos as ex}
                <div class="flex flex-wrap items-baseline gap-2 text-sm">
                  <span class="font-medium">{ex.es}</span>
                  <span class="text-carvao/50">— {ex.pt}</span>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </details>
{/if}
