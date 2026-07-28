<script lang="ts">
  import { base } from '$app/paths';
  import type { Quiz } from '$lib/types';
  import { markDone } from '$lib/state.svelte';

  let { quiz }: { quiz: Quiz } = $props();

  let audio: HTMLAudioElement;
  let tocando = $state(false);
  let idxFala = $state(-1); // -1 = intro; 0..n = linha do diálogo
  let erroAudio = $state(false);
  let token = 0;
  // Posição pra RETOMAR: índice na sequência (0 = intro, 1.. = diálogo) e se
  // paramos no meio de um clipe. Antes, "⏸ Pause" resetava tudo — nas provas
  // longas, qualquer interrupção significava reouvir do zero.
  let pos = $state(0);
  let emMeio = $state(false);
  const seq = $derived([quiz.introAudioKey, ...quiz.dialogo.map((d) => d.audioKey)]);

  let mostrarTranscricao = $state(false);
  let respostas = $state<(number | null)[]>(quiz.perguntas.map(() => null));
  let corrigido = $state(false);

  const acertos = $derived(
    quiz.perguntas.reduce((n, p, i) => n + (respostas[i] === p.correta ? 1 : 0), 0)
  );

  function src(key: string) {
    return `${base}/audio/${key}.mp3`;
  }

  let cancelPlay: (() => void) | null = null;

  function playClip(key: string, retomar = false): Promise<void> {
    return new Promise((resolve) => {
      if (!key || !audio) return resolve();
      // Identidade por token: um catch/onended TARDIO de um clipe cancelado
      // (microtask da rejeição do play) não pode apagar os handlers nem acusar
      // erro do clipe NOVO que já começou.
      const meu = token;
      const fim = () => {
        if (token === meu) {
          audio.onended = null;
          audio.onerror = null;
        }
        cancelPlay = null;
        resolve();
      };
      cancelPlay = () => {
        audio.onended = null;
        audio.onerror = null;
        resolve();
      };
      audio.onended = fim;
      audio.onerror = () => {
        if (token === meu) erroAudio = true;
        fim();
      };
      if (!retomar) audio.src = src(key);
      audio.play().catch(() => {
        if (token !== meu) return; // cancelado por parar()/reinício
        erroAudio = true;
        fim();
      });
    });
  }

  async function playFrom(inicio: number, retomar: boolean) {
    const meu = ++token;
    tocando = true;
    erroAudio = false;
    for (let i = inicio; i < seq.length; i++) {
      if (meu !== token) return;
      pos = i;
      idxFala = i - 1; // -1 = intro
      await playClip(seq[i], retomar && i === inicio);
      if (meu !== token) return;
      await new Promise((r) => setTimeout(r, 250));
    }
    if (meu === token) {
      tocando = false;
      idxFala = -1;
      pos = 0;
      emMeio = false;
    }
  }

  function escutar() {
    if (tocando) {
      parar();
      return;
    }
    const retomar = emMeio && !!audio?.src && !audio.ended;
    emMeio = false;
    void playFrom(pos, retomar);
  }

  function escutarDoInicio() {
    parar();
    pos = 0;
    emMeio = false;
    idxFala = -1;
    void playFrom(0, false);
  }

  function parar() {
    token++;
    tocando = false;
    const c = cancelPlay;
    cancelPlay = null;
    c?.(); // resolve a promise pendente do playClip (o loop sai pelo token)
    if (audio) {
      audio.pause();
      if (audio.ended) {
        // Pausou no gap de 250ms APÓS o clipe acabar: ele já foi ouvido —
        // "Continuar" segue da próxima fala (ou volta ao início se era a última).
        emMeio = false;
        pos = pos + 1 < seq.length ? pos + 1 : 0;
        if (pos === 0) idxFala = -1;
      } else {
        emMeio = audio.currentTime > 0;
      }
    }
  }

  function responder(qi: number, oi: number) {
    if (corrigido) return;
    respostas[qi] = oi;
  }

  function corrigir() {
    parar();
    corrigido = true;
    markDone(quiz.id);
    // rola pro topo do resultado (sem animação se "Reduzir Movimento" ligado —
    // o CSS de prefers-reduced-motion não alcança scrollIntoView explícito)
    if (typeof document !== 'undefined') {
      const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document
        .getElementById('quiz-resultado')
        ?.scrollIntoView({ behavior: rm ? 'auto' : 'smooth' });
    }
  }

  function refazer() {
    respostas = quiz.perguntas.map(() => null);
    corrigido = false;
  }

  const tudoRespondido = $derived(respostas.every((r) => r !== null));
