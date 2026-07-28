<script lang="ts">
  import type { Exercise } from '$lib/types';
  import { playKey, recognizeOnce, recognitionSupported, normalize } from '$lib/speech';

  let { exercicios }: { exercicios: Exercise[] } = $props();

  // Respostas e acertos por índice de exercício.
  let escolhas = $state<Record<number, number | null>>({});
  let preenche = $state<Record<number, string>>({});
  let pares = $state<Record<number, Record<number, number | null>>>({});
  let falaResultado = $state<Record<number, { ok: boolean; ouvido: string } | null>>({});
  let revelado = $state<Record<number, boolean>>({});

  function marcar(i: number, op: number) {
    escolhas[i] = op;
    revelado[i] = true;
  }

  function conferirPreencher(i: number) {
    revelado[i] = true;
  }

  function preencherOk(ex: Extract<Exercise, { tipo: 'preencher' }>, i: number): boolean {
    return normalize(preenche[i] ?? '') === normalize(ex.resposta);
  }

  async function ouvirFalar(ex: Extract<Exercise, { tipo: 'falar' }>, i: number) {
    falaResultado[i] = null;
    try {
      const ouvido = await recognizeOnce('es-MX');
      const ok = normalize(ouvido).includes(normalize(ex.alvo));
      falaResultado[i] = { ok, ouvido };
    } catch {
      falaResultado[i] = { ok: false, ouvido: '(não consegui ouvir — confira o microfone)' };
    }
  }

  // Pareamento: clica num es, depois num pt; guarda o índice escolhido.
  let parSelEs = $state<Record<number, number | null>>({});
  function escolherEs(i: number, idx: number) {
    parSelEs[i] = idx;
  }
  function escolherPt(i: number, idxPt: number) {
    const es = parSelEs[i];
    if (es == null) return;
    pares[i] = { ...(pares[i] ?? {}), [es]: idxPt };
    parSelEs[i] = null;
  }
  function parOk(i: number, idxEs: number): boolean {
    return pares[i]?.[idxEs] === idxEs; // pares estão alinhados por índice no dado
  }
</script>

