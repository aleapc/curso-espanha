// A DATA DO VOO, e o único comportamento que ela liga.
//
// PRODUTO.md §6: antes do embarque o card abre com a frase COBERTA (`· · ·` +
// "tap to reveal"), o que transforma a consulta pré-viagem em revisão espaçada;
// depois da partida abre escancarado, sem joguinho, porque ali ninguém está
// treinando, está resolvendo. Um app, dois comportamentos, zero configuração.
//
// Quem GRAVA a data é o onboarding, que ainda não existe (é trilha paralela).
// Enquanto ele não existir, o padrão é o comportamento de viagem — escancarado.
// O padrão errado aqui esconderia a frase de quem já está na mesa, que é a única
// falha inaceitável desta tela.

const CHAVE = 'es-voo';

/** Data do voo em ISO curto (`2026-09-14`), ou null se ninguém informou. */
export function dataDoVoo(): string | null {
  if (typeof localStorage === 'undefined') return null;
  const v = localStorage.getItem(CHAVE);
  return v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
}

/** true só quando existe data E ela ainda não chegou. Sem data → false. */
export function antesDoVoo(hoje: Date = new Date()): boolean {
  const v = dataDoVoo();
  if (!v) return false;
  const iso = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(
    hoje.getDate()
  ).padStart(2, '0')}`;
  return iso < v;
}