</script>

<audio bind:this={audio} preload="none"></audio>

<!-- Cenário -->
<div class="card p-4">
  <p class="text-sm text-carvao/70">🎬 {quiz.cenario}</p>
  <div class="mt-3 flex flex-wrap items-center gap-2">
    <button type="button" class="btn-primary" onclick={escutar}>
      {tocando ? '⏸ Pause' : emMeio || pos > 0 ? '▶ Continue' : '▶ Listen to the conversation'}
    </button>
    <button
      type="button"
      class="btn bg-white ring-1 ring-black/10"
      onclick={() => (mostrarTranscricao = !mostrarTranscricao)}
    >
      {mostrarTranscricao ? 'Hide the transcript' : 'Show the transcript'}
    </button>
  </div>

  {#if erroAudio}
    <p role="status" class="mt-2 text-xs font-medium text-terracota">
      ⚠️ No audio — check your connection and try again.
    </p>
  {/if}

  {#if mostrarTranscricao}
    <div class="mt-3 space-y-2 border-t border-black/5 pt-3">
      {#each quiz.dialogo as d, i}
        <div class="rounded-xl p-2 {idxFala === i ? 'bg-sol/20' : ''}">
          <p class="text-sm font-medium">{d.es}</p>
          {#if d.pinyin}<p class="text-xs text-oceano">{d.pinyin}</p>{/if}
          {#if corrigido}<p class="text-xs text-carvao/50">{d.pt}</p>{/if}
        </div>
      {/each}
    </div>
  {:else if tocando && idxFala >= 0}
    <p class="mt-3 text-center text-sm text-carvao/50">
      🔊 Playing… ({idxFala + 1}/{quiz.dialogo.length})
    </p>
  {/if}
</div>

<!-- Perguntas -->
<div class="mt-5 space-y-4">
  {#each quiz.perguntas as p, qi}
    <div class="card p-4">
      <p class="font-semibold">{qi + 1}. {p.es}</p>
      {#if corrigido && p.pt}<p class="mt-0.5 text-xs text-carvao/50">{p.pt}</p>{/if}
      <div class="mt-3 space-y-2">
        {#each p.opcoes as opcao, oi}
          {@const escolhida = respostas[qi] === oi}
          {@const certa = oi === p.correta}
          <button
            type="button"
            disabled={corrigido}
            onclick={() => responder(qi, oi)}
            class="flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition
              {corrigido && certa ? 'border-salvia bg-salvia/15 font-medium' : ''}
              {corrigido && escolhida && !certa ? 'border-terracota bg-terracota/10' : ''}
              {!corrigido && escolhida ? 'border-oceano bg-oceano/10' : 'border-black/10'}"
          >
            <span
              class="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold
                {!corrigido && escolhida ? 'bg-oceano text-white' : 'bg-black/5 text-carvao/60'}
                {corrigido && certa ? 'bg-salvia text-white' : ''}
                {corrigido && escolhida && !certa ? 'bg-terracota text-white' : ''}"
            >
              {String.fromCharCode(65 + oi)}
            </span>
            <span class="flex-1">{opcao}</span>
            {#if corrigido && certa}<span>✅</span>{/if}
            {#if corrigido && escolhida && !certa}<span>❌</span>{/if}
          </button>
        {/each}
      </div>
    </div>
  {/each}
</div>

<!-- Ação / resultado -->
<div id="quiz-resultado" class="mt-5">
  {#if !corrigido}
    <button
      type="button"
      class="btn-primary w-full disabled:opacity-40"
      disabled={!tudoRespondido}
      onclick={corrigir}
    >
      {tudoRespondido
        ? 'Check my answers'
        : `Answer them all (${respostas.filter((r) => r !== null).length}/${quiz.perguntas.length})`}
    </button>
  {:else}
    <div class="card p-5 text-center">
      <p class="text-4xl font-extrabold text-terracota">{acertos}/{quiz.perguntas.length}</p>
      <p class="mt-1 text-carvao/70">
        {acertos === quiz.perguntas.length
          ? 'Perfect. You got all of it. 🎉'
          : acertos >= quiz.perguntas.length - 2
            ? 'Nicely done. Almost there. 👏'
            : 'Good start — listen again and have another go. 💪'}
      </p>
      <div class="mt-4 flex justify-center gap-2">
        <button type="button" class="btn bg-white ring-1 ring-black/10" onclick={refazer}>Try again</button>
        <button type="button" class="btn-primary" onclick={escutarDoInicio}>Listen again</button>
      </div>
    </div>
  {/if}
</div>
