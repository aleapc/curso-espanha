# PRODUTO — a spec canônica do Kit de Bordo

> **Fonte única de verdade sobre o que o produto é, como é estruturado e o que não se negocia.** Substitui integralmente `ARQUITETURA-V2.md`, `NUCLEO-GERADOR.md` e toda versão anterior deste arquivo. Em qualquer conflito, **este documento vence** — com uma exceção nomeada: `src/lib/course/slots.json` é o contrato executável dos 36 slots, e onde ele diverge deste texto, **o arquivo decide e este texto é corrigido**.
> **Vigência:** 2026-07-27 · **Escopo:** os 20 SKUs do catálogo · **Leitura obrigatória** de quem produza episódio, syllabus, quiz, `aprofundar`, card de consulta ou copy de loja.

**Como ler.** Toda afirmação é marcada. **LEI** — cravado em pedra, todo destino, todo comprador, para sempre; mudar exige decisão do dono e re-validação de **todos** os cursos. **REGRA** — vale por padrão, e a exceção está nomeada aqui. **ORIENTAÇÃO** — julgamento de autoria; divergir exige motivo escrito no doc de pesquisa do SKU.

**Régua de evidência (LEI):** **FATO** = medido no repo ou lido em fonte citada · **INFERÊNCIA** = projeção declarada · **NÃO CONFERIDO** = sem fonte externa nem revisor nativo. Nunca inventar; nada NÃO CONFERIDO vira áudio.

**Régua de estado do código (LEI, e ela nasceu de um erro deste documento):** quando esta spec cita um arquivo, um script ou um portão, ela cita **o que existe no disco hoje**, com o nome que ele tem. O que ainda não existe aparece na tabela de pendências do §9, marcado **PENDENTE**, nunca no meio do texto como se estivesse rodando. Um documento que descreve um portão inexistente como ativo é pior do que não ter portão: ele **desliga a vigilância humana** sem ligar a automática.

---

## 1. O que é

> **É um curso de línguas com um objetivo único e declarado: a viagem — e é o objetivo que define o programa.**

Um curso de propósito geral não sabe quem entra pela porta nem para quê. Sem alvo, a única ordenação neutra é a estrutura da língua — presente, passado, subjuntivo. É por isso que quase todo curso é organizado por gramática: falta de alvo, não convicção pedagógica. Nós temos alvo. Ordenamos pela **jornada da viagem** e incluímos exatamente o que a viagem exige — o que **inclui** pronúncia, escuta, tempos verbais e progressão real, do "não sei dizer olá" até ler a sala. Gramática entra **porque** o turista precisa, não apesar de sermos práticos. O produto é um áudio-curso guiado por voz-guia na língua do comprador, offline-first, com data de embarque, cujo entregável é **capacidade situacional** — e que **termina**: mala pronta, boa viagem.

**A analogia canônica: clínica de medicina esportiva.** É absolutamente medicina, nada diluído. A única diferença é que ela **sabe quem vai entrar pela porta**, e o programa inteiro se organiza em torno disso.

**LEI — nunca definir o produto por negação.** "Não somos curso de idiomas" é falso, não vende e já produziu dois estragos medidos (§10). A frase é **"o curso de idiomas feito para um objetivo só"**. Não formamos Cervantes: formamos um turista que ganha, em semanas, o ferramental para a viagem ser a mais proveitosa possível.

---

## 2. O filtro

**LEI — há um filtro, e é este:**

> ### Isto torna a viagem mais proveitosa?

Substitui todos os anteriores, em especial *"resolve um perrengue?"* — estreito demais: aprova golpe e multa e **reprova brinde, elogio e puxar conversa** (§10). É simétrico de propósito: uma parte passa por **evitar perda** ou por **produzir ganho**, e o produto precisa das duas em proporção (G1, G2).

**Casos de fronteira já resolvidos (LEI — não reabrir sem decisão do dono):**

| Caso | Veredito | Por quê |
|---|---|---|
| `Quería + [coisa]` | **entra**, molde aberto | abridor de balcão que não codifica interlocutor; sem ele o aluno leva o registro de bar para a recepção e trava |
| "está pago" (`Ya está pagado`) | **entra**, molde fechado | sem alegar pagamento, paga-se duas vezes |
| `Me he dejado + [objeto] + [lugar]` | **entra**, molde fechado | não há como perguntar por objeto perdido sem passado: o ferramental temporal é inescapável |
| elogiar, brindar, puxar conversa | **entra, e é prioridade** | a viagem fica melhor; era a célula vazia do produto |
| marcar hora e lugar com alguém | **entra**, forma fechada | sem isso o aluno **entende** o convite e não consegue aceitar — o convite morre na boca dele |
| "eu reservei" | **fora** | `Tengo una reserva a nombre de…` resolve no presente |
| `Me gustaría` | **fora, e fica nomeado** | acolchoamento de livro didático; `quería` faz o mesmo em menos sílabas e soa local |
| subjuntivo em subordinada | **fora** | não por ser gramática: por não mudar a viagem de ninguém |
| escrita produtiva (traço, ditado) | **fora** | retorno zero em viagem; placa é reconhecimento |
| conjugar paradigma em voz alta | **fora** | o aluno nunca conjuga: escolhe entre abridores já conjugados |

**O princípio que sai daqui (LEI):** *a maior parte das necessidades "de passado" do turista é necessidade de **estado presente** disfarçada.* Ele não precisa de "eu paguei" — precisa de "está pago".

---

## 3. A espinha cravada em pedra

**LEI. Não se negocia por destino, língua, comprador ou prazo.** É o que faz quem comprou o italiano reconhecer o francês na primeira tela.

### 3.1 Os três módulos

| Nome na UI (PT / EN) | `nivel` | Partes | Promessa | Rótulo de UI | Janela de consumo (`slots.json`) |
|---|---|---:|---|---|---|
| **ME VIRO** / GET BY | `basico` | **18**, travado para sempre | *"Chego, entendo, peço, pago, durmo e volto — sozinho."* | **Antes de embarcar** | antes de embarcar |
| **APROVEITO** / GET THE GOOD STUFF | `intermediario` | **10**, travado | *"Comer onde eles comem, na hora que eles comem, pelo preço que eles pagam."* | **No caminho** | o voo e os 2 primeiros dias |
| **LEIO A SALA** / READ THE ROOM | `avancado` | **8** (10 só com justificativa escrita; nunca menos de 8) | *"Entender essa gente: o humor, o orgulho, a briga antiga e o que o silêncio deles quer dizer."* | **Enquanto você está lá** | enquanto você está lá |

**Nota de precisão (LEI):** o **rótulo de UI** e a **janela de consumo** são strings diferentes com donos diferentes — o rótulo é copy de tela, a janela é o campo `consumo` do contrato. As duas colunas acima são a única versão canônica das duas; qualquer divergência futura se resolve editando `slots.json` **com bump de versão e re-validação dos quatro cursos**, nunca editando só este texto.

Testes de sucesso, na ordem: *fui atendido, fui entendido e paguei o preço certo* → *recebi a recomendação da casa, a mesa boa, a segunda rodada* → *um local me contou algo que não conta a turista*.

