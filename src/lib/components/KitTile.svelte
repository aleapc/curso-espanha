<script lang="ts">
  import { base } from '$app/paths';
  import KitIcone from '$lib/components/KitIcone.svelte';
  import type { Tile } from '$lib/consulta/tipos';

  // Um dos 12. A altura vem da grade (6 linhas × 2 colunas ocupando a tela
  // inteira), nunca daqui — o tile se estica para caber, e é isso que garante a
  // promessa de zero rolagem em telas menores que a de referência.
  //
  // O tile inteiro é o alvo: nada de ícone clicável dentro de um card clicável.

  let { tile, cards }: { tile: Tile; cards: number } = $props();

  // `apuro` é o único tile inteiramente reativo (1 de 12 = 8%). Ele se distingue
  // pela cor, não pelo tamanho: quem está com pressa acha pelo canto da tela,
  // quem não está não é lembrado de que pode ser roubado.
  const alerta = $derived(tile.id === 'apuro');
</script>

<a
  href="{base}/kit/{tile.id}/"
  class="flex h-full min-h-0 flex-col justify-between rounded-2xl bg-white px-3 py-2.5 shadow-sm ring-1 transition active:scale-[0.98]
    {alerta ? 'ring-terracota/45' : 'ring-black/10'}"
>
  <span class="flex items-start justify-between {alerta ? 'text-terracota' : 'text-oceano'}">
    <KitIcone icone={tile.icone} />
    {#if cards}
      <span class="text-[0.7rem] font-bold tabular-nums text-carvao/45">{cards}</span>
    {/if}
  </span>
  <span class="text-[0.95rem] font-bold leading-[1.15] text-carvao">{tile.rotulo}</span>
</a>
