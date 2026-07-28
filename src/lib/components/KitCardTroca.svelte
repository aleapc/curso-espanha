<script lang="ts">
  import { tocarClipe } from '$lib/audio';
  import type { Card, Turno } from '$lib/consulta/tipos';

  // O CARD — o entregável do modo consulta, e o lugar inteiro onde ele se separa
  // de um phrasebook. O phrasebook dá a SUA fala e te abandona no segundo
  // seguinte, quando o garçom responde. Aqui a unidade é a TROCA: o que ele diz
  // antes, o que você diz, e o que volta.
  //
  // Vertical = a conversa, de cima para baixo. Nunca inverter a hierarquia
  // tipográfica: espanhol primeiro e maior, pronúncia no meio (é ISTO que se lê
  // no sol), inglês por último e menor.
  //
  // O BLOCO INTEIRO DA SUA FALA É O BOTÃO DE PLAY. Um ícone de play de 24 px
  // exige mira, e mira é a segunda mão: quem está com o telefone numa mão e o
  // guardanapo na outra erra o alvo e toca no card errado.

  let {
    card,
    coberto = false,
    destaque = false
  }: { card: Card; coberto?: boolean; destaque?: boolean } = $props();

  let destapou = $state(false);
  const revelado = $derived(destapou || !coberto);
  let tocandoIdx = $state<number | null>(null);
  let falhou = $state(false);

  const turnos = $derived(card.troca ?? []);
  // A sua fala é a âncora do card; os turnos `ele` se penduram antes e depois.
  const indiceDaSuaFala = $derived(Math.max(0, turnos.findIndex((t) => t.quem === 'voce')));
  const antes = $derived(turnos.slice(0, indiceDaSuaFala));
  const sua = $derived<Turno | undefined>(turnos[indiceDaSuaFala]);
  const depois = $derived(turnos.slice(indiceDaSuaFala + 1));

  async function tocar(i: number, key?: string) {
    if (!key) return;
    falhou = false;
    tocandoIdx = i;
    const r = await tocarClipe(key);
    // Só limpa se ainda for ESTE clipe: se outro começou, quem manda é ele.
    if (tocandoIdx === i) tocandoIdx = null;
    if (r === 'erro') falhou = true;
  }

  function tocarSuaFala() {
    // Antes do voo a frase abre coberta: o primeiro toque revela (revisão
    // espaçada), e só o segundo toca. Depois do voo nunca há primeiro toque.
    if (!revelado) {
      destapou = true;
      return;
    }
    void tocar(indiceDaSuaFala, sua?.audioKey);
  }
</script>

<article
  class="rounded-2xl bg-white p-3 shadow-sm ring-1 {destaque
    ? 'ring-2 ring-terracota'
    : 'ring-black/10'}"
