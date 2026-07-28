// Modelo de conteúdo do curso. Tudo é dado tipado — uma lição é um objeto Lesson.
// Itens com `audioKey` ganham áudio premium (ElevenLabs, gerado em static/audio/<key>.mp3).
// Sem o mp3, o app cai pra voz do navegador (grátis) automaticamente.

export type Nivel = 'basico' | 'intermediario' | 'avancado';

export interface VocabItem {
  es: string;
  pt: string;
  nota?: string;
}

export interface DialogueLine {
  speaker: string;
  es: string;
  pt: string;
  audioKey?: string;
}

export interface FraseChave {
  es: string;
  pt: string;
  audioKey?: string;
}

export interface FalsoAmigo {
  es: string;
  pareceQue: string; // o que um brasileiro acha que significa
  significa: string; // o que realmente significa em espanhol
  exemplo?: string;
}

export interface GrammarPoint {
  titulo: string;
  explicacao: string;
  exemplos: { es: string; pt: string }[];
}

export type Exercise =
  | { tipo: 'mcq'; pergunta: string; opcoes: string[]; correta: number; explica?: string }
  | { tipo: 'preencher'; frase: string; resposta: string; dica?: string }
  | { tipo: 'escuta'; opcoes: string[]; correta: number; audioKey?: string; texto: string }
  | { tipo: 'parear'; pares: { es: string; pt: string }[] }
  | { tipo: 'falar'; alvo: string; pt: string };

export interface Lesson {
  id: string;
  nivel: Nivel;
  titulo: string;
  subtitulo: string;
  objetivos: string[];
  vocab: VocabItem[];
  gramatica: GrammarPoint[];
  dialogo: { titulo: string; linhas: DialogueLine[] };
  falsosAmigos: FalsoAmigo[];
  frasesChave: FraseChave[];
  exercicios: Exercise[];
}

export interface ModuloOutline {
  nivel: Nivel;
  nome: string;
  descricao: string;
  cor: string;
  licoes: { id: string; titulo: string; pronta: boolean }[];
}

// --- Áudio-curso (player de episódios) ---
// Um episódio é uma sequência de passos tocados em ordem, com pausas pra falar.
//  intro/recap → narração em PT-BR (voz-guia)
//  ouvir       → frase em espanhol pra escutar
//  responde    → prompt em PT (pausa pra você falar) → modelo nativo em espanhol
//  shadow      → frase em espanhol pra repetir junto (shadowing)
export type StepTipo = 'intro' | 'ouvir' | 'responde' | 'shadow' | 'recap';

export interface Step {
  tipo: StepTipo;
  voz?: string; // chave no mapa de vozes (audio.config.json): Alice/George (guia, en-GB) · Carmen/Emilio (alvo, es-ES peninsular) · Ivan/Matilda (só o ear module A01)
  audioKey?: string; // clipe principal (PT em intro/recap; ES em ouvir/shadow/modelo do responde)
  promptVoz?: string; // voz do prompt PT no 'responde' (default Leti)
  promptAudioKey?: string; // clipe do prompt PT no 'responde'
  promptPt?: string; // instrução em PT do 'responde'
  pt?: string; // texto em português (narração ou tradução)
  es?: string; // texto na LÍNGUA-ALVO (no Shuō: HANZI canônico — display)
  pinyin?: string; // respelling de pronúncia p/ leitor de INGLÊS, SÓ exibição (nunca vai pro TTS)
  tts?: string; // override do texto enviado ao TTS (homophone swap, 幺, números por extenso)
  promptTts?: string; // idem pro prompt (raro)
  gesto?: 1 | 2 | 3 | 4; // programa motor da "metronome hand" — ritmo/articulação (espanhol não tem tom)
  mapaGestos?: boolean; // mostra os 4 programas motores lado a lado
}

// "Para ir além" — gramática detalhada opcional, fora do fluxo de áudio.
export interface GrammarSecao {
  titulo: string;
  corpo: string;
  exemplos?: { es: string; pt: string }[];
}
export interface GrammarDeep {
  titulo: string;
  secoes: GrammarSecao[];
}

export interface Episode {
  id: string;
  nivel: Nivel;
  numero: number;
  parte?: string; // ex.: "1A", "1B"
  titulo: string;
  subtitulo: string;
  steps: Step[];
  aprofundar?: GrammarDeep; // seção opcional renderizada fora do player
}

// --- Quiz de compreensão ---
// Diálogo longo em espanhol peninsular (vozes nativas) + perguntas de múltipla escolha
// em espanhol. A intro é em PT (Bia); as perguntas/opções ficam em texto na tela.
export interface QuizFala {
  audioKey: string;
  voz: string; // Mei | Chen
  es: string; // hanzi (fonte do TTS)
  pinyin?: string; // exibição
  pt: string; // tradução (tela, opcional ver depois)
}
export interface QuizPergunta {
  es: string; // enunciado em espanhol
  opcoes: string[]; // alternativas em espanhol
  correta: number; // índice da correta
  pt?: string; // tradução do enunciado (revelada com o gabarito)
}
export interface Quiz {
  id: string; // ex.: 'q-basico'
  nivel: Nivel;
  titulo: string;
  subtitulo: string;
  introAudioKey: string; // narração PT (Bia)
  introPt: string;
  cenario: string; // contexto curto em PT mostrado na tela
  dialogo: QuizFala[];
  perguntas: QuizPergunta[];
}
