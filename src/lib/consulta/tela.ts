// Os dois comportamentos de tela que o modo consulta precisa e o resto do app
// não: manter o aparelho aceso enquanto um card está aberto, e voltar por swipe
// de borda. Ambos falham em silêncio — nenhum dos dois pode aparecer como erro
// na cara de quem está no meio de uma conversa.

import { goto } from '$app/navigation';

/**
 * WAKE LOCK enquanto um card está aberto: a pessoa mostra a tela ao garçom, ela
 * apaga em 30 s, e a frase some no meio da frase. Reata sozinho quando o app
 * volta do background (o navegador solta o lock ao esconder a aba).
 *
 * Fallback é o silêncio: aparelho sem a API (Safari antigo, Firefox) continua
 * funcionando, só apaga a tela como sempre apagou. Devolve a função de soltar.
 */
export function manterAcordado(): () => void {
  const nav = typeof navigator !== 'undefined' ? (navigator as Navigator & { wakeLock?: any }) : null;
  const doc = typeof document !== 'undefined' ? document : null;
  if (!nav?.wakeLock?.request || !doc) return () => {};

  let lock: any = null;
  let vivo = true;

  const pedir = async () => {
    if (!vivo || lock || doc.visibilityState !== 'visible') return;
    try {
      lock = await nav.wakeLock.request('screen');
      lock.addEventListener?.('release', () => (lock = null));
    } catch {
      /* negado (bateria baixa, política do SO) — não é erro do usuário */
    }
  };

  const aoVoltar = () => void pedir();
  doc.addEventListener('visibilitychange', aoVoltar);
  void pedir();

  return () => {
    vivo = false;
    doc.removeEventListener('visibilitychange', aoVoltar);
    try {
      lock?.release?.();
    } catch {
      /* já solto */
    }
    lock = null;
  };
}

/**
 * VOLTAR POR SWIPE DE BORDA — uma mão, polegar na esquerda, sem mirar em botão
 * nenhum. É complemento do botão de voltar, nunca substituto (o botão fica no
 * terço inferior, onde o polegar alcança).
 *
 * Só conta o gesto que COMEÇA na borda (28 px), é mais horizontal que vertical e
 * anda mais de 60 px — senão a rolagem da lista de cards viraria navegação.
 */
export function voltarPorSwipe(node: HTMLElement, destino: string) {
  let x0 = 0;
  let y0 = 0;
  let valendo = false;
  let alvo = destino;

  const inicio = (e: TouchEvent) => {
    const t = e.touches[0];
    if (!t || e.touches.length > 1) return (valendo = false);
    x0 = t.clientX;
    y0 = t.clientY;
    valendo = x0 <= 28;
  };

  const fim = (e: TouchEvent) => {
    if (!valendo) return;
    valendo = false;
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - x0;
    const dy = Math.abs(t.clientY - y0);
    if (dx > 60 && dx > dy * 1.5) void goto(alvo);
  };

  node.addEventListener('touchstart', inicio, { passive: true });
  node.addEventListener('touchend', fim, { passive: true });

  return {
    update(novo: string) {
      alvo = novo;
    },
    destroy() {
      node.removeEventListener('touchstart', inicio);
      node.removeEventListener('touchend', fim);
    }
  };
}
