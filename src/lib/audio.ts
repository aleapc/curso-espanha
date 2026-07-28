// O ELEMENTO DE ÁUDIO DO APP — um só, e é de propósito.
//
// Antes disto havia DOIS caminhos vivos: o `<audio>` interno do EpisodioPlayer e
// um `new Audio()` a cada toque no speech.ts. Dois elementos não se conhecem, e
// pausar um não pausa o outro — o `current?.pause()` do speech.ts só alcançava o
// elemento dele. Bastava tocar um AudioButton com o episódio rodando para ouvir
// as duas coisas juntas.
//
// O modo consulta tornaria isso pior (abre no meio de uma parte, com a mão
// apoiada no play), então em vez de nascer com um terceiro elemento ele usa
// ESTE. Com um elemento só, sobreposição deixa de ser um bug que se conserta e
// passa a ser impossível de escrever: começar um clipe é, literalmente, parar o
// anterior.

import { base } from '$app/paths';

/** Como um clipe terminou. `cancelado` = outro clipe começou, ou alguém parou. */
export type FimDeClipe = 'fim' | 'erro' | 'cancelado';

let el: HTMLAudioElement | null = null;
/** Resolve do clipe em voo. É a identidade do clipe: se mudou, o clipe é outro. */
let pendente: ((r: FimDeClipe) => void) | null = null;

export function urlDoClipe(key: string): string {
  return `${base}/audio/${key}.mp3`;
}

function elemento(): HTMLAudioElement | null {
  if (typeof Audio === 'undefined') return null; // prerender / SSR
  if (!el) {
    el = new Audio();
    el.preload = 'auto';
  }
  return el;
}

function encerrar(r: FimDeClipe) {
  const f = pendente;
  pendente = null;
  if (el) {
    el.onended = null;
    el.onerror = null;
  }
  f?.(r);
}

/** Para o que estiver tocando. Seguro de chamar a seco (no-op sem clipe em voo). */
export function pararAudio() {
  if (!el) return;
  el.pause();
  encerrar('cancelado');
}

/** Há um clipe em voo (tocando ou tentando tocar)? */
export function tocando(): boolean {
  return pendente !== null;
}

/**
 * Toca `key` no elemento compartilhado e resolve quando ele ACABA (ou falha, ou
 * é cancelado por um clipe novo). `aoIniciar` avisa antes disso, no instante em
 * que o som começa — é o que um botão precisa para dar feedback sem esperar o
 * clipe inteiro.
 */
export function tocarClipe(
  key?: string,
  aoIniciar?: (ok: boolean) => void
): Promise<FimDeClipe> {
  const a = elemento();
  if (!key || !a) {
    aoIniciar?.(false);
    return Promise.resolve('erro');
  }
  pararAudio(); // resolve o anterior como 'cancelado' e limpa os handlers dele
  return new Promise<FimDeClipe>((resolve) => {
    pendente = resolve;
    a.onended = () => encerrar('fim');
    // Sem isto, clipe 404/offline era "pulado" em silêncio (no modo Carro o
    // episódio inteiro avançava mudo) — agora a falha volta como 'erro'.
    a.onerror = () => encerrar('erro');
    a.src = urlDoClipe(key);
    a.play().then(
      () => {
        if (pendente === resolve) aoIniciar?.(true);
      },
      () => {
        // Rejeição TARDIA de um clipe já cancelado: os handlers no elemento
        // agora são do clipe SEGUINTE. Mexer aqui apagaria os dele.
        if (pendente !== resolve) return;
        aoIniciar?.(false);
        encerrar('erro');
      }
    );
  });
}
