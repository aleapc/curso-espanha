// Tipos do modo consulta.
//
// A diferença entre este índice e um phrasebook está inteira no tipo `Card`: o
// phrasebook dá a SUA fala e te abandona; nós damos a TROCA — você diz X, ouve Y,
// responde Z. É o campo `ouve` que o concorrente não tem, e ele já está pago: toda
// escada de escalada autorada nos episódios (o garçom que desmente "un poquito no
// pasa nada, ¿no?", a garçonete que elogia o prato, admite o presunto e ainda
// entrega o caldo de peixe no arroz) hoje é descartada no fim da lição. O modo
// consulta não inventa a troca — desenterra a que já foi escrita.

export type TileId =
  | 'chegar' | 'mesa' | 'dieta' | 'pagar' | 'taxi' | 'transporte'
  | 'quarto' | 'compras' | 'saude' | 'simpatia' | 'reparo' | 'apuro';

export interface Tile {
  id: TileId;
  ordem: number;
  rotulo: string;
  icone: string;
}

export interface Folha {
  id: string;
  tile: TileId;
  rotulo: string;
  /** Folha de "algo deu errado". Sempre a última do tile; contada pelo teto do G8. */
  reativa?: boolean;
}

/** Um turno da troca. `quem` diz se a fala é sua ou do espanhol na sua frente. */
export interface Turno {
  quem: 'voce' | 'ele';
  es: string;
  en: string;
  audioKey: string;
  /** Pronúncia guiada. Só nos turnos que VOCÊ fala — ninguém precisa pronunciar o que ouve. */
  pron?: string;
}

export interface Card {
  id: string;
  /** Multigrafo, não árvore: um card pendura em várias folhas. Custo de folha
   *  duplicada = zero; custo de busca que falha = o produto inteiro. */
  folhas: string[];
  titulo: string;
  /** A troca completa. Mínimo 1 turno seu; o valor está em ter o `ele`. */
  troca: Turno[];
  /** Uma linha no rodapé, só onde morde. Saber que não é fala (o relógio do país,
   *  regra com multa) NÃO vira card e não compete por tile. */
  info?: string;
  /** Marca a folha reativa. O G8 barra o curso se passar de 15% dos cards. */
  aviso?: boolean;
  /** De qual parte este card foi desenterrado — para a auditoria e o "aprofundar". */
  origem: string;
  /** Molde que gera a fala, quando houver: o card também ensina a trocar a peça. */
  molde?: string;
}

export interface IndiceConsulta {
  versao: number;
  sku: string;
  cards: Card[];
}
