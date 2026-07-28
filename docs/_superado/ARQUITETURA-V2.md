> ⚠ **DOCUMENTO SUPERADO.** Seu conteúdo normativo foi absorvido pelo `docs/PRODUTO.md`, que é a fonte única de verdade. Este arquivo fica como rastro de origem: a pesquisa de detalhe e as medições que ele carrega continuam sendo fonte citável, mas **nenhuma regra daqui vale contra o PRODUTO.md**.

---

# ARQUITETURA v2 — spec canônica de estrutura de curso

> **Status:** documento canônico. Complementa `PRODUTO.md` (que continua definindo *o que o produto É*). Este define **como o produto é estruturado**: módulos, jornada, camada cultural, modo consulta, engenharia e a régua de tom.
> **Destino do arquivo:** `D:\dev\_projects\curso-tailandes\docs\ARQUITETURA-V2.md`, irmão de `PRODUTO.md`. **Leitura obrigatória** para todo agente que produzir episódio, quiz, `aprofundar`, outline ou copy de loja.
> **Vigência:** 2026-07-27. Aplica-se aos 20 SKUs do catálogo Kit de Bordo.
> **Régua de evidência:** neste documento, **FATO** = medido no repo ou lido em fonte citada; **INFERÊNCIA** = projeção declarada; **NÃO PÚBLICO** = não existe dado. Nunca inventar.

---

## §0 — O que muda e por quê

1. O ¡Dime! (Espanha) derivou para o defensivo. **FATO (medido no repo, 27/07/2026):** títulos+subtítulos com moldura de perda/dano/multa/golpe — **Hablá 10/69 = 14% · Shuō! 21% · Phûut! 29% · ¡Dime! 11/24 = 46%**.
2. A causa foi de método, não de autoria: a pesquisa inteira foi encomendada sobre "perrengue", "golpe" e uma régua de "severidade". O conteúdo herdou a lente.
3. **FATO independente (segunda medição):** a densidade lexical de risco por 1.000 caracteres é parecida nos quatro cursos (~1,0–2,1). **A deriva não é quantas vezes se diz "golpe" — é sobre o que o episódio É.** Portanto a régua tem que medir **moldura de episódio**, nunca contagem de palavra.
4. **FATO (terceira medição, corpus do ¡Dime!, 765 steps / 252 frases-alvo únicas):** a **única** fala de apreciação que o aluno é levado a PRODUZIR em todo o curso é `¿Qué me recomienda?`. Zero `responde` de elogio, brinde, "que delícia" ou puxar conversa. A célula está literalmente vazia.
5. A deriva veio junto de uma deriva de formato: **FATO — ¡Dime! tem 7,3 `responde`/parte (pior do portfólio; Hablá 8,7 · Phûut! 9,1 · Shuō! 13,5) e 218 caracteres médios por clipe de narração (Hablá 48 · Phûut! 100).** O guia palestra 2,2× mais e o aluno produz 20% menos. **Sermão sobre risco ocupou o lugar da produção falada.**
6. A correção não é "falar menos de risco". O conteúdo defensivo é a **maior diferenciação** do produto (anti-padrão 7 do PRODUTO.md: não cortar Seção 112, DCC, hoja de reclamaciones, cartão de alergia). A correção é **de proporção e de moldura**: o defensivo vira *beat* dentro de partes de ganho, e sobra em pouquíssimas partes dedicadas.
7. Portanto o produto cresce **onde estava vazio**: de 24 partes (18 jornada + 6 cultura-de-perda) para **36 (18 + 10 + 8)**, com **18 partes de jornada e 18 partes de ganho — paridade exata**.
8. O eixo de progressão deixa de ser gramatical (o vício herdado do Hablá: subjuntivo, condicional, conectores = 21 partes de peso morto de viagem) e passa a ser **social e de iniciativa**: eu **respondo** ao mundo → eu **peço** o que quero → eu **entendo** o que está acontecendo.
9. **O piso de referência de tom não é o Hablá — é o Shuō!** (ratio risco:upbeat 1,58, contra 3,30 do Hablá). As strings de permissão do Shuō! (*"Solta o brasileiro que tem aí dentro"*, *"gānbēi! mas você não precisa secar"*) e o `e08a` do ¡Dime! (*"the good news buried inside a bad day"*) são o corpus de exemplo obrigatório em todo briefing de reescrita.
10. E a correção vira **teste de build** (§7). Opinião sobre tom não sobrevive a seis meses e a três agentes; CI vermelho sobrevive.

---

## §1 — Os 3 módulos

### 1.1 Nomes finais, promessa e teste de sucesso

| # | PT-BR (UI) | EN (UI) | `nivel` (técnico) | Promessa (copy de loja) | Teste de sucesso observável | Slot de consumo |
|---|---|---|---|---|---|---|
| 1 | **ME VIRO** | **GET BY** | `basico` | *"Chego, entendo, peço, pago, durmo e volto — sozinho."* | Fui atendido, fui entendido e paguei o preço certo. | **Antes de embarcar** |
| 2 | **APROVEITO** | **GET THE GOOD STUFF** | `intermediario` | *"Comer onde eles comem, na hora que eles comem, pelo preço que eles pagam."* | Recebi a recomendação da casa, a mesa boa, a segunda rodada. | **No caminho** (voo + 2 primeiros dias) |
| 3 | **LEIO A SALA** | **READ THE ROOM** | `avancado` | *"Entender essa gente: o humor, o orgulho, a briga antiga e o que o silêncio deles quer dizer."* | **Um local me contou algo que não conta a turista.** | **Enquanto você está lá** |

**Decisões de nomenclatura, com o porquê:**

- **"Me viro" não é invenção — é a copy que já está no produto.** FATO: `curso-espanol/src/lib/course/index.ts` linha 9, `descricao` do Básico = *"**Me viro de verdade**: situações reais do dia a dia e da viagem, falando desde o episódio 1."* Adotar é continuidade, não rebranding.
- **"Me enturmo" está REPROVADO e não volta.** "Se enturmar" é *virar outra pessoa*, que é literalmente o que o PRODUTO.md §7(a) diz que os concorrentes vendem e nós não. Um turista de 12 dias com ~50 falas não se enturma; ele **entende**. Vender "me enturmo" produz o review justo *"não me enturmei"* — o mesmo mecanismo do *"não ensina a língua de verdade"* que a spec existe para evitar. É a vaidade que o INV-12 contém.
- **"Leio a sala" aponta para o mesmo lado que o conteúdo.** M3 é receptivo por desenho (INV-9). Nome que promete produção com conteúdo que entrega reconhecimento é um contrato quebrado no título.
- **"Me contam algo" sobrevive como o TESTE**, não como o nome — porque descreve o comportamento de terceiro, que não está sob controle do comprador, mas é exatamente o que se pergunta no pós-viagem (§5.7).
- **A palavra "Avançado" nunca aparece na UI.** O campo `nivel: 'avancado'` é reuso técnico de chave. "Avançado" reimporta sozinho o enquadramento de curso de idioma. **FATO:** `Nivel` em `types.ts` já é `'basico' | 'intermediario' | 'avancado'` — três módulos exigem **zero** mudança de tipo, de id ou do formato de sync.
- **O reenquadramento que faz M3 valer a pena abrir no dia 6:** *"'avançado' aqui não é espanhol mais difícil — é mais Espanha."* M3 não compete com um curso (o preço é único, tudo já está pago — PRODUTO.md §7d); compete com o **Instagram**. Tem que ser nível-podcast.

### 1.2 Número de partes — **36 = 18 + 10 + 8**

| Módulo | Partes | Travado? | Horas (×15 min) | Slot e aderência |
|---|---:|---|---:|---|
| Me viro | **18** | **travado para sempre** | 4,5 h | 3–4 semanas pré-voo, a *"dez minutos por dia na semana antes de embarcar"* que o PRODUTO.md §2 já prescreve — fecha quase exato |
| Aproveito | **10** | travado | 2,5 h | o voo + os 2 primeiros dias |
| Leio a sala | **8** | 8 é o padrão; **10 só com justificativa escrita no doc de pesquisa do SKU**; nunca menos de 8 | 2,0 h | 10 min/dia de tempo morto em 10–14 dias de roteiro |

**Teto absoluto: 38. Piso: 36.** O Básico **nunca** cresce: é o módulo com prazo e o módulo caro.

**Por que 36 e não 30:**

1. **Paridade de proporção.** O diagnóstico é escassez de conteúdo de ganho. 6+6 dá 12 partes de ganho contra 18 de jornada — mantém o ganho como sobremesa. 10+8 dá **18 contra 18**: a regra memorável é *"tanto conteúdo para gostar quanto para se virar"*.
2. **Economia de acervo.** FATO (memória do catálogo Kit de Bordo): os 20 SKUs rodam sobre ~8 acervos de destino; espanhol peninsular serve 5 cursos, francês serve 9. O achado estrutural: **M1 é específico do PAR (L1 × destino); M2 e M3 são específicos do DESTINO.** Âncora fonética, falso amigo e inversão de polidez são propriedade do L1 do comprador; "a cozinha reabre às 21h", `hoja de reclamaciones`, Barça×Madrid e "quem eles acham que são" são idênticos para o britânico, o alemão, o francês e o italiano.
   **Correção importante ao argumento:** o que amortiza é a **pesquisa e o roteiro** (caro em tempo humano e em risco de erro factual), **não o TTS** — o TTS é por voz-guia e se paga inteiro em cada SKU. Portanto: seja conservador onde é caro em *pesquisa por SKU* (Básico) e ambicioso onde a pesquisa se reusa (M2/M3).
3. **O custo de TTS não é o gargalo.** FATO (memória do catálogo, 2026-07-27): crédito deixou de ser restrição e *"custo de TTS é RUÍDO e não entra em decisão de ordem"*. FATO (medido): curso novo de 24 partes do zero = 61.232 (Shuō!) a 66.233 (Phûut!) créditos. INFERÊNCIA: 36 partes na taxa enxuta ≈ 90k. Cabe.

### 1.3 A regra que impede M2/M3 de virarem gramática

Cinco travas. Todas verificáveis por revisor ou por script.

- **R1 — Título nomeia cena, nunca categoria.** O título de qualquer parte nomeia **um lugar, um momento, uma pessoa ou um objeto**. Nenhum título contém nome de tempo verbal, modo, classe de palavra ou função gramatical. (Extensão direta do anti-padrão 1 do PRODUTO.md.)
- **R2 — Âncora de consumo em M2.** Toda parte de M2 se prende a **uma decisão com dinheiro ou tempo em jogo**: qual prato, qual bar, qual hora, qual noite, qual feira, quanto de gorjeta. "Puxar conversa" só entra ancorado numa cena concreta (as perguntas que *eles* fazem, com as suas respostas prontas), nunca como habilidade solta. Sem essa trava, M2 vira "conversação".
- **R3 — Reconhecimento primeiro em M3.** A habilidade primária de toda parte de M3 é **reconhecer**, não produzir. Toda parte termina em **ação corporal** (INV-10) ou em **drill de reconhecimento** ("quando ouvir X, significa Y, faça Z"). Sem isso vira curiosidade — anti-padrão 6.
- **R4 — O bloco final muda de natureza.** Em M1 o bloco de fecho continua sendo "Gramática em foco" (≤2 min, INV-15). **Em M2 e M3 o slot se chama "Leitura em foco" e é cultural, nunca gramatical.**
- **R5 — Tabela de exílio da gramática inevitável.** A gramática que a cena exige vive nestes endereços e em nenhum outro. **Gramática que não está nesta tabela não entra no áudio** — vai para `aprofundar`.