**A conta de partes, sem ambiguidade (LEI).** **36 partes canônicas: 18 + 10 + 8**, e é este número que aparece na loja. Sobre ele há exatamente duas folgas declaradas: **M3 pode ir a 10** com justificativa escrita (→ 38) e **até 4 partes de extensão** de língua (§3.3) (→ **42, o teto absoluto de qualquer SKU do catálogo**). O Básico **nunca** cresce — é o módulo com prazo e o módulo caro. **18 partes de jornada e 18 de ganho: paridade exata.**

**Nomenclatura fechada (LEI):** rótulo de UI é **slot de consumo, nunca nível**; **"Avançado" não aparece na interface** (`nivel: 'avancado'` é reuso técnico de chave, e a palavra reimporta o enquadramento de curso genérico); **"Me enturmo" está reprovado e não volta** — um turista de 12 dias não se enturma, ele entende, e prometer o contrário fabrica o review justo. **O eixo de progressão é social e de iniciativa, nunca gramatical:** *eu respondo ao mundo → eu peço o que quero → eu entendo o que está acontecendo.*

### 3.2 Os 36 slots

**A fonte executável é `src/lib/course/slots.json` (contrato v2.0.0), lido por `scripts/valida-estrutura.mjs`.** O documento descreve; o arquivo decide; o script quebra o build (quando ligado ao build — ver §9).

**ME VIRO** — *antes de embarcar:* **B01** a melodia (programa motor) · **B02** as primeiras dez palavras · **B03** o kit anti-pânico · **B04** a lista com prazo. *Chegar:* **B05** a fronteira e as três perguntas · **B06** os primeiros 60 minutos · **B07** do aeroporto até a cama. *Circular:* **B08** "onde fica?" · **B09** bilhete, validar, entrar · **B10** ler o lugar 👂. *Comer:* **B11** sentar e pedir a primeira rodada · **B12** os moldes (sem, com, mais, sem gelo) · **B13** alergia e restrição. *Gastar:* **B14** a conta · **B15** comprar. *Dormir:* **B16** check-in e o quarto. *Quando dá errado:* **B17** farmácia, dor e emergência. *Voltar:* **B18** o último dia.

**APROVEITO** — **I01** o relógio deles · **I02** a ordem certa no balcão · **I03** o prato que você não ia pedir · **I04** a noite · **I05** as perguntas que eles fazem · **I06** contar a sua viagem · **I07** elogiar, agradecer e reclamar sem drama · **I08** ser convidado · **I09** fazer o que eles fazem · **I10** o dinheiro sem drama.

**LEIO A SALA** — **A01** como eles falam quando não é com você 👂 · **A02** do que eles riem · **A03** quem eles acham que são · **A04** a briga antiga · **A05** a outra língua 👂 · **A06** o calendário deles · **A07** sinais: bem-vindo, incômodo e hora de ir · **A08** a despedida.

**As dez regras do contrato (LEI):**
1. Slot **nunca** é excluído, renomeado nem reordenado; se não se aplica, **muda o conteúdo** — B10 em escrita transparente vira placa de falso amigo e convenção.
2. Exceção de língua **não deforma slot**: entra como extensão declarada (§3.3).
3. **B01 tem programa motor obrigatório** em todo curso.
4. Todo `ep-*.json` declara `slot` com o id canônico — **ou** declara `dissolveEm: [ids]`, que é o estado de trânsito legítimo de um arquivo cujo conteúdo está sendo repartido entre slots ainda não escritos. Sem um dos dois, o build falha. **Arquivo que se reparte não pode declarar um slot só**, e mandar que declare é o erro que este item existe para impedir.
5. Slot `dono: destino` tem **a pesquisa, os fatos e a cena** reusados por todos os compradores daquele destino — é aqui que está a economia do catálogo. **A economia não cobre a camada de molde:** o roster de moldes é ativo de PAR (§5.1) e re-deriva a cada comprador, mesmo quando a CASA dele cai num slot `dono: destino`. Orçar um SKU novo do mesmo destino como "só troca a narração-guia" é subestimar exatamente essa camada.
6. Slot `dono: par` (língua do comprador × destino) é **refeito a cada SKU novo**: âncora fonética, falso amigo, inversão de polidez, roster de moldes.
7. **B13 (alergia) é intocável:** nunca cortado, nunca atrás de paywall, em nenhum destino.
8. **Conteúdo com prazo físico vive em B04**, nunca na trilha cultural.
9. **Golpe e multa são *beat* dentro de B07, B14 e B17** — episódio dedicado só em M2/M3, com enquadramento *"como funciona aqui"*.
10. **Enquanto um módulo travado tiver slot vazio, o validador de estrutura roda em modo aviso (`--estrito` desligado).** Ligar o modo estrito é o último passo da produção de um SKU, não o primeiro — senão o build fica vermelho durante a obra inteira e a equipe aprende a ignorar o vermelho, que é como se perde um portão para sempre.

### 3.3 As extensões — por regra fechada

**LEI.** Onde a língua exige mais, entram partes **extra**, marcadas, decididas **por tabela a partir das propriedades da língua-destino — nunca pelo critério do agente que escreve**: **X-TOM** (tonal, 1–2 partes: tons com a mão de maestro, par mínimo, drill de discriminação) · **X-ESCRITA** (escrita não-latina, 1: reconhecimento de placas, **sempre receptivo**) · **X-POLIDEZ** (polidez obrigatória que muda a forma da frase, 1: os níveis mínimos e quando cada um é obrigatório) · **X-CLASSIF** (classificadores obrigatórios ao contar, 1: os 5 a 8 que cobrem a viagem).

**Teto: 4 partes de extensão por curso** — acima disso a língua está sendo ensinada por si mesma e reprova no filtro. **Posição:** no Básico, logo após B01. **Extensão nunca substitui slot canônico.** **Extensão conta para o teto de 42 partes do §3.1**, e um SKU que ativa 3 extensões (japonês) chega a 39 partes canônicas+extra — o que é legal e precisa estar orçado como tal.

### 3.4 O invariante do gesto

**LEI, e é o ativo pedagógico mais original do catálogo.**

> **Toda língua ganha uma mão em B01. Sem exceção. Curso sem programa motor em B01 falha a validação.**

Não é técnica de tom — é a técnica do **método**: transformar coisa de boca em coisa de corpo. Tom é uma aplicação, não a regra. Em língua **tonal**, mão de maestro desenhando o contorno de altura da sílaba (origem no mandarim, estendida ao tailandês; `TomGesto.svelte`, intocável). Em língua **não tonal**, a mão desenha o que a língua cobra e o comprador erra — no espanhol para anglófono virou metrônomo com 4 programas: batida igual = ritmo silábico, palma plana = vogal pura, soco = tônica, flick = tap do r (`GestoRitmo.svelte`). **Derivação, sempre a mesma pergunta:** *qual é o erro nº 1 do comprador, e que movimento de mão o torna impossível de esconder?* **O gesto tem que trair o erro, não ilustrar a regra.** Ele é reativado como aquecimento em **todas** as partes — declarado no campo `gesto` do primeiro step, que é o que torna a regra conferível — e existe na tela como SVG animado, com `role="img"`, `aria-label` e `prefers-reduced-motion` respeitado (FATO: `src/lib/components/GestoRitmo.svelte`).

---

## 4. O template de uma parte

