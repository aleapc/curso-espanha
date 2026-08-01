<script lang="ts">
  import { base } from '$app/paths';
  import { buscar, slugDaFolha, tilePorId, type Achado } from '$lib/consulta/indice';

  // A BUSCA VAI EMBAIXO, e isso não é gosto: é a mão que segura o telefone. O
  // polegar alcança o terço inferior; o topo da tela exige a segunda mão ou uma
  // troca de pegada, que é exatamente o que ninguém faz de pé num balcão.
  //
  // E ela NÃO é a entrada primária (PRODUTO.md §6) — é a saída de emergência de
  // quem já sabe a palavra. Por isso é uma linha discreta, não um campo herói.

  // `direcao`: 'cima' (padrão, tela do /kit — o polegar no rodapé) ou 'baixo'
  // (âncora no header, onde o teclado nasce embaixo, não em cima).
  let { direcao = 'cima' }: { direcao?: 'cima' | 'baixo' } = $props();

  let termo = $state('');
  const achados = $derived(buscar(termo));
  const procurando = $derived(termo.trim().length >= 2);

  function href(a: Achado): string {
    if (a.tipo === 'folha') return `${base}/kit/${a.folha.tile}/${slugDaFolha(a.folha.id)}/`;
    const f = a.folha;
    if (!f) return `${base}/kit/`;
    return `${base}/kit/${f.tile}/${slugDaFolha(f.id)}/?card=${encodeURIComponent(a.card.id)}`;
  }
</script>

<div class="relative">
  {#if procurando}
    <!-- Resultados ABRINDO PARA CIMA: o teclado ocupa a metade de baixo, e uma
         lista que abrisse para baixo nasceria embaixo dele. -->
    <div
      class="absolute left-0 right-0 max-h-[46dvh] overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-lg ring-1 ring-black/15 {direcao === 'baixo'
        ? 'top-full mt-2'
        : 'bottom-full mb-2'}"
    >
      {#if achados.length}
        <ul>
          {#each achados as a (a.tipo === 'card' ? a.card.id + (a.folha?.id ?? '') : a.folha.id)}
            <li class="border-b border-black/5 last:border-0">
              <a href={href(a)} class="block px-4 py-3 active:bg-black/5">
                {#if a.tipo === 'card'}
                  <span class="block text-[1.05rem] font-bold leading-tight">{a.trecho}</span>
                  <span class="mt-0.5 block text-xs font-medium text-carvao/70">
                    {a.card.titulo}{a.folha ? ` · ${a.folha.rotulo}` : ''}
                  </span>
                {:else}
                  <span class="block text-[1.05rem] font-bold leading-tight">{a.folha.rotulo}</span>
                  <span class="mt-0.5 block text-xs font-medium text-carvao/70">
                    {tilePorId(a.folha.tile)?.rotulo ?? ''}
                  </span>
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="px-4 py-3 text-sm text-carvao/70">
          Nothing under that word. Try the place you are standing in — the twelve above.
        </p>
      {/if}
    </div>
  {/if}

  <div class="flex items-center gap-2 rounded-2xl bg-white px-3 ring-2 ring-carvao/15">
    <span class="text-lg text-carvao/60" aria-hidden="true">🔎</span>
    <input
      bind:value={termo}
      type="search"
      enterkeyhint="search"
      autocapitalize="off"
      autocorrect="off"
      spellcheck="false"
      placeholder="type a word — beer, ticket, meter…"
      aria-label="Search the kit"
      class="h-12 min-w-0 flex-1 bg-transparent text-[1.05rem] outline-none placeholder:text-carvao/45"
    />
    {#if termo}
      <button
        type="button"
        class="-mr-1 px-2 py-2 text-lg text-carvao/60"
        onclick={() => (termo = '')}
        aria-label="Clear search">✕</button
      >
    {/if}
  </div>
</div>