| Gramática inevitável | Onde vive | Forma permitida |
|---|---|---|
| Passado | M2 · *Contar a sua viagem* | três verbos de história, decorados inteiros |
| Futuro / planos | M2 · *A noite* e *Fazer o que eles fazem* | combinar hora e lugar com alguém |
| Condicional de cortesia | M2 · *A ordem no balcão* | fórmula fixa, uma só |
| Subjuntivo | M2 · *Ser convidado* | **apenas votos prontos** — precedente do próprio Hablá: *"Votos prontos (decore inteiros)"* |
| Comparativo | M2 · *O prato que você não ia pedir* | "esse é melhor?" |
| Registro formal/informal | M3 · *Sinais* | reconhecer o tratamento, não conjugar |

### 1.4 Mitigação obrigatória de INV-22 (o produto tem data e termina)

36 partes vistas 10 dias antes do voo produzem pânico e review ruim. Portanto:

- **Só M1 carrega prazo e contagem regressiva.** O onboarding já pede a data do voo (PRODUTO.md §7d-4); é o segundo uso legítimo dessa informação.
- **Rótulos de UI = slot de consumo, nunca nível:** "Antes de embarcar" / "No caminho" / "Enquanto você está lá".
- **M1 recebe selo `essencial`** e é ele que a contagem persegue: *"faltam 9 dias — você está em 12/18 do essencial."*
- **Frase de piso (INV-18) passa a ser uma por módulo.** Ex. M2: *"se você só levar 'jantar às 21h e pedir no balcão', já come melhor que todo turista da sua rua."*
- **Recall entre módulos:** cada módulo abre com 60 s de "recordando do módulo anterior", e toda parte de M2/M3 reusa **≥2 itens do Básico em produção falada** (INV-16 escalado para 36 partes).

---

## §2 — A jornada no Básico (18 partes, canônica para qualquer destino)

Base: o Hablá, que **já é cronológico** — FATO: `b10 Llegada` está inserido entre `b03` e `b04`, ordem de viagem e não linguística. As melhorias sobre ele estão marcadas ⬆️.

| # | Slot canônico | O que resolve | Dono |
|---|---|---|---|
| **Antes de embarcar** ||||
| B01 | **A melodia** — os sons que fazem você ser entendido | programa motor (INV-7); tom/gesto onde há tom | **L1 × destino** |
| B02 | **As primeiras dez palavras** — cumprimentar, agradecer, pedir licença | + a regra de que entrar sem cumprimentar é grosseria | L1 × destino |
| B03 | **O kit anti-pânico** — "não entendi", "mais devagar", "escreve aí" | ⬆️ **reparo promovido para cedo** (PRODUTO.md §5 já manda: *"posicionar cedo"*) | L1 × destino |
| B04 | **A lista com prazo** — documentos, eSIM, app de pagamento, trem, ingresso | ⬆️ INV-22 materializado; **todo conteúdo com prazo físico vive aqui, nunca na trilha cultural** | destino |
| **Chegar** ||||
| B05 | **A fronteira e as três perguntas** | motivo, tempo, onde você fica | destino |
| B06 | **Os primeiros 60 minutos** — bagagem, chip, dinheiro, banheiro | | destino |
| B07 | **Do aeroporto até a cama** — o transporte certo pelo preço certo | fila oficial × aliciador (golpe como *beat*, não como episódio) | destino |
| **Circular** ||||
| B08 | **"Onde fica?"** | ⬆️ ensina a **fazer a pergunta cuja resposta cabe na sua cabeça** (sim/não ou gesto) | L1 × destino |
| B09 | **Bilhete, validar, entrar** | ⬆️ **os números entram aqui, pelo lado receptivo** | destino |
| B10 | **Ler o lugar** 👂 — placas, horários e portas | modo placa (INV-9). **Slot condicional:** se a escrita é transparente, vira placa de **falso amigo / convenção** | L1 × destino |
| **Comer** ||||
| B11 | **Sentar e pedir a primeira rodada** | | destino |
| B12 | **Pedir o que você quer mesmo** — os moldes ("sem", "com", "mais", "sem gelo") | INV-14 | L1 × destino |
| B13 | **Alergia e restrição** — a frase-martelo e o cartão escrito | INV-12, intocável | destino |
| **Gastar** ||||
| B14 | **A conta** — pagar sem pagar a mais | ⬆️ os números vivem aqui em modo receptivo (ouvir o preço e anotar) | destino |
| B15 | **Comprar** — preço, tamanho, provar, trocar | | destino |
| **Dormir** ||||
| B16 | **Check-in e o quarto** — e reclamar do que não funciona | ⬆️ premissa deixa de ser queixa: pedir andar alto, quarto mais silencioso, late check-out **e** as 3 frases de defeito | destino |
| **Quando dá errado** ||||
| B17 | **Farmácia, dor e emergência** | ⚠️ a **única** parte declaradamente defensiva do módulo | destino |
| **Voltar** ||||
| B18 | **O último dia** — check-out, guardar a mala e o "até a próxima" | ⬆️ **novo. Nem Hablá nem ¡Dime! têm episódio de volta** | destino |

**As cinco melhorias sobre o Hablá, explicitadas:**

1. **A jornada começa antes do aeroporto (B04) e termina no voo de volta (B18).** Hoje o ¡Dime! fecha o Básico em `e08b "Me han robado"`. Terminar a jornada em roubo é o sintoma exato da lente do medo. Terminar em despedida é upbeat e fecha o INV-22.
2. **Números deixam de ser conteúdo puro.** FATO: o Hablá gasta `b02a/b/c` — 3 partes, 10% do Básico — em números, algo que o INV-1 só tolera como exceção. Passam a ser bloco receptivo dentro de B09 e B14.
3. **Reparo antes da chegada (B03), não depois.**
4. **Golpe/multa sai do Básico como episódio** e vira *beat* dentro de B07, B14 e B17. Episódio próprio só em M2/M3, onde o enquadramento é "como isso funciona aqui", não "como não ser vítima".
5. **Conteúdo com prazo (eSIM, app de pagamento, formulário de imigração) migra da trilha Cultura para B04.** FATO: hoje `c03a`/`c03b` do Phûut! (eSIM, golpes) e `c02a`/`c02b` do Shuō! (WeChat/Alipay, mapas) estão na trilha "Cultura" — categoria errada, e **é parte da razão de a cultura parecer um manual de medo**.

**Regra de flexão por destino:** os 18 slots são fixos e obrigatórios. O que muda é o **conteúdo do slot**, seguindo a matriz de adaptação do PRODUTO.md §5. Um slot nunca é excluído; quando não se aplica (ex.: modo placa em língua de escrita transparente), ele **muda de conteúdo**, não desaparece.

---

## §3 — A camada de personalidade do povo

### 3.1 Onde ela vive (a decisão estrutural)

**A personalidade do povo não é só um módulo — é espinha + módulo.**

FATO: no ¡Dime! a trilha Cultura são 6 partes de 24 (25%), **todas no fim, e 6/6 enquadradas como perda** (relógio = "a cozinha está dormindo"; três preços; gorjeta a mais; batedor de carteira; multa; minado político). No Hablá a trilha cultural (`i07a/b/c` — mate, futebol/asado/sair, gírias) é **3/3 apetitiva**. **A diferença entre os dois produtos não é quantidade de cultura, é o SINAL do enquadramento.** Se a camada nova for só "o módulo 3", ela herda a posição de sobremesa opcional.

Portanto:

- **Espinha:** cada parte do Básico carrega **1 item de "leitura de sinal", 30–45 s**.
  **Aplicação faseada (decisão de custo):** obrigatória em **partes novas**; para o acervo existente, entra **apenas nas partes que já vão ser regravadas no retrofit**. Isso preserva o reuso a custo zero dos 18 Básicos do Phûut! e do Shuō! (§6).
- **Módulo:** M3 "Leio a sala", 8 partes.
- **Ambiente:** a faixa "Now" do modo consulta (§4), onde a cultura aparece na hora em que importa sem custar um toque.

### 3.2 O método replicável — a **Ficha de 6 Campos**

Todo item de personalidade, em qualquer língua do catálogo, é escrito nestes 6 campos. **Se um campo não fecha, o item não vai ao áudio.**

| # | Campo | Regra dura | Exemplo (Espanha) |
|---|---|---|---|
| 1 | **SINAL** | Observável e filmável. Comportamento, nunca traço. | "Ele começa a falar antes de você terminar a frase." |
| 2 | **SUA LEITURA** | Na voz do comprador, primeira pessoa, sem correção ainda. | *"He cut me off. He's rude."* |
| 3 | **O QUE É ALI** | Função social + evidência rotulada (FATO/CONSENSO/INFERÊNCIA). | Sobreposição colaborativa; sinal de envolvimento, estratégia de cortesia positiva. |
| 4 | **O QUE VOCÊ FAZ** | Ato corporal ou fala. Herda INV-10. | "Não espere a pausa — ela não vem. Entre por cima e continue." |
| 5 | **O QUE MELHORA** | O **ganho**, nunca o risco evitado. Herda INV-11. **Campo upbeat obrigatório.** | "Você deixa de ser o estrangeiro que só ouve e vira parte da conversa." |
| 6 | **ONDE NÃO VALE** | Contraexemplo obrigatório: região, geração, formalidade, contexto. | "No médico, no banco, com a Guardia Civil: ninguém interrompe ninguém." |

### 3.3 O que é PROIBIDO — as 6 falhas nomeadas e as 4 travas testáveis

**Proibido (com nome, para virar checklist de revisor):**

1. **Adjetivo nacional.** "Os espanhóis são calorosos", "os tailandeses são tranquilos". Predicado de pessoa aplicado a milhões. Não é falso — é **infalsificável**, que é pior.
2. **Dimensão bipolar como explicação.** Individualista/coletivista, alto/baixo contexto, mono/policrônico. **FATO bibliográfico:** a crítica metodológica é consolidada (McSweeney 2002 sobre Hofstede; Holliday sobre **neo-essencialismo** — a versão que se declara liberal e continua usando a nação como unidade).
3. **O "estereótipo sofisticado"** (Osland & Bird, *Beyond Sophisticated Stereotyping*, AoM Executive 14(1), 2000): trocar "eles são grosseiros" por "é uma cultura de alto contexto". Mais educado, mesma falha — descreve traço, não contexto. Os autores propõem *value trumping*: **em cada contexto específico certos valores passam na frente**. É por isso que o mesmo espanhol que te interrompe no bar espera calado no médico.
4. **Causalidade folclórica.** "É por causa do clima / da ditadura / do budismo." Não muda nenhuma ação do aluno.
5. **Exotização.** O comportamento do destino como curiosidade antropológica e o do aluno como o normal invisível.
6. **Número bonito que ninguém checou.** Caso canônico de treinamento: *"a Espanha é o 2º país mais ruidoso do mundo, depois do Japão, segundo a OMS"* — **é bulo**; não existe relatório da OMS com essa afirmação, e a origem provável é uma nota da OCDE de 1991 com seis países. **Fica proibido por escrito**, junto do "menú del día obrigatório por lei" que já está no registro negativo da pesquisa de Espanha.

**As 4 travas (verificáveis por script — ver §7):**

- **TRAVA-A — Zero adjetivo de povo.** Busca por `(os|as) <gentílico> são|é` / `(the )?Spanish are` / `Thai people are` = **0 ocorrências**. Substituição canônica: *"num bar espanhol, o que acontece é…"* / *"In a Spanish bar, what happens is…"*.
- **TRAVA-B — Contraexemplo obrigatório.** Todo item cultural tem o campo 6 preenchido. Sem cena onde a regra se inverte, não é regra: é caricatura.
- **TRAVA-C — O espelho.** Para cada comportamento local explicado, **uma linha sobre o comportamento do ALUNO que é estranho lá**. É o dispositivo antiestereótipo mais forte que existe: converte "eles são esquisitos" em "dois sistemas se encontrando". Ex.: *"Ordering a beer in five clauses is not politeness there — it's fog."*
- **TRAVA-D — Saldo apetitivo ≥ 2:1.** Por parte cultural, ≥2 itens de ganho para cada 1 de perda. **FATO: o ¡Dime! hoje está 0:6.**