**REGRA.** Toda parte, em qualquer módulo e destino, tem esta anatomia — é o que faz cada aula parecer familiar. Duração-alvo **12–15 min**. **Os cinco tipos de passo são fechados (LEI):** `intro | ouvir | responde | shadow | recap`. Nenhum tipo novo; não existe passo de escrita.

| # | Bloco | Regra |
|---|---|---|
| 1 | **Aquecimento do gesto** (`intro`) | 10–20 s, reativa a mão de B01, e declara `gesto` no step. Em toda parte, sempre |
| 2 | **Callback** (`responde`) | o **primeiro `responde` é sempre recuperação da parte anterior**. Em M2/M3 reusa ≥2 itens do Básico |
| 3 | **A cena** (`intro`) | abre por **experiência ou situação**, nunca por tese nem por categoria. Em M3 a cena crua vem **só na língua-alvo, sem tradução** — o aluno não entende, e não precisa |
| 4 | **Corpo produtivo** (`ouvir` → `responde` × N) | o núcleo. Modelo nativo **sempre depois** da pausa. Mínimo 4 `responde`; média-alvo 8 em M1/M2 |
| 5 | **Bloco do molde** (§5.1) | quando a parte planta um molde. **Máximo 2 por parte de M1; no máximo 1 em M2 e só se for um dos três moldes sociais nomeados em §5.1; zero em M3** |
| 6 | **Cápsula cultural** | 30–45 s em M1; é o episódio inteiro em M3. Ficha de 6 Campos (§5.3). Termina em ação corporal |
| 7 | **A permissão** | **≥1 por parte** de M2/M3 e por parte cultural de M1 |
| 8 | **O fecho** (~1–2 min) | muda de natureza por módulo — abaixo |
| 9 | **Recordar** (`recap` + `responde`) | "vamos recordar, responda em voz alta" |
| 10 | **Frase de piso** | ≥1 por módulo, no campo `frasePiso`. Sucesso comparado ao turista médio, nunca ao nativo |

**As quatro travas de módulo (LEI).** Eram cinco no dossiê anterior; a quinta (a tabela de exílio indexada por paradigma) está **revogada** e o motivo está no anti-padrão 2. As quatro que ficam são de aplicação obrigatória e cada uma tem teste no §9:

- **T1 — Título nomeia cena, nunca categoria.** O título de qualquer parte nomeia **um lugar, um momento, uma pessoa ou um objeto**. Nenhum título contém nome de tempo verbal, modo, classe de palavra ou função gramatical.
- **T2 — Âncora de consumo em M2.** Toda parte de M2 se prende a **uma decisão com dinheiro ou tempo em jogo**: qual prato, qual bar, qual hora, qual noite, quanto de gorjeta. "Puxar conversa" só entra ancorada numa cena concreta (as perguntas que *eles* fazem, com as suas respostas prontas), nunca como habilidade solta. **Sem esta trava, M2 vira "conversação"** — e ela é a que mais fácil se perde, porque as partes de ganho parecem se justificar sozinhas. Toda parte de M2 declara `decisao` não vazio.
- **T3 — Reconhecimento primeiro em M3.** A habilidade primária de toda parte de M3 é **reconhecer**, não produzir. Toda parte termina em ação corporal ou em drill de reconhecimento ("quando ouvir X, significa Y, faça Z").
- **T4 — O bloco final muda de natureza.** Em **M1** chama-se "Gramática em foco": ≤2 min, sem jargão, **sempre depois** de o aluno já ter produzido as frases que a contêm, e existe **para dispensar** tanto quanto para explicar — *"o molde é seu; a tabela de onde ele veio não é da sua conta"*. Pode legitimamente não trazer gramática nenhuma, e sim uma heurística. Quando a parte declara `moldes`, este slot é ocupado pelo **clique** (§5.2). Em **M2 e M3** chama-se "Leitura em foco" e é cultural, **nunca gramatical**. Em qualquer módulo o aprofundamento vai para `aprofundar`, **fora do player**: *nunca no caminho de quem só quer conversar*.

**A ordem é lei: cena → produção → regra.** Regra que chega antes da fala é bug de conteúdo, não questão de estilo.

---

## 5. O método

### 5.1 O molde gerador

**LEI.** Kit só de frases prontas funciona enquanto a realidade segue o roteiro. Quando a cena desvia dois graus, o turista não consegue **montar** uma frase — só repetir as que decorou. É a limitação que atribuímos ao phrasebook concorrente, e a estávamos reproduzindo com áudio.

> ### Núcleo gerador = congelar o sistema, abrir o mundo. Paradigma é quando a casca varia.

**O roster vive em `src/lib/course/moldes.json`** (FATO: existe, v1, e é o arquivo que `scripts/valida-tom.mjs` lê no G9). **Não existe nem deve existir um `nucleo.ts`** — o nome já circulou em rascunho e cria um segundo roster fantasma.

**Quatro categorias operacionais (LEI)**, que substituem a dicotomia "gramática = veneno":

- **MOLDE ABERTO** — casca congelada + buraco que o aluno preenche com palavra que **pega no cardápio, na placa ou na vitrine**. Encaixe livre, ≥2 substituições em voz alta.
- **MOLDE FECHADO** — mesma casca, mas a palavra muda de forma ao entrar, ou o conjunto é finito e curto. 4–8 encaixes gravados inteiros + *"a lista é a lista"*, dito em voz alta.
- **PEDÁGIO** — não tem buraco: é o acabamento obrigatório de **toda** frase, e sem ele a frase é indizível ou sai rude. Constante decidida **uma vez no onboarding**, depois invisível; nunca apresentada como sistema com alternativas.
- **DESTRAVA DE OUVIDO** — nunca se produz; separa *sim* de *não* na fala **deles**. Ouviu X → faça Z, zero `responde`.

Fora das quatro segue legítimo o **INVENTÁRIO CONGELADO**: frase inteira, zero encaixe. Não é fracasso — é a forma certa para o que não rende.

**Critério de corte (LEI):**

> ### Entra o que muda o que você pode DIZER quando a cena sai do roteiro. Fica fora o que só muda o que você pode EXPLICAR sobre o que disse.

**Três portões de admissão — um "não" reprova.** **P1 — MUNDO, NÃO SISTEMA:** o buraco é preenchido por **coisa do mundo** (substantivo, infinitivo, número, lugar, ingrediente, sintoma, defeito, objeto perdido), **nunca** por algo do sistema (pessoa, tempo, modo, aspecto, gênero, forma flexionada) — **escolha, não cálculo**. É este portão, e só ele, que mantém `quería + [X]` dentro e "o pretérito" fora. **P2 — ALCANCE CRUZADO:** ≥5 encaixes plausíveis na viagem, **≥3 em partes diferentes** daquela onde o molde nasce; alcance dentro da mesma cena é lista de frases. **P3 — DEGRADA COM ELEGÂNCIA:** encaixe errado ainda entrega o resultado; **se o encaixe errado for pior que não falar, é forma fixa, não molde** — por isso a frase-martelo de alergia continua congelada.

