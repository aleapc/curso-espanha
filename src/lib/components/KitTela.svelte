<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import { voltarPorSwipe } from '$lib/consulta/tela';

  // A CASCA DAS TRÊS TELAS DO KIT. Existe para que a conta de altura seja
  // escrita uma vez só, e para que as restrições fiquem em um lugar onde é
  // difícil desfazê-las por engano.
  //
  //  · ZERO ROLAGEM DE PÁGINA: a tela ocupa exatamente o que sobra abaixo do
  //    header do app. Quem rola é a lista de dentro, nunca o documento — a
  //    grade dos 12 tem que caber inteira em 375×812.
  //  · SOL: ignora `prefers-color-scheme` de propósito (`color-scheme: light` +
  //    cores explícitas). Dark mode ao sol é ilegível; aqui "respeitar o tema do
  //    sistema" é o bug, não a feature.
  //  · UMA MÃO: o rodapé é o único lugar com controles, e fica no terço inferior.
  //  · Voltar também é swipe de borda, além do botão do rodapé.

  let {
    children,
    rodape,
    voltarPara
  }: { children: Snippet; rodape?: Snippet; voltarPara?: string } = $props();

  let raiz: HTMLDivElement | undefined = $state();

  // O header do app é fixo em conteúdo (logo + 2 pills), mas medir é mais barato
  // que errar: um chute de altura vira barra de rolagem de 3 px na tela que
  // promete zero rolagem.
  onMount(() => {
    const medir = () => {
      const h = document.querySelector('header')?.getBoundingClientRect().height;
      if (h && raiz) raiz.style.setProperty('--kit-topo', `${Math.round(h)}px`);
    };
    medir();
    window.addEventListener('resize', medir);
    window.addEventListener('orientationchange', medir);
    return () => {
      window.removeEventListener('resize', medir);
      window.removeEventListener('orientationchange', medir);
    };
  });
</script>

{#if voltarPara}
  <div bind:this={raiz} class="kit" use:voltarPorSwipe={voltarPara}>
    <div class="corpo">{@render children()}</div>
    {#if rodape}<div class="rodape">{@render rodape()}</div>{/if}
  </div>
{:else}
  <div bind:this={raiz} class="kit">
    <div class="corpo">{@render children()}</div>
    {#if rodape}<div class="rodape">{@render rodape()}</div>{/if}
  </div>
{/if}

<style>
  .kit {
    /* Cancela o padding vertical do <main> (pt-3 / pb-20): o kit é tela cheia. */
    margin: -0.75rem 0 -5rem;
    /* 3.35rem = fallback da altura do header, corrigido por medição no onMount. */
    height: calc(100dvh - var(--kit-topo, 3.35rem));
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* SOL: alto contraste sempre, tema do sistema ignorado. */
    color-scheme: light;
    background: #fff7ec;
    color: #2b2b2b;
  }
  .corpo {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;
  }
  .rodape {
    flex: 0 0 auto;
    /* Terço inferior + a faixa do home indicator do iPhone. */
    padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
    padding-top: 0.5rem;
  }
</style>