**A regra de tom, operacionalizada:** o registro não é "cuidado com X", é **"repare em X"**. **O verbo-mestre da trilha cultural é *notar*, não *evitar*.** E a promessa é *você vai entender o que está vendo*, nunca *você vai virar um deles* — que é também a defesa do item "Não é performance cultural" do PRODUTO.md.

### 3.4 O formato do episódio — **"LEITURA DE CENA"**

12–14 min, 6 blocos, **nunca mais de 75 s de narração sem troca de voz**.

| Bloco | Tempo | O que é | Por que não vira palestra |
|---|---|---|---|
| **1. A CENA CRUA** | 0:00–0:50 | Áudio **só na língua-alvo**, sem tradução: o barman diz `¡Dime!`, três vozes por cima, riso. O aluno não entende — não precisa. | Abre com **experiência**, não com tese. Herda a autorização de não entender. |
| **2. O VEREDITO** | 0:50–2:00 | A guia pergunta: *"Isso foi (a) briga, (b) grosseria ou (c) uma boa noite?"* → **pausa cronometrada** → o aluno responde em voz alta. | É `responde` de **julgamento**, não de tradução: mantém INV-4 sem virar quiz de gramática. E o aluno **erra**, o que é o motor do episódio. |
| **3. A VIRADA** | 2:00–4:30 | Revelação + campos 3 e 6 da ficha. A voz de alerta entra **só** para o contraexemplo. | Duas vozes alternando; o contraexemplo é o que impede a caricatura. |
| **4. O ESPELHO** | 4:30–6:00 | 60–90 s sobre **o que VOCÊ faz que é estranho lá**, em tom de piada com o próprio comprador. | Bloco antiestereótipo e o mais engraçado do curso. |
| **5. A MÃO NA MASSA** | 6:00–11:00 | **3–4 `responde`** que executam a leitura. | Sem produção falada é podcast. Com produção é o produto. |
| **6. OUVIDO + PERMISSÃO** | 11:00–13:30 | 2 itens **só de escuta** 👂, **1 permissão explícita** (INV-11), e a **frase de piso** (INV-18). | Fecha desarmando a ansiedade que o episódio criou. |

**Regras duras do formato:**

1. TRAVA-A vale palavra por palavra no roteiro.
2. **Todo bloco tem um humano na cena.** Se não dá para dizer *quem* faz *o quê*, o item volta para o `aprofundar`.
3. **Humor é RECEPTIVO.** O aluno reconhece que o insulto jocoso é afeto; **não produz**. Insulto jocoso exige intimidade prévia e o retorno na boca de estrangeiro é **negativo**. É INV-9 aplicado ao humor. Zero `responde` em item de zoação; glosas 👂; quiz de escuta ("isto é briga ou carinho?"). O que ele PODE produzir é a aceitação da provocação (`¡Qué me estás contando!`, `Anda ya.`) e o riso. **FATO bibliográfico:** *mock impoliteness* está documentada com corpus no espanhol peninsular (Bernal, *Do insults always insult?*, Pragmatics 18:4, corpus Val.Es.Co; e o corpus VALESCO.HUMOR).
4. **Saldo apetitivo ≥2:1** por parte (TRAVA-D), auditável.
5. **A tese vai no `aprofundar`, nunca no áudio.** Hickey, Osland & Bird, Hu 1944, Komin, Bernal — **o aluno nunca ouve um nome de acadêmico**. O áudio recebe só o comportamento.

### 3.5 A grade de M2 e M3 (canônica, aplicável a qualquer destino)

**M2 — APROVEITO (10 partes).** Regra de autoria: **toda parte é um prazer com uma chave de acesso, ancorado numa decisão de consumo (R2).** Nada de "situação difícil".

| # | Parte | Decisão em jogo |
|---|---|---|
| I01 | **O relógio deles** | a que horas eu janto — e por que jantar cedo me joga na casa que vive de turista |
| I02 | **A ordem certa no balcão** | onde me ponho e como peço; o volume, o contato visual; a **permissão** contra a hiper-polidez |
| I03 | **O prato que você não ia pedir** | qual prato; ler a carta local, o menu do dia, "o que você recomenda?" + dispensa de entender 100% |
| I04 | **A noite** | qual bar e quanto fica; a rodada, quem paga, como se despedir da mesa |
| I05 | **As perguntas que eles fazem** | fico ou saio da conversa; as 3–5 perguntas de sempre e as suas respostas prontas |
| I06 | **Contar a sua viagem** | *"ontem eu fui, comi, adorei"* — **é aqui que o passado vive**, como história |
| I07 | **Elogiar, agradecer e reclamar sem drama** | o elogio que faz o cozinheiro aparecer; a reclamação calma que resolve |
| I08 | **Ser convidado** | a casa: o que levar, onde sentar, a hora de ir; brinde como fórmula pronta (subjuntivo exilado aqui) |
| I09 | **Fazer o que eles fazem** | como gasto a tarde: mercado, jogo, praça, a festa da semana — o ritual com protocolo de entrada |
| I10 | **O dinheiro sem drama** | gorjeta, rachar, pechinchar ou não, balcão × mesa — enquadrado como *"como funciona aqui"* |

**M3 — LEIO A SALA (8 partes).** Regra: **majoritariamente receptivo; cada parte termina em ação ou drill de reconhecimento (R3).**

| # | Parte | Cobre |
|---|---|---|
| A01 | **Como eles falam quando não é com você** 👂 | o EAR MODULE: fala rápida, o que some, sotaque regional. **Zero `responde`** — única parte autorizada a ter 0 |
| A02 | **Do que eles riem — e a piada que você pode fazer** | a implicância afetuosa, o que é piada e o que é ofensa; saber **quando rir**. Receptivo |
| A03 | **Quem eles acham que são** | identidade em 15 min: o orgulho, o complexo, a piada interna. **A parte de maior risco do produto inteiro** — é a que mais fácil vira "os espanhóis são calorosos" |
| A04 | **A briga antiga** | a divisão interna que todo país tem e como não pisar nela; a habilidade é a **não-fala** (INV-12) |
| A05 | **A outra língua** 👂 | línguas e sotaques regionais + as 6 palavras de cortesia que compram simpatia |
| A06 | **O calendário deles** | o feriado, o santo, o mês em que tudo fecha, a festa que toma a rua |
| A07 | **Sinais: bem-vindo, incômodo e hora de ir** | o "não" disfarçado; volume, toque, distância |
| A08 | **A despedida** | o que dizer pra ser convidado de novo + a cola de bolso do país; fecho do curso |

### 3.6 O gancho upbeat obrigatório: **"você acha X → é Y → e por isso agora você consegue Z"**

Formato fixo. Todo SKU entrega **≥3 destes**, e eles são a copy de loja de M3. Referência (Espanha, com evidência):

1. *"Ele foi grosso comigo."* → Pedido direto e interrupção são **cortesia positiva** e envolvimento. **FATO bibliográfico:** Hickey, *Politeness in Spain: Thanks But No 'Thanks'* (in *Politeness in Europe*, 2005) situa a Espanha próxima do polo de cortesia positiva de Brown & Levinson, enquanto a Grã-Bretanha é sociedade de cortesia **negativa** — é o eixo que separa o comprador britânico do destino. → **Z:** você pede sem rodeio e é atendido rápido.
2. *"Eles jantam tarde / são desorganizados."* → **É aritmética, não temperamento. FATO:** em **março de 1940** a Espanha trocou o fuso de Greenwich pelo Centro-Europeu e nunca voltou; em **2013** uma comissão parlamentar recomendou o retorno ao GMT. **O relógio espanhol está adiantado em relação ao próprio sol.** → **Z:** você ganha a melhor faixa horária do país. **Contraexemplo obrigatório (TRAVA-B), que mata o "mañana": o jantar é elástico, o trem não é.**
3. *"A conta não vem, fui esquecido."* → A mesa é sua depois do prato; trazer a conta sem pedir é **expulsar o cliente**. Tem nome: `la sobremesa`. → **Z:** uma hora a mais de graça em todo jantar da viagem.

**Registro negativo permanente (Espanha):** "2º país mais ruidoso do mundo segundo a OMS" = **bulo, proibido**. O dado honesto disponível é modesto: Eurostat EU-SILC `ilc_mddw01` (ruído de vizinhos/rua) põe a Espanha em ~23,6% (2023) contra ~20% da média da zona do euro — **conferir na base antes de virar áudio**. INFERÊNCIA: a diferença percebida pelo britânico é muito maior que 3,6 pontos, o que indica fenômeno **social** (bar, mesa, rua) e não ambiental.

---

## §4 — O MODO CONSULTA

**O que é:** o segundo índice do **mesmo acervo**. **Não é um 4º módulo.** É a superfície que fica aberta no minuto em que o valor acontece — hoje, no instante do *"funcionou na barraca"* que o PRODUTO.md §7(c) elege como depoimento-alvo, **o app está fechado**.

**Não viola INV-22:** o modo consulta tem a mesma data de fim que o resto. Não é motivo para voltar mês que vem; é motivo para o app estar aberto durante os 12 dias que a pessoa já pagou.

### 4.1 Taxonomia — 12 situações, ids iguais em TODOS os SKUs

**Por que o 1º nível é LUGAR:** o turista chega com uma de duas consultas — *"estou em X"* (sei onde meu corpo está, em 0 s) ou *"acabou de acontecer Y"* (cauda longa infinita). A segunda **não é enumerável**, e é por onde entra a deriva defensiva: se cada lugar ganha um galho "quando dá errado", o índice reproduz os 45%.

**Decisão: 1º nível = LUGAR (12 fixos). 2º nível = INTENÇÃO, ordenada pelo arco natural da cena, com "algo deu errado" como UMA FOLHA no fim — nunca um galho.** O reativo puro vive num único tile de 12 (8%).

**Por que 12:** derivação física, não arbitrária. 375×812 · header ~90 px · safe-area ~80 px → ~640 px úteis. Tile legível a braço estendido no sol = 92 px + 10 px gap = 102 px/linha. 6 linhas × 2 colunas = **12 tiles, tela cheia, zero scroll**. 3 colunas dariam 15–18 mas o rótulo cai para ~110 px de largura, e "Chemist & feeling rough" não cabe.

| # | id | Rótulo (Espanha/EN) | 2º nível — ordem = arco da cena; ⚠ = folha reativa, sempre última |
|---|---|---|---|
| 1 | `chegar` | Hello & goodbye | entrar · ser atendido no balcão · "quem é o último?" · sair · tú ou usted em uma linha |
| 2 | `mesa` | Bar & restaurant | mesa · a carta · bebida · comida · tamanho (tapa/ración) · água e pão · a conta · ⚠ não é o que pedi |
| 3 | `dieta` | Can't eat it | dizer (escada de 3 degraus) · **mostrar o cartão** · "o que tem nisso?" · sem carne/porco/glúten · ⚠ não estão levando a sério · ⚠ está acontecendo |
| 4 | `pagar` | Paying | pedir a conta · cartão e **"en euros"** · dinheiro e a nota de 50 · gorjeta · rachar · ⚠ conta/troco errado |
| 5 | `taxi` | Taxi & car | dizer o destino · **o taxímetro e o preço** · parar aqui / recibo · balcão da locadora · estacionar e a câmera de ZBE · ⚠ não aceita cartão / caminho errado |
| 6 | `transporte` | Metro & trains | bilhete certo · metrô × cercanías × Renfe · plataforma e portão · bagagem e scanner · placas que custam dinheiro · ⚠ perdi |
| 7 | `quarto` | Hotel & room | check-in · pedir uma coisa · **`No funciona`** (o molde) · deixar a mala · check-out e taxa turística |
| 8 | `compras` | Shops & market | no balcão · quanto/tamanhos · só olhando · pagar e recibo · ⚠ devolver |
| 9 | `saude` | Chemist & feeling rough | "algo para…" · com ou sem receita · minha alergia/meu remédio · farmácia de guardia · ⚠ 112 e o hospital |
| 10 | `simpatia` | **Nice things to say** | elogiar a comida · elogiar o lugar · agradecer e se despedir · brindar · puxar conversa · aceitar/recusar convite |
| 11 | `reparo` | Didn't catch that | mais devagar / de novo · escreve / me mostra · fala inglês? (e o que fazer quando não) · como se diz…? · **apontar e conseguir** |
| 12 | `apuro` | It went wrong | roubo · perdi / perdi alguém · polícia e a denúncia · 112 · os golpes pelo nome · o formulário de reclamação |