**Dois portões de forma, que decidem COMO entra.** **P4:** escreva o molde com 5 encaixes máximo diferentes e compare as cascas caractere a caractere — idêntica 5/5 = aberto; varia em ≤2 formas = aberto de duas formas, *"escolha de ouvido"*, **nunca uma tabela**; varia mais = procure **outro frame sintático que aceite a forma de dicionário**, e só se não houver é que fecha. **P5:** ≥2 substituições treinadas, ≥2 recalls em partes posteriores com encaixe novo, ≥2 tiles do modo consulta — **molde não recuperado em ≥2 partes posteriores não é molde, é frase.**

**Kill-switch de redação (LEI):** se explicar o molde exige dizer o nome da forma — *imperfeito, condicional, subjuntivo, registro polido* — o molde não está pronto; a explicação vai para `aprofundar`.

**Trava estrutural (LEI): nenhum molde ganha parte própria.** Molde é espinha que atravessa episódios: cada um tem uma **CASA** (a cena onde primeiro paga) e **≥2 REDISPAROS** (o slot de callback que já existe).

**A alocação por módulo (LEI, com a exceção nomeada que faltava):**

- **M1 concentra os moldes — M1 *é* o núcleo gerador.** Todos os moldes **operacionais** (pedir, perguntar, pagar, reparar, resolver) têm CASA em M1. Teto: **12 operacionais por SKU**.
- **M2 não introduz molde operacional nenhum: troca os encaixes** do que M1 plantou. **Exceção fechada, e é a única:** M2 pode plantar **até três moldes SOCIAIS**, e eles estão nomeados aqui para sempre — **APRECIAÇÃO** (casa I07), **ESCOLHA** (casa I03) e **PREFERÊNCIA** (casa I05). Existem porque a família apetitiva **não tem cena em M1**: forçá-la para dentro do Básico quebraria a jornada e o prazo, e deixá-la de fora foi exatamente o que produziu o produto sem uma única fala de elogio (§10, anti-padrão 3). Nenhum quarto molde social entra sem decisão do dono.
- **M3 não produz molde nenhum**; sua relação com eles é auditiva — o *ear module* de A01 são os moldes ouvidos em velocidade real, custo de autoria zero, e é a virada emocional do módulo.

**Teto por SKU: 12 moldes operacionais + até 3 sociais = 15 declarados** em `moldes.json`. O teto é orçamentário, porque *o molde não custa a apresentação, custa a agenda de recall*: 15 × 3 recalls = 45 slots de recall em 36 partes, e o slot de callback do template já está pago em cada parte. **Molde ensinado e não declarado é legítimo** (uma forma fechada de 4 encaixes que só paga em duas cenas), mas **não conta no numerador do G9** — e essa é a razão honesta de a taxa de geração ficar na casa dos 50% e não dos 60%.

### 5.2 A produção em pausa cronometrada

**LEI, e é o coração do produto.** `responde` = prompt na língua do aluno → `🎤 Fale agora!` com barra que encolhe → **só então** o modelo nativo. Pausa proporcional à frase (`Math.max(2600, len*130 + 1400) * fator`), configurável, **alvo escondido por padrão**. Ver o alvo antes de falar converte produção em leitura.

**As cinco regras que convertem lista em cena (LEI)** — sem elas o drill é mecânico e não transfere:

- **R-A** — cada troca muda de **lugar**, não só de palavra. Quatro encaixes no mesmo balcão é prática em bloco: parece boa na sessão e não transfere.
- **R-B** — o encaixe vem da cena, nunca do prompt. **O prompt não pode conter a palavra do encaixe traduzida**; ele descreve a situação de modo que o encaixe seja a única coisa que se poderia querer.
- **R-C** — escada dentro do bloco: objeto visível → quantidade → serviço → **o que você não sabe dizer**. O degrau 4 é a prova, porque é o único que nós não escrevemos.
- **R-D** — uma das trocas tem **retorno**: uma pergunta de volta que o aluno resolve com uma palavra. Sem isso o molde é frase que morre no ar.
- **R-E** — **nenhuma troca é anunciada como troca** (*"now try with"*, *"same sentence, but"*, *"mesma frase, só troque"*): proibido no áudio.

> **Aviso obrigatório em todo briefing:** a versão em cena **vai parecer** mais difícil e bagunçada que a lista, e o aluno erra mais dentro da sessão. **É o sinal de que está certa** — interferência contextual: prática aleatória piora o desempenho na sessão e melhora retenção e transferência. Sem esta linha escrita, o primeiro revisor "conserta" o bloco de volta para `quiero café, quiero agua, quiero pan`.

**O clique (REGRA)** — o fecho de uma parte com molde, três batidas, **nunca antes do drill**: (1) **a contagem** — devolva os **lugares**, não as frases; (2) **o desconto** — diga o que **não** custou (*"ninguém te ensinou essas quatro frases; você montou, agora, a partir de uma"*); (3) **o piso falsificável** — uma promessa que ele poderia desmentir e não vai. Nunca uma afirmação da guia: o aluno desconta reivindicações, mas conta o próprio inventário.

### 5.3 A cultura como comportamento com consequência

**LEI.** Curiosidade cultural é conteúdo de blog; comportamento é o que impede o mico, o barramento e o processo. **Todo item cultural é escrito na Ficha de 6 Campos, e se um campo não fecha, o item não vai ao áudio:** **1 SINAL** — observável e filmável, comportamento e nunca traço · **2 SUA LEITURA** — na voz do comprador, primeira pessoa, sem correção ainda · **3 O QUE É ALI** — função social + evidência rotulada · **4 O QUE VOCÊ FAZ** — ato corporal ou fala · **5 O QUE MELHORA** — o **ganho**, nunca o risco evitado; campo upbeat obrigatório · **6 ONDE NÃO VALE** — o contraexemplo (região, geração, formalidade, contexto), porque sem cena onde a regra se inverte não é regra, é caricatura.

**O verbo-mestre da trilha cultural é *notar*, não *evitar*.** O registro não é "cuidado com X", é "repare em X". A promessa é *você vai entender o que está vendo*, nunca *você vai virar um deles*.

**As quatro travas (LEI, verificadas por script):** **A** zero adjetivo de povo — gentílico + cópula = 0 ocorrências; a substituição canônica é *"num bar espanhol, o que acontece é…"* · **B** contraexemplo em todo item · **C** **o espelho**: para cada comportamento local explicado, uma linha sobre o comportamento **do aluno** que é estranho lá · **D** saldo apetitivo ≥2:1 por parte cultural.

**Proibido na camada cultural (LEI):** adjetivo nacional · dimensão bipolar como explicação (individualista/coletivista, alto/baixo contexto) · o "estereótipo sofisticado", que troca "eles são grosseiros" por "é uma cultura de alto contexto" — mais educado, mesma falha · causalidade folclórica ("é o clima", "é a ditadura") · exotização · **número bonito que ninguém checou**. O aluno **nunca ouve nome de acadêmico**: a tese vai no `aprofundar`, o áudio recebe só o comportamento.

**Permissão não é enfeite (LEI):** para cada bloco de proibições, liberações explícitas — briefing só de proibição produz turista paralisado, e o produto passa a fabricar a ansiedade que promete curar. **Humor é receptivo (LEI):** o aluno reconhece que o insulto jocoso é afeto e **não produz**; o que ele produz é a aceitação da provocação e o riso.

### 5.4 O que fica de fora — e o contorno

