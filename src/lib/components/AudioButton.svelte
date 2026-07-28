<script lang="ts">
  import { playKey } from '$lib/speech';

  let {
    audioKey,
    text,
    size = 'md'
  }: { audioKey?: string; text: string; size?: 'sm' | 'md' } = $props();

  let busy = $state(false);

  async function go() {
    busy = true;
    try {
      await playKey(audioKey, text);
    } finally {
      // pequeno respiro pro feedback visual
      setTimeout(() => (busy = false), 250);
    }
  }
</script>

<button
  type="button"
  onclick={go}
  aria-label={`Ouvir: ${text}`}
  class="inline-flex shrink-0 items-center justify-center rounded-full bg-sol/30 text-terracota ring-1 ring-terracota/20 transition hover:bg-sol/50 active:scale-90
    {size === 'sm' ? 'h-7 w-7 text-sm' : 'h-9 w-9 text-base'}"
>
  {busy ? '🔉' : '🔊'}
</button>