**Onde foram parar aeroporto/fronteira/pré-embarque:** são eventos de **uma vez só**. Um tile permanente para algo usado num único dia custa 1/12 da tela por 12 dias. `fronteira` e `antes-de-voar` são **cards com janela de data**, empurrados pela faixa "Now" nos 7 dias antes do voo e no dia, e sempre alcançáveis pela busca.

**O que NÃO é card:** saber que não é fala (o relógio do país, regras com multa). Vira (a) a linha ambiente do header e (b) a `ⓘ` de uma linha no rodapé dos cards onde morde. Não compete por tile.

**O índice é multigrafo, não árvore.** `situacao: string[]` — um card pendura em várias folhas. Custo de folha duplicada = zero; custo de busca que falha = o produto inteiro. É a diferença entre um índice de consulta e um sumário de curso.

**A taxonomia vive fora dos episódios:** `src/lib/consulta/taxonomia.ts` — **nível 1 idêntico em todos os SKUs** (memória muscular entre destinos, e é ativo de cross-sell); **nível 2 local** (`tapa vs ración` só na Espanha; `os 5 tons` só no Phûut!). **A ordem dos 12 tiles é fixa para sempre depois do lançamento.**

### 4.2 As telas (com copy)

Restrições, todas com consequência derivada: **uma mão · sol forte · modo avião · 5 s até a frase · zero rolagem para achar.**

- **Sol** → o modo consulta **ignora o tema escuro do sistema** e força alto contraste. Dark mode ao sol é ilegível; "respeitar o tema" aqui é o bug.
- **Uma mão** → tudo que se toca fica no terço inferior. Busca embaixo, não no topo. Voltar é swipe de borda.
- **Uma mão + sol** → o alvo de áudio não pode exigir mira: **o bloco inteiro da frase É o botão de play**.
- **Modo avião** → índice + todos os mp3 do consulta baixam em **um botão**, separado do áudio de treino.
- **5 s** → sem auto-play (você está numa mesa com gente), sem animação de entrada, sem tela de carregamento. **Wake Lock ligado enquanto um card está aberto.**

**Tela 0 — "Now"**

```
┌────────────────────────────────────────┐
│  21:40 · Madrid                        │  ← faixa ambiente (cultura, zero toque)
│  Kitchens are open everywhere.         │
│  You're early for dinner, not late.    │
├────────────────────────────────────────┤
│  ⟲  ¿Me pones… │ La cuenta │ No entiendo│  ← 3 últimos usados
├────────────────────────────────────────┤
│   🍺 Bar & restaurant │ 🚫 Can't eat it │
│   💳 Paying           │ 🚕 Taxi & car   │
│   🚇 Metro & trains   │ 🏨 Hotel & room │
│   🛍️ Shops & market   │ 💊 Chemist      │
│   👋 Hello & goodbye  │ 😀 Nice things  │
│   🗣️ Didn't catch that│ 🆘 It went wrong│
├────────────────────────────────────────┤
│  🔎 type a word…              ⬇ Trip ✓ │
└────────────────────────────────────────┘
[ 🗣️ No entiendo ]  [ 🃏 My card ]  [ 🏠 ]   ← barra fixa, em TODA tela
```

**A barra fixa é a decisão mais importante da tela.** Dois botões de pânico a **um toque de qualquer lugar do app**:
- `🗣️ No entiendo` — **não navega**: toca o áudio na hora e mostra a frase grande por cima. É a frase mais usada do produto e nunca deveria custar navegação.
- `🃏 My card` — o artefato de alergia/dieta em **tela cheia, sem UI, brilho máximo, wake-lock, para entregar na mão de outra pessoa**. É o INV-12 virando botão. É o único item do modo consulta que **não depende de áudio nenhum**.

**A faixa "Now" é onde a cultura vira ambiente** — a mesma informação hoje enterrada em `c01a` ("dinner at 6pm? the kitchen is asleep") aparece na hora em que importa, em registro upbeat (*"you're early, not late"*). É a menor mudança possível com maior efeito sobre o tom do produto.

**Tela 1 — momentos.** Linhas de 68 px, ícone à esquerda, **uma linha de texto**, sem descrição secundária, máximo 8, sem scroll. Rótulo escrito como **o que você quer que aconteça**, nunca como tópico:

```
← Taxi & car                            🔎
  ➊  Say where you're going
  ➋  The meter and the price
  ➌  Stop here, and the receipt
  ➍  The hire-car counter
  ➎  Parking, and the ZBE camera
  ⚠   He won't take card / wrong way
```

**Tela 2 — o card (o entregável).** **Vertical = a troca (uma conversa, de cima para baixo). Horizontal = as alternativas.** Essa correspondência se aprende num uso e torna o app navegável de polegar sem olhar.

```
←  Taxi & car · the meter                    ★
  YOU SAY
 ┌──────────────────────────────────────┐
 │ ¿Me pone el taxímetro, por favor?    │  38px — toque em QUALQUER
 │                                      │  lugar do bloco = áudio
 │ meh POH-neh el tak-SEE-meh-troh      │  22px — é ISTO que se lê no sol
 │ Could you put the meter on, please?  │  15px
 │                                 ▶🔊  │
 └──────────────────────────────────────┘
  WHAT COMES BACK
   ✓  "Sí, sí."           → It's on. Watch it start.          🔈
   !  "Es tarifa fija."   → Fixed fare. Legal from the airport.
                            Ask how much. ↓                   🔈
   ↑  "Está roto."        → "It's broken." It isn't. ↓         🔈
  IF IT'S STILL OFF
 ┌──────────────────────────────────────┐
 │ Entonces me bajo aquí, gracias.  ▶🔊 │
 └──────────────────────────────────────┘
  ⓘ Madrid and Barcelona airports have a fixed fare — that one
    is real. Anywhere else: meter or nothing. (2026)
              ● ○ ○ ○ ○      ← swipe = outras falas deste momento
```

**Um card de `simpatia` (não existe hoje — é spec de conteúdo a produzir):**

```
  YOU SAY
 ┌──────────────────────────────────────┐
 │ Estaba buenísimo, de verdad.     ▶🔊 │
 │ ehs-TAH-bah bweh-NEE-see-moh…        │
 │ That was really, really good.        │
 └──────────────────────────────────────┘
  WHAT COMES BACK
   ✓  "¿Sí? Me alegro."         → He's pleased. You're done.
   ✓  "¿Le ha gustado el arroz?"→ He's fishing for which dish.
                                  Name it: "el arroz, sobre todo." ↓
   ✓  "Pues mañana hay cocido." → You just got a recommendation.
                                  Say "pues vuelvo mañana." ↓
  ⓘ Say it to the person who cooked it if you can see them.
    In a small place they will come out. That is the whole point.
```

**Repare no que muda: em `simpatia` os três retornos são `✓`.** Não há degrau blindado, não há ⚠. **A gramática visual do card carrega o tom** — um card cujos três retornos são todos verdes é impossível de ler como manual de medo.

**Tela 3 — o artefato.** Tela cheia, sem chrome, sem navegação, brilho e wake-lock no máximo, texto na língua do destino em corpo enorme, **feito para ser lido por outra pessoa**. Hoje existe como parágrafo no `aprofundar` de `e04a`; vira botão permanente.

### 4.3 O princípio da TROCA (o diferencial contra o phrasebook)

O phrasebook te dá a **sua** fala e te larga. O aperto real não é dizer — é **o que acontece nos 3 segundos seguintes**. Sete regras:

1. **Veredito primeiro, texto depois.** `[glifo] + alvo pequeno + rótulo em negrito na língua do comprador`. O usuário não precisa *entender* o que foi dito — precisa saber **em qual dos três baldes caiu**. O balde é o produto; a transcrição é o rodapé.
2. **Exatamente 3 retornos. Nunca 4.** Três é o que se lê num relance com uma mão. O quarto é a porta para a enciclopédia.
3. **Três glifos, significados fixos em todo o app:** `✓` acabou, você venceu · `!` atenção, mas é legítimo · `↑` escale, e o próximo degrau está logo abaixo.
4. **Todo retorno termina em ação:** nada · uma próxima fala (toque promove o degrau ao topo) · um aviso datado.
5. **Máximo 2 níveis: você → eles → você.** Nível 3 é outro card. Sem exceção — é aqui que vira diálogo.
6. **Áudio do retorno é discreto e nunca automático.** Você não está estudando, está decidindo.
7. **Onde o espaço de resposta é aberto, não fingir determinismo.** Cenas de balcão (bar, táxi, guichê, farmácia, recepção, loja) têm resposta fechada — a maior parte da fala turística. Conversa social não tem. Nesses cards o bloco muda de nome para **"Where this usually goes"** com 2 continuações prováveis. Isso respeita a régua FATO/INFERÊNCIA: não inventamos o que o espanhol vai dizer quando não dá para saber.

**A troca já está paga.** INV-13 (escada de escalada) é literalmente a segunda metade do card. `e04a` traz a escada de 3 degraus com o desmentido do garçom no meio (`"Vale, un poquito no pasa nada, ¿no?"` → `"No. Es alergia, no es manía."`); `e04b` traz a cena em que a garçonete elogia o prato, admite o presunto e ainda entrega o caldo de peixe no arroz. **O modo consulta não inventa a troca — desenterra a que já foi autorada e é hoje descartada no fim do episódio.**

### 4.4 Esquema de metadados e geração do índice

**FATO (contagem no corpus do ¡Dime!, 27/07/2026):** 765 steps · 489 com `es` · **252 frases-alvo únicas** · 329 `audioKey` únicos com texto · **zero conflitos** (nenhum `audioKey` carrega dois `es` diferentes). O corpus já é um banco de frases limpo e deduplicável — o índice é praticamente uma *view* dele.

**Regra de fonte única:** o card **referencia** `audioKey`. **Nunca duplicar `es`/`pinyin`/`pt`/mp3 no índice.**

Um bloco `consulta` por arquivo de episódio (o player linear ignora):

```jsonc
"consulta": {
  "cards": [
    {
      "id": "taxi-taximetro",
      "situacao": ["taxi/preco", "taxi/algo-errado"],   // multigrafo
      "rotulo": "Get the meter on",                      // 2–4 palavras
      "diz": "e06a-taximetro",                           // audioKey — texto vem do step
      "ouve": [
        { "es": "Sí, sí.",         "en": "It's on. Watch it start.",            "v": "ok" },
        { "es": "Es tarifa fija.", "en": "Fixed fare. Legal from the airport.", "v": "atencao", "proximo": "e06a-tarifafija" },
        { "es": "Está roto.",      "en": "\"It's broken.\" It isn't.",          "v": "escalar" }
      ],
      "escalar": "e06a-mebajo",                          // INV-13, manual
      "nota": "Madrid & Barcelona airports: fixed fare. Elsewhere: meter or nothing. (2026)",
      "peso": 90
    }
  ]
}
```

E em `types.ts`, o `Step` ganha **um** campo opcional: `papel?: 'eu' | 'eles'`, só para o que a heurística não resolve. Mais nada.

**Volume:** ~10–14 cards por episódio × 36 ≈ **330–430 cards**; ~40–55 KB de JSON por SKU.