**LEI: nunca omissão silenciosa.** Sempre que o produto decide não ensinar uma estrutura, ele **entrega em voz alta a estratégia usada no lugar**; omitir sem contornar é o que fabrica o congelamento. **Subjuntivo em subordinada** → não subordinar: uma oração, um pedido (`¿Hay wifi?`). **Conjugação completa** → o curso produz *eu* e pergunta em *você*, ambos pré-cozidos dentro dos moldes; o turista não conjuga nada. **Concordância de gênero** → artigo colado à palavra e erro dispensado em voz alta; gênero sobre **si mesmo** (alérgico/a) é renderizado pelo app a partir do onboarding, nunca escolhido pelo aluno. **Contrastes de sistema** (ser/estar, por/para) → nunca contrastar: chunks congelados + dispensa, porque contraste é paradigma. **Clíticos** → parte da cabeça congelada do molde, como se fosse uma palavra só; escotilha: solta o pronome e aponta. **Números do lado produtivo** → licença explícita de mostrar (dedo, calculadora, teclado); do lado receptivo entram normalmente em B09 e B14. **"As palavras interrogativas"** → vivem dentro dos seus moldes; nunca uma parte sobre pronomes interrogativos.

### 5.5 O quiz

**REGRA, e existia como camada muda até aqui.** Cada grupo de partes tem um `quiz-*.json`: uma intro na voz-guia, um diálogo curto em vozes nativas e perguntas de reconhecimento em texto. **FATO medido no SKU Espanha: 11 arquivos, 158 clipes, 7.658 créditos — 7% do custo do curso.** Três leis, porque a camada é barata de esquecer e cara de refazer:

1. **O quiz é reconhecimento, nunca produção.** Ele não tem `responde` e não conta em G3. É a única superfície do produto onde é legítimo pedir que o aluno **escolha** em vez de falar.
2. **O quiz é indexado por slot, não por episódio.** Toda re-corte de grade (24 → 36) reindexa os quizzes junto, ou eles viram órfãos apontando para uma numeração que não existe mais. Isso já aconteceu uma vez e está registrado como dívida.
3. **Quiz entra no orçamento do SKU explicitamente.** Nenhum plano de produção é aprovado com a linha de quiz zerada.

---

## 6. O modo consulta

**LEI, e é metade do produto no dia em que o valor acontece.** É o **segundo índice do mesmo acervo** — não é um 4º módulo, não tem conteúdo próprio e não viola o "produto que termina": tem a mesma data de fim que o resto. Existe porque, no minuto do *"funcionou na barraca"*, o app está fechado.

**A taxonomia é LEI de catálogo, e é a maior peça de uniformidade que temos depois dos slots:** **12 tiles, ids idênticos em TODOS os SKUs**, ordem fixa para sempre depois do lançamento, em `src/lib/consulta/taxonomia.ts` (FATO: existe). Nível 1 = **lugar** (o turista sabe onde o corpo dele está em 0 s); nível 2 = **intenção**, na ordem do arco da cena, com "algo deu errado" como **uma folha no fim, nunca um galho** — se cada lugar ganhar um galho reativo, o índice reproduz a deriva defensiva sozinho.

`chegar` · `mesa` · `dieta` · `pagar` · `taxi` · `transporte` · `quarto` · `compras` · `saude` · **`simpatia`** · `reparo` · `apuro`

**Nível 1 nunca é localizado por SKU** (mata a memória muscular entre destinos, que é ativo de cross-sell). **Nível 2 é local** (`tapa vs ración` só na Espanha, `os 5 tons` só no Phûut!). O índice é **multigrafo**: um card pendura em várias folhas — custo de folha duplicada é zero, custo de busca que falha é o produto inteiro.

**O princípio da TROCA (LEI) — é o diferencial contra o phrasebook.** O phrasebook te dá a sua fala e te larga; o aperto é **o que acontece nos 3 segundos seguintes**. Veredito primeiro, texto depois. **Exatamente 3 retornos, nunca 4.** Três glifos com significado fixo em todo o app: `✓` acabou, você venceu · `!` atenção, mas é legítimo · `↑` escale, e o próximo degrau está logo abaixo. Todo retorno termina em ação. Máximo 2 níveis (você → eles → você); nível 3 é outro card. Onde o espaço de resposta é aberto (conversa social), o bloco muda de nome para *"onde isto costuma ir"* com 2 continuações prováveis — **não se finge determinismo onde não há**.

**Governança por número (LEI):** 12 situações · ≤8 momentos por situação · ≤7 cards por momento · ≤3 retornos por card · ≤1 linha de `ⓘ`. O que não couber vai para o `aprofundar`, que fica **permanentemente fora** do modo consulta.

**Comportamento por data (LEI):** o modo consulta conhece a data do voo. **Antes** do embarque o card abre com a frase **coberta** (`· · ·` + "you learned this in 3B — tap to reveal"), o que transforma a consulta pré-viagem em revisão espaçada; **depois** da partida abre escancarado, sem joguinho, porque ali não se treina, se resolve. Um app, dois comportamentos, zero configuração.

**Nunca:** busca como entrada primária, filtros, tags, ordenação configurável · campo de tradução livre (recomendamos o tradutor externo, e ele entra como folha explícita em `reparo`) · assistente/chat/IA · auto-play · gamificação · card sem lugar · card sem bloco de retorno · inverter a hierarquia tipográfica pondo a língua do comprador primeiro ou maior.

---

## 7. O que muda por destino e o que nunca muda

**REGRA.** O invariante é o **slot**; o conteúdo do slot é local. **Nunca muda:** os 36 slots, os 3 módulos, a ordem, as funções e o `dono` de cada slot; o catálogo de extensões e o teto de 4; a mão em B01; o teto de 12+3 moldes com casa e redisparos; os 12 tiles do modo consulta e a ordem deles; o elenco de quatro vozes (1 guia + 1 de alertas + 2 nativos de gêneros diferentes) — **e a quinta voz, quando o SKU tem *ear module* de sotaque, que nunca é uma das quatro**; e todas as leis dos §4, §5, §6 e §8.

**Muda, e é o checklist de pesquisa ao abrir um SKU novo:**

| Eixo | O que pesquisar e decidir |
|---|---|
| **Prosódia e gesto (B01)** | quais contrastes mudam a palavra; a ordem por **custo cognitivo do comprador, com dado**; a âncora na língua dele; o erro típico; que movimento de mão trai esse erro |
| **Escrita (B10)** | escrita não-latina → modo placa de decifração; transparente → placa de falso amigo e convenção. Sempre receptivo, ordenado por frequência de encontro, cada placa grudada a uma ação |
| **Erro nº 1** | toda língua tem **um** modo dominante de errar (falso amigo, par mínimo de tom, duração vocálica): ele merece gag recorrente |
| **Pedágio** | existe marca obrigatória de polidez ou gênero na frase? Se sim, vira constante do onboarding e nunca um sistema com alternativas |
| **Moldes** | o roster inteiro é **ativo de PAR**: re-deriva-se a cada comprador novo, nunca se traduz — inclusive quando a CASA cai em slot `dono: destino` |
| **Cortesia e face** | o gesto de saudação e seu protocolo; o conceito-mestre de face e o que o viola; o gesto de reparo (B03) |
| **Tabu e risco jurídico** | lèse-majesté, blasfêmia, drogas e vape, fotografia, lei de conteúdo — entregues com **pena e sujeito**, nunca "evite falar de política" |
| **Comida** | escala local ≠ escala de casa; o ingrediente-armadilha invisível; rótulo confiável × frouxo; **o cartão escrito** |
| **Logística e golpes** | tudo que **não se resolve no aeroporto** vira B04 com prazo declarado (número financeiro leva **ano**); os 3–5 golpes canônicos e o telefone certo entram como *beat* |
| **Fatos com data** | fronteira, autorização de viagem, zona de emissão, preço médio, meio de pagamento: cada um entra com **fonte, ano e data de revalidação declarada**. Fato datado sem validade é dívida com juros |
| **Variedade e viajante** | qual variedade o aluno vai ouvir, declarada; **quantas vozes o SKU exige** (uma a mais se houver ear module de sotaque); e o perfil real do viajante (gênero, casal, dieta, saúde), endereçado **nominalmente** |