>
  {#if card.aviso}
    <p class="mb-2 text-[0.7rem] font-bold uppercase tracking-wide text-terracota">
      ⚠ when it goes wrong
    </p>
  {/if}

  <!-- O que ELE diz antes (quando a cena começa com ele). Áudio discreto e
       nunca automático: você não está estudando, está decidindo. -->
  {#each antes as t, i}
    {#if t.quem === 'ele'}
      <button
        type="button"
        onclick={() => tocar(i, t.audioKey)}
        class="mb-2 block w-full rounded-xl bg-carvao/[0.04] px-3 py-2 text-left ring-1 ring-black/5 active:bg-carvao/10"
      >
        <span class="block text-[0.65rem] font-bold uppercase tracking-wide text-carvao/60"
          >They say</span
        >
        <span class="mt-0.5 flex items-baseline gap-2">
          <span class="flex-1 text-[1.05rem] font-semibold leading-snug">{t.es}</span>
          <span class="shrink-0 text-base">{tocandoIdx === i ? '🔉' : '🔈'}</span>
        </span>
        <span class="block text-[0.8rem] text-carvao/70">{t.en}</span>
      </button>
    {/if}
  {/each}

  {#if sua}
    <p class="mb-1 text-[0.7rem] font-bold uppercase tracking-wide text-carvao/60">You say</p>
    <button
      type="button"
      onclick={tocarSuaFala}
      aria-label={revelado ? `Play: ${sua.es}` : 'Reveal the phrase'}
      class="block w-full rounded-2xl px-3.5 py-3 text-left ring-2 transition active:scale-[0.99]
        {tocandoIdx === indiceDaSuaFala
        ? 'bg-sol/25 ring-terracota'
        : 'bg-creme ring-carvao/15 active:bg-sol/20'}"
    >
      {#if revelado}
        <span class="block text-[2rem] font-extrabold leading-[1.1] tracking-tight">{sua.es}</span>
        {#if sua.pron}
          <span class="mt-1 block text-[1.15rem] font-semibold leading-tight text-oceano"
            >{sua.pron}</span
          >
        {/if}
        <span class="mt-1 flex items-end gap-2">
          <span class="flex-1 text-[0.95rem] leading-snug text-carvao/75">{sua.en}</span>
          <span class="shrink-0 text-xl leading-none"
            >{tocandoIdx === indiceDaSuaFala ? '🔉' : '▶🔊'}</span
          >
        </span>
      {:else}
        <span class="block text-[2rem] font-extrabold leading-[1.1] tracking-widest text-carvao/30"
          >· · ·</span
        >
        <span class="mt-1 block text-[0.95rem] text-carvao/75">{sua.en}</span>
        <span class="mt-1 block text-[0.8rem] font-semibold text-oceano"
          >You learned this one — tap to reveal</span
        >
      {/if}
    </button>
  {/if}

  <!-- O que volta. É a metade que o phrasebook não tem. -->
  {#each depois as t, i}
    {@const idx = indiceDaSuaFala + 1 + i}
    {#if t.quem === 'ele'}
      <button
        type="button"
        onclick={() => tocar(idx, t.audioKey)}
        class="mt-2 block w-full rounded-xl bg-oceano/[0.07] px-3 py-2 text-left ring-1 ring-oceano/20 active:bg-oceano/15"
      >
        <span class="block text-[0.65rem] font-bold uppercase tracking-wide text-oceano"
          >What comes back</span
        >
        <span class="mt-0.5 flex items-baseline gap-2">
          <span class="flex-1 text-[1.05rem] font-semibold leading-snug">{t.es}</span>
          <span class="shrink-0 text-base">{tocandoIdx === idx ? '🔉' : '🔈'}</span>
        </span>
        <span class="block text-[0.8rem] text-carvao/75">{t.en}</span>
      </button>
    {:else}
      <!-- Segundo degrau seu (a escada de escalada): mesma regra, bloco = play. -->
      <button
        type="button"
        onclick={() => tocar(idx, t.audioKey)}
        class="mt-2 block w-full rounded-xl bg-creme px-3 py-2 text-left ring-1 ring-carvao/15 active:bg-sol/20"
      >
        <span class="block text-[0.65rem] font-bold uppercase tracking-wide text-carvao/60"
          >Then you say</span
        >
        <span class="mt-0.5 flex items-baseline gap-2">
          <span class="flex-1 text-[1.15rem] font-bold leading-snug">{t.es}</span>
          <span class="shrink-0 text-base">{tocandoIdx === idx ? '🔉' : '▶🔊'}</span>
        </span>
        {#if t.pron}
          <span class="block text-[0.9rem] font-semibold text-oceano">{t.pron}</span>
        {/if}
        <span class="block text-[0.8rem] text-carvao/75">{t.en}</span>
      </button>
    {/if}
  {/each}

  {#if card.info}
    <p class="mt-2 text-[0.8rem] leading-snug text-carvao/75">ⓘ {card.info}</p>
  {/if}

  {#if falhou}
    <p role="status" class="mt-2 text-[0.8rem] font-semibold text-terracota">
      ⚠️ No audio for that one — download the kit before you fly.
    </p>
  {/if}
</article>