**`scripts/build-consulta.ts`, rodando no `prebuild`.** O corpus já carrega três **convenções textuais** que funcionam como metadado não declarado — todas medidas no ¡Dime!:

| Convenção | Ocorrências (FATO) | O que o script deriva |
|---|---:|---|
| `es` é alvo de algum `responde` | 146 frases | `papel = 'eu'`, alta confiança |
| `pt` começa com 👂 | 53 steps | receptivo puro → `papel = 'eles'`, nunca vira "YOU SAY" |
| `pt` começa com `— ` (travessão) | 39 steps em 7 cenas de ≥3 linhas | **32 pares de troca derivados automaticamente** |
| `(the waitress)`, `(the driver)` | 5 steps | confirma papel dentro da cena |

Pipeline:

1. **Colher** — varre `ep-*.json`, monta `phrases[audioKey] = {es, pinyin, pt, voz, ep}`. **Conflito de `es` no mesmo `audioKey` = erro de build.**
2. **Papel** — alvo de `responde`/`shadow` → `eu`; 👂 → `eles`; resto → `eles` por default. Cobre 100% sem anotação humana.
3. **Cenas → trocas** — detecta run maximal de ≥3 `ouvir` consecutivos com `pt` iniciando em travessão, precedido de `intro`; gera o bloco `ouve` **em rascunho**. O humano só escreve o rótulo em negrito e escolhe o glifo. **Maior economia do pipeline.**
4. **Situação, semeada** — mapa `episódio → situação` dá o default; o humano corrige os cross-cutting (~20%). Saída: TSV com **uma coluna editável**. Passe de ~2 h por SKU.
5. **`escalar` — manual por decisão consciente.** ~20 ponteiros por SKU. Heurística erraria no conteúdo de maior risco (alergia, polícia); INV-13 é onde a precisão importa.
6. **Nota `ⓘ`** — o script *sugere* a seção do `aprofundar` mais próxima; o humano corta para uma linha e carimba o ano. **Nunca auto-publica** (régua §6.6 do PRODUTO.md).
7. **Sinônimos de busca** — auto: glosa + rótulo + caminho da situação. Custo zero.
8. **`consulta-audio.json`** — lista plana de `audioKey`, para o botão "⬇ Trip" ser fetch determinístico.
9. **Relatório de cobertura** — conta cards por folha e **imprime as vazias**. É assim que *"Nice things to say ≈ 2 cards"* vira warning de build, e não descoberta acidental daqui a seis meses.

**Validações que FALHAM o build:** card sem `audioKey` existente; `audioKey` sem mp3 em disco e em `static/audio/index.json`; card sem bloco `ouve` nem `ondeIsToVai`; folha da taxonomia com zero cards; ⚠ acima do teto (§7).

### 4.5 O que NÃO fazer

**Para não virar phrasebook:** sem lista A–Z, sem "cumprimentos/números/cores/dias da semana"; **nenhum card sem lugar**; nenhum item que não seja enunciado inteiro dizível a um humano com resultado (INV-2); **nunca o inglês/PT primeiro nem o maior** — inverter a hierarquia tipográfica é virar dicionário; **nenhum card sem "WHAT COMES BACK"** (ou é cena aberta e usa "where this usually goes", ou o card não está pronto).

**Para não virar enciclopédia (governança por número, verificada no build):** **12** situações · **≤8** momentos · **≤7** cards por momento · **≤3** retornos por card · **≤1** linha de `ⓘ`. O que não couber vai para o `aprofundar`, que **fica permanentemente fora do modo consulta**.

**Nunca:** busca como entrada primária, filtros, nuvem de tags, ordenação configurável · campo de tradução livre (**recomendamos o Google Tradutor**, INV-12; ele entra como folha explícita em `reparo → apontar e conseguir`) · assistente/chat/IA · auto-play ao abrir · gamificação · respeitar o tema escuro **neste modo** · duplicar texto dentro do índice · publicar `ⓘ` sem ano/fonte conferidos · **localizar o nível 1 por SKU** (mata a memória muscular e o cross-sell) · deixar falha silenciosa.

### 4.6 A defesa do INV-4 (e por que ela usa dado que já temos)

Risco legítimo: *"eu consulto em vez de treinar"*. **O modo consulta é ciente da data do voo.** **Antes** do embarque o card abre com a frase **coberta** (`· · ·` + "you learned this in 3B — tap to reveal") — o mesmo mecanismo do INV-4, transformando o consulta pré-viagem em superfície de **revisão espaçada** (INV-16). **Depois** da data de partida abre escancarado, sem joguinho, porque ali você não está treinando, está resolvendo. **Um app, dois comportamentos, zero configuração.**

### 4.7 O que o modo consulta faz pela venda

1. **Fabrica a prova social que a spec pediu e hoje não tem como colher.** Passada a data de volta: uma tela, uma pergunta — *"which card did you actually use?"*, pré-preenchida com os cards mais abertos. **A lista de respostas É a copy da página de loja, e é verificável.**
2. **Alarga a janela de compra.** A janela declarada é 2–6 semanas (PRODUTO.md §7d-2); quem descobre 3 dias antes se autodesqualifica. Com o consulta, metade do produto **funciona com zero estudo**, e a linha é verdadeira: *"Flying on Friday? Half of this works with no study at all."*
3. **Muda contra quem competimos, para melhor.** "Estude antes de voar" nos joga na régua do Duolingo, onde perdemos e onde o review negativo é justo. "Está no seu bolso no restaurante" nos joga contra o **phrasebook** e o **Google Tradutor** — os concorrentes reais declarados — e ali temos o que eles não têm: a troca, o áudio da variedade certa, o degrau blindado e o fato datado. **É também o screenshot que vende: o card, no sol, sendo erguido.**
4. **É o encaixe com os guias.** Guia = *o que fazer*; curso = *como se virar*. O consulta é o único que fica aberto no mesmo minuto que o guia. Bundle por destino deixa de ser argumento comercial e vira integração de produto.
5. **Custo marginal quase zero:** conteúdo já pago, ~50 KB de JSON, mp3 que já existem, zero backend, zero login, zero telemetria.

---

## §5 — Retrofit dos 4 cursos existentes

### 5.1 Modelo de custo (FATO — medido nos repos em 27/07/2026)

Lido de `scripts/generate-audio.mjs`, idêntico nos 5 repos: **voz-guia = flash v2.5 = 0,5 crédito/caractere; voz-alvo = multilingual_v2 = 1,0 crédito/caractere.**

| Curso | partes | clipes | cr do zero | cr/parte | **narração/parte** | `responde`/parte | chars/clipe |
|---|---:|---:|---:|---:|---:|---:|---:|
| Hablá | 69 | 2.406 | **71.986** | 769 | 423 | 8,7 | 48 |
| Shuō! | 24 | 1.291 | **61.232** | 2.436 | 1.895 | 13,5 | — |
| Phûut! | 24 | 1.214 | **66.233** | 2.545 | 1.864 | 9,1 | 100 |
| ¡Dime! EN | 24 | 938 | **110.160** | 4.271 | 3.325 | **7,3** | **218** |
| ¡Dime! DE | 24 | 938 (cópia) | 129.463 | 5.062 | 4.163 | — | — |

**Três achados que governam o plano:**

1. **A narração-guia é 69–74% do custo de um curso.** Frase-alvo nova é ~1 cr/char — **desprezível**. Consequência dura: *mudar tom custa caro; acrescentar falas é quase de graça.*
2. **O ¡Dime! custou 68% acima do padrão, integralmente por inchaço de narração.** A dieta de narração **é** a correção de tom.
3. **Reuso de áudio-alvo trocando só a voz-guia economiza só ~14%.** FATO medido no par EN→DE: 478 clipes reusados byte-a-byte (custo 0), 460 regerados = **113.468 créditos**. Localizar não é barato; planeje como curso novo. E alemão custa **1,205×** o inglês em caracteres para o mesmo roteiro.

**Regra de preço usada abaixo:** parte nova = cr/parte do curso · **reescrita de tom** = 100% da narração da parte · **reframe leve** = intro de abertura + recap de fecho ≈ 35% da narração.
> **Correção registrada:** o dossiê de retrofit rotulou "reframe leve" mas aplicou 100% da narração na conta do Hablá. Aqui vale 35%. Totais abaixo são **INFERÊNCIA** sobre unidades **FATO**.

### 5.2 Hablá — **não reescrever uma linha. DESDOBRAR em dois SKUs.**

Três razões, na ordem em que importam:

**(a) O Hablá já contém o curso do eixo social dentro dele.** FATO (`curso-espanol/src/lib/course/index.ts`):
- **Já é "Aproveito":** `i06a/b/c` Socializar (gostos, convidar, opinar), `i07a/b/c` Cultura rioplatense (mate, fútbol/asado/sair, gírias), `a04a/b` Modismos.
- **Já é "Leio a sala":** `a06a/b/c` Entender os nativos (pedir pra repetir, muletillas, o grande teste) — isso é *ler a sala* em estado puro, **gravado e pago**. Mais `a04c` formal × informal.
- **É a escada gramatical (peso morto de viagem):** `i01`, `i02`, `i03`, `a01`, `a02`, `a03`, `a05` = **21 partes**.

Existem **12 partes de eixo social já gravadas**. Descartá-las junto com a gramática jogaria fora ~9.000 créditos de áudio bom.

**(b) O legado que circula não pode quebrar.** As 69 partes estão `pronta: true` e o app está em uso. Reescrever M2/M3 pioraria a experiência de quem já consumiu.

**(c) O PRODUTO.md já prevê isso** (Apêndice B, dívida 6). A decisão de 3 módulos **resolve** essa dívida.

| SKU | O que é | Custo |
|---|---|---|
| **Hablá (legado)** | Fica como está, 69 partes, 3 módulos gramaticais. **Não vai à loja.** Documentado no PRODUTO.md como ancestral. | **0** |
| **Kit Rioplatense (loja)** | Novo `index.ts`, mesmo repositório e mesmo áudio, no eixo social, 36 partes | **~10.000** |

**Composição do Kit Rioplatense:**
- **M1 (18)** = 16 selecionadas de `b01`–`b10` + `b08c` farmácia, mapeadas nos 18 slots canônicos, **0 crédito** (a jornada já está na ordem certa) + **2 novas** (B04 "a lista com prazo" e B18 "o último dia", que não existem).
- **M2 (10)** = `i06a/b/c` + `i07a/b/c` + `a04a/b` (8 existentes, reframe leve) + **2 novas** (a noite rioplatense: previa, boliche, horário real · pedir bem: o que os locais pedem na parrilla).
- **M3 (8)** = `a04c` + `a06a/b/c` (4 existentes, reframe leve) + **4 novas** (do que eles riem e a ironia porteña · quem eles acham que são · porteño × interior × uruguaio e o assunto que divide · sinais e a despedida).
- **Fora do SKU de loja:** as 21 partes gramaticais, vivas no app legado.

**Custo:** 8 novas × 769 = 6.152 · 12 reframes leves × 148 = 1.776 · de-personalizar 339 (3 arquivos, o mais barato dos três PT) ≈ **~8.300–10.000** (INFERÊNCIA).

**Ressalva a registrar:** o Hablá é a referência **de densidade de produção** (8,7 `responde`/parte, clipes de 48 caracteres — o guia é *conciso*), **mas não é a referência de tom por lexicon** (ratio risco:upbeat 3,30, o pior dos quatro). O que ele acerta e o ¡Dime! erra **não é falar menos de risco — é não fazer do risco o assunto do episódio.**

### 5.3 ¡Dime! EN — o rebalanceamento exato

O defensivismo tem **quatro duplicatas verificadas**: o mesmo perrengue escrito duas vezes, uma na trilha Sobrevivência e outra na Cultura. **Fundir resolve tom e redundância no mesmo movimento.**