---

## 8. Os invariantes

**LEI.** Se um cair, deixa de ser este produto. Cada um é asserção testável — um revisor abre o arquivo e diz *passou / não passou*; o porquê vem em itálico. São eles, mais os portões do §9, a lista de conferência de quem marca uma parte como pronta.

1. **Toda parte nomeia uma cena com consequência** — de falha (M1) ou de ganho (M2/M3); título nomeia lugar, momento, pessoa ou objeto, **nunca categoria gramatical**; "idioma puro" ≤3 partes por curso. *Separa a ferramenta do curso genérico.*
2. **Toda frase-alvo é enunciado inteiro utilizável.** *Vocabulário isolado não sobrevive a um garçom impaciente.*
3. **O prompt pede um ATO, não uma tradução:** intenção + cena. *Em viagem, o gatilho de recuperação é a situação, não a palavra.*
4. **Produção em pausa cronometrada, modelo nativo depois — nunca antes**; alvo escondido; ≥4 `responde` por parte. *É o único momento em que o produto entrega o que promete.*
5. **A voz-guia nunca fala a língua-alvo; a voz nativa nunca fala a do aluno** — nenhuma voz "multilíngue". *Voz híbrida sintetiza portunhol.*
6. **O áudio é a verdade; a romanização é andaime visual, nunca vai ao TTS**, e reflete o que se ouve. *O aluno imita o que ouve.*
7. **Toda abstração fonológica vira programa motor com metáfora na língua do aluno.** *Sem corpo, tom é teoria.*
8. **Melodia é propriedade da palavra, não emoção — e isso é ensinado explicitamente.** *Senão o aluno erra bem na hora de perguntar.*
9. **Placas, sinais e fala rápida são passivos por design, e o produto diz por quê** — zero `responde` nessas seções. *Escrita produtiva tem retorno zero em viagem.*
10. **Cultura entra como comportamento com consequência**, na Ficha de 6 Campos e sob as quatro travas (§5.3). *Curiosidade sem ação é conteúdo morto; traço de povo é infalsificável.*
11. **Cultura inclui permissão, não só proibição** — ≥1 por parte de M2/M3 e por parte cultural de M1, saldo apetitivo ≥2:1. *Briefing só de proibição produz turista paralisado.*
12. **Onde a aposta é alta, o produto admite o limite da própria competência e entrega o artefato mais seguro** — cartão de alergia escrito, o silêncio, mostrar o número, recomendar o tradutor. *Otimizamos resultado no mundo, não uso do idioma.*
13. **Há escada de escalada para quando a frase falha:** par nível-1 / nível-blindado, com a cena de falha social treinada. *A primeira tentativa falha.*
14. **Moldes declarados em `moldes.json`, ensinados como encaixe:** até 12 operacionais + até 3 sociais por SKU, com buraco do mundo, ≥2 substituições, ≥2 recalls com encaixe novo, ≥2 tiles, nenhum com parte própria; **≥45% dos alvos de produção do SKU gerados por molde (≥50% em M1)**. *O inventário resolve a cena; o molde resolve a cena que mudou.*
15. **Um único bloco de fecho, curto, sem jargão, sempre depois da produção.** *A regra é serviço da cena, nunca o inverso.*
16. **Reciclagem obrigatória, sempre em produção falada:** callback no primeiro `responde`, "vamos recordar" no fim, M2/M3 reusando ≥2 itens do Básico. *Revisão que não passa pela boca não conta.*
17. **Erro fatal previsível é ensinado como piada memorável antes de acontecer.** *Vergonha antecipada em riso gruda; advertência seca não.*
18. **Sucesso é piso mínimo comparado ao turista médio** — uma frase de piso por módulo. *Vitória alcançável desarma a desistência.*
19. **Funciona sem rede, sem tela e sem conta:** PWA instalável, download por parte, modo carro com MediaSession, progresso local, sync por código, **zero backend, login ou telemetria**. *O uso é avião, metrô e roaming caro.*
20. **Microfone opt-in, local e liberado de verdade** — blob revogado, track parada, erro explicado com ação. *Pedimos a voz do usuário sem pedir a confiança dele.*
21. **Variedade e público concretos, declarados**; modelo produtivo do gênero do aluno quando a língua marca; **e uma voz nunca acumula os papéis de modelo padrão e de sotaque regional**. *Língua neutra é língua de ninguém, e modelo contaminado ensina o sotaque como se fosse o padrão.*
22. **O produto tem data e termina:** prazo pré-embarque, rotina de véspera, recap de despedida, nada pós-viagem; **só M1 carrega prazo e contagem regressiva**. *Assinatura pressupõe um uso que não vai existir.*
23. **Todo fato datado carrega fonte, ano e data de revalidação.** *O SKU inteiro envelhece na velocidade do seu fato mais perecível, e o mais perecível está sempre em B04.*

---

## 9. Os portões automáticos

**LEI: opinião sobre tom não sobrevive a seis meses e a três agentes; CI vermelho sobrevive.** E o corolário que este documento aprendeu na marra: **portão descrito e não escrito é pior que portão nenhum**, porque desliga a conferência humana sem ligar a automática. Por isso a tabela abaixo tem coluna de estado, e o estado é FATO medido no repositório em 27/07/2026.

**Os dois scripts, com o nome que eles têm no disco:**
- **`scripts/valida-estrutura.mjs`** (`npm run estrutura`) — estrutura contra `slots.json` v2.0.0. Quebra se faltar `slot` **e** `dissolveEm`, se o slot não existir no contrato, se dois arquivos preencherem o mesmo slot, se o `nivel` divergir do módulo do slot, se `dissolveEm` apontar para slot inexistente, se faltar slot de módulo travado (**modo estrito**) ou se M3 ficar abaixo de 8.
- **`scripts/valida-tom.mjs`** (`npm run tom`, `--outline`, `--relatorio`) — os portões de tom e geração. **A régua mede moldura, não palavra:** contar "golpe" não discrimina — a densidade lexical de risco é quase idêntica nos quatro cursos; o que discrimina é **sobre o que o episódio é**. Por isso o autor **declara** e o script **confere**, e o léxico só acusa, nunca absolve.

**PENDÊNCIA BLOQUEANTE DE INFRAESTRUTURA (FATO):** não existe `prebuild` no `package.json`. **Nenhum dos dois roda no build hoje.** Enquanto isso não for ligado, tudo nesta seção é conferência manual. Ligar o `prebuild` é o item nº 1 de qualquer plano de produção, e ele entra com `valida-estrutura.mjs` em modo aviso até o SKU fechar os 36 slots (§3.2, regra 10).