<div class="space-y-5">
  {#each exercicios as ex, i}
    <div class="card p-4">
      <div class="mb-2 text-xs font-semibold uppercase tracking-wide text-oceano">
        Exercício {i + 1}
      </div>

      {#if ex.tipo === 'mcq'}
        <p class="mb-3 font-medium">{ex.pergunta}</p>
        <div class="grid gap-2">
          {#each ex.opcoes as op, o}
            <button
              type="button"
              onclick={() => marcar(i, o)}
              class="rounded-xl border px-3 py-2 text-left transition
                {revelado[i] && o === ex.correta ? 'border-salvia bg-salvia/20' : ''}
                {revelado[i] && escolhas[i] === o && o !== ex.correta ? 'border-terracota bg-terracota/10' : ''}
                {!revelado[i] ? 'border-black/10 hover:border-oceano/40' : 'border-black/10'}"
            >
              {op}
            </button>
          {/each}
        </div>
        {#if revelado[i]}
          <p class="mt-2 text-sm {escolhas[i] === ex.correta ? 'text-salvia' : 'text-terracota'}">
            {escolhas[i] === ex.correta ? 'Correto! ✔' : `Era: ${ex.opcoes[ex.correta]}`}
            {#if ex.explica}<span class="text-carvao/70"> — {ex.explica}</span>{/if}
          </p>
        {/if}

      {:else if ex.tipo === 'preencher'}
        <p class="mb-3 font-medium">{ex.frase}</p>
        <div class="flex flex-wrap items-center gap-2">
          <input
            bind:value={preenche[i]}
            placeholder="digite aqui"
            class="rounded-xl border border-black/10 px-3 py-2 focus:border-oceano focus:outline-none"
          />
          <button type="button" class="btn-primary" onclick={() => conferirPreencher(i)}>
            Conferir
          </button>
          {#if ex.dica}<span class="text-xs text-carvao/50">dica: {ex.dica}</span>{/if}
        </div>
        {#if revelado[i]}
          <p class="mt-2 text-sm {preencherOk(ex, i) ? 'text-salvia' : 'text-terracota'}">
            {preencherOk(ex, i) ? 'Correto! ✔' : `Resposta: ${ex.resposta}`}
          </p>
        {/if}

      {:else if ex.tipo === 'escuta'}
        <div class="mb-3 flex items-center gap-3">
          <button
            type="button"
            class="btn-primary"
            onclick={() => playKey(ex.audioKey, ex.texto)}
          >
            ▶ Ouvir
          </button>
          <span class="text-sm text-carvao/60">O que você ouviu?</span>
        </div>
        <div class="grid gap-2">
          {#each ex.opcoes as op, o}
            <button
              type="button"
              onclick={() => marcar(i, o)}
              class="rounded-xl border px-3 py-2 text-left transition
                {revelado[i] && o === ex.correta ? 'border-salvia bg-salvia/20' : ''}
                {revelado[i] && escolhas[i] === o && o !== ex.correta ? 'border-terracota bg-terracota/10' : ''}
                {!revelado[i] ? 'border-black/10 hover:border-oceano/40' : 'border-black/10'}"
            >
              {op}
            </button>
          {/each}
        </div>
        {#if revelado[i]}
          <p class="mt-2 text-sm {escolhas[i] === ex.correta ? 'text-salvia' : 'text-terracota'}">
            {escolhas[i] === ex.correta ? 'Correto! ✔' : `Era: ${ex.opcoes[ex.correta]}`}
          </p>
        {/if}

      {:else if ex.tipo === 'parear'}
        <p class="mb-3 font-medium">Toque num termo e depois no par em português.</p>
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-2">
            {#each ex.pares as par, e}
              <button
                type="button"
                onclick={() => escolherEs(i, e)}
                class="w-full rounded-xl border px-3 py-2 text-left transition
                  {parSelEs[i] === e ? 'border-oceano bg-oceano/10' : 'border-black/10'}
                  {pares[i]?.[e] != null ? 'opacity-60' : ''}"
              >
                {par.es}
              </button>
            {/each}
          </div>
          <div class="space-y-2">
            {#each ex.pares as par, p}
              <button
                type="button"
                onclick={() => escolherPt(i, p)}
                class="w-full rounded-xl border border-black/10 px-3 py-2 text-left transition hover:border-oceano/40"
              >
                {par.pt}
              </button>
            {/each}
          </div>
        </div>
        {#if pares[i] && Object.keys(pares[i]).length === ex.pares.length}
          <p class="mt-3 text-sm {ex.pares.every((_, e) => parOk(i, e)) ? 'text-salvia' : 'text-terracota'}">
            {ex.pares.every((_, e) => parOk(i, e))
              ? 'Tudo certo! ✔'
              : 'Alguns pares estão trocados — toque de novo pra refazer.'}
          </p>
        {/if}

      {:else if ex.tipo === 'falar'}
        <p class="mb-3 font-medium">{ex.pt}</p>
        {#if recognitionSupported()}
          <button type="button" class="btn-primary" onclick={() => ouvirFalar(ex, i)}>
            🎤 Falar
          </button>
          {#if falaResultado[i]}
            <p class="mt-2 text-sm {falaResultado[i]?.ok ? 'text-salvia' : 'text-terracota'}">
              {falaResultado[i]?.ok ? 'Muito bem! ✔' : 'Quase — tente de novo.'}
              <span class="text-carvao/60"> (ouvi: “{falaResultado[i]?.ouvido}”)</span>
            </p>
          {/if}
        {:else}
          <p class="text-sm text-carvao/50">
            Reconhecimento de fala não suportado neste navegador (tente no Chrome do celular).
          </p>
        {/if}
      {/if}
    </div>
  {/each}
</div>