**FUNDIR (4, todas verificadas no conteúdo):**

| # | Fundir | Em | Evidência |
|---|---|---|---|
| 1 | `c01b` "Same beer, three prices, and nobody told you" | `e03a` "Same beer, three prices" | Título quase idêntico. **4 dos 9 alvos de `c01b` já estão em `e03a`.** Preservar de `c01b`: `¿Me deja ver la carta en papel?`, `¿La tapa va incluida?`, `Pagamos a partes iguales`, e o cartaz de preços obrigatório por lei |
| 2 | `c02a` "You tipped 20% in a rounding country" | `e05b` "Cash, the fifty, and the tip" | `e05b` já se chama "…and the tip you shouldn't leave" e já trata arredondamento. As "eleven words that end an argument" vão para `e03c`, que já se chama "the six words that end an argument" — **o mesmo dispositivo retórico escrito duas vezes é a assinatura da duplicação** |
| 3 | `c02b` "Nobody mugs you. Somebody distracts you" | `e08b` "Me han robado" | `e08b` **abre literalmente com a tese de `c02b`** |
| 4 | `c01a` "Dinner at 6pm? The kitchen is asleep" | **promovido a M2/I01** | Não é fusão — é promoção. O relógio espanhol é o material mais upbeat do curso e está escrito como fracasso ("you eat badly and pay too much"). Vira **"The Spanish clock is a gift"** |

**CORTAR — nada inteiro. Duas dietas cirúrgicas:** `e06b` "The train is an airport now" (5.164 cr, 2º mais caro): manter o útil (30 min antes, raio-X, portão), **cortar ~40% da narração**, devolver o tempo como upbeat (AVE × Avlo, vagão silencioso, o trem espanhol é bom e barato). `e07a`: premissa deixa de ser queixa (§2, B16).

**PRESERVAR INTACTO (é a diferenciação — anti-padrão 7; só a moldura muda):** `e05a` **DCC** (ele mesmo diz *"the part that pays for the app"*) · `e03c` hoja de reclamaciones + água de torneira grátis por lei · `e07b` ZBE + balcão da locadora · `c03a` ordenança municipal com valor (Barcelona €120, Palma €100) · `e04a`/`e04b` alergia (INV-12) · `e08a` farmácia antes do hospital — **este é o melhor exemplar de moldura upbeat que já existe no ¡Dime! (*"the good news buried inside a bad day"*); use como modelo de reescrita dos outros.**

**REESCREVER TOM (9 partes, narração inteira, `responde` mantidos):** `e03a`, `e03c`, `e05b`, `e06a`, `e06b`, `e07a`, `e08b`, `c03a` (+ bloco de **permissão** no fim: o que você PODE na Espanha e não pode em casa — beber na esplanada até tarde, criança no bar às 22h, banho de mar em novembro em Málaga), `e01c` (extrai o EAR MODULE).

**CRIAR — 16 partes novas:** 1 em M1 (B18 o último dia) · **9 em M2** (I01 absorve `c01a`; I02–I10 novas: pedir como quem já esteve aqui · da caña à copa, o tapeo · as cinco perguntas que todo mundo faz · elogiar, agradecer e ser tratado melhor · contar a sua viagem · ser convidado · fiesta: estar dentro, não do lado · o dinheiro sem drama) · **6 em M3** (A01 EAR MODULE extraído de `e01c` — Madri × Sevilha, `-s` aspirado, `pescao`, 100% receptivo, zero `responde`; A02 do que riem e a piada que você pode fazer; A03 quem eles acham que são; A04 a briga antiga, reescrita total de `c03b` — vira retrato de Catalunha/País Basco/Galícia/Andaluzia com a palavra local que abre porta (`bon dia`, `kaixo`, `boas`), **preservando** a linha de qual assunto deixar em paz, mas no fim e não como tese; A05 `vosotros`, `coger` e as palavras que marcam você, receptivo; A07/A08 sinais e despedida).

**Resultado ¡Dime!: 24 → 36 · 4 fusões · 16 novas · 9 reescritas.**
**Custo (INFERÊNCIA):** 16 × 2.600 = 41.600 · 9 × 2.200 = 19.800 · de-personalizar 0 (é só `state.svelte.ts`, não está no áudio) ≈ **~61.400**.
**Projeção nas réguas:** moldura de perda **46% → 6/36 = 17%** · `responde`/parte **7,3 → ≥8,5** · chars/clipe **218 → ≤120**.

### 5.4 Phûut! (tailandês) — 24 → 36 · **~44.000** (INFERÊNCIA)

**APROVEITA 100%, zero crédito:** `t01a`–`t08b` (18 partes) viram M1 **sem tocar em um clipe**. A ordem já é a jornada (tons → saudação → reparo → números → imigração → táxi → restaurante → transporte → hotel → compras → emergência → placas). Muda só a string `nome`/`descricao` do módulo em `curso-tailandes/src/lib/course/index.ts`.

**RE-HOME para M1 por FUSÃO, não por adição** (M1 é travado em 18): `c03a` (Grab/LINE/eSIM — conteúdo com **prazo físico**, INV-22, hoje enterrado no fim do curso: erro estrutural, não de tom) funde no slot B04; `c03b` (golpes com turista) vira *beats* em B07/B14/B17.

**REESCREVE TOM (1.864 cr cada):** `c01a` "O wai e o jai yen" → **âncora de M3/A03**: o `jai yen` *é* a personalidade do povo, hoje ensinado como protocolo de não-gafe; vira retrato. · `c02a` "Monarquia e templos" → **a reescrita mais importante do Phûut!**: preserva integralmente Seção 112 com pena e sujeito, a cédula, o hino e a regra do silêncio (INV-12, anti-padrão 7 — não cortar), mas muda a moldura de *"o que te processa"* para *"por que o Rei importa tanto pra eles"*, com o bloco jurídico anunciado como os "trinta segundos sérios" que o Shuō! já usa bem.

**REFRAME LEVE:** `c01b` (mesa/colher/compartilhar) → M2 · `c02b` (pés impuros/cabeça sagrada) → M3/A07.

**ACRESCENTA ~13 novas:** M2 = o prato que o turista nunca pede (som tam × pad thai de turista, khao soi, boat noodles) · a rua à noite (night market, o ritual do gelo na cerveja, a mesinha de plástico) · `aròi mâak` e o elogio que muda o atendimento · as 5 perguntas que todo tailandês faz · festa e mérito (Loi Krathong, Songkran — **o oposto exato do "não faça": como entrar**) · o dinheiro sem drama · ser convidado · contar a sua viagem. M3 = `sanuk` (e por que "trabalho tem que ser sanuk" explica metade do país) · `kreng jai`, o não que é sim (receptivo) · o calendário · a outra língua/sotaque · a despedida.

**De-personalizar: 3.865 cr, 16 arquivos** — o mais caro dos três PT porque os nomes estão nos **quizzes**. Bloqueia loja. **Fazer no mesmo lote de geração**, nunca numa passada separada.

**Ganho upbeat da Tailândia:** entender `jai yen` transforma toda negociação de rua — **quem baixa a voz é quem consegue as coisas**, e isso é divertido de praticar, não defensivo. (**Base citável:** Suntaree Komin, *Psychology of the Thai People* — nove *value clusters*, ego-orientation na base, SIR Orientation na superfície social.)

### 5.5 Shuō! (mandarim) — 24 → 36 · **~41.000** (INFERÊNCIA)

**Diagnóstico: é o curso com melhor tom do portfólio** (ratio risco:upbeat 1,58). Já faz o que a spec pede. **É o piso de referência de tom, não o Hablá.**

**APROVEITA 100%:** `m01a`–`m08b` (18) → M1, zero crédito.
**RE-HOME por fusão:** `c02a` (WeChat/Alipay, **prazo de DIAS**) e `c02b` (mapas/DiDi/tradutor offline) → B04 · `c03b` (fotos e filmagem em público) → *beat* em M1 (é risco operacional, não retrato).
**REESCREVE TOM:** `c03a` "O que NÃO fazer" — **o título é literalmente o anti-padrão**. Vira M3/A03 *"O que eles acham normal, engraçado e rude"*, mantendo Taiwan/Tibete/Xinjiang/1989 no bloco de trinta segundos sérios que já funciona.
**REFRAME LEVE:** `c01a` (mesa/brindes/miànzi) → M2 · `c01b` (presentes e números da sorte) → M2 — **presentes é o assunto mais upbeat que já existe no curso e está mal alocado**.
**ACRESCENTA ~14:** M2 = pedir numa mesa chinesa de verdade · a noite: chá, KTV e a rodada de brinde · elogiar e agradecer · as 5 perguntas · ser convidado · contar a viagem · o dinheiro sem drama · o calendário. M3 = do que riem · o sim que é não (**face: `面子 miànzi` × `脸 liǎn` — FATO bibliográfico: Hu Hsien Chin, *American Anthropologist*, 1944; Ho 1976**) · norte×sul, Pequim×Xangai×Cantão · a recusa ritual (recusar uma ou duas vezes antes de aceitar; **a insistência do anfitrião é a contraparte esperada**) · o silêncio como consideração · sinais e despedida.
**De-personalizar:** 1.857 cr, 11 arquivos.

### 5.6 ¡Dime! DE — **NÃO GERAR AGORA**

**Achado de estado (FATO):** `curso-espanha-de/static/audio/` contém **938 mp3 byte-a-byte idênticos** aos de `curso-espanha` (verificado por md5 em `c01a-01` e `e01a-01`), e `manifest.json` é cópia byte-a-byte **com os textos em inglês**. O JSON de conteúdo *está* em alemão (Juli 191.764 ch + Thomas 26.374 ch).

- **Bom:** os 478 clipes espanhóis (Emilio/Carmen) já estão no lugar e serão reusados a custo zero.
- **Armadilha viva:** hoje a pasta DE tem **áudio em inglês sob chaves alemãs**. Um `npm run build` sem `generate-audio.mjs` antes **publica o app alemão falando inglês**, e o `index.json` não acusa (só conta arquivos). **Guard obrigatório no build: falhar se `manifest[key] !== job.text`.**

Gerar agora = pagar ~113k créditos para **duplicar o defeito de tom em alemão**, e cada linha de narração EN que mudar depois custa 1,205× lá. **Custo depois do EN travado (INFERÊNCIA): ~95.000.**

### 5.7 Ordem de execução

Critério: **cada fase produz o insumo da seguinte, e nenhuma fase cara roda antes de a arquitetura estar provada.**

| Fase | O quê | Créditos | Por quê nesta posição |
|---|---|---:|---|
| **0** | **A grade e a régua no `PRODUTO.md`** + emendas (Apêndice) + `scripts/lint-tom.mjs` + `taxonomia.ts` | **0** | **BLOQUEIA TUDO.** O anti-padrão 19 hoje proíbe literalmente o que foi decidido. Sem a emenda escrita, o próximo agente reverte citando a spec — o precedente de `curso-tailandes/docs/metodologia.md` (cópia verbatim do espanhol) prova que o que não está no doc canônico volta errado |
| **1** | **Hablá → Kit Rioplatense** + engenharia do modo consulta | **~10.000** | **O piloto barato.** 12 das 18 partes de M2+M3 já estão gravadas: prova o eixo social com áudio que já existe. Se não funcionar, você descobre por 10k, não por 61k. Resolve a dívida 6 do Apêndice B. O legado continua no ar, intocado |
| **2** | **¡Dime! EN** | **~61.400** | **O SKU de receita.** Maior mercado (UK/US → Espanha), é o que está quebrado, e **é o gargalo do alemão** (1,205×). Roda junto a dívida de perfil, que aqui é **de graça** (só `state.svelte.ts`) — por isso é o primeiro que pode ir à loja |
| **3** | **Phûut! + Shuō! em paralelo** | **~85.000** | Mesma voz-guia (Bia), mesmo comprador PT-BR, mesma grade, e as partes novas de M2/M3 são **estruturalmente gêmeas**. Escreva os dois briefings de uma vez. De-personalização está **no áudio dos quizzes**: mesmo lote de geração |
| **4** | **¡Dime! DE** | **~95.000** | Só com o EN travado, e **só depois do guard de manifesto** |
| **∥** | **Dívida de loja** (perfis hard-coded, sync de exatamente 2 pessoas, onboarding sem data do voo) | ~6.000 (regravação nos 3 PT) | **Trilha paralela, começando na Fase 1.** Bloqueia loja independentemente do tom. Senão você termina ~250k de créditos e ainda não pode publicar |