| # | Portão | Limite | Estado |
|---|---|---|---|
| **G1** | **Moldura de episódio** — a parte declara `moldura: 'ganha' \| 'protege'` e o script classifica título+subtítulo | M1 ≤4/18 · M2 ≤1/10 · M3 ≤1/8 · **curso ≤6/36 (17%)** | **ATIVO** |
| **G2** | **Saldo apetitivo** — steps `tom:'ganha'` ÷ `tom:'protege'` | ≥2:1 em M2/M3 (erro) · ≥1:1 em M1 (warning) | **ATIVO** (o campo `tom` ainda não existe em nenhum step: hoje só emite aviso) |
| **G3** | **Densidade de produção** | ≥4 por parte · média ≥8 em M1 e M2 · ≥5 em M3 · ≥50% das partes com ≥6 · **exatamente uma** pode ter 0 (o *ear module*, A01) | **ATIVO** |
| **G4** | **Anti-palestra** — média de caracteres por clipe de narração (`intro`+`recap`) | ≤**120** por parte | **ATIVO** |
| **G4b** | **Anti-palestra, teto individual** — nenhum clipe de narração acima de **320** | — | **PENDENTE.** Sem ele, um bloco de molde cheio de clipes curtos mascara uma palestra de 400 caracteres no mesmo episódio. É a emenda mais urgente do script |
| **G5** | **Permissão** | `permissao` não vazio: ≥1 por parte de M2/M3 e por parte cultural de M1 | **ATIVO** |
| **G6** | **Zero adjetivo de povo** | 0 ocorrências de gentílico + cópula no áudio | **ATIVO** |
| **G7** | **Contraexemplo e espelho** | 100% das fichas com `ondeNaoVale`; ≥1 bloco `espelho` por parte de M3 | **ATIVO** |
| **G8** | **Cobertura do modo consulta** | folha da taxonomia com 0 cards = erro · tile `simpatia` ≥8 cards · cards ⚠ ≤15% do total | **ATIVO** (aguardando `consulta.json`) |
| **G9** | **Taxa de geração** — alvos de produção únicos cobertos por molde declarado | **≥45% no SKU · ≥50% em M1 · ≥35% em M2 · M3 fora da conta.** Só conta molde que passa em P5 e está em `moldes.json`; molde que aparece numa parte só é erro | **ATIVO** (mede 0% enquanto os steps não declararem `molde`) |
| **G10** | **Encaixe do mundo** | `tipoBuraco` ∈ `{coisa, lugar, comida, ingrediente, numero, defeito, sintoma, acao, objeto-perdido, quantidade}`; tipado `pessoa \| tempo \| modo \| aspecto \| genero` = erro | **PENDENTE** |
| **G11** | **Whitelist de formas verbais** | existe por SKU a lista de **toda** forma verbal produzida; forma nova quebra o build até ser adicionada **com justificativa escrita** | **PENDENTE** |
| **G12** | **Núcleo receptivo** | ≥8 pares ouvir→agir marcados 👂 e sem `responde` por SKU | **PENDENTE** |
| **G13** | **Fato com validade** | todo item de `fatosDatados[]` tem `fonte`, `ano` e `revisarAte`; data vencida = erro de build | **PENDENTE** (INV-23) |
| **G14** | **Integridade de voz e de áudio** | nenhum job com voz-guia carrega texto na língua-alvo e vice-versa; nenhum texto romanizado vai ao TTS; `audioKey` sem mp3; dois textos sob o mesmo `audioKey`; `manifest[key] !== job.text` | **PARCIAL** — `valida-audio.mjs` cobre manifesto e mp3; a checagem de voz × língua é **PENDENTE** e é a que teria pego os mp3 em inglês sob chaves alemãs |
| **G15** | **Redação do drill** | R-B (o `promptPt` não contém a palavra do encaixe) · R-E (nenhum anúncio de troca) · vocabulário de molde estável (PT-BR **"molde"**, EN **"the frame"**) | **PENDENTE** |
| **G16** | **Anatomia da parte** | campo `cena` não vazio · `decisao` não vazio em toda parte de M2 (T2) · `gesto` declarado no primeiro step · `frasePiso` ≥1 por módulo · título não casa com categoria gramatical (`passado`, `subjuntivo`, `condicional`, `conectores`, `classificadores`, `pronomes`…) · parte com `moldes` tem `clique` não-vazio com ≥3 nomes de lugar da própria parte e zero categorias gramaticais | **PENDENTE** — hoje o corpus tem 11 steps com `gesto` no curso inteiro, o que mostra que a regra "aquecimento em toda parte" já está sendo violada sem ninguém ver |

**O número único, impresso ao fim:**

```
IT  <SKU>  moldura 5/36 (14%) · saldo 2,8:1 · responde 8,4 · chars/clipe 61 · geração 47% · ⚠cards 9%  → PASSA
```

**Cuidado de leitura (LEI):** `chars/clipe` no IT é a média de **clipes de narração** (`intro`+`recap`) — a mesma coisa que o G4 mede. Números históricos calculados sobre **todos** os clipes (narração + língua-alvo) são de outra régua e não se comparam com este. Ao citar a linha do IT, cite sempre qual das duas.

**A régua não faz três coisas:** não conta palavras de risco (não discrimina), não julga qualidade de escrita (isso é revisão humana com a Ficha de 6 Campos) e não dispensa a conferência dos invariantes — **é o subconjunto automatizável do §8**.

---

## 10. Anti-padrões

**LEI.** Os quatro primeiros são erros que **este projeto cometeu**. Estão aqui com nome porque documentar o erro é o que impede a recaída — nos quatro casos, o que não estava escrito voltou errado pelas mãos do agente seguinte.

**1. A negação categórica virando dogma.** A spec dizia "não é curso de idioma". Era reação legítima a um erro real — posicionar o produto contra a Duolingo, com preço de assinatura e métrica de fluência — mas virou dogma e **fez um agente banir ferramentas de que o turista precisa**. Definição por negação não vende e não orienta: **definir sempre pelo objetivo.**

**2. A tabela indexada por paradigma.** Uma "tabela de exílio da gramática" usou `Passado`, `Subjuntivo`, `Comparativo` como chaves primárias. **Tabela cuja chave primária é o nome do paradigma é uma tabela de paradigmas, mesmo com "exílio" no título** — o agente seguinte lê "Passado → M2" e escreve um episódio de passado. Pior: lida ao pé da letra, exilava o ferramental do Básico inteiro, porque `quería`, `¿me pone?` e `me han robado` são exatamente as formas que o produto já grava em M1. **Corrigido: a chave primária é sempre o MOLDE, com o encaixe visível** (§5.1) — forma congelada dentro de molde produtivo **não é o paradigma dela**. Corolário de redação: **nunca chamar um slot de "o slot do passado"**, mesmo entre aspas, mesmo para dizer que está lacrado.

