<script lang="ts">
  // Os 12 ícones dos tiles. Traço grosso e forma cheia de propósito: o alvo é
  // "legível a braço estendido sob sol", e emoji colorido some no reflexo — o
  // que sobrevive é silhueta com contraste alto contra o fundo branco.
  //
  // Os nomes vêm do campo `icone` da taxonomia (que é lei de catálogo): ícone
  // desconhecido cai num ponto, nunca num buraco na grade.

  let { icone, tamanho = 30 }: { icone: string; tamanho?: number } = $props();
</script>

<svg
  width={tamanho}
  height={tamanho}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  focusable="false"
>
  {#if icone === 'porta'}
    <!-- chegar: a porta que se empurra -->
    <path d="M14 3H6v18h8" />
    <path d="M14 3l4 2v14l-4 2z" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  {:else if icone === 'garfo'}
    <!-- mesa: garfo e faca -->
    <path d="M7 3v6a2 2 0 0 0 4 0V3" />
    <path d="M9 9v12" />
    <path d="M17 3c-1.6 1.4-2 3-2 5s.6 2.6 2 3" />
    <path d="M17 3v18" />
  {:else if icone === 'escudo'}
    <!-- dieta: o escudo, porque é defesa e é séria -->
    <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  {:else if icone === 'cartao'}
    <!-- pagar: o cartão e a tarja -->
    <rect x="2.5" y="6" width="19" height="12" rx="2" />
    <path d="M2.5 10h19" />
    <path d="M6 14.5h3" />
  {:else if icone === 'carro'}
    <!-- taxi: o carro com a luz em cima -->
    <path d="M3 16v-3l2-4.5A2 2 0 0 1 6.8 7h10.4a2 2 0 0 1 1.8 1.5L21 13v3" />
    <path d="M3 16h18" />
    <circle cx="7" cy="17.5" r="1.6" />
    <circle cx="17" cy="17.5" r="1.6" />
    <rect x="9.5" y="3.5" width="5" height="2.5" rx="0.6" />
  {:else if icone === 'trilho'}
    <!-- transporte: o vagão -->
    <rect x="5" y="3" width="14" height="14" rx="3" />
    <path d="M5 11h14" />
    <path d="M9 21l2-4M15 21l-2-4" />
    <circle cx="9" cy="14" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" />
  {:else if icone === 'cama'}
    <!-- quarto: a cama -->
    <path d="M3 18v-8" />
    <path d="M3 13h18v5" />
    <path d="M21 18v-4" />
    <path d="M7 13V9h5a3 3 0 0 1 3 3v1" />
  {:else if icone === 'sacola'}
    <!-- compras: a sacola -->
    <path d="M4.5 8h15l-1.2 12.5a1 1 0 0 1-1 .9H6.7a1 1 0 0 1-1-.9z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  {:else if icone === 'cruz'}
    <!-- saude: a cruz da farmácia -->
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
    <path d="M12 8v8M8 12h8" />
  {:else if icone === 'brinde'}
    <!-- simpatia: os dois copos que se encostam -->
    <path d="M4 4l3 7v9" />
    <path d="M4.5 20h5" />
    <path d="M20 4l-3 7v9" />
    <path d="M14.5 20h5" />
    <path d="M9 8.5h6" />
  {:else if icone === 'ouvido'}
    <!-- reparo: as ondas que não chegaram -->
    <path d="M7 20a4 4 0 0 0 4-4c0-2-2-2.5-2-4a3 3 0 1 1 6 0" />
    <path d="M6.5 9a5.5 5.5 0 0 1 8-4.9" />
    <path d="M18.5 6.5A6 6 0 0 1 20 10" />
  {:else if icone === 'alerta'}
    <!-- apuro: o triângulo, e é o único tile inteiro reativo -->
    <path d="M12 3.5L21.5 20h-19z" />
    <path d="M12 9.5v5" />
    <circle cx="12" cy="17.3" r="1.1" fill="currentColor" stroke="none" />
  {:else}
    <circle cx="12" cy="12" r="8" />
  {/if}
</svg>