**Total do retrofit: ~156.000 créditos para os 4 SKUs publicáveis, ~252.000 com o alemão** (INFERÊNCIA sobre unidades FATO). **A decisão de ir a 36 partes em vez de 30 custa ~+67k.** Está aceito: crédito não é o gargalo; a célula vazia de "coisas boas para dizer" é.

**Onde NÃO economizar:** regravar a **narração inteira** das 9 partes do ¡Dime!, não só intro/recap. Reframe leve funciona quando a parte está certa e a moldura está errada (os re-homes de Phûut!/Shuō!). No ¡Dime! a moldura defensiva está **nos `promptPt`**, que é onde o INV-3 vive — *"you're being ripped off, say…"* é um prompt de medo. Meia-reescrita deixa o defeito exatamente no passo que o aluno executa. Diferença: 19.800 vs ~7.000. **Pague os 19.800.**

**Arquivos que mudam (absolutos):**
`D:\dev\_projects\curso-tailandes\docs\PRODUTO.md` (emendas) · `D:\dev\_projects\curso-tailandes\docs\ARQUITETURA-V2.md` (novo) · outlines: `D:\dev\_projects\curso-espanol\src\lib\course\index.ts`, `D:\dev\_projects\curso-mandarim\src\lib\course\index.ts`, `D:\dev\_projects\curso-tailandes\src\lib\course\index.ts`, `D:\dev\_projects\curso-espanha\src\lib\course\index.ts`, `D:\dev\_projects\curso-espanha-de\src\lib\course\index.ts` · conteúdo: `<curso>\src\lib\course\ep-*.json` e `quiz-*.json` · geração: `<curso>\scripts\generate-audio.mjs` (`--balance` antes de cada lote) · dívida de perfil: `<curso>\src\lib\state.svelte.ts` · material bruto das trocas: `D:\dev\_projects\curso-espanha\src\lib\course\ep-e04a.json` (linhas 26–31) e `ep-e04b.json` · precache: `D:\dev\_projects\curso-espanha\vite.config.ts`.

---

## §6 — Engenharia

### 6.1 Navegação com 3 módulos

**Diagnóstico da home atual** (`src/routes/+page.svelte`): responde "quais são os temas?" e não responde nenhuma das duas perguntas que o aluno faz. "Onde parei" só existe como bolinhas dentro do card (linhas 133–139). "O que tem prazo" está enterrado dentro de `e02a`, invisível na navegação — **o produto tem data, mas a UI não tem.** Com 36 partes, três fileiras roláveis empilhadas viram parede.

**Home = 1 âncora + 1 faixa de prazo + 3 módulos colapsáveis:**

- **A. Bloco "Continuar" (topo, um card só).** Seletor `proximaParte()` percorre `niveis` achatado na ordem módulo→episódio→parte e devolve a primeira com `!isDone(id) && pronta`. Mostra cor do módulo, letra, título, e "depois desta: 3C". Abaixo, progresso global: `12/36 partes · Essencial 12/18`. **Resolve "onde parei" sem mudar nada no estado** — o `done` binário por parte basta. `state.svelte.ts` e `sync.ts` ficam intactos, preservando o merge idempotente e evitando o problema de tombstones que o próprio arquivo já sinaliza.
- **B. Faixa "Antes de embarcar".** Banda própria, **fora dos módulos**, listando só as partes marcadas `prazo: 'pre-voo'`, com contagem regressiva se `dataVoo` estiver no localStorage. Estilo checklist, colapsa para "✅ pré-voo feito". É o INV-22 materializado na navegação.
- **C. Três módulos, um expandido por vez.** A fileira de cards-herói fica (é a personalidade visual upbeat; matar isso pela lista de acordeão empurra o app para cara de curso). Por padrão só o módulo do "Continuar" vem expandido; os outros viram uma linha — `Aproveito · 0/10 partes · ▸`. **Ganho colateral: módulo colapsado não renderiza a fileira, então o número de `<img>` na home cai em relação a hoje, mesmo com 50% mais conteúdo.**

**Rejeitado:** tab bar com uma aba por módulo (gasta os slots que o modo consulta precisa, e sugere paralelismo que não existe). **Rejeitado:** acordeão de lista para tudo (perde a pegada visual).

**Barra inferior fixa com DUAS portas:** `Aprender` (home) · `Preciso agora` (`/kit/`). Duas, não quatro. Vive no `+layout.svelte` — 1 toque de qualquer tela, **inclusive de dentro de um episódio rodando**.
- **Por que não FAB:** o player já tem um cacho de botões embaixo (`EpisodioPlayer.svelte` linhas 511–583); um botão flutuante cobre exatamente esses controles.
- **Por que não só o header:** topo é ruim para polegar e já disputa espaço com as pills de perfil (que devem migrar para uma folha de ajustes).
- **Comportamento por data (aditivo):** quando `hoje >= dataVoo`, o `+layout` decide a rota de entrada uma vez por lançamento e o app **abre no `/kit/`**; a home reordena pondo "Preciso agora" acima do "Continuar". **Mas a barra existe sempre** — a necessidade pode aparecer no meio de um episódio, dias antes.

### 6.2 O índice por situação — build, não runtime

`scripts/build-consulta.ts` no `prebuild` emite `src/lib/consulta/index.json` (~50 KB cru, ~12 KB gzip) e `static/consulta-audio.json` (lista plana de `audioKey`, consumida pelo warm-up; fica em `static/` de propósito — quem baixa o kit não carrega chunk de app).

**Por que não `import.meta.glob`:** com `eager: true` seriam **~460 KB de JSON** no chunk da rota de consulta (FATO: `ls -la src/lib/course/` no ¡Dime!), dos quais ~95% é narração que o modo consulta nunca exibe, numa tela que tem que abrir instantânea. Com `eager: false`, 24 imports dinâmicos e os mesmos 460 KB. Os dois são inaceitáveis. **O precedente correto já está no repo:** `quiz-nav.ts` usa glob **só pelas chaves**, "zero bytes de conteúdo".

`index.json` é importado estaticamente **só** por `src/routes/kit/+page.ts` → code-split por rota → a home não engorda um byte. **Verificar no build que o chunk de `/kit/` fica em ~15 KB gzip.**

**Busca:** `.filter()` linear sobre strings normalizadas a cada tecla; ~350 itens = sub-milissegundo. Reusa `normalize()` de `speech.ts` (já ignora acento/caixa/pontuação). **Zero dependência** — Fuse/lunr custariam mais bytes que o índice inteiro.

### 6.3 Offline — a mudança de regra

**FATO (medido no `curso-espanha`):** 940 mp3 / **213 MB**. Destes: **clipes na língua-alvo = 329 · 10,5 MB · média 33 KB**; **narração da voz-guia = 451 clipes · 189,7 MB · média 431 KB**.

> **95% dos bytes de áudio são narração. Tudo que o turista precisa ter na boca cabe em ~10 MB.**

**A nova regra:** *áudio na língua-alvo é ativo sempre-offline; narração da voz-guia é sob demanda.* O corte não é mais "shell vs mídia", é **"os 10 MB que você pode precisar na rua" vs "os 190 MB que você escuta em casa"**. Uma única parte de narração pesa em média 7,9 MB.

**Mecanismo: warm-up explícito, NÃO precache do workbox.** Não colocar os 329 clipes em `additionalManifestEntries`, por três razões concretas: (a) install de precache é tudo-ou-nada — um 404 aborta o SW inteiro, e **este repo já sangrou exatamente por isso** (o bug do `{url:"/"}` documentado nas linhas 17–33 do `vite.config.ts`); (b) baixa 10 MB antes de o usuário consentir; (c) a origem `aleapc.github.io` é **compartilhada** com os outros PWAs do casal — o `state.svelte.ts` já trata quota estourada nessa origem.

`$lib/offline.ts`:
```
garantirKit(onProgress):
  lista = fetch('consulta-audio.json')
  cache = caches.open('audio-clips')        // MESMO cache do player: zero duplicação
  para cada key faltante: fetch(url) → cache.put(url, r)  // GET simples = 200, dribla o Range/206 do iOS
```
É o padrão já provado de `baixarParte` (`EpisodioPlayer.svelte` linhas 306–344), promovido a nível de app.

**Disparos:** automático **uma vez** no primeiro lançamento online, com chip não-bloqueante "preparando o kit para o modo avião… 40%", **pulado** se `navigator.connection?.saveData === true` · manual, botão grande no `/kit/`: "⬇ Deixar o kit inteiro offline (8 MB)" **com o tamanho real escrito** · re-executado quando muda a `versao` emitida pelo build.

**Degradação honesta:** se o warm-up nunca rodou, um `caches.match` em lote marca com ☁ as frases sem clipe. **O texto sempre aparece** — ler a frase da tela é fallback legítimo, e o modo mostrar é 100% texto.

**Duas coisas baratas que faltam:** `navigator.storage.persist()` pedido uma vez num gesto intencional (instalar o PWA ou apertar o botão de offline) — sem isso o iOS pode despejar os 10 MB · `navigator.storage.estimate()` no painel: "Kit 8 MB · Aulas baixadas 24 MB · 240 MB disponíveis".

**Ajustes cirúrgicos no `vite.config.ts`:** garantir que `/kit/` é prerenderizado · adicionar o caminho **explícito** `'client/consulta-audio.json'` ao `globPatterns` — **e não** o curinga `client/**/*.json`, que arrastaria `audio/manifest.json` (220 KB) · adicionar `'client/audio/index.json'` (11 KB), hoje só `StaleWhileRevalidate` (linhas 82–89), senão num primeiro lançamento já offline o app "esquece" que tem áudio.

**O que continua por parte:** download da narração, como hoje. **E não criar botão "baixar o módulo inteiro" sem número:** 18 partes × 7,9 MB ≈ **142 MB**.

### 6.4 O que QUEBRA (lista de verificação antes de tocar em qualquer coisa)

| # | O que quebra | Correção |
|---|---|---|
| 1 | **`ep-c*.json` carrega `nivel: 'intermediario'` gravado dentro do arquivo.** Dissolver a trilha Cultura nos 3 módulos exige reescrever esse campo em ~6 arquivos + `quiz-ep-c*.json` + o mapa `examDoNivel` em `quiz-nav.ts` | Codemod de ~20 linhas. **Script, nunca à mão** |
| 2 | **Duas instâncias independentes de `HTMLAudioElement`** (`speech.ts` tem seu `current`; `EpisodioPlayer` tem o seu). Com a barra inferior, abrir o kit no meio de um episódio toca as duas sobrepostas | **Extrair `$lib/audio.ts` com um único elemento compartilhado. Requisito obrigatório, não opcional** |
| 3 | **`kit.paths.relative: true` no `svelte.config.js`** — a mesma chave vista de `/kit/` e de `/episodio/e04a/` tem string relativa diferente | Sempre resolver com `new URL(rel, location.href).href` antes de comparar/gravar no Cache API |
| 4 | **`curso-espanha-de` tem 938 mp3 em inglês sob chaves alemãs** | Guard no build: falhar se `manifest[key] !== job.text` |
| 5 | **Precache all-or-nothing do workbox** | Nunca `additionalManifestEntries` com os clipes; warm-up (§6.3) |
| 6 | **Anti-padrão 19 do `PRODUTO.md` proíbe literalmente a grade nova** | Emenda escrita na Fase 0, antes de qualquer produção |
| 7 | **Perfis hard-coded e sync que assume exatamente 2 pessoas** | Trilha paralela; bloqueia loja independentemente do tom |

