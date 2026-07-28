<script lang="ts">
  import { onMount } from 'svelte';

  let {
    gesto,
    rotulo = false,
    tamanho = 'g'
  }: { gesto: 1 | 2 | 3 | 4; rotulo?: boolean; tamanho?: 'g' | 'p' } = $props();

  // A "metronome hand" — o equivalente espanhol da mão de maestro dos cursos tonais.
  // Aqui a mão não desenha ALTURA (não há tom): desenha RITMO e ARTICULAÇÃO, que é
  // onde o anglófono erra. Os 4 programas motores vêm de docs/pesquisa-espanha.md.
  //   M1 metrônomo  — ritmo silábico: toda sílaba dura o mesmo (o inglês comprime as átonas)
  //   M2 palma plana — vogal PURA e segurada (o erro nº1 é ditongar: "no" ≠ "nou")
  //   M3 soco        — o acento tônico cai numa sílaba só, e é força, não alongamento
  //   M4 flick       — o tap do "r" simples (pero): um toque, não o trill
  const dados = {
    1: {
      cor: '#2D6E7E',
      cap: 'even beats · same length',
      hint: 'ca-fé con le-che',
      d: 'M48,60 L216,60',
      marcas: [48, 90, 132, 174, 216],
      alturas: [0, 0, 0, 0, 0]
    },
    2: {
      cor: '#7FA98C',
      cap: 'flat palm · hold it pure',
      hint: 'no · sí · dos',
      d: 'M48,60 L216,60',
      marcas: [48, 216],
      alturas: [0, 0]
    },
    3: {
      cor: '#C84B31',
      cap: 'one punch per word',
      hint: 'ma-DRID · gra-CIAS',
      d: 'M48,60 L110,60 L152,34 L152,60 L216,60',
      marcas: [48, 90, 152, 194],
      alturas: [0, 0, -26, 0]
    },
    4: {
      cor: '#ECB365',
      cap: 'quick flick · one tap',
      hint: 'pe-ro · ca-ro',
      d: 'M48,60 Q132,26 216,60',
      marcas: [132],
      alturas: [-18]
    }
  } as const;

  const g = $derived(dados[gesto]);
  const larg = $derived(tamanho === 'g' ? '240px' : '150px');

  let reduzir = $state(false);
  onMount(() => {
    reduzir = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  });
</script>

<div class="tg" style="width: {larg}">
  {#if rotulo}
    <div class="lbl">
      <span class="n" style="color: {g.cor}">M{gesto}</span>
      <span class="hz">{g.hint}</span>
    </div>
  {/if}
  <svg viewBox="0 0 240 96" role="img" aria-label={`Rhythm gesture ${gesto}: ${g.cap}`}>
    <line x1="44" y1="60" x2="224" y2="60" class="grid" />

    {#each g.marcas as x, i}
      <line
        x1={x}
        y1={60 + g.alturas[i]}
        x2={x}
        y2={72}
        stroke={g.cor}
        stroke-width={g.alturas[i] < -20 ? 4 : 2.5}
        stroke-linecap="round"
        opacity={g.alturas[i] < -20 ? 1 : 0.5}
      />
    {/each}

    <path
      d={g.d}
      fill="none"
      stroke={g.cor}
      stroke-width="3.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      pathLength="100"
      stroke-dasharray="100"
      stroke-dashoffset={reduzir ? 0 : 100}
    >
      {#if !reduzir}
        <animate
          attributeName="stroke-dashoffset"
          dur="2s"
          repeatCount="indefinite"
          values="100;0;0"
          keyTimes="0;0.7;1"
        />
      {/if}
    </path>

    {#if reduzir}
      <text x="216" y="60" class="mao" text-anchor="middle" dominant-baseline="central">✋</text>
    {:else}
      <text class="mao" text-anchor="middle" dominant-baseline="central"
        >✋<animateMotion
          dur="2s"
          repeatCount="indefinite"
          keyPoints="0;1;1"
          keyTimes="0;0.7;1"
          calcMode="linear"
          path={g.d}
        /></text
      >
    {/if}
  </svg>
  <div class="cap">{g.cap}</div>
</div>

<style>
  .tg {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    max-width: 100%;
  }
  svg {
    width: 100%;
    height: auto;
    display: block;
  }
  .grid {
    stroke: #2b2b2b;
    opacity: 0.12;
    stroke-dasharray: 2 4;
  }
  .mao {
    font-size: 22px;
  }
  .cap {
    font-size: 12px;
    color: rgba(43, 43, 43, 0.6);
    text-align: center;
  }
  .lbl {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }
  .lbl .n {
    font-weight: 800;
    font-size: 12px;
    letter-spacing: 0.03em;
  }
  .lbl .hz {
    font-size: 14px;
    color: #2b2b2b;
    font-variant: small-caps;
  }
</style>
