import type { ModuloOutline } from '../types';

// ┌──────────────────────────────────────────────────────────────────────────┐
// │  ARQUIVO GERADO — não edite à mão.                                       │
// │  Fonte: os ep-*.json (título) + slots.json (ordem e módulo).             │
// │  Regenerar: npm run outline   ·   Conferir: npm run outline:conferir     │
// │                                                                          │
// │  O título vivia aqui E no episódio. Duas canônicas para a mesma string   │
// │  é o defeito que fez duas partes reescritas aparecerem na tela com o     │
// │  título antigo e duas partes novas não aparecerem. Agora deriva.         │
// └──────────────────────────────────────────────────────────────────────────┘

export const outline: ModuloOutline[] = [
  {
    nivel: 'basico',
    nome: 'Get by',
    descricao: 'The Spanish that gets the day done: arriving, ordering, paying, moving, and getting help.',
    cor: 'terracota',
    licoes: [
      { id: 'e01a', titulo: 'Five vowels, one punch per word', pronta: true },
      { id: 'e01b', titulo: 'Walking in, and being served without apologising', pronta: true },
      { id: 'e01c', titulo: 'Say it again, slower — and write it down for me', pronta: true },
      { id: 'e02a', titulo: 'Three things you must do before you fly', pronta: true },
      { id: 'e02b', titulo: 'Landing: the biometric queue and the three questions', pronta: true },
      { id: 'b06', titulo: 'Bag, phone, cash, loo — the first hour', pronta: true },
      { id: 'e06a', titulo: 'Out of the airport and into a bed', pronta: true },
      { id: 'b08', titulo: 'Stopping a stranger, and understanding the answer', pronta: true },
      { id: 'e06b', titulo: 'Ticket, gate, platform — and the beep that lets you through', pronta: true },
      { id: 'b10', titulo: 'Every sign in Spain that has been lying to you', pronta: true },
      { id: 'e03a', titulo: 'Same beer, three prices', pronta: true },
      { id: 'e03b', titulo: 'Without the ice, with the lot, and one of those', pronta: true },
      { id: 'e04a', titulo: '"Es alergia, no es manía"', pronta: true },
      { id: 'e05a', titulo: 'The bill, and the four words that keep your money', pronta: true },
      { id: 'b15', titulo: 'Half a kilo of that, and can I try it on?', pronta: true },
      { id: 'e07a', titulo: 'A higher floor, a quieter room, and a later checkout', pronta: true },
      { id: 'e08a', titulo: 'The green cross before the hospital', pronta: true },
      { id: 'b18', titulo: 'The last morning, and the jacket you left in the taxi', pronta: true },
    ]
  },
  {
    nivel: 'intermediario',
    nome: 'Get the good stuff',
    descricao: 'Eat where they eat, when they eat, at the price they pay.',
    cor: 'oliva',
    licoes: [
      { id: 'c01a', titulo: 'The Spanish clock is a gift', pronta: true },
      { id: 'i02', titulo: 'Nine seconds at the bar', pronta: true },
      { id: 'i03', titulo: 'The dish you were never going to order', pronta: true },
      { id: 'i04', titulo: 'The night doesn\'t start when you think it does', pronta: true },
      { id: 'i05', titulo: 'The five questions everyone asks you', pronta: true },
      { id: 'i06', titulo: 'Where you went yesterday, and where he sends you tomorrow', pronta: true },
      { id: 'i07', titulo: 'Estaba buenísimo — and the cook comes out', pronta: true },
      { id: 'i08', titulo: 'Someone invites you home', pronta: true },
      { id: 'i09', titulo: 'An afternoon doing what they do', pronta: true },
      { id: 'i10', titulo: 'The coins you leave, and the second time you walk in', pronta: true },
    ]
  },
  {
    nivel: 'avancado',
    nome: 'Read the room',
    descricao: 'The humour, the pride, the old argument, and what their silence means.',
    cor: 'indigo',
    licoes: [
      { id: 'a01', titulo: 'How they talk when it isn\'t to you', pronta: true },
      { id: 'a02', titulo: 'What they laugh at — and the one joke you can make', pronta: true },
      { id: 'a03', titulo: 'Who they think they are', pronta: true },
      { id: 'c03b', titulo: 'Spain is four languages and one very old argument', pronta: true },
      { id: 'a05', titulo: 'Bon dia, kaixo, bo día', pronta: true },
      { id: 'a06', titulo: 'August, the saint, and the week the street belongs to everyone', pronta: true },
      { id: 'a07', titulo: 'Two kisses, one hand, and knowing when to go', pronta: true },
      { id: 'a08', titulo: 'So that they ask you back', pronta: true },
    ]
  },
];

// Gerado de static/img/ — a home só pede imagem que existe.
export const COM_IMAGEM = new Set(["b06","b08","b10","b15","b18","c01","c02","c03","e01","e02","e03","e04","e05","e06","e07","e08","i02","i03","i04","i05","i06","i07","i08","i09"]);