**3. O filtro "resolve um perrengue" gerando deriva defensiva.** A pesquisa foi encomendada sobre "perrengue", "golpe" e uma régua de "severidade", e o conteúdo herdou a lente: a moldura de perda no título passou de 14% no melhor SKU a **46% no pior** (leitura humana; a medição atual do script dá 42%, porque já usa a declaração onde ela existe), e num corpus de 252 frases-alvo a **única** fala de apreciação que o aluno produzia era "o que você recomenda?". **Corrigido pelo filtro único (§2), pela paridade 18+18 (§3.1), pela exceção dos três moldes sociais (§5.1) e pelos portões G1/G2/G8.** A correção **não é falar menos de risco** — conteúdo defensivo é a maior diferenciação do produto. É de **proporção e de moldura**: o defensivo vira *beat* dentro de partes de ganho.

**4. Documentar um portão que não existe.** A versão anterior desta spec afirmava que os validadores rodavam no `prebuild` e falhavam o build; não havia `prebuild`. Afirmava G10–G12 como ativos; não estavam escritos. Nomeava `nucleo.ts` e `lint-tom.mjs`; os arquivos se chamam `moldes.json` e `valida-tom.mjs`. **Um agente que confia na spec para saber o que já está protegido para de proteger.** Daqui em diante: coluna de estado, nome real de arquivo, e a régua de estado do código no topo deste documento.

**5. Ensinar 20 frases da mesma família como 20 itens soltos.** Gêmeo do anterior e custa igual: se o áudio nunca diz que a peça troca, o aluno decora 20 e não monta a 21ª. **Molde não declarado é molde desperdiçado.**

**6. Encher de gramática para parecer "curso completo".** Sintoma: episódio chamado "O passado", "Os classificadores", "Pronomes". Título que não nomeia cena está errado.

**7. Inflar por volume.** 36 partes é o número canônico e o Básico não cresce; volume aqui é diluição do combinado.

**8. Deformar a espinha por destino** — excluir, renomear ou reordenar slot, ou inventar um "módulo especial" para uma língua difícil. Exceção entra como **extensão declarada** (§3.3).

**9. Traduzir prompts em vez de reescrever cenas.** Portar um SKU copiando o prompt gera cenas falsas — metrô onde não há metrô, pechincha onde não se pechincha, escala de picante onde a cozinha não é apimentada. **Porta-se a estrutura, nunca o texto.** O precedente negativo está no repositório: uma `metodologia.md` de tailandês que é cópia verbatim do espanhol, ainda falando de voseo.

**10. Simetrizar as quatro habilidades** — escrita produtiva, ditado, ordem de traços. Ninguém vai desenhar a placa no ar.

**11. Trocar a mão por notação** (diagrama de F0, número de tom sobreposto). A notação vive no `aprofundar`; o canal principal é o corpo.

**12. Tratar cultura como curiosidade.** "Sabia que eles valorizam a harmonia?" é o jeito mais fácil de encher M3 de nada.

**13. Cortar o conteúdo não-linguístico por "não ser do escopo"** — lei com pena, taxa de conversão no cartão, formulário de imigração, telefone de emergência, cartão de alergia. **É aqui que mora a maior diferenciação**; cortar transforma o produto em phrasebook em áudio.

**14. Voz multilíngue ou TTS único para as duas línguas.** Barato, tentador, sintetiza portunhol. Corolário: nunca alimentar o TTS com a romanização. Segundo corolário: **a voz que faz o sotaque regional no ear module não pode ser a mesma que serve de modelo no resto do curso.**

**15. Ensinar a variedade "padrão" em vez da que o aluno vai ouvir**, ou ignorar a marcação obrigatória de gênero e cortesia — o modelo com a partícula errada corrompe **todas** as frases do curso, e é o item nº 1 do QA de qualquer língua nova.

**16. Adicionar nota de pronúncia por ASR.** Se um dia entrar, entra como *ajuda*, nunca como nota: o combinado é "não perfeição de nativo".

**17. Assinatura mensal, paywall que interrompe, gamificação de engajamento** (streak, XP, vidas, ranking, notificação de culpa). O produto termina, e paywall no meio do conteúdo é catastrófico em algo consumido offline no avião.

**18. Depender de rede, conta ou nuvem.** O aluno está em modo avião exatamente quando mais precisa.

**19. Deixar falha silenciosa.** Já custou caro: no modo carro, o episódio inteiro avançava mudo.

**20. Remover as permissões e as dispensas** por economia de tempo. Transforma o briefing num manual de medo e produz a paralisia que o produto promete curar.

**21. Esquecer uma camada inteira porque ela não está no template da parte.** O quiz custa 7% do SKU, tem 11 arquivos e nenhum plano o mencionava. Toda camada com custo de crédito aparece no orçamento, mesmo que não caiba no §4.

**22. Escolher o próximo SKU pelo mercado de estudantes.** O critério é **volume de turista × severidade de perrengue**, e o produto só existe onde há destino e data: "curso de italiano" não é produto deste catálogo; "Kit Itália, 12 dias, saindo em setembro" é.

---

## Apêndice — Origem, dívidas e documentos de apoio

**Fato de origem, não invariante:** o produto nasceu com perfis de casal *hard-coded*, recap com nome próprio e sync que assume exatamente duas pessoas. Isso **bloqueia a loja** e é trilha paralela de trabalho: os nomes passam a vir do onboarding, preservando o invariante 21 sem depender do código. O onboarding também pede **a data do voo** — único uso legítimo dessa informação, e o que alimenta a contagem regressiva de M1 e o comportamento por data do modo consulta (§6).

**Dívidas registradas:**
- `curso-tailandes/docs/metodologia.md` é cópia verbatim do espanhol e **não deve ser lido como spec por nenhum agente**.
- comentários de `types.ts` ainda dizem "frase em espanhol" nos clones.
- o SKU alemão tem mp3 em inglês sob chaves alemãs; o guard de manifesto é obrigatório antes de qualquer build, e a checagem voz × língua (G14) ainda não existe.
- a maioria dos prompts do curso ancestral rioplatense é tradução seca sem cena, o que viola o invariante 3.
- o SKU ancestral de 69 partes é **ancestral**, não vai à loja, e dele se extrai um kit de 36.
- **os 11 `quiz-ep-*.json` estão indexados pela numeração de episódio anterior à grade de 36** e precisam ser reindexados por slot junto com o re-corte (§5.5).
- **nenhum fato datado do corpus tem `revisarAte`** — e o SKU Espanha carrega os mais perecíveis do catálogo (fronteira, autorização de viagem, zona de baixa emissão, preço médio, meio de pagamento).
- **não há `prebuild`**: os dois validadores existem e ninguém os executa automaticamente.

**Documentos de apoio — válidos como origem, nunca como spec:** `src/lib/course/slots.json` (contrato executável, este sim canônico), `src/lib/course/moldes.json` (roster do par), `src/lib/consulta/taxonomia.ts` (os 12 tiles), `pesquisa-<destino>.md`, `syllabus-<destino>.md`, `PORTFOLIO.md` e as versões anteriores de `ARQUITETURA-V2.md` e `NUCLEO-GERADOR.md`, que vivem em **`docs/_superado/`**, em uma cópia só. Delas seguem úteis como material de trabalho o detalhamento de retrofit, o custo de créditos, as telas do modo consulta e a derivação tipológica por língua. Em qualquer conflito, **este documento vence** — exceto contra `slots.json`, que é o contrato executável.