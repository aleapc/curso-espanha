<script lang="ts">
  import { onMount } from 'svelte';
  import { ambienteAgora } from '$lib/consulta/ambiente';

  // ZERO TOQUE: esta faixa não é botão, não abre nada e não pode ser confundida
  // com um. Ela existe para que a cultura chegue sem custar uma navegação — a
  // mesma informação que hoje está enterrada num episódio, na hora em que morde.

  let agora = $state(ambienteAgora());

  onMount(() => {
    // Meio minuto: o relógio nunca fica visivelmente errado e o custo é zero.
    const t = setInterval(() => (agora = ambienteAgora()), 30_000);
    return () => clearInterval(t);
  });
</script>

<div class="rounded-2xl bg-white px-3.5 py-2.5 ring-1 ring-black/10">
  <p class="text-xs font-bold uppercase tracking-wide text-terracota">
    {agora.hora} · Madrid
  </p>
  <p class="mt-0.5 text-[0.9rem] font-medium leading-snug text-carvao">{agora.linha}</p>
</div>
