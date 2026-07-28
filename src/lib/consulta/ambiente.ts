// A FAIXA "NOW" — a cultura virando ambiente, com zero toque.
//
// Saber que a cozinha só acorda às oito e meia NÃO é fala: não vira card e não
// compete por tile (PRODUTO.md §6). Vira isto — uma linha no topo da tela que a
// pessoa lê sem pedir, na hora exata em que a informação morde.
//
// O REGISTRO É UPBEAT, e é a regra que importa aqui: *"you're early, not late"*,
// nunca *"you missed it"*. As mesmas horas que em c01a ("The Spanish clock is a
// gift") — café e torrada antes das nove, o cortado das onze, la comida das duas
// às três e meia, a merienda das seis, a cozinha acordando às oito e meia, la
// cena a partir das nove, últimos pedidos lá pelas onze e meia.
//
// Nada aqui é datado nem regional: é o relógio do país, que é o mesmo em julho e
// em janeiro. Nada de "hoje é domingo, tudo fechado" — isso varia por cidade e
// entraria como inferência vestida de fato.

export interface Ambiente {
  /** HH:MM na Espanha peninsular. */
  hora: string;
  /** Minutos desde a meia-noite, para decidir a faixa. */
  minutos: number;
  /** A linha de contexto. Uma frase, dita a quem está de pé no meio da rua. */
  linha: string;
}

/** Hora peninsular. Se o aparelho não tiver as zonas do ICU, cai na hora local. */
function horaEmEspanha(d: Date): { hora: string; minutos: number } {
  try {
    const partes = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Madrid',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).formatToParts(d);
    const h = Number(partes.find((p) => p.type === 'hour')?.value);
    const m = Number(partes.find((p) => p.type === 'minute')?.value);
    if (Number.isFinite(h) && Number.isFinite(m)) {
      return {
        hora: `${String(h % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
        minutos: (h % 24) * 60 + m
      };
    }
  } catch {
    /* sem base de fusos → hora do aparelho */
  }
  const h = d.getHours();
  const m = d.getMinutes();
  return {
    hora: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
    minutos: h * 60 + m
  };
}

// Faixas do dia, do começo de cada uma. A última cobre a virada da meia-noite.
const FAIXAS: { de: number; linha: string }[] = [
  { de: 0, linha: 'The kitchens are shut, the bars are not. Ask for the bill before they do.' },
  { de: 5 * 60, linha: 'Nothing is open yet. The first cafés lift their shutters around seven.' },
  { de: 7 * 60, linha: 'Breakfast is a coffee and a toast at a counter, standing up. That is all it is.' },
  { de: 10 * 60 + 30, linha: 'Mid-morning: the whole street stops for a cortado and something small.' },
  { de: 12 * 60, linha: 'Too early for lunch. A vermut and a tapa is the right move right now.' },
  { de: 14 * 60, linha: 'Lunch is happening now, and the menú del día is the best value in Spain.' },
  { de: 15 * 60 + 30, linha: 'La sobremesa: the table is yours until you ask for the bill. Nobody is waiting.' },
  { de: 16 * 60 + 30, linha: 'Kitchens are between shifts. A bar will still put a tapa in front of you.' },
  { de: 18 * 60, linha: 'La merienda — coffee and something sweet. Dinner is still three hours off.' },
  { de: 20 * 60, linha: 'Kitchens are waking up. Book for half nine and you are on Spanish time.' },
  { de: 21 * 60, linha: 'Kitchens are open everywhere. You are early for dinner, not late.' },
  { de: 22 * 60 + 30, linha: 'Ten is the middle of the evening here. Last orders go in around half eleven.' }
];

export function ambienteAgora(d: Date = new Date()): Ambiente {
  const { hora, minutos } = horaEmEspanha(d);
  let linha = FAIXAS[0].linha;
  for (const f of FAIXAS) if (minutos >= f.de) linha = f.linha;
  return { hora, minutos, linha };
}