### 6.5 Esforço

| Peça | Esforço | Risco |
|---|---|---|
| `build-consulta` + esquema + `lint-tom` | **S-M** (~0,5 dia) | baixo — script puro, testável sozinho |
| Home reestruturada + barra inferior + hero "continuar" | **M** (~1 dia) | baixo |
| Rota `/kit/` + lista + modo mostrar + cartão de alergia | **M-L** (~1,5 dia) | médio (UI nova de verdade) |
| Offline: warm-up + precache + `persist()` + marcadores ☁ | **M** (~0,75 dia) | **o mais alto** — o custo real é teste em iPhone físico, historicamente o que mais consumiu tempo neste repo |
| Migração de `nivel` da trilha Culture | **S** (script) | baixo |
| Tagging de conteúdo (cards) nas 24 partes | **L em volume**, S em risco | baixo — semeado por script e **curado por remoção**, muito mais barato que taguear do zero |

**Ordem recomendada:** esquema + script → offline warm-up (destrava valor de campo antes de qualquer UI nova) → rota `/kit/` → home. **O lint entra ANTES de a frente de conteúdo escrever o Módulo 3** — vale muito mais como grade de proteção do que como auditoria depois.

**Novo:** `src/routes/kit/{+page.svelte,+page.ts}` · `src/lib/consulta/{taxonomia.ts,index.ts}` · `src/lib/offline.ts` · `src/lib/audio.ts` · `scripts/build-consulta.ts` · `scripts/lint-tom.mjs` · gerados: `src/lib/consulta/index.json`, `static/consulta-audio.json`.

---

## §7 — A régua de tom: **o Índice de Tom (IT)**

**Requisito:** tem que ser um teste que RODA, ANTES de gravar. `scripts/lint-tom.mjs`, dois modos:

- **`npm run tom -- --outline`** — roda **só sobre `course/index.ts`** (títulos, subtítulos, campo `moldura`). Existe **antes de qualquer roteiro escrito**. É o gate da fase de pesquisa/syllabus.
- **`npm run tom`** — roda no `prebuild`, sobre os `ep-*.json` + o índice de consulta. **Falha o build.**

**Por que a régua mede moldura e não palavra:** FATO — a densidade lexical de risco por 1.000 caracteres é ~1,0–2,1 nos quatro cursos, praticamente indistinguível. Contar a palavra "golpe" **não discrimina**. O que discrimina é **sobre o que o episódio é**. Portanto a régua combina **declaração estruturada** + **detecção automática de contradição**: o autor declara, o script confere, e divergência entre declarado e detectado é **erro de build** — o que força o autor a encarar a moldura em vez de deixá-la passar.

### 7.1 Os 8 portões

| # | Portão | Medida | Limite | Falha |
|---|---|---|---|---|
| **G1** | **Moldura de episódio** *(o portão principal)* | cada parte declara `moldura: 'ganha' \| 'protege'`; o script classifica título+subtítulo por léxico de perda/dano/multa/golpe/doença/roubo e **compara com o declarado** | M1 ≤ **4/18** · M2 ≤ **1/10** · M3 ≤ **1/8** · curso ≤ **6/36 = 17%** | erro |
| **G2** | **Saldo apetitivo** | por parte, steps com `tom: 'ganha'` ÷ `tom: 'protege'` | ≥ **2:1** em M2/M3 · ≥ **1:1** em M1 | erro em M2/M3, warning em M1 |
| **G3** | **Densidade de produção** (INV-4) | `responde` por parte | mín. **4** por parte · média ≥ **8** em M1 e M2 · média ≥ **5** em M3 · **≥50% das partes de cada módulo com ≥6** · **exatamente 1 parte** pode ter 0 (o EAR MODULE, `A01`) | erro |
| **G4** | **Anti-palestra** | média de caracteres por clipe de narração, por parte | ≤ **120** | erro. *(FATO hoje: Hablá 48 ✅ · Phûut! 100 ✅ · ¡Dime! 218 ❌)* — é a trava de tom que também economiza mais crédito |
| **G5** | **Permissão** (INV-11) | campo `permissao` não vazio | ≥ **1 por parte** de M2 e M3; ≥1 por parte cultural de M1 | erro |
| **G6** | **TRAVA-A — zero adjetivo de povo** | regex por gentílico + cópula (`os espanhóis são`, `the Spanish are`, `Thai people are`, …), lista por SKU | **0** ocorrências no áudio | erro |
| **G7** | **TRAVA-B + TRAVA-C** | toda ficha cultural com campo `ondeNaoVale` preenchido; ≥1 bloco `espelho` por parte de M3 | 100% | erro |
| **G8** | **Cobertura do modo consulta** | cards por folha da taxonomia; % de cards marcados ⚠ | folha com **0** cards = erro · **`simpatia` ≥ 8 cards** = erro · ⚠ ≤ **15%** do total de cards = erro | erro |

**Além disso, INV-1 emendado vira teste:** toda parte declara `cena` (lugar, momento ou pessoa) não vazia; e nenhum título casa com a lista de categorias gramaticais (`passado`, `subjuntivo`, `condicional`, `conectores`, `classificadores`, `pronomes`, `tempo verbal`, …) = **erro** (R1).

### 7.2 O número único para o dono

O script imprime, ao fim, uma linha:

```
IT  Kit Rioplatense   moldura 5/36 (14%)  ·  saldo 2,8:1  ·  responde 8,4  ·  chars/clipe 61  ·  ⚠cards 9%   → PASSA
IT  ¡Dime! (hoje)     moldura 11/24 (46%) ·  saldo 0,3:1  ·  responde 7,3  ·  chars/clipe 218 ·  ⚠cards  —    → FALHA (G1,G2,G3,G4)
```

**Baseline de calibragem (FATO, medido 27/07/2026)** — a tabela fica no cabeçalho do script, para que ninguém recalibre o limite sem ver o histórico:

| Curso | moldura de perda | `responde`/parte | chars/clipe | veredito na régua nova |
|---|---:|---:|---:|---|
| Hablá | 14% (10/69) | 8,7 | 48 | passaria em G1/G3/G4 |
| Shuō! | 21% | 13,5 | — | passaria (**e é o piso de tom**) |
| Phûut! | 29% | 9,1 | 100 | falha G1 |
| ¡Dime! | **46%** (11/24) | **7,3** | **218** | falha G1, G3, G4 |

### 7.3 O que a régua NÃO faz

- **Não conta palavras de risco.** Já provado que não discrimina.
- **Não julga qualidade de escrita.** Isso é revisão humana com a Ficha de 6 Campos (§3.2).
- **Não substitui o Apêndice A do PRODUTO.md.** Ela é o subconjunto automatizável dele.

---

## Apêndice — Emendas ao `PRODUTO.md` (texto exato, a aplicar na Fase 0)

**1. §5, linha "Nº de partes" — substituir a coluna "Regra geral" por:**
> **36 partes (18 + 10 + 8) é o formato canônico** do produto-viagem a partir da Arquitetura v2 (2026-07-27). O Básico é fixo em 18 e nunca cresce. Os módulos 2 e 3 são ativos de **destino**, cuja pesquisa e roteiro se amortizam por todos os SKUs daquele acervo. Hablá (69) é o **ancestral** e não vai à loja; dele se extrai o Kit Rioplatense de 36.

**2. Anti-padrão 19 — substituir por:**
> **19. Inflar por volume ou por gramática.** 36 partes é **teto**; crescer o Básico, abrir episódio de tempo verbal ou nomear categoria gramatical em título continua proibido. Volume não é qualidade aqui — é diluição do "combinado".

**3. INV-1 — substituir o Teste por:**
> **Teste:** toda parte nomeia uma **cena com consequência** — de **falha** (Módulo 1) ou de **ganho** (Módulos 2 e 3). O título nomeia um lugar, um momento ou uma pessoa — **nunca uma categoria gramatical**. A exceção de "conteúdo de idioma puro" permanece em ≤3 partes por curso.

**4. INV-4 — acrescentar ao Teste:**
> No Módulo 3, majoritariamente receptivo por desenho (INV-9), o piso de 4 `responde` por parte continua, com média ≥5 e **exatamente uma** parte autorizada a ter 0 (o *ear module*, precedente do modo placa). Módulos 1 e 2 mantêm média ≥8.

**5. Novos invariantes (padrão de autoria da camada cultural):**
> **INV-23 — Todo item cultural parte de um SINAL observável e filmável**, nunca de um traço de povo. Teste: zero ocorrências de gentílico + cópula no áudio.
> **INV-24 — Todo item cultural traz o CONTRAEXEMPLO** (onde a regra se inverte: região, geração, formalidade, contexto). Sem ele não é regra, é caricatura.
> **INV-25 — Todo item cultural traz O ESPELHO**: uma linha sobre o comportamento do ALUNO que é estranho lá.
> **INV-26 — Saldo apetitivo ≥2:1** por parte cultural (itens de ganho ÷ itens de perda).

**6. Apêndice A — acrescentar três linhas:**
> - [ ] A parte contribui **≥1 card de consulta**, e não cria folha vazia na taxonomia
> - [ ] `npm run tom` passa nos 8 portões (§7 da Arquitetura v2)
> - [ ] Se é parte de M2/M3: há **permissão explícita**, e o bloco de fecho é "Leitura em foco", não gramática

**7. Apêndice B — marcar a dívida 6 como RESOLVIDA** pela extração do Kit Rioplatense, e acrescentar a dívida nova: *"`curso-espanha-de` tem 938 mp3 em inglês sob chaves alemãs; guard de manifesto obrigatório antes de qualquer build."*

---

## Pendências que exigem decisão ou conferência antes de virar áudio

1. **`simpatia` está vazio e é o tile que carrega a virada de tom.** ~6 momentos × 3–5 cards de conteúdo novo autorado. **Não é derivável** — não existe no corpus. É a menor unidade de trabalho que muda a personalidade do produto inteiro, e agora tem endereço.
2. **Só 7 cenas com travessão no ¡Dime!** (32 pares derivados). Para cobrir ~350 cards com "WHAT COMES BACK" faltam trocas. Duas saídas: (a) a convenção do travessão vira **obrigatória** em toda parte nova (custo de autoria: zero, já é o estilo); (b) para o acervo existente, um passe humano de rótulo — a fala já existe, falta o veredito.
3. **Não foram medidos Phûut!/Shuō! para o modo consulta.** As convenções (👂, travessão, `audioKey` estável) são de família, mas **confirmar antes de prometer o mesmo custo de porte**.
4. **Conferir antes de virar áudio (Espanha):** (a) `ilc_mddw01` Espanha vs UE, ano corrente; (b) OCDE tempo à mesa, série e ano, com Espanha explícita; (c) **rank da Espanha em Levine & Norenzayan 1999 — NÃO OBTIDO, portanto não citar ritmo de vida da Espanha em lugar nenhum**; (d) EET/INE nova edição prevista para o **4T/2026**; (e) pontualidade ferroviária (compromisso oficial da Renfe) como contraexemplo do "mañana".
5. **A classificação Espanha = "contact culture" vem de tipologia, não de observação da Espanha.** O melhor estudo observacional europeu de distância/toque (Remland, Jones & Brinkman, *J. Social Psychology* 135(3), 1995) **não incluiu a Espanha**. Rotular **CONSENSO**, nunca "estudos mostram que os espanhóis tocam X vezes mais". O que importa é o protocolo (`dos besos`: direita primeiro, social e nunca comercial, quem oferece a mão decide) + a dispensa explícita: *"If you offer a hand, nobody in Spain is offended. Ever."*
