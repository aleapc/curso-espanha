> ⚠ **DOCUMENTO SUPERADO.** Seu conteúdo normativo foi absorvido pelo `docs/PRODUTO.md`, que é a fonte única de verdade. Este arquivo fica como rastro de origem: a pesquisa de detalhe e as medições que ele carrega continuam sendo fonte citável, mas **nenhuma regra daqui vale contra o PRODUTO.md**.

---

# EMENDA DO NÚCLEO GERADOR — ao `ARQUITETURA-V2.md`

> **Status:** documento canônico. **Substitui integralmente a "tabela de exílio da gramática" (§1.3, trava R5 do ARQUITETURA-V2)** e é a peça referida em `PRODUTO.md` §0, tabela "O que muda e o que fica", linha *"A tabela de exílio de gramática (ver a Emenda do Núcleo Gerador)"*.
> **Vigência:** 2026-07-27. Aplica-se aos 20 SKUs do catálogo Kit de Bordo.
> **Leitura obrigatória** para todo agente que produza episódio, syllabus, `aprofundar`, card de consulta ou copy de loja.
> **Régua de evidência:** **FATO** = medido no repo ou lido em fonte citada · **INFERÊNCIA** = projeção declarada · **NÃO CONFERIDO** = conhecimento do autor, não passou por fonte externa nem revisor nativo. Nunca inventar.
> **Origem:** correção do dono do produto, 2026-07-27 — *"Tempos verbais e outros elementos que se aproximam dos cursos clássicos de línguas têm seu papel no que estamos fazendo. Sem o ferramental básico, numa situação de turismo, o turista pode se perder simplesmente porque não demos as ferramentas necessárias."*

---

## §0 — O erro que esta emenda corrige

### 0.1 O pêndulo foi longe demais

A spec tinha um problema real a resolver: o Hablá nasceu curso, ganhou 21 partes de escada gramatical (subjuntivo, condicional, conectores) e provou que "eixo de progressão gramatical" produz peso morto de viagem. A resposta foi correta em direção e excessiva em amplitude: a `R5` decretou que *"a gramática que a cena exige vive nestes endereços e em nenhum outro"*, e despachou **passado, futuro, condicional, subjuntivo e comparativo para M2/M3**.

O efeito colateral é estrutural, não estilístico. **Lida ao pé da letra, a R5 exila o ferramental do Básico inteiro** — porque `quería` é condicional/imperfeito de cortesia, `me han robado` é pretérito perfeito composto, `¿me pone?` é presente de cortesia, e os três vivem em **M1**, nas cenas B11/B12/B14/B17. A trava escrita para impedir que M2 virasse aula de gramática acabou proibindo, no papel, as frases que o próprio produto já grava.

Pior: a tabela está **indexada pelo eixo errado**. A coluna 1 chama-se *"Gramática inevitável"* e as células dizem `Passado`, `Subjuntivo`, `Comparativo`. **Uma tabela cuja chave primária é o nome do paradigma é uma tabela de paradigmas, mesmo com "exílio" no título.** O próximo agente lê "Passado → M2" e escreve um episódio de passado. A tabela reimporta o problema que ela existe para expulsar.

### 0.2 O teto do inventário fixo

Um kit só de frases prontas funciona enquanto a realidade segue o roteiro. Quando a cena desvia dois graus, o turista não consegue **montar** uma frase — só repetir as que decorou. É exatamente a limitação que a spec atribui ao phrasebook concorrente (`PRODUTO.md` §7a: *"perdem porque são visuais, mudos, e não fazem você produzir"*), e nós a estávamos reproduzindo com áudio: **fazemos ele produzir, mas produzir só o que escrevemos.**

**O exemplo concreto, medido no próprio produto.** O inventário do ¡Dime! ensina a frase 97: `El aire acondicionado no funciona.` O aluno chega ao hotel à meia-noite. O ar-condicionado funciona perfeitamente — o problema é que a janela dá para a praça e a praça tem uma banda. **Não há defeito. Há um pedido.** A frase certa é `Quería otra habitación, si es posible.` — sete palavras, zero vocabulário novo em relação ao que ele já sabe, e **impossível de produzir**, porque `quería` não existe em lugar nenhum do produto.

**FATO (medido 27/07/2026, grep sobre `D:\dev\_projects\curso-espanha\docs\pesquisa-espanha.md` + `syllabus-espanha.md`):** `quería`, `ya pagué`, `reservé`, `dejé`, `no funcionó`, `me gustaría` — **zero ocorrências nos três documentos**. O eixo temporal do SKU Espanha está hoje inteiramente descoberto.

### 0.3 A prova de que o produto já usa os geradores e não os ensina

**FATO (mesma medição, `pesquisa-espanha.md` + `syllabus-espanha.md`):**

| Estrutura | Frases-alvo distintas que ela já gera no inventário | Está na tabela §5.M dos moldes declarados? |
|---|---:|---|
| `¿Puedo / ¿Me puede / ¿Puedes / ¿Se puede + [inf]` | **14** | **não** |
| `¿Hay + [X]?` (+ `¿Dónde hay…?`) | **8** | **não** |
| `¿Lleva + [X]?` | 5 | sim |
| `Me han robado + [X]` | 4 | sim |
| `[X] no funciona` | 3 | sim |

**A §5.M declara exatamente 6 moldes. As duas estruturas de maior alcance medido no próprio inventário não estão nela.** O aluno decora 22 frases soltas e não consegue montar a 23ª — `¿Puedo validar aquí?`, que ninguém escreveu porque ninguém sabia que ele ia precisar.

**FATO independente (medição sobre o corpus gravado, `src/lib/course/ep-*.json` dos 4 cursos, 27/07/2026):**

| corpus | arquivos | steps | `responde` | alvos de **produção** únicos | cobertos por molde **declarado** | **decorados isoladamente** |
|---|---:|---:|---:|---:|---:|---:|
| Phûut! (th) | 24 | 979 | 219 | 115 | 49 (**43%**) | 45 (39%) |
| ¡Dime! (es→EN) | 24 | 765 | 175 | 143 | 33 (**23%**) | 85 (59%) |
| Shuō! (zh) | 24 | 1.289 | 323 | 130 | 27 (**21%**) | 91 (70%) |
| Hablá (es-rioplatense) | 69 | 2.528 | 600 | 372 | 9 (**2%**) | 293 (79%) |

*Ressalva de método: a atribuição frase→molde é por regex sobre a frase-alvo; erra para mais em moldes genéricos e para menos onde o encaixe muda a superfície. Tratar como ±5 pp. `responde` cujo alvo está em português é quiz de escuta, não produção, e foi excluído do denominador (25% dos `responde` do Phûut!, 32% do Shuō!).*

**O achado que dói:** o curso com **69 partes e gramática explícita** é o que tem **menos molde** — 4 declarados, contra 11–13 dos cursos de 24 partes. Onde há paradigma, não há molde. E o campeão de geração (Phûut!, 43%) é o curso que mais diz a palavra "molde" em voz alta: **37 ocorrências** no áudio, contra **0** no Hablá.

### 0.4 O que esta emenda faz

1. Substitui a dicotomia implícita *"gramática = veneno"* por **quatro categorias operacionais** (§1).
2. Dá o **critério de corte falsificável** que o dono pediu — refinado, porque o proposto, lido ao pé da letra, **aprova o pretérito** (§1.2).
3. Declara **o núcleo gerador do espanhol**: 8 moldes principais + 8 de segunda linha, com casa e redisparos na grade de 36 (§2).
4. Admite **os tempos verbais que entram**, corrigindo três dos quatro exemplos do próprio `PRODUTO.md` §0 (§3).
5. Nomeia **o que fica de fora com o contorno** que o turista usa no lugar — nunca omissão silenciosa (§4).
6. Especifica **o formato do molde em áudio**, com copy real e o "momento do clique" (§5).
7. Entrega o **procedimento de derivação para qualquer língua nova**, sem linguista (§6).
8. Audita o acervo e nomeia **os buracos** (§7).
9. Acrescenta **G9 — a taxa de geração**, o portão numérico que impede o produto de voltar a ser inventário fixo (§8).
10. Escreve as **emendas de texto exatas** ao `ARQUITETURA-V2.md` e ao `PRODUTO.md` (§9).

**O que esta emenda NÃO faz:** não muda a grade de 36 (18+10+8), não abre parte nova, não mexe em INV nenhum além dos declarados em §9, não gasta um crédito de TTS que não estivesse orçado. **O núcleo gerador não é conteúdo novo — é o mesmo conteúdo, ensinado de um jeito que gera.**

---

## §1 — A distinção canônica

### 1.1 Quatro categorias substituem a dicotomia

PARADIGMA × NÚCLEO GERADOR está certo e é insuficiente: **tem duas portas e o problema tem quatro.** Como dicotomia pura, ela reprova coisas sem as quais o produto sai errado em 100% das falas (o `khráp`, o `-masu`) e não tem onde pôr o que o turista precisa **entender** e nunca vai dizer.

| Categoria | Definição operacional | Como se ensina | Exemplo FATO do repo |
|---|---|---|---|
| **MOLDE ABERTO** | casca congelada + buraco que o aluno preenche com uma palavra que ele pega no cardápio, na placa ou na vitrine | encaixe livre, ≥2 substituições treinadas em voz alta (INV-14) | `[coisa] + huài le` (m06b) · `[coisa] + sǐa` (t06b) · `¿Lleva + [X]?` (e04a) |
| **MOLDE FECHADO** | mesma casca, mas a palavra **muda de forma ao entrar** no buraco, ou o conjunto de encaixes é finito e curto | 4–8 encaixes gravados inteiros + a frase dita em voz alta: *"a lista é a lista"* | `Ya está + [pagado/reservado/hecho/incluido]` · turco `-siz` (INFERÊNCIA) |
| **PEDÁGIO** | não tem buraco. É o acabamento obrigatório de **toda** frase; sem ele a frase é indizível ou sai rude | constante decidida **uma vez** no onboarding, depois invisível — nunca apresentada como sistema com alternativas | `khráp`/`khâ` (FATO, `ep-c03b.json` linha 17) · japonês `-masu` (INFERÊNCIA) |
| **DESTRAVA DE OUVIDO (T3)** | não se produz nunca; é o que separa *sim* de *não* na fala **deles** | modo placa (INV-9) aplicado à morfologia: ouviu X → faça Z. Zero `responde` | `vosotros` (pesquisa-espanha §4.2) · `méi yǒu` · `mâi mii` |

E, fora das quatro, a categoria que já existia e continua legítima: **INVENTÁRIO CONGELADO** — frase inteira, zero encaixe (`¿Quién es el último?`, `Buenos días`). Não é fracasso; é a forma certa para o que não rende.

**O que unifica as quatro, e vale para qualquer tipologia, em uma linha:**

> ### Núcleo gerador = congelar o sistema, abrir o mundo. Paradigma é quando a casca varia.

### 1.2 O critério de corte — criticado e refeito

O critério proposto — *"entra se destrava frases que não escrevemos; fica fora se só serve para passar numa prova"* — está certo na direção e **é inutilizável como regra de autoria**. Três defeitos, todos fatais em uso real:

1. **Não é falsificável.** Toda regra gramatical destrava frases que não escrevemos — é literalmente o argumento de venda de uma conjugação. O pretérito espanhol destrava milhares. **Lido ao pé da letra, o critério aprova o pretérito**, que é exatamente o que ele existe para barrar.
2. **A segunda metade nunca dispara.** Não existe prova neste produto. Ninguém vai chegar com uma proposta rotulada *"isto serve para passar numa prova"*. É retórica, não portão.
3. **Não decide a pergunta operacional.** A pergunta que o autor de fato enfrenta não é "entra ou sai" — é **"entra como forma fixa ou como molde, e se molde, aberto ou fechado?"**

**A linha do dono, reescrita para caber num briefing:**

> ### Entra o que muda o que você pode DIZER quando a cena sai do roteiro. Fica fora o que só muda o que você pode EXPLICAR sobre o que disse.

O paradigma é **metalinguístico** — te deixa falar *sobre* a língua. O núcleo gerador é **combinatório** — te deixa falar.

### 1.3 Os portões (a versão operável)

**Três portas de entrada. Uma basta.**

- **PORTA 1 — RENDIMENTO.** Uma troca de peça, decidida numa única escolha, destrava **≥10 frases úteis que não escrevemos**.
- **PORTA 2 — PEDÁGIO.** Sem ela a frase é indizível ou soa errada em ~**100%** das falas do curso. (Esta porta é indispensável: `khráp`, `-masu`, `bonjour`, o partitivo francês **não destravam frase nenhuma** — habilitam todas. A régua sem ela corta o pedágio e o produto sai errado inteiro.)
- **PORTA 3 — OUVIDO.** É a diferença entre "tem" e "não tem" na resposta que ele vai receber. (Esta porta responde diretamente à queixa que originou o trabalho: *"o turista se perde"* quase nunca é falha de produzir — é falha de **entender a resposta**.)

**Três portões de admissão. Um "não" reprova.**

- **P1 — MUNDO, NÃO SISTEMA.** *(O corte real. Os três dossiês chegaram nele independentemente.)* O buraco é preenchido por uma **coisa do mundo** — substantivo, infinitivo, número, lugar, ingrediente, sintoma, defeito, objeto perdido. **Nunca** por algo do sistema — pessoa, tempo, modo, aspecto, gênero gramatical, forma flexionada. **Escolha, não cálculo.** É este portão, e só ele, que mantém `quería + [X]` dentro e "o pretérito" fora: em `quería`, o lado do sistema está congelado numa forma só e apenas o mundo varia. Mesma estrutura formal, decisão oposta.
- **P2 — ALCANCE CRUZADO.** ≥5 encaixes plausíveis nos 12 dias de viagem, e **≥3 deles em partes diferentes** daquela onde o molde é ensinado. *Alcance dentro da mesma cena não é alcance — é lista de frases.* Quatro substituições no mesmo balcão é prática em bloco: parece boa na sessão e não transfere.
- **P3 — DEGRADA COM ELEGÂNCIA.** Encaixe errado ainda entrega o resultado (`quería dos cerveza` traz duas cervejas). **Se o encaixe errado for pior que não falar, é forma fixa, não molde.** É por isso que a frase-martelo de alergia continua congelada (INV-12) e os imperativos (`ponga`/`pon`) continuam cinco formas fixas.

**Dois portões de forma. Decidem COMO entra, não SE entra.**

- **P4 — TESTE DE INVARIÂNCIA DA CASCA.** Escreva o molde com **5 encaixes escolhidos para serem máximo diferentes** (masc/fem, sing/plural, terminado em vogal/consoante, animado/inanimado, nativo/estrangeirismo) e **compare as cascas caractere a caractere**:

| Resultado | Classificação | Como se ensina |
|---|---|---|
| casca idêntica 5/5 | **MOLDE ABERTO** | encaixe livre |
| casca varia em ≤2 formas | **ABERTO DE 2 FORMAS** | *"tem duas terminações, escolha de ouvido"*. **Nunca uma tabela** |
| varia em >2 formas | rode **P4b** antes de fechar | |
| **P4b** | procure **outro frame sintático que aceite a forma de dicionário** | se existir, use-o e volte a ABERTO; se não, **FECHADO**: 4–8 encaixes gravados inteiros + *"a lista é a lista"* |

- **P5 — AUDITÁVEL.** ≥2 substituições treinadas em voz alta (INV-14) · **≥2 recalls em partes posteriores, com encaixe novo** · **≥2 tiles do modo consulta**. Molde que não é recuperado em ≥2 partes posteriores **não é molde, é frase** — vai para o inventário. Isto põe o molde dentro do `build-consulta` e do lint, em vez de dentro de uma opinião.

**Kill-switch de redação:** se explicar o molde exige dizer a palavra da forma — *"imperfeito"*, *"condicional"*, *"subjuntivo"*, *"registro polido"* — o molde não está pronto. A explicação vai para `aprofundar`; o áudio recebe só a costura (§5, batida 3).

**Desempate por número, não por opinião** (para a fronteira fórmula-congelada × molde): **0 encaixes treinados = inventário · 2–5 gravados = molde fechado · encaixe que o aluno pega do cardápio/vitrine/placa = molde aberto.**

### 1.4 A trava estrutural, escrita antes de qualquer roteiro

> ### Nenhum molde ganha parte própria.

Molde não é episódio; é a **espinha que atravessa episódios**. Isto não é estética — é o que impede R1 e o anti-padrão 1 de serem violados pela porta dos fundos ("Parte 12: os moldes"). O molde **nasce dentro da cena em que primeiro paga** e reaparece como `responde` de callback (INV-16) nas seguintes. Cada molde tem uma **CASA** e **≥2 REDISPAROS**.

**Corolário de alocação, que protege R2 e R3:**
- **M1 concentra os moldes por desenho.** M1 *é* o núcleo gerador — "me viro" quer dizer exatamente isso.
- **M2 não introduz molde nenhum. M2 troca os encaixes.** Mesmo `¿Me pone…?`, mas agora o encaixe é `una caña y un pincho de tortilla` em vez de `un café`. Regra fácil de lembrar num briefing, e protege a âncora de consumo.
- **M3 não produz molde nenhum** (R3). A relação de M3 com os moldes é **auditiva** — ver §2.4.

### 1.5 Casos de fronteira, resolvidos

| Caso | Veredito | Por quê |
|---|---|---|
| **`¿Se puede + [inf]?`** | **forma fixa** (`¿Se puede?`, duas palavras, dita apontando) | Quase-duplicata de `¿Puedo + inf?`. **Dois moldes com o mesmo slot competem sob estresse, e competição custa recuperação.** Uma frase congelada; o resto dobra em `¿Puedo…?` |
| **`Me gustaría + [inf]`** | **cortado, e nomeado** para que um agente futuro não o traga de volta | É o "I'd like" do livro didático, e é **exatamente o acolchoamento que a pesquisa §3.4 diz que deixa o britânico sem ser servido**. `Quería` faz o mesmo trabalho em menos sílabas e soa local |
| **`¿Está + [adj]?`** (`abierto`, `libre`, `incluido`) | **congelado de propósito. Recusa deliberada, registrada.** | Já são chunks da camada (a) da pesquisa §4.4. **Promovê-los a molde reabre ser/estar pela porta dos fundos** |
| **Imperativos** (`Póngame`, `Pare aquí`, `Deme`, `Quédese con el cambio`) | **5 formas fixas. Recusa deliberada de unificar, registrada.** | É onde a divisão tú/usted é morfologicamente mais feia (`pon`/`ponga`, `para`/`pare`) e onde encaixe errado soa genuinamente ríspido. **Reprova em P3** |
| **`¿Cuánto cuesta / cuánto es?`** | **par fixo** | Não há slot. `¿Cuánto es?` (total, no balcão) + `¿Cuánto cuesta?` (este item) + o dedo. Chamar de molde infla a contagem sem entregar geração |
| **`No + [verbo]`** | **dispensa de 15 s em B12**, não molde | A negação espanhola é **de graça** para o anglófono — mesmo modelo mental. Vira permissão (INV-11). Único ponto não-grátis: dupla negação (`no hay nada`), **só reconhecimento** |
| **`Me alojo en + [endereço]`** | **frase** | 1 uso na viagem inteira. Reprova em P2. E está tudo bem ser frase |
| **`Me han robado + [X]`** (pretérito perfeito congelado dentro) | **molde aberto** | O aluno nunca constrói o perfeito: a cabeça `me han robado` é uma unidade inquebrável de quatro sílabas. Passa P1 porque o buraco é objeto |
| **Encaixe que é NÚMERO** (`[nº] bàat dâai mǎi?`) | **molde, com licença explícita de MOSTRAR** | Buraco do mundo, mas atrás dele há um subsistema caro (dezenas, classificadores, contadores). Do lado receptivo entra normalmente; do lado produtivo, **o aluno tem permissão declarada de mostrar o número** — dedo, calculadora, teclado do celular. É INV-12 aplicado a número, e resolve japonês e turco de uma vez |
| **`Un poco de + [X]`** | **congelado dentro de `Hablo un poco de español.`** | O que justifica esse molde no Phûut! é a escala de picante. **A cozinha espanhola não é apimentada.** Portar o molde é portar a cena errada — anti-padrão 13 |

**Refinamento no molde existente `Tengo ___` (§5.M):** a tabela mistura estado do corpo (`calor`, `hambre`) com posse (`una reserva`) no mesmo slot. Funciona (todos são substantivos nus), mas são **dois beats de ensino diferentes** — o primeiro mata o cluster `caliente`, o segundo é logística de balcão. Separar na autoria, manter o mesmo molde.

---

## §2 — O núcleo gerador do espanhol

### 2.1 Os 8, ranqueados por cobertura de cena real

Ranqueamento por **cobertura de cena**, não por frequência de corpus. Se só coubessem 8 no curso inteiro, seriam estes.

| # | Molde | Encaixe | O que destrava — exemplos que **não escrevemos** | Alcance |
|---|---|---|---|---|
| **1** | **`Quería + [substantivo]`** | qualquer coisa que se pede num balcão | `dos billetes para Sevilla` · `una habitación para tres noches` · `algo para el dolor de garganta` · `el coche a nombre de García` · `una tarjeta SIM solo datos` · `medio kilo de esto` · `otra habitación, si es posible` | **9 das 36 partes.** O abridor universal de balcão: bilheteria, recepção, farmácia, padaria, loja, locadora, comisaría |
| **2** | **`¿Puedo + [infinitivo]?`** | qualquer coisa que **eu** quero fazer | `pagar con tarjeta` · `sentarme aquí` · `dejar la maleta` · `probármelo` · `entrar con esto` · `aparcar aquí` · `sacar una foto` · `usar el baño` · `cambiar el billete` · `validar aquí` | **14 frases já medidas no inventário.** Cobre a categoria de improviso mais comum do turista — *"isso aqui pode?"* — que existe porque **as regras mudam de cidade e ele não sabe quais** (ZBE, terraza, foto, bagagem, cartão) |
| **3** | **`¿Hay + [X]?`** | existência de qualquer coisa | `wifi` · `baño` · `mesa` · `sombra` · `otro tren` · `descuento` · `algo sin gluten` · `farmacia por aquí` · `alguien que hable inglés` | Substitui um vocabulário inteiro de perguntas por uma só, **e a resposta é binária e cabe na cabeça dele** — que é o princípio de desenho que a spec já escreveu em B08. É também o contorno canônico do subjuntivo |
| **4** | **`¿Me pone / Me pones + [X]?`** | bebida, comida, quantidade, no balcão | `una caña` · `dos cortados` · `medio kilo de tomates` · `un pincho de tortilla` · `otra ronda` | O molde-mãe já declarado na §5.M. 4º e não 1º porque é específico de balcão de bar/mercado, enquanto 1–3 são universais. Mas é a cena que dá nome ao SKU: sem ele o aluno não é servido |
| **5** | **`sin / con / para + [X]`** *(clipe, não frase)* | ingrediente, formato, destinatário, finalidade | `sin gluten` · `sin hielo` · `sin gas` · `sin cebolla` · **`sin conversión`** · `para llevar` · `para compartir` · `para dos` · `para mí` · `para el seguro` | **O melhor retorno por unidade ensinada de toda a lista.** Duas palavras, verbo nenhum, e funciona como enunciado inteiro (`Sin hielo, por favor.` satisfaz INV-2 sozinho). Carrega a frase que mais dinheiro economiza no curso (`sin conversión`, DCC). Cola em todos os outros sete |
| **6** | **`¿Lleva + [ingrediente]?`** | qualquer ingrediente | `gluten` · `ajo` · `jamón` · `caldo de pescado` · `harina` · `frutos secos` · `cebolla` · `leche` | Entra por **aposta × indeterminação**, não por frequência. A lista de ingredientes-armadilha é **aberta** (jamón no feijão-verde, caldo de peixe na paella "de verduras"): é a prova mais limpa de que inventário fixo não fecha — nenhum roteirista pré-escreve a pergunta sobre o ingrediente que ele não sabe que está no prato |
| **7** | **`¿Dónde está + [el/la X]?`** *(par com `¿Dónde hay un/una…?`)* | lugar conhecido × lugar qualquer | `el baño` · `la salida` · `el andén 4` / `un cajero` · `una farmacia` · `un súper` | Alto por frequência; **7º e não 3º por honestidade** — o problema desta cena é a resposta, não a pergunta. **Entra amarrado à escotilha:** `¿Está lejos?` + `¿Me lo escribe?` + o dedo. Ensinar a pergunta sem o reparo é fabricar o congelamento |
| **8** | **`¿Me puede + [infinitivo]?`** | qualquer coisa que eu quero que **você** faça | `escribir` · `repetir` · `hablar más despacio` · `recomendar algo para…` · `avisar en cocina` · `dar la factura` · `llamar un taxi` | Ganha o 8º lugar **por preço**: é o molde 2 no espelho, custa meia unidade de ensino, e traz junto o kit anti-pânico (`¿Me lo escribe?`), que é a heroína deste par |

**Por que `Quería` é o número 1, e a razão é estrutural, não estilística:** é o único da lista que **não codifica interlocutor**. `¿Me pones?` vs `¿Me pone?` obriga a decidir tú/usted sob estresse — exatamente a decisão que a pesquisa §4.1 documenta que o anglófono toma ao contrário. `Quería` é 1ª pessoa e invariante diante de qualquer espanhol.

**O teste do conjunto — um dia fora do roteiro, coberto pelos 8.** O trem reservado não existe mais; ele compra outro (**1**), descobre se o bilhete vale para o aeroporto (**3**), não sabe se tem de validar e improvisa `¿Puedo validar aquí?` (**2**), acha a plataforma (**7**), não entende a resposta e pede por escrito (**8**), almoça num sítio sem carta em inglês (**4**), confere se o arroz leva caldo de peixe (**6**), pede sem cebola e para levar (**5**). **Nenhuma dessas oito frases foi escrita por nós.** É esse o teste que o inventário fixo reprova.

### 2.2 Tier 2 — entram, mas não sobrevivem a um corte pela metade

| Molde | Tipo | Nota |
|---|---|---|
| **`Otra / Otro + [X]`** | aberto | `Otra, por favor.` é enunciado completo **sem substantivo nenhum** — INV-2 limpo, custo zero. Depois `otra ronda` · `otra habitación` · `otro tenedor` · `otro día`. É o molde que te dá de novo aquilo que você já conseguiu — 90% do que um turista quer depois do primeiro acerto |
| **`[X] no funciona`** | aberto | Já existe. Presente é a forma certa: a queixa é sobre o estado atual, não sobre um evento passado |
| **`Ya está + [pagado/reservado/hecho/incluido]`** | **fechado (4)** | Ver §3(b) |
| **`Soy / Estoy + [lista fechada]`** | **fechado (6)** | `alérgico/a` · `vegetariano/a` · `celíaco/a` · `de Londres` / `perdido/a` · `listo/a`. **Fechado é a feature:** com lista fechada o aluno não pode inventar `soy aburrido` |
| **`Voy a + [infinitivo]`** | aberto | `Voy a pagar con tarjeta`, dito **antes** de aparecer a maquininha, é a versão preventiva do aviso de DCC — melhor que a corretiva. Encaixe = infinitivo, P1 limpo. **Exige a emenda de §9: hoje o "futuro/planos" está exilado em M2** |
| **`¿Tengo que + [infinitivo]?`** | aberto | `¿validar?` · `¿hacer transbordo?` · `¿reservar?` · `¿llevar algo?`. **Só a interrogativa.** A declarativa (`tengo que irme`) sai — declarar obrigação é conversa; perguntar por ela é operação |
| **`Me han robado + [X]`** | aberto | Já existe. Alto risco, baixa frequência |
| **`Me he dejado + [X] + [lugar]`** | **fechado (4–5)** | Novo. Ver §3(e) |

**Teto do SKU: 8–12 moldes declarados no curso inteiro.** O teto não é estético — é orçamentário, e a razão está em §5.4: o molde não custa a apresentação, custa a **agenda de recall**.

### 2.3 Onde cada molde mora na grade de 36

| Molde | CASA (onde é ensinado, ≥2 substituições) | REDISPAROS (callback INV-16, encaixe novo) | Tiles do consulta |
|---|---|---|---|
| `¿Me puede + [inf]?` | **B03** kit anti-pânico | B13 (`avisar en cocina`) · B14 (`la factura`) · B17 · I07 | `reparo`, `saude`, `pagar` |
| `¿Hay + [X]?` | **B08** "Onde fica?" | B11 · B12 · B16 · B17 · I01 · I03 | quase todos |
| `¿Dónde está…?` + `¿Dónde hay…?` | **B08** (par ensinado junto: coisa definida × coisa qualquer) | B06 · B09 · B17 | `chegar`, `transporte`, `saude` |
| `¿Puedo + [inf]?` | **B06** primeiros 60 minutos | B09 · B14 · B15 · B16 · I09 | `pagar`, `compras`, `quarto`, `taxi` |
| `Quería + [X]` | **B09** bilhete, validar, entrar | B11 · B15 · B16 · B17 · I03 · I10 | `mesa`, `compras`, `quarto`, `saude`, `transporte` |
| `¿Me pone / pones + [X]?` | **B11** sentar e pedir a primeira rodada | B15 (`Póngame medio kilo`) · I02 (a variante ultracurta `Ponme` entra como **permissão**) | `mesa`, `compras` |
| `sin / con / para + [X]` | **B12** — o slot que a spec já nomeia como o slot dos moldes | B13 · **B14 (`sin conversión`)** · B15 (`para llevar`) · I03 | `mesa`, `dieta`, `pagar` |
| `¿Lleva + [X]?` | **B13** alergia e restrição (intocável) | B11 · I03 | `dieta`, `mesa` |
| `Otra / Otro + [X]` | **B11** | I04 · B16 | `mesa`, `quarto` |
| `[X] no funciona` | **B16** check-in e o quarto | B14 (`la tarjeta no ha funcionado`) | `quarto` |
| `Ya está + [particípio]` | **B14** a conta | B11 (`¿está incluido?`) · B16 (tasa turística) · I10 | `pagar`, `quarto` |
| `Soy / Estoy + [lista]` | **B13** (`Soy alérgico/a`) | B05 (`Soy de…`) · B08 (`Estoy perdido/a`) | `dieta`, `chegar` |
| `Voy a + [inf]` | **B14** (`Voy a pagar con tarjeta`, antes da maquininha) | B07 · B16 · I04 | `pagar`, `taxi` |
| `¿Tengo que + [inf]?` | **B09** (`¿validar?`) | B16 · I08 | `transporte`, `quarto` |
| `Me han robado + [X]` | **B17** (a única parte declaradamente defensiva de M1) | escalada completa no tile `apuro` | `apuro` |
| `Me he dejado + [X]` | **B18 "O último dia"** | tiles `taxi`, `quarto`, `transporte` | `apuro`, `taxi` |

**Nota sobre B18:** pôr a recuperação de objeto na parte de despedida é deliberado — coloca uma habilidade de **recuperação** dentro da parte upbeat de fecho, em vez de abrir mais um episódio de perda. Ganha a régua G1 e ganha a cena (é literalmente quando se esquece coisa).

### 2.4 O uso mais barato e mais alto dos moldes em todo o curso: M3

**Recomendação concreta.** O drill de **A01 (EAR MODULE, zero `responde`)** deve ser **os oito moldes ouvidos em velocidade real** — Madri e depois Sevilha, com `-s` aspirado e `-d-` caído: `¿Me poneh una caña?` · `¿Hay algo pa' picá?` · `¿Puedo pagá con tarjeta?`.

**Custo de autoria: zero frase nova** — as frases já existem e já estão gravadas. **Valor:** o aluno descobre que **já sabe** o que está ouvindo, que é a virada emocional exata que A01 precisa entregar. É a melhor relação valor/custo de M3 inteiro. A05 (a outra língua) redispara os mesmos moldes em `vosotros` (`¿Qué vais a tomar?`) — também 100% receptivo, também sem custo novo.

---

## §3 — Os tempos verbais que ENTRAM

Cada item com o **caso de perda concreto** que o justifica e o estatuto final. Três dos quatro exemplos citados em `PRODUTO.md` §0 precisam de correção de **forma** — a necessidade está certa em todos, a frase proposta está errada em três.

### (a) `quería` — CONFIRMADO. Entra como **MOLDE ABERTO**. Justificativa corrigida.

**Caso de perda:** o aluno só tem `¿me pones?` (registro de bar, `tú`) e leva isso para a recepção do hotel, o guichê da Renfe, a farmácia e a locadora. Ou, pior, congela — porque ele sabe que aquilo não cabe ali.

**A correção de enquadramento, e ela é importante.** O `PRODUTO.md` §0 justifica `quería` por *"não soar grosseiro"*. **Isso contradiz o achado pragmático central do próprio SKU.** A pesquisa §3.4 ensina literalmente que `Ponme una caña` **não é grosseiro, é normal**, e que o erro do britânico é o **excesso de acolchoamento** (base: Hickey, *Politeness in Spain: Thanks But No 'Thanks'*, 2005 — Espanha próxima do polo de cortesia **positiva**, Grã-Bretanha de cortesia **negativa**). Se `quería` entrar como corretivo de grosseria, o curso ganha duas linhas brigando dentro dele, e a que perde é a **permissão** — que é justamente o material INV-11 deste par.

**As razões que sobrevivem ao critério:**
1. **Zero morfologia de interlocutor** — o argumento forte, e é estrutural.
2. **É o registro dos balcões onde `ponme` não cabe.**
3. **O encaixe é substantivo nu** — P1 limpo.

**Como ensinar.** `quería` é imperfeito de cortesia: presente suavizado, não relato do passado. **Esse é um fato de forma que não vai ao áudio** (vai ao `aprofundar`). No áudio é *"the word you start a counter request with"*. E a gag preventiva (INV-17) se escreve sozinha e é honesta: *"It looks like a past tense. It isn't. It's just the polite way to ask."*

**Regra dura: nunca ensinar `quiero` × `quería` como contraste.** Contraste é paradigma. Deixe `quiero` exatamente onde o corpus já o usa — `Quiero la hoja de reclamaciones`, `Quiero poner una denuncia` — e nomeie o motivo, que é sobre o mundo e não sobre o verbo:

> **Suave quando você quer uma coisa. Seco quando você quer um direito.**

### (b) `ya pagué` — necessidade CONFIRMADA, **forma CORRIGIDA**. Entra como **MOLDE FECHADO (4)**.

**Caso de perda, e vale dinheiro:** cobrança dupla, *"o cartão não passou, tenta de novo"*, tasa turística já paga no Booking, a tapa que era incluída.

**Mas `ya pagué` é a forma latino-americana.** **INFERÊNCIA FORTE** (descrição padrão do peninsular; **NÃO CONFERIDO em fonte citada — conferir com revisor peninsular antes de gravar**): no peninsular, ação concluída dentro do recorte temporal atual pede **pretérito perfecto compuesto** — `Ya he pagado` — enquanto a América usa o simples. Como a disputa de cobrança dupla é sempre sobre algo de **minutos atrás**, embarcar `ya pagué` seria embarcar uma versão menor do bug de variedade que o anti-padrão 11 existe para impedir.

**A saída melhor ainda evita a escolha de tempo:**

> **`Ya está pagado.`** — adjetival, sem pessoa, sem tempo a escolher, e **desloca a alegação de mim para a conta**, que é a posição mais forte numa disputa.

**Molde fechado, 4 encaixes:** `Ya está + [pagado · reservado · hecho · incluido]`. Passa P2 (pagado→B14, reservado→B11/B16, incluido→B11/B14, hecho→I07) e P1 (particípio entra como **item de lista gravado**, nunca construído). `Ya he pagado` entra como variante única; `pagué` vs `he pagado` vive no `aprofundar` e em lugar nenhum mais.

### (c) `reservé` — **CORRIGIDO PARA PRESENTE. Já está no corpus.**

**FATO:** a frase 91 do inventário já é `Tengo una reserva a nombre de…` (e07a). O caso de perda descrito já está coberto por uma frase de **posse no presente**. **Nenhum passado é necessário.**

Isto vira princípio, porque é o argumento mais forte de todo o exercício:

> ### A maior parte das necessidades "de passado" do turista é necessidade de ESTADO PRESENTE disfarçada.
> Ele não precisa de *"eu reservei"* — precisa de *"eu tenho uma reserva"*. Não precisa de *"eu paguei"* — precisa de *"está pago"*. O passado é um desvio.

Onde um passado sobra de verdade nesta cena: **`Esto no es lo que pedí. / Esto no es lo que reservé.`** — irmãs de `Esto no es lo que pone en la carta` (frase 119). **Duas formas fixas**, lista fechada, não molde.

### (d) `no funciona` CONFIRMADO · `no funcionó` **CORTADO**

`[X] no funciona` já é molde §5.M e fica. **O presente é a forma certa**: a queixa é sobre o estado atual. Turista reclamando do ar-condicionado à 1h não precisa de pretérito.

`no funcionó` sobra em **uma** cena, e ela é de dinheiro: **`La tarjeta no ha funcionado.`** — **forma fixa** no bloco de pagamento (B14 / tile `pagar`), na forma composta peninsular. `no funcionó` sai.

### (e) `dejé` — necessidade CONFIRMADA, forma corrigida. Entra como **MOLDE FECHADO (4–5)**.

**FATO: zero ocorrências de `dejé`/`olvidé`/objeto esquecido nos três documentos.** A cena não existe no produto. E o mais próximo que existe é `Me han robado…`, que é o enquadramento **errado e ativamente ruim**: acusar um bar de roubo quando você esqueceu o telefone no balcão piora o resultado.

Esta é a melhor demonstração da tese do dono em todo o exercício: **não existe forma de perguntar por um objeto perdido sem referência ao passado.** Aqui o ferramental temporal é inescapável.

**Ship:** `Me he dejado + [el móvil · la chaqueta · la maleta · las llaves] + [aquí · en el taxi · en el tren]`, com a parceira `¿Lo han encontrado?`. Passa P2 com folga (táxi, bar, hotel, trem = 4 cenas) e P1 (substantivo nu). **O aluno nunca conjuga `dejar`** — a cabeça do molde é congelada.
⚠️ **Conferir `me he dejado` × `me dejé` (registro/região) com revisor peninsular antes de gravar.**

### (f) As três lacunas que ninguém tinha visto

| Item | Forma | Caso de perda |
|---|---|---|
| **`Ya. / Todavía no.`** | **2 formas fixas** | Responde metade do que se **pergunta a um turista** num balcão (`¿Ha pedido ya?` · `¿Han reservado?` · `¿Ha validado?`). Duas palavras, resposta completa. **É o item mais barato deste documento inteiro.** Casa em B05 ou B09 |
| **`Voy a + [infinitivo]`** | **molde aberto** (tier 2) | `Voy a pagar con tarjeta`, dito **antes** de te entregarem a maquininha, é a versão preventiva do DCC. Exige a emenda de §9 |
| **Imperativos** | **5 formas fixas, recusa deliberada de unificar** | Registrar a recusa por escrito, senão um agente futuro "melhora" isso e reintroduz `pon`/`ponga` como escolha do aluno |

### (g) Placar final: fixo × molde

| Forma | Estatuto |
|---|---|
| `Quería + [X]` | **molde aberto** |
| `Voy a + [inf]` | **molde aberto** |
| `¿Tengo que + [inf]?` | **molde aberto** |
| `Ya está + [pagado/reservado/hecho/incluido]` | **molde fechado (4)** |
| `Me he dejado + [X] + [lugar]` | **molde fechado (4–5)** |
| `Soy/Estoy + [lista]` | **molde fechado (6)** |
| `Tengo una reserva a nombre de…` | forma fixa (já existe) |
| `Esto no es lo que pedí / reservé.` | 2 formas fixas |
| `La tarjeta no ha funcionado.` | forma fixa |
| `Ya. / Todavía no.` | 2 formas fixas |
| `fui · comí · me encantó` (I06, contar a viagem) | **3 formas fixas, SLOT LACRADO** |

**Sobre o slot lacrado de I06:** o exílio atual manda *"três verbos de história, decorados inteiros"*, e **isso está certo**. Fica escrito aqui que **é proibido abrir esse slot**: é a porta de entrada do pretérito, e é por ela que o Hablá entrou.

**INFERÊNCIA (contagem sobre o inventário de ~120 falas + os moldes propostos): o espanhol PRODUZIDO no curso inteiro cabe em ~40 formas verbais congeladas.** Um curso de paradigma gasta isso num único verbo em três tempos. O número é o argumento: **~40 formas fixas, das quais o aluno escolhe — e nenhuma que ele tenha de construir.**

---

## §4 — O que fica de FORA, e o CONTORNO

**Regra de autoria: nunca omissão silenciosa.** Toda vez que o produto decide não ensinar uma estrutura, ele **entrega a estratégia que o turista usa no lugar**, dita em voz alta. Omitir sem contornar é o que fabrica o congelamento.

| Fica fora | O CONTORNO — o que o turista faz no lugar |
|---|---|
| **Subjuntivo em subordinada** (`quiero que me traiga…`, `busco un sitio que tenga…`, `cuando llegue…`) | **Regra geral: não subordinar. Uma oração, um pedido.** `Quiero que me traiga la cuenta` → **`La cuenta, por favor.`** · `Busco un sitio que tenga wifi` → **`¿Hay wifi?`** (o molde 3 existe literalmente para absorver isto) · `Cuando llegue el tren…` → apontar o painel. **Exceção já concedida:** votos congelados em I08 (`que aproveche`, `que vaya bien`, `salud`) — são itens de vocabulário com forma de subjuntivo, não subjuntivo |
| **Conjugação completa (6 pessoas)** | O curso só produz **yo** e só pergunta em **3ª (tú/usted)** — 2 dos 6 slots, e ambos chegam pré-cozidos dentro dos moldes. `nosotros` é coberto por 4 itens congelados que já existem (`Somos dos`, `Pagamos por separado`, `¿Nos cobras?`, `Ponnos una ración`). `vosotros`/`ellos` são **receptivos** (decisão já tomada na pesquisa §4.2). **Regra escrita: o turista não conjuga nada; ele escolhe entre dois abridores já conjugados** |
| **Concordância fina de gênero** | Já resolvido na pesquisa §4.3: o substantivo nunca aparece nu, o **artigo vem colado como parte da palavra**, e o erro é dispensado em voz alta (*"'la problema' still gets you what you asked for"*). Acrescentar só a dispensa do plural: **-s é de graça para o anglófono**, 10 segundos, em forma de permissão |
| **Ser/estar como regra** | 14 chunks congelados + as 4 gags + o molde `Tengo ___` (que apaga a classe inteira de "estou com calor/fome/pressa") + o molde fechado `Soy/Estoy + [lista]`. **Guardrail: `¿Está…?` é congelado de propósito e não pode ser promovido a molde** |
| **Pronomes clíticos combinados** (`se lo`, `me lo`, `dámelo`) | **O clítico nunca é slot — é parte da cabeça congelada do molde.** `¿Me pone` se ensina como uma unidade inquebrável de três sílabas, como se fosse uma palavra só. É esse mecanismo que permite embarcar frases com clítico e **zero instrução sobre clítico**. **Escotilha quando a unidade congelada não serve: solta o pronome e aponta** — `¿Me lo puede escribir?` → `¿Puede escribir aquí?` + dedo. Um pouco mais seco, 100% entendido. Lado receptivo: ele **vai** ouvir `¿se lo envuelvo?`, `te lo pongo`, `me lo llevo` — itens de escuta, zero produção |
| **`por` × `para`** | O curso só usa `para` produtivamente (`para dos`, `para llevar`, `para compartir`, `para mí`) e `por favor`/`por aquí` congelados. **Nunca contrastar.** A escolha errada nunca é mal-entendida |
| **`gustar` e a sintaxe invertida** | `Está buenísimo` (chunk que já existe) elogia melhor e não exige a inversão. `Me gustaría` já está cortado por §1.5 |
| **Comparativos** | `más + [adj]` como clipe (`más grande`, `más despacio`, `más frío`) + `mejor`/`peor` como duas formas fixas. Nenhuma construção comparativa ensinada. O exílio já concede `¿Este es mejor?` em I03 — basta |
| **"As palavras interrogativas" como conjunto** | As três que carregam o curso (`dónde`, `cuánto`, `qué`) vivem **dentro dos seus moldes**; `cuándo` e `por qué` são receptivas. **Nunca uma parte sobre pronomes interrogativos** — R1 já reprovaria o título |
| **Números além do receptivo** | Entram receptivos em B09/B14, como já está na grade. Do lado produtivo, **licença explícita de MOSTRAR**: dedo, calculadora, teclado do celular (INV-12 aplicado a número) |

### 4.1 A régua produzir × reconhecer, com asserção testável

**Ser/estar**

| | Régua |
|---|---|
| **PRODUZIR** | **Zero regra. ~18 frases, e nas 18 a escolha já vem feita** |
| **RECONHECER** | **Tudo.** Ele ouve os dois o dia inteiro e o sentido é recuperável pelo contexto em praticamente toda cena de balcão |
| **Em uma linha** | *ser/estar é habilidade de reconhecimento com lista de exceção de produção — nunca uma escolha* |
| **Asserção testável (Apêndice A + lint)** | **Nenhum `responde` do curso pode exigir que o aluno selecione entre `ser` e `estar`.** Um revisor confere abrindo o arquivo. Se um alvo novo exige a escolha: ou congela, ou reescreve |

**Gênero — três faixas, porque "produzir × reconhecer" é grosso demais aqui**

| Faixa | O quê | Mecanismo |
|---|---|---|
| **1 — Produzir CERTO, inegociável** | concordância **com a própria pessoa**: `alérgico/a`, `vegetariano/a`, `celíaco/a`, `perdido/a`, `listo/a`, `solo/a` | **Renderizado pelo app a partir do onboarding, nunca escolhido pelo aluno.** Ele só ouve a própria versão a vida inteira do curso. É a frase de risco de vida (INV-12) e é constante por usuário — o análogo direto de `khráp`/`khâ` |
| **2 — Produzir dentro do chunk, com o erro dispensado em voz alta** | artigo + substantivo (`la cuenta`, `el baño`, `una caña`), e `otro/otra` | Artigo soldado à palavra. Erro = consequência zero, e o curso **diz isso** |
| **3 — Só reconhecer** | concordância de adjetivo com objetos, plurais, morfologia de `vosotros`, concordância de particípio | Zero produção, zero explicação, zero `responde` |
| **Em uma linha** | *o turista produz gênero sobre si mesmo, carrega gênero no artigo, e ignora gênero em todo o resto* | |
| **Asserção testável** | **Nenhum alvo de `responde` contém adjetivo concordando com algo que não seja o falante.** Se contém: congela ou reescreve | |

---

## §5 — O formato do molde em áudio: o bloco **"EL MOLDE"**

Restrições respeitadas por construção: tipos `intro | ouvir | responde | shadow | recap` (nenhum tipo novo) · INV-3 (prompt = cena + ato) · INV-4 (pausa antes do modelo, alvo escondido) · INV-5 (voz-guia nunca fala espanhol) · G4 (≤120 chars/clipe).

### 5.1 As 8 batidas

| # | Batida | Tipo | Regra dura |
|---|---|---|---|
| 1 | **A cena que falta** | `intro` (guia) | Uma cena em que a frase já ensinada **não serve**. Cria a necessidade antes de existir a solução |
| 2 | **O molde inteiro, uma vez** | `ouvir` (nativo) | Frase **completa**, com o encaixe mais óbvio. O aluno **nunca ouve o molde sozinho antes** — chunk primeiro |
| 3 | **A costura** | `intro` (guia) | **Uma linha. Uma só.** Nomeia a junta sem nomear a categoria. É o orçamento analítico inteiro do bloco |
| 4 | **Trocas 1–4** | 4 × `responde` | 4 cenas, 4 lugares, 4 encaixes. Escada: objeto visível → quantidade/detalhe → serviço → **o que você não sabe dizer** |
| 5 | **A devolutiva** | 2–3 × `ouvir` | Uma das 4 cenas se desenrola com o que volta. O molde tem que sobreviver ao contato |
| 6 | **A armadilha** | `intro` (voz de alerta) | O limite do encaixe, como piada (INV-17) |
| 7 | **O clique** | 2–3 × `intro` (guia) | §5.3. **Nunca antes das trocas** |
| 8 | **Recall com encaixe novo** | 1 × `responde` **na parte seguinte** | Encaixe que **nunca ensinamos**. É a única prova de generatividade, e ocupa o slot de callback do INV-16 que já existe |

### 5.2 As 5 regras que convertem lista em cena

O trabalho cognitivo do drill é: **recuperar o molde → escolher o encaixe → produzir sob pressão.** A lista entrega o encaixe de graça (é a palavra seguinte da lista) e mata as duas primeiras etapas. `quiero café, quiero agua, quiero pan` é **drill mecânico** na classificação de Paulston (1970) — a definição de chato, e o que a literatura acusa de não transferir para fala espontânea. **O piso do produto é o drill significativo.**

- **R-A — cada troca muda de LUGAR, não só de palavra.** Quatro encaixes no mesmo balcão = prática em bloco. Quatro lugares = prática aleatória.
- **R-B — o encaixe vem da cena, nunca do prompt.** O `promptPt` **não pode conter em inglês/PT a palavra que vai no encaixe**. Ele descreve a situação de modo que o encaixe seja a única coisa que você poderia querer (*"the one you want is behind glass and you have no idea what it's called"* → `uno de esos`). É o que converte drill mecânico em significativo **sem custar um segundo a mais**.
- **R-C — escada dentro do bloco:** objeto visível → quantidade → serviço → **o que você não sabe dizer**. O degrau 4 é a prova, porque é o único que nós não escrevemos.
- **R-D — uma das trocas tem retorno.** Não "sí". Uma pergunta de volta que o aluno resolve com uma palavra. Sem isso, o molde é uma frase que morre no ar.
- **R-E — nenhuma troca é anunciada como troca.** Proibidas no áudio e **verificáveis por regex no lint**: `now try (it )?with` · `now substitute` · `same sentence, but` · `repeat after` · `swap in` · `mesma frase, só troque`. Uma dessas expressões converte a cena de volta em lista em três palavras. *(FATO: `ep-e04a.json` já tem uma reincidência — `"Same sentence, swap the ending."` no prompt `e04a-p03`. Ali é defensável porque a troca é morfológica, mas é o precedente que o lint precisa capturar.)*

> **Aviso obrigatório em todo briefing de quem escreve um bloco de molde: a versão em cena VAI PARECER mais difícil e mais bagunçada que a lista, e o aluno erra mais dentro da sessão. É o sinal de que está certa.** (Interferência contextual: Shea & Morgan 1979, *JEP:HLM* 5, 179–187 — prática aleatória piora o desempenho na sessão e melhora retenção e transferência.) **Sem essa linha escrita, o primeiro revisor "conserta" o bloco de volta para `quiero café, quiero agua, quiero pan`.**

### 5.3 O momento do clique

O clique **não pode ser afirmação**. *"Agora você sabe pedir qualquer coisa"* dita pela guia é uma reivindicação, e o aluno desconta reivindicações. Tem que ser **um inventário que o aluno conta**, provado pelos próprios 90 segundos anteriores. Três batidas, nesta ordem:

1. **A CONTAGEM — devolva os LUGARES, não as frases.** Lugar é o que ele vai reconhecer na viagem; frase é o que ele já esqueceu.
2. **O DESCONTO — diga o que NÃO custou.** É a antítese exata da tabela: a tabela diz *aqui está o sistema, agora aprenda*; o clique diz *olha o que você acabou de fazer, e foi mais do que a gente ensinou*.
3. **O PISO FALSIFICÁVEL (INV-18 + INV-11 na mesma linha).** Uma promessa que ele pode desmentir semana que vem e não vai.

**Batida opcional 4 — é onde o módulo seguinte se vende:** o gancho **não** promete mais língua; promete mais ousadia — que é a promessa declarada de M2 ("Get the good stuff").

**Legalidade na spec:** o clique ocupa o slot do bloco de fecho na ordem `cena → produção → regra` (régua §6.5 do PRODUTO.md). Ele **é** a "regra", escrita como conquista. **Regra dura: o clique nunca precede o drill.** Antes das trocas é propaganda; depois, é evidência.

### 5.4 Exemplo completo, copy real — `quería + [X]`, bloco para B12

Voz-guia **Alice**, nativos **Emilio/Carmen**, alerta **George** (FATO: elenco medido em `D:\dev\_projects\curso-espanha\src\lib\course\ep-e03a.json`).

```jsonc
{ "tipo":"intro","voz":"Alice","audioKey":"e03b-n07",
  "pt":"You can order a beer. Now the woman behind the counter is waiting, and what you want isn't a beer." },

{ "tipo":"intro","voz":"Alice","audioKey":"e03b-n08",
  "pt":"One word does it. Quería. keh-REE-ah. Not 'I want' — softer. 'I was after…'. Carmen first." },

{ "tipo":"ouvir","voz":"Carmen","audioKey":"e03b-quericafe-c",
  "es":"Quería un café con leche, por favor.",
  "pinyin":"keh-REE-ah oon kah-FEH kon LEH-cheh, por fah-BOR",
  "pt":"I'd like a white coffee, please.", "tts":"Quería un café con leche, por favor." },

// A COSTURA — uma linha, e é o orçamento analítico inteiro do bloco.
{ "tipo":"intro","voz":"Alice","audioKey":"e03b-n09",
  "pt":"Hear the seam? Quería, and then the thing. The thing changes every time. Quería never does." },

// TROCA 1 — objeto visível. Zero vocabulário novo: o dedo faz o trabalho.
{ "tipo":"responde","voz":"Emilio","promptVoz":"Alice","promptAudioKey":"e03b-p08",
  "promptPt":"Bakery, nine in the morning. The one you want is behind glass and you have no idea what it's called. Point at it and ask. Speak now.",
  "audioKey":"e03b-queriuno-e","es":"Quería uno de esos, por favor.",
  "pinyin":"keh-REE-ah OO-noh deh EH-sohs, por fah-BOR","pt":"I'd like one of those, please." },

// TROCA 2 — quantidade. Outro lugar, e há fila atrás de você.
{ "tipo":"responde","voz":"Carmen","promptVoz":"Alice","promptAudioKey":"e03b-p09",
  "promptPt":"Saturday market. Half a kilo of tomatoes, and there are four people behind you. Speak now.",
  "audioKey":"e03b-queritom-c","es":"Quería medio kilo de tomates.",
  "pinyin":"keh-REE-ah MEH-dhyoh KEE-loh deh toh-MAH-tehs","pt":"I'd like half a kilo of tomatoes." },

// TROCA 3 — serviço, não objeto. À meia-noite, e não é queixa: é pedido.
{ "tipo":"responde","voz":"Emilio","promptVoz":"Alice","promptAudioKey":"e03b-p10",
  "promptPt":"Midnight, hotel desk. Your window is over the square and the square has a band in it. Ask for a different room. Speak now.",
  "audioKey":"e03b-queriohab-e","es":"Quería otra habitación, si es posible.",
  "pinyin":"keh-REE-ah OH-trah ah-bee-tah-THYOHN, see es poh-SEE-bleh","pt":"I'd like a different room, if that's possible." },

// TROCA 4 — o degrau que PROVA o molde: você NÃO sabe a palavra.
{ "tipo":"responde","voz":"Carmen","promptVoz":"Alice","promptAudioKey":"e03b-p11",
  "promptPt":"Chemist. You don't know the Spanish for what's happened to your shoulders, but you know what you want. Ask for it. Speak now.",
  "audioKey":"e03b-queriquem-c","es":"Quería algo para las quemaduras del sol.",
  "pinyin":"keh-REE-ah AL-goh PAH-rah lahs keh-mah-DOO-rahs del sol","pt":"I'd like something for sunburn." },

// A DEVOLUTIVA — o molde sobrevive ao contato, e o retorno é ✓, não ⚠.
{ "tipo":"ouvir","voz":"Emilio","audioKey":"e03b-queriohab-e",
  "es":"Quería otra habitación, si es posible.","pt":"— I'd like a different room, if that's possible." },
{ "tipo":"ouvir","voz":"Carmen","audioKey":"e03b-d1-c",
  "es":"¿Le importa una planta más alta?","pinyin":"leh eem-POR-tah OO-nah PLAHN-tah mahs AHL-tah",
  "pt":"— Would a higher floor be alright?","tts":"¿Le importa una planta más alta?" },
{ "tipo":"ouvir","voz":"Emilio","audioKey":"e03b-d2-e",
  "es":"Mejor todavía. Gracias.","pinyin":"meh-KHOR toh-dhah-BEE-ah","pt":"— Even better. Thank you.","tts":"Mejor todavía. Gracias." },

// A ARMADILHA — o limite do encaixe, como piada. É o portão P3 virando fala.
{ "tipo":"intro","voz":"George","audioKey":"e03b-g02",
  "pt":"GUIRI ALERT. Quería takes a THING. A coffee, a room, half a kilo of something. The moment you try to hang a plan off the back of it — 'I'd like you to move my booking to the other hotel and then…' — you have left the runway, and the man behind the counter has stopped listening. Want a thing: quería. Want an action: point, and say the thing anyway. Spain will meet you halfway. It always does." },

// O CLIQUE — três clipes curtos, nesta ordem, nunca antes das trocas.
{ "tipo":"intro","voz":"Alice","audioKey":"e03b-n10",
  "pt":"Count them. A bakery, a market stall, a hotel desk, a chemist. Four places, one word." },
{ "tipo":"intro","voz":"Alice","audioKey":"e03b-n11",
  "pt":"Nobody taught you those four sentences. You built them, just now, out of one." },
{ "tipo":"intro","voz":"Alice","audioKey":"e03b-n12",
  "pt":"You won't always know the noun. Point, and say quería. They'll finish the sentence for you." },

{ "tipo":"shadow","voz":"Carmen","audioKey":"e03b-quericafe-c","es":"Quería un café con leche, por favor.","pt":"I'd like a white coffee, please." },
{ "tipo":"shadow","voz":"Carmen","audioKey":"e03b-queriquem-c","es":"Quería algo para las quemaduras del sol.","pt":"I'd like something for sunburn." }
```

**Batida 8, na parte seguinte** (primeiro `responde` de B13, encaixe nunca ensinado):

```jsonc
{ "tipo":"responde","voz":"Emilio","promptVoz":"Alice","promptAudioKey":"e03c-p01",
  "promptPt":"Different shop, different problem: you need a plug adaptor and you've never said that word in your life. You know how this starts. Speak now.",
  "es":"Quería un adaptador de enchufe." }
```

**Medição do bloco (FATO, contado na copy acima):** 6 clipes de narração da guia, média **≈86 caracteres**; com o clipe do George, **≈103**. Teto G4 = 120. **Passa, e puxa a média da parte para baixo.**

### 5.5 Quanto custa, e quantos cabem

**Tempo (INFERÊNCIA sobre unidades FATO).** `responde` = prompt (~7 s) + pausa `Math.max(2600, len*130+1400)*fator` (alvo de 30 chars → 5,3 s) + modelo (~2,5 s) ≈ **15 s**. Bloco inteiro ≈ **3,0–3,5 min**.

| Módulo | Moldes por parte | Por quê |
|---|---|---|
| **M1** | **2 no máximo** (B12 é a parte canônica de dois) | 2 × 3,3 min = 6,6 min de uma parte de 15. Sobra para aquecimento, callback, cena e o bloco de fecho |
| **M2** | **0 novos; 1 bloco de troca de encaixe** | R2 exige que a parte seja uma decisão de consumo; o molde é serviço da cena |
| **M3** | **0** | R3 — molde em M3 é violação de desenho. A relação de M3 com os moldes é auditiva (§2.4) |

**O teto real não é por parte, é por SKU: 8–12 moldes declarados no curso inteiro. E a razão é o custo escondido:**

> ### O molde não custa a apresentação. Custa a agenda de recall.

12 moldes × 3 recalls = **36 slots de recall**, distribuídos em 36 partes ≈ **1 por parte** — que é exatamente o slot de callback do INV-16 **que já existe e hoje é gasto repetindo uma frase inteira**. **Não há orçamento novo: o molde reaproveita o slot que já está pago.**

**Crédito (INFERÊNCIA sobre preços FATO de §5.1 do ARQUITETURA-V2: guia 0,5 cr/char, alvo 1,0 cr/char):** ~7 narrações × 100 chars × 0,5 = 350 + ~12 clipes-alvo × 35 chars × 1,0 = 420 → **≈800 créditos por molde**. Doze moldes ≈ **9.600 créditos por SKU** — ~15% do retrofit do ¡Dime! (~61.400), e **boa parte disso substitui narração que já estaria lá**.

### 5.6 O que o bloco de molde faz com os 8 portões de tom

| Portão | Efeito | Conta |
|---|---|---|
| **G3** (`responde` ≥8/parte) | **Resolve sozinho** | 2 blocos = 8 `responde` em ~6,6 min. O piso é atingido **só com os moldes** |
| **G4** (≤120 chars/clipe) | **Baixa a média da parte** | Média medida na copy acima: **≈86** sem alerta, **≈103** com. ¡Dime! hoje: 218 (FATO) |
| **G2** (saldo apetitivo ≥2:1) | **Melhora por natureza** | As 4 trocas são **querer**, não perder: 4 steps `tom:'ganha'`. Plantar um molde é a maneira mais barata de consertar o saldo de uma parte defensiva |
| **G5** (permissão) | **Já vem preenchido** | A batida 3 do clique **é** a permissão. Um campo, dois trabalhos |
| **Crédito** | **Reduz** | Narração é 69–74% do custo (FATO). O molde troca tempo de explicação por tempo de produção a ~1:2 |

⚠️ **Achado adverso, que é obrigação registrar:** **G4 mede a MÉDIA.** Um bloco de molde, cheio de clipes de 85 caracteres, **mascara uma palestra de 400 caracteres no mesmo episódio** — a média fecha e o sermão passa. **Sem correção, esta feature vira o melhor detergente de tom que o produto já teve, no sentido ruim.** Emenda obrigatória a G4 em §9.

---

## §6 — Generalização: derivar o núcleo gerador de qualquer língua nova

### 6.0 Duas ressalvas de escopo, antes de qualquer plano

1. **FATO** (`D:\dev\_projects\curso-tailandes\docs\PORTFOLIO.md`, D26 e §2.3): **francês e italiano não são SKUs do catálogo** — D26 lista *"Portugal, Espanha, Itália, França, Grécia, Caribe all-inclusive, Golfo"* como destinos que não viram SKU, e §2.3 nomeia *"EUA→Itália/França"* como *"a armadilha mais sedutora"*. Se aparecerem em qualquer plano de núcleo gerador, é **exercício de calibragem tipológica, não plano de produção**.
2. **FATO** (mesmo arquivo, Onda 1.4): **`PT-BR → Japão` é o próximo SKU a produzir do zero**, e é o caso mais caro desta frente. Turco é Onda 2.2; vietnamita (Onda 2.3) cai inteiro no template do tailandês sem trabalho novo.
3. ⚠️ **Conflito entre docs canônicos, a reportar e não a decidir aqui:** `ARQUITETURA-V2` §5.7 Fase 2 chama o ¡Dime! EN→Espanha de *"o SKU de receita"* e lhe aloca ~61.400 créditos; `PORTFOLIO.md` §2.3 diz *"O que NÃO fazer, nomeado: UK/FR/DE→Espanha"* e D26 exclui Espanha. **Os dois são canônicos e se contradizem no item mais caro do retrofit.**

### 6.1 A tese

> ### O número de moldes quase não varia: 8–12 em qualquer língua. O que varia é (a) o custo de entregar cada um, (b) a proporção molde aberto : inventário congelado, e (c) o tamanho do núcleo receptivo.

O número não varia porque **é ditado pela viagem, não pela morfologia**. Quem acha que o japonês "precisa de mais gramática" está confundindo *dificuldade do sistema* com *tamanho da ferramenta*.

### 6.2 Os 10 buracos do mundo (invariante de viagem, não de língua)

`1 quero/me vê [coisa]` · `2 onde fica [lugar]` · `3 tem [coisa]?` · `4 quanto custa?` · `5 posso [ação]?` · `6 sem/com [ingrediente]` · `7 [coisa] não funciona` · `8 alérgico a / não como [comida]` · `9 [corpo] dói / perdi [objeto]` · `10 [quantidade] de [coisa]`

**Validação retroativa (FATO):** 9 dos 10 aparecem explicitamente no corpus zh e/ou th; 6 dos 10 são exatamente os 6 da §5.M da Espanha. **A lista não foi inventada — foi lida do que os cursos já fazem.**

**O que o número de moldes de fato mede:** não a dificuldade da língua — **quantos dos 10 buracos aquela língua resolve com casca invariante.** Onde a casca varia, o buraco não some: ele **fecha**.

### 6.3 O PROCEDIMENTO — 9 passos, nenhum exige linguista

O truque que o torna barato: **não se deriva o núcleo da gramática da língua. Deriva-se do inventário de frases que nós mesmos já escrevemos.** A pesquisa de Espanha prova que é assim que já acontece: §5.M (os 6 moldes) vem **depois** de §5.A–§5.L (as 120 falas) — os moldes foram lidos do inventário, não deduzidos de uma gramática.

| Passo | O quê | Regra dura |
|---|---|---|
| **0** | **Inventário primeiro, molde depois. Ordem inegociável.** | Escreva as ~120 falas da viagem sem pensar em estrutura. **Quem começa pela gramática produz um curso de idioma — é assim que o Hablá ganhou 21 partes de escada gramatical (FATO)** |
| **1** | **Os 10 buracos do mundo** | Para cada um, obtenha **a forma mais comum na variedade-alvo**, não a mais correta. Saída: 10 frases-semente |
| **2** | **Agrupar e contar rendimento** | Marque cada uma das 120 falas com o buraco que ela serve e **sublinhe a parte que se repete**. String repetida em ≥4 frases = candidata. Rendimento = frases já cobertas + frases que cobriria trocando só o buraco. **Corte: ≥10** |
| **3** | **O buraco é MUNDO ou SISTEMA?** (= P1) | Tipo ∈ `{coisa, lugar, comida, ingrediente, número, defeito, sintoma, ação, objeto-perdido}` → segue. Tipo ∈ `{pessoa, tempo, modo, aspecto, gênero gramatical}` → **congele numa forma só, ou descarte. Sem exceção** |
| **4** | **Teste de invariância da casca** (= P4) | 5 encaixes máximo diferentes, cascas comparadas caractere a caractere |
| **4b** | **Procure outro frame que aceite a forma de dicionário** | *(O achado turco — ver 6.5.)* Se existir, use-o e volte a ABERTO. Só se não existir é que vira FECHADO |
| **5** | **Achar o PEDÁGIO** | Pergunta única: *"existe alguma coisa que TODA frase minha tem que carregar, senão eu soo errado ou rude em todas?"* Verifique quatro lugares: marca de polidez no verbo · partícula de gênero do falante · saudação obrigatória de entrada · escolha T-V. Entrega: **constante decidida uma vez no onboarding, depois invisível.** **É o item nº 1 do QA de qualquer língua nova** (anti-padrão 12) |
| **6** | **Achar o NÚCLEO RECEPTIVO (T3) — e ele já está pago** | Para cada buraco, escreva **as 3 respostas que ele vai receber**: sim · não · "não exatamente, tem uma complicação". **Isso é literalmente o bloco "WHAT COMES BACK" do modo consulta (§4.3), com os glifos `✓ ! ↑` já definidos.** Roteamento: tudo que aparece num "WHAT COMES BACK" e não é produzível é item T3 e vai para o ear module / modo placa. **Não custa episódio novo — custa uma coluna a mais na planilha de cards** |
| **7** | **Orçar e alocar** | 8–12 moldes, ≥2 substituições cada, **distribuídos nas cenas onde nascem** — B08 · B11/B12 · B13 · B14 · B16 · B17. **Zero slots novos, zero episódio chamado "os moldes"** |
| **8** | **Virar teste de build** | G9–G12, §8 |
| **9** | **A PROVA DO DESVIO DE DOIS GRAUS** | Para cada SKU, escreva **10 cenas desviadas**: a cena do card com **uma** variável mudada — o prato não está no cardápio · o defeito do quarto é outro · o sintoma é outro · o preço é por pessoa · a farmácia não tem a marca. **Se o aluno com o núcleo monta a frase e o aluno só com o inventário não monta, o núcleo está trabalhando.** Custo zero de áudio, escrito na fase de pesquisa, falsificável — **e é a copy de loja mais honesta que o produto pode ter:** *"o inventário resolve a cena; o núcleo resolve a cena que mudou"* |

⚠️ **Custo não orçado que este procedimento revela.** `ARQUITETURA-V2` §1.2 estabelece que **M1 é específico do PAR (L1 × destino)**, e o núcleo gerador vive inteiro em M1. Logo **o núcleo gerador é ativo de PAR, não de destino — ele não se amortiza entre compradores.** Quando `EN → Japão` (orçado em ~35%) for derivado de `PT-BR → Japão`, o roster de moldes tem que ser **re-derivado, não traduzido**: o que é "fechado" para um brasileiro e o que é para um anglófono muda. **O passo 4 roda de novo, inteiro, a cada comprador novo. Isso não está nos 35%.**

### 6.4 Adaptação por tipologia — ISOLANTE (mandarim, tailandês, vietnamita)

**O caso barato, e é o que já existe no repo.** Zero flexão, verbo nunca muda, SVO. **Proporção aberto:fechado ≈ 10:1.** O único ponto de morfologia obrigatória é o **classificador**.

- **Adaptação do classificador:** ensinar o **coringa** (`个 ge`) + três de alta frequência (`杯 bēi` copo, `瓶 píng` garrafa, `位 wèi` pessoas), com dispensa em voz alta: *"errar o classificador não impede o pedido; omitir, sim."*
- **Mandarim é a única língua da lista SEM PEDÁGIO** — nenhuma marca obrigatória de cortesia ou gênero na frase. **Isso é um presente e o curso deve dizer que é** (INV-11).
- **T3 do mandarim, item nº 1:** **não existe "sim" genérico em mandarim** — eles respondem ecoando o verbo. Um brasileiro que espera um "sim" fica esperando um som que nunca vem. Custa 40 segundos e evita travamento.
- **Tailandês = mesma tipologia + dois custos:** 5 tons + comprimento de vogal (resolvido por INV-7) e o pedágio `khráp`/`khâ` — **o pedágio mais barato do catálogo**: uma sílaba, no fim da frase inteira, decidida uma vez pelo gênero do falante e nunca mais revisitada. **Guarde esse contraste: é a metade fácil do problema japonês.**

### 6.5 Adaptação por tipologia — AGLUTINANTE (turco)

**A aglutinação não quebra o formato de molde. Ela move a costura — e a adaptação certa não é mudar o formato, é mudar qual lado se congela.**

Em língua isolante/fusional o molde é `casca fixa + buraco no meio`. Em turco é `buraco no início + cauda fixa`, e a cauda **muda de forma conforme a última vogal do buraco** (harmonia vocálica). Entregar isso como *"o sufixo `-siz` tem quatro formas: `-siz/-sız/-suz/-süz`"* é escrever uma tabela de conjugação com outro nome.

**Movimento 1 — o achado que resolve a maior parte do problema: escolha o enquadramento sintático cujo buraco aceita a FORMA DE DICIONÁRIO da palavra.** O turco tem, e são justamente os frames de maior frequência turística *(INFERÊNCIA, NÃO CONFERIDO com revisor nativo)*:

| Frame | Por que o buraco fica limpo |
|---|---|
| `[coisa] var mı?` (tem?) | `var`/`yok` são **palavras separadas**, não sufixos. Zero harmonia no substantivo |
| `[coisa] nerede?` (onde fica?) | idem |
| `Bir [coisa], lütfen` | `bir` (um) **dispensa o acusativo**. O substantivo entra cru |
| `[coisa] istiyorum` | com `bir` antes, indefinido, **sem caso** |
| `[coisa] ne kadar?` | zero morfologia |

**Quatro dos dez buracos do mundo resolvidos com o substantivo intocado.** É o resultado mais transferível desta frente:

> **Em língua morfologicamente pesada, o trabalho de desenho de molde não é simplificar a morfologia — é procurar o frame que não a aciona.** E isso um agente faz sem ser linguista, com o passo 4b.

**Movimento 2 — onde não há frame limpo, o molde FECHA e a lista vira o produto.** `-siz` (sem) não tem escapatória: gravam-se **as seis palavras prontas** (`şekersiz`, `etsiz`, `sütsüz`, `acısız`, `glutensiz`, `buzsuz`) e diz-se em voz alta *"a lista é a lista; fora dela, aponte e diga `yok`."* Custo: seis clipes (desprezível). Benefício: zero computação no balcão.

**Movimento 3 — harmonia vocálica entra como DESTRAVA DE OUVIDO, nunca como produção.** Reconhecer `-de/-da/-te/-ta` em placa (`Taksim'de`) e `-lar/-ler` como plural. Reconhecer, nunca calcular.

**E o custo que ninguém menciona: SOV.** O verbo vem no fim, então **o aluno não pode começar a frase e improvisar o final** — a estratégia que funciona em espanhol e mandarim. Consequência de desenho concreta: **em turco, todo molde é treinado como bloco fonético inteiro, de uma respiração só, nunca montado ao vivo.** É argumento a favor de mais inventário congelado e menos encaixe livre — o que casa com o pedágio **social** formulaico (`buyurun`, `abi/abla`, `kolay gelsin`, `afiyet olsun`, `geçmiş olsun`), morfologicamente grátis e socialmente caríssimo em rendimento.

### 6.6 Adaptação por tipologia — POLIDEZ OBRIGATÓRIA (japonês)

**O reenquadramento que resolve, em uma frase:**

> ### Para o turista, a polidez japonesa não é uma variável. É uma constante.

Ele vai produzir **um único registro** — `-masu`/`desu` — em **100% das falas**, com **100% dos interlocutores**, durante **12 dias**, e **não existe cena de viagem em que isso esteja errado**. Ser formal demais com um estranho no Japão não tem custo social; ser informal tem. Como o turista não tem intimidade com ninguém em 12 dias, **a escolha nunca chega a existir. Uma variável que só assume um valor não é variável — é acabamento.**

**As quatro decisões que operacionalizam:**

1. **A forma simples (`taberu`, `iku`, `da`) NUNCA aparece em produção — e o curso não menciona que ela existe.** Não se ensina "há níveis de polidez e você vai usar o médio". Ensina-se: **"toda frase aqui termina em `-masu` ou `desu`. É assim que uma frase acaba."** É morfologia entregue como fonologia. **Precedente direto FATO:** `khráp` no Phûut! nunca é apresentado como "sistema de partículas de gênero"; é apresentado como *"Como você é homem, fecha com 'khráp'"* (`ep-c03b.json` linha 17).
2. **`sumimasen` promovido a heroína do curso** — precedente explícito do `khɔ̌ɔ-thôot khráp`. Uma palavra que faz quatro trabalhos (desculpa, licença, obrigado, chamar o garçom) é o maior rendimento por sílaba do catálogo. **FATO:** o `PORTFOLIO.md` já elegeu **すみません** como apelido nativo do SKU japonês (D20) — a decisão de marca já aponta para cá.
3. **A metade que importa é RECEPTIVA.** Ele nunca vai produzir keigo; vai ser **alvo** de keigo o dia inteiro, e as formas honoríficas do funcionário **não se parecem com nada que ele aprendeu**. Modo placa (INV-9), pareamento ouvir→agir, zero `responde`:

| Ouviu | Significa | Faça |
|---|---|---|
| `irasshaimase` | "bem-vindo" ritual, **não é pergunta** | nada. Não responda. Siga andando |
| `omachi kudasai` | espere | pare onde está |
| `[coisa] wa gozaimasen` | **não tem** | é não. Peça outra coisa |
| `chotto…` (e para de falar) | não | não insista. Agradeça e saia |
| `daijōbu desu` | "tudo bem" **ou** "não, obrigado" | leia a mão, não a palavra |

4. **A permissão obrigatória (INV-11), sem a qual o episódio produz paralisia:** *"Você não vai acertar keigo. Ninguém espera que você acerte. `Sumimasen` + apontar + qualquer coisa terminada em `-masu` é um turista japonês socialmente completo."*

**Teste de aceite, falsificável (vira lint, não opinião):** **zero** passos de produção em forma simples · **zero** ocorrências de "polido/informal/formal/keigo/registro" no áudio · **100%** das frases-alvo produtivas terminando em `-masu`/`desu`/`kudasai`/`onegaishimasu` · **≥5** pares ouvir→agir de keigo receptivo, marcados 👂 e sem `responde`.

**Presentes do japonês que o curso tem que declarar:** zero concordância de pessoa e número (`tabemasu` serve para eu/você/ele/nós/eles) e cinco vogais quase idênticas às do português. **O japonês é fonologicamente barato para brasileiro e morfologicamente barato no verbo** — o custo está na escrita (modo placa mais caro do catálogo: 3 sistemas), nos contadores e na polidez.

### 6.7 Quadro comparativo

| Língua | Torna FÁCIL | Torna CARO | Moldes | Aberto:Fechado | T3 |
|---|---|---|---:|---|---|
| **Mandarim** | zero flexão; sem pedágio | tons; classificadores; pergunta lexical (INV-8) | 11 (FATO) | **10:1** | médio |
| **Tailandês** | idem | 5 tons + duração vocálica; classificadores no comércio | 10–12 (FATO) | **9:2** | médio |
| **Japonês** | zero concordância; 5 vogais ~PT; sem tom | escrita (3 sistemas); contadores; **polidez no verbo**; SOV | 9 (INFERÊNCIA) | **6:3** | **o maior do catálogo** |
| **Turco** | sem gênero, sem artigo, ortografia fonética | **SOV**; harmonia vocálica; encaixe dentro da palavra | 8 (INFERÊNCIA) | **7:1** (com 4b) | pequeno-médio |
| **Espanhol** | cognato; SVO; sem tom | tú/usted; gênero; ser/estar | **8 + 8** (este doc) | 13:3 | grande (`-s` aspirado, `-d-` caído) |

⚠️ **NÃO CONFERIDO: nenhuma frase-alvo em japonês ou turco deste documento passou por fonte externa ou revisor nativo.** Pela régua §6.6 do `PRODUTO.md` e pelo protocolo de bake-off, **nada disso vira áudio antes do revisor da variedade-alvo** — e no caso japonês isso é **bloqueante**, porque o SKU está na Onda 1.

---

## §7 — Auditoria do acervo

### 7.1 O que já existe — moldes declarados, medidos

**FATO — densidade do vocabulário de molde na narração (ocorrências no corpo dos episódios):**

| termo | ¡Dime! | Phûut! | Shuō! | Hablá |
|---|---:|---:|---:|---:|
| "molde" | 0 | **37** | **33** | **0** |
| "template / slot / the shape / the frame" | **24** | 0 | 0 | 0 |
| "troque / troca / swap" | 21 | 13 | 9 | 3 |
| "encaixe / encaixa" | 0 | 6 | 7 | 1 |
| "coringa / escudo / shield" | 2 | 20 | 14 | 1 |

**Phûut! — 12 moldes declarados, 11 com ≥2 encaixes treinados.** `khɔ̌ɔ + [coisa] + nɔ̀i` (14 encaixes) · `… dâai mǎi?` (15) · `[coisa] + thîi-nǎi` (7) · `mii … mǎi?` (4) · `phɛ́ɛ + [comida]` (3) · `… gwàa-níi` (3) · `[coisa] + sǐa` (2) · `bpùat + [corpo]` (2) · `[nº] bàat dâai mǎi?` (2) e outros.
**Shuō! — 11 declarados, 9 com ≥2.** `kěyǐ/néng … ma?` (6) · `… zài nǎlǐ` (4) · `bú yào …` (3) · `wǒ duì … guòmǐn` (2) · `[coisa] huài le` (2) · `[corpo] + téng` (2) · `wǒ de … diū le` (2) · `hǎo + verbo` (2).
**¡Dime! — 13 declarados, 10 com ≥2.** `¿(Qué) lleva …?` (9) · `¿Me pones …?` (4) · `Soy alérgico/a a …` (3) · `¿Me puede recomendar algo para …?` (3) · `¿Este tren para en …?` (3) · outros com 2.
**Hablá — 4 declarados, 3 com ≥2.** `[coisa] + no funciona` (4) · `No hay … / Falta …` (2) · `Me duele + [parte]` (2) · `Yo que vos + condicional` (1).

**O padrão de ensino canônico já existe, e é dos autores, não meu.** Quatro tempos: nomear o molde → nomear a peça trocável → trocar na frente do aluno → mandar o aluno trocar num `responde`. FATO, `ep-t06b.json` #7: *"**Agora sinta o poder do molde: troca a primeira palavra e reclama de QUALQUER coisa.** WiFi caiu? wai-fai sǐa. TV não liga? thii-wii sǐa. **É Lego.**"* · `ep-m04b.json` #63: *"**No buraco do meio você encaixa qualquer alimento** … Uma frase, e você se protege de tudo."*

> ### O núcleo gerador não é feature nova. É feature existente, não nomeada, não orçada e não testada.
> O produto já converge sozinho para 6–13 moldes por SKU, com strings de autoria explícita. **A correção do dono não acrescenta um eixo — legaliza e mede um eixo que os autores já praticavam por instinto.** Isso baixa muito o risco da mudança: não há nada a inventar; há o que declarar.

### 7.2 O estoque de molde grátis — o retrofit mais barato do portfólio

**FATO — famílias produtivas óbvias que o áudio nunca nomeia:** ¡Dime! tem 6 `¿Tienen …?` e 5 `¿Dónde está …?` como frases avulsas; Shuō! tem **21 frases em `… ma?`** e nunca declara `[frase] + ma` como o transformador universal de pergunta; Hablá tem **15 alvos em `Quería/Quiero/Me gustaría + X`** e 11 em `¿Tenés/Tiene(n) …?` — **os dois moldes de maior alcance turístico da língua, ambos invisíveis para o aluno.**

**Somando os quatro cursos: 128 frases-alvo que já são famílias e são ensinadas como itens soltos.** Transformá-las em molde custa **narração, não frase nova** — e frase-alvo nova é ~1 cr/char, desprezível (FATO, §5.1 do ARQUITETURA-V2: *"acrescentar falas é quase de graça"*).

### 7.3 O que é aproveitável do Hablá gramatical

**Descoberta estrutural que muda o custo do desdobramento: o paradigma já não está no áudio — está no `aprofundar`, exatamente onde a spec quer.** O áudio de `i01a` nunca conjuga; faz o aluno produzir 6 frases inteiras. A tabela (*"Verbos -ar: tira -ar, põe -é"*) vive só no texto. **O trabalho de exílio da gramática, o Hablá já fez.** O defeito não é gramática no áudio — é que os blocos ficaram **decorados soltos, sem chave de troca, e com prompt de tradução.**

⚠️ **E este é o defeito mais grave do acervo inteiro. FATO: 554 de 600 `promptPt` do Hablá (92%) são tradução seca sem cena** (`"Diga 'ontem fui ao centro'. Fale agora."`), média de 39 caracteres. Comparação: ¡Dime! 0% (144 ch), Phûut! 8% (73 ch), Shuō! 15% (61 ch). **Prompt de tradução viola INV-3 e impede o drill de troca**, porque quem dita a frase inteira em português não deixou nada para o aluno montar.

**APROVEITÁVEL como núcleo gerador — regravar só a narração de moldura, os `responde` ficam:**

| Onde | O quê | Por que é núcleo gerador |
|---|---|---|
| `ep-a01a` **votos** — `Que tengas un buen día/viaje/finde`, `Que te mejores`, `Que les vaya bien`, `Ojalá que sí` | 7 alvos | `Que + [voto pronto]` é slot puro; o `aprofundar` já se titula **"Votos prontos (decore inteiros)"**. É o subjuntivo do exílio **já gravado** |
| `ep-a02a` **cortesia** — `¿Podrías ayudarme?`, `Querría un café`, `¿Te importaría esperar?` | 4 | `¿Podría/Querría + [X]?` é a fórmula fixa que a própria tabela autoriza. Já existe |
| `ep-i01a/b/c` **passado narrativo** — `Ayer fui al centro`, `Comí en un restaurante`, `Compré un regalo`, `¿Qué hiciste ayer?`, `Estuvo bárbaro`, `Me encantó` | **20 alvos** | **Exatamente os "três verbos de história, decorados inteiros" da tabela de exílio.** É o insumo pronto de M2/I06 |
| `ep-i03a` **futuro** — `Voy a viajar`, `Vamos a pasear`, `¿Qué vas a hacer?` | 4 | `Voy a + [verbo]` é o molde mais fácil que existe (idêntico ao PT). Serve I04 e I09 |
| `ep-i03b/c` — `La semana que viene`, `¿Nos vemos a las ocho?`, `Quedamos en hablar el lunes` | 5 | **É o único material de "combinar hora e lugar com alguém" existente nos 4 cursos** |
| `ep-a01c` — `Te recomiendo que…`, `Es mejor que…` | 2 | Vira o **lado receptivo** de M2/I03: reconhecer a recomendação, não conjugar |

**PARADIGMA DESCARTÁVEL — não migra; o `aprofundar` fica no legado:** `ep-i02b` imperfeito (`Antes vivía en São Paulo`, `Iba a la playa todos los veranos` — contraste pretérito×imperfeito é a definição de conteúdo de prova; turista de 12 dias não descreve hábitos de infância) · `ep-a02b` hipóteses (`Si tuviera tiempo, viajaría` — dois paradigmas para uma frase que ninguém usa num balcão) · `ep-a01b/c` mecânica de dois sujeitos (o `aprofundar` é literalmente uma lista de gatilhos de regência) · `ep-a03a/b/c` conectores (redação, não fala de viagem) · toda a narração de "Gramática em foco" desses episódios (*"os verbos terminados em -ar mudam a terminação…"* — paradigma falado, o único ponto onde o Hablá viola INV-15 de fato).

**Consequência para o Kit Rioplatense (§5.2 do ARQUITETURA-V2):** das 21 partes ditas "peso morto", **~8 contêm ~40 alvos aproveitáveis** que são justamente o insumo de M2. Extraí-los custa **zero crédito de frase-alvo** — só a narração de moldura. **M2 não precisa de 2 partes novas caras para "contar a sua viagem"; precisa de 1 reframe com drill de troca sobre áudio já pago.**

### 7.4 Os buracos — moldes de alto alcance que não existem em NENHUM curso

Medido sobre os 760 alvos de produção somados. **FATO:**

| # | Molde ausente | ¡Dime! | Phûut! | Shuō! | Hablá | Por que é prioridade |
|---|---|---:|---:|---:|---:|---|
| **1** | **APRECIAÇÃO — `[isto] estava/é + [adj forte]` / `¡qué + [adj]!`** | **0** | 2 | 3 | 10 | **A célula que a spec já declarou vazia.** Um molde só abastece M2/I07 inteiro **e** o tile `simpatia` (que G8 exige com ≥8 cards e hoje tem ~2). Nenhum curso ensina como molde |
| **2** | **ESCOLHA — `¿[este] es mejor que [aquele]?` / `¿cuál me recomienda: A o B?`** | 0 | 3 | 0 | 0 | É a fala do momento em que o dinheiro é decidido (R2). Sem isso, o aluno pede o que reconhece — **o teto do inventário fixo em estado puro** |
| **3** | **GRAU — `un poco más/menos + [X]`** | **0** | 3 | 6 | 2 | Shuō! (`yìdiǎn`) e Phûut! (`nɔ̀i`) já têm a peça e a usam como amaciante, nunca como quantificador. Resolve "mais gelo", "menos sal", "mais devagar" — 4 cenas por dia |
| **4** | **COMBINAR — `¿nos vemos [hora] en [lugar]?`** | **0** | **0** | **0** | 3 | Sem ele, I05 e I08 não fecham: o aluno **entende** o convite e **não consegue marcar** |
| **5** | **HISTÓRIA — `ayer fui a [X] y me encantó`** | **0** | **0** | **0** | 20 | Motor de I06 e a única forma de o turista **dar** algo na conversa em vez de só pedir. Pronto e barato só no espanhol |
| **6** | **PROCURAR — `estoy buscando + [X]` / `¿dónde puedo comprar + [X]?`** | **0** | 1 | **0** | 1 | Todos ensinam `¿dónde está + [lugar conhecido]?`. Nenhum ensina a pedir uma **categoria**, que é o caso quando ele não sabe o nome do lugar |
| **7** | **DIMENSIONAR — `para [N] personas / [N] noches`** | 2 | **0** | 1 | 3 | Mesa, quarto, ingresso, tour, guarda-volume. O número ele já tem; falta o encaixe |
| **8** | **PREFERÊNCIA — `me gusta / prefiero + [X]`** | **0** | **0** | **0** | 3 | Resposta obrigatória às "5 perguntas que eles fazem" (I05). Sem ela o aluno é entrevistado e não responde |

**Ordem de ataque (INFERÊNCIA, critério = frases destravadas por crédito gasto): 1º apreciação · 2º escolha · 3º grau · 4º combinar.** Os quatro cabem em quatro blocos de fecho reescritos, **não exigem parte nova**, e cobrem 6 das 10 partes de M2. Os itens 5–8 vêm de graça no Hablá e caros nos outros três.

### 7.5 Uma correção de vocabulário de produto

**FATO: Phûut!/Shuō! dizem "molde" 70 vezes; ¡Dime! alterna *slot machine / template / the shape / the frame* 24 vezes.** Palavra instável não vira memória. **Decisão: uma palavra por idioma de voz-guia, travada no lint junto com as TRAVAS A–D — PT-BR: "molde" · EN: "the frame".**

---

## §8 — Emenda à régua de tom (§7 do `ARQUITETURA-V2`)

O §7 tem 8 portões e nenhum mede geração. **Sem número, o próximo agente volta a produzir inventário fixo sem violar nada.** Ficam **quatro portões novos**, e o primeiro é o que o dono pediu.

### G9 — TAXA DE GERAÇÃO *(o portão principal desta emenda)*

**O que mede:** a proporção de frases-alvo que o aluno produz **por molde** contra as que ele produz **decoradas isoladamente**.

**Como se mede — definição operacional, sem margem de interpretação:**

- **DENOMINADOR** = alvos de **produção únicos** do módulo: texto na língua-alvo que é alvo de um `responde` ou `shadow`, deduplicado por string normalizada. **Exclui** `responde` cujo alvo está em PT/EN (quiz de escuta — é 25% do Phûut! e 32% do Shuō!, e inflaria a conta).
- **NUMERADOR** = alvos cuja string casa com a **casca** de um molde **declarado** em `src/lib/course/nucleo.ts`.
- **Só conta molde que é molde:** entrada com <2 substituições treinadas, <2 `recallEm` apontando para partes posteriores existentes, ou <2 tiles do consulta **não entra no numerador** (é frase).
- **Anti-inflação:** o SKU declara **no mínimo 8 e no máximo 12 moldes**. Declarar 40 para inflar o numerador **falha o build**.

**Os pisos, e de onde vêm os números:**

| Escopo | Piso | Calibragem |
|---|---:|---|
| **SKU inteiro (M1+M2)** | **≥45%** | O melhor medido do portfólio hoje é Phûut! com **43%** (FATO). **O piso é "o melhor que já fizemos, arredondado para cima"** — não é aspiração, é a proibição de regredir |
| **M1 isolado** | **≥50%** | M1 *é* o núcleo gerador. Um M1 abaixo de 50% não é "me viro", é phrasebook falado |
| **M2 isolado** | **≥35%** | M2 troca encaixes de moldes de M1; conta com denominador próprio, mas com piso menor porque carrega inventário cultural legítimo |
| **M3** | **fora da conta** | Receptivo por desenho (R3). Medir geração em M3 empurraria produção para onde ela não deve estar |

**Placar de hoje contra o piso (FATO, mesma medição de §0.3):** Phûut! 43% (falta 2 pp) · ¡Dime! 23% (**falha**) · Shuō! 21% (**falha**) · Hablá 2% (**falha, e é o retrato do curso de paradigma**).

**Severidade:** **erro de build** para SKU novo ou parte nova. **Warning com prazo** para acervo existente até a fase de retrofit correspondente — senão o portão bloqueia o próprio conserto.

### G10 — ENCAIXE DO MUNDO *(o portão P1 virando CI)*

Cada molde declara `tipoBuraco`. Valor ∈ lista fechada `{coisa, lugar, comida, ingrediente, numero, defeito, sintoma, acao, objeto-perdido, quantidade}`. **Um buraco tipado `pessoa | tempo | modo | aspecto | genero` = erro de build.** É *"paradigma fora"* deixando de ser opinião.

### G11 — WHITELIST DE FORMAS VERBAIS *(a trava real contra a deriva)*

Existe, por SKU, uma lista de **toda forma verbal que o aluno PRODUZ**. Qualquer forma nova aparecendo num alvo de `responde` **falha o build** até ser adicionada à lista **com um comentário justificando**.

É barato porque a lista é pequena: **INFERÊNCIA — o espanhol produzido no curso inteiro cabe em ~40 formas verbais congeladas.** É esse número que impede a deriva: um agente que queira ensinar o pretérito precisa adicionar 6 formas de uma vez e escrever por quê, na frente de um revisor.

### G12 — NÚCLEO RECEPTIVO

≥8 pares ouvir→agir marcados 👂 e **sem** `responde` por SKU. Deriva direto do passo 6 do procedimento e do bloco "WHAT COMES BACK" que o modo consulta já produz.

### Emendas aos portões existentes

- **G4 — endurecer.** Passa a ser **média ≤120 caracteres por clipe E nenhum clipe individual >320** (ou p90 ≤160). **Razão medida:** um bloco de molde, cheio de clipes de ~85 caracteres, **mascara uma palestra de 400 caracteres no mesmo episódio** — a média fecha e o sermão passa. Sem esta emenda, o núcleo gerador vira detergente de tom no sentido ruim.
- **R-E vira regex de lint** (§5.2): `now try (it )?with` · `now substitute` · `same sentence, but` · `repeat after` · `swap in` · `mesma frase, só troque`. **Uma dessas expressões converte a cena de volta em lista em três palavras.**
- **Vocabulário travado:** PT-BR "molde" · EN "the frame". Sinônimo alternativo no mesmo SKU = warning.

### O esquema mínimo que tudo isso exige

Duas chaves novas por episódio, mais um arquivo por SKU. Nada mais:

```jsonc
// no ep-*.json
"moldes": [
  { "molde": "queria",
    "casca": "Quería + [X]",
    "tipoBuraco": "coisa",
    "aberto": true,
    "encaixes": ["un café con leche","uno de esos","medio kilo de tomates",
                 "otra habitación","algo para las quemaduras del sol"],
    "recallEm": ["e03c","e05b","e07a"] }
],
"clique": "Count them. A bakery, a market stall, a hotel desk, a chemist. Four places, one word."
```

```ts
// src/lib/course/nucleo.ts — declaração por SKU, 8–12 entradas, lida pelo lint e pelo build-consulta
```

**E o portão de redação que fecha o conjunto: G9 exige `clique` não-vazio em toda parte que declara `moldes`, contendo ≥3 substantivos de lugar que aparecem nos `promptPt` da própria parte e ZERO nomes de categoria gramatical.** Isso torna o "momento do clique" (§5.3) verificável em vez de aspiracional.

### A linha do IT, atualizada

```
IT  ¡Dime! (hoje)   moldura 46% · saldo 0,3:1 · responde 7,3 · chars/clipe 218 · geração 23%  → FALHA (G1,G2,G3,G4,G9)
IT  ¡Dime! (alvo)   moldura 17% · saldo 2,0:1 · responde 8,5 · chars/clipe ≤120 · geração ≥45% → PASSA
```

---

## §9 — Emendas de texto

### 9.1 `ARQUITETURA-V2.md` §1.3 — **substituir integralmente a trava R5 e sua tabela**

**SAI** (texto atual):

> **R5 — Tabela de exílio da gramática inevitável.** A gramática que a cena exige vive nestes endereços e em nenhum outro. **Gramática que não está nesta tabela não entra no áudio** — vai para `aprofundar`.
>
> | Gramática inevitável | Onde vive | Forma permitida |
> |---|---|---|
> | Passado | M2 · *Contar a sua viagem* | três verbos de história, decorados inteiros |
> | Futuro / planos | M2 · *A noite* e *Fazer o que eles fazem* | combinar hora e lugar com alguém |
> | Condicional de cortesia | M2 · *A ordem no balcão* | fórmula fixa, uma só |
> | Subjuntivo | M2 · *Ser convidado* | **apenas votos prontos** |
> | Comparativo | M2 · *O prato que você não ia pedir* | "esse é melhor?" |
> | Registro formal/informal | M3 · *Sinais* | reconhecer o tratamento, não conjugar |

**ENTRA** (texto exato):

> **R5 — O núcleo gerador e o resíduo. Duas tabelas, e a chave primária de ambas é o MOLDE, nunca a categoria gramatical.**
>
> **Esta trava lista PARADIGMAS exilados, não FORMAS.** Uma forma congelada dentro de um molde produtivo (INV-14) **não é o paradigma dela e não está sujeita a esta trava**: `quería` não é "o condicional", `me han robado` não é "o pretérito perfeito", `-masu` não é "o registro polido". O que fica proibido é a **casca que varia** — conjugar, flexionar, alternar, contrastar. **O molde congela a casca e abre o mundo; por construção, ele nunca é o paradigma.** O critério de admissão, os portões e o roster canônico estão na **Emenda do Núcleo Gerador**, que é parte desta spec.
>
> **Tabela 1 — A ESPINHA GERADORA (ativo de M1, não resíduo).** 8–12 moldes por SKU, cada um com uma CASA e ≥2 REDISPAROS. **Nenhum molde ganha parte própria.** Roster do espanhol em §2 da Emenda.
>
> | Molde (a chave é o molde, com o encaixe visível) | Casa | Estatuto |
> |---|---|---|
> | `Quería + [coisa]` | B09 | aberto |
> | `¿Puedo + [ação]?` | B06 | aberto |
> | `¿Hay + [coisa]?` | B08 | aberto |
> | `¿Me pone / pones + [coisa]?` | B11 | aberto |
> | `sin / con / para + [coisa]` | B12 | aberto |
> | `¿Lleva + [ingrediente]?` | B13 | aberto |
> | `¿Dónde está + [lugar]?` / `¿Dónde hay + [categoria]?` | B08 | aberto, com escotilha de reparo grudada |
> | `¿Me puede + [ação]?` | B03 | aberto |
> | `Ya está + [pagado/reservado/hecho/incluido]` | B14 | **fechado, 4** |
> | `Me he dejado + [objeto] + [lugar]` | B18 | **fechado, 4–5** |
> | `Soy / Estoy + [lista fechada]` | B13 | **fechado, 6** |
> | `Voy a + [ação]` · `¿Tengo que + [ação]?` · `Otra/Otro + [coisa]` · `[coisa] no funciona` · `Me han robado + [coisa]` | B14 · B09 · B11 · B16 · B17 | tier 2 |
>
> **Tabela 2 — O EXÍLIO RESIDUAL.** Muito menor, e é só o que sobra depois da Tabela 1.
>
> | Molde ou forma | Onde vive | Estatuto |
> |---|---|---|
> | `Ayer fui a + [lugar]` · `Comí + [prato]` · `Me encantó + [coisa]` | M2 · I06 *Contar a sua viagem* | **3 formas fixas, SLOT LACRADO. Proibido abrir** — é a porta de entrada do pretérito |
> | `Que + [voto pronto]` | M2 · I08 *Ser convidado* | 3 itens fechados, nenhum encaixe livre |
> | `más + [adjetivo]` · `mejor`/`peor` | M2 · I03 | clipe + 2 formas fixas. Nenhuma construção comparativa ensinada |
> | Registro formal/informal | M3 · A05 *A outra língua* | **receptivo. Não é molde** |
>
> **Futuro/planos SAI do exílio** e vira o molde `Voy a + [ação]` em M1 — porque `Voy a pagar con tarjeta`, dito antes de a maquininha aparecer, é **operação de dinheiro em B14**, não conversa social em M2.

### 9.2 `ARQUITETURA-V2.md` §1.3 — **emenda à trava R4** (acrescentar ao fim)

> **Função declarada do bloco de fecho em M1:** ele existe para **dispensar**, não para explicar — *"o molde é seu; a tabela de onde ele veio não é da sua conta"*. É o comportamento observado no melhor exemplar do corpus (FATO: em `ep-b09a` o slot de gramática não tem gramática, tem heurística). **Em partes que declaram `moldes`, este slot é ocupado pelo "clique"** (Emenda do Núcleo Gerador, §5.3), que é a regra escrita como conquista.

### 9.3 `ARQUITETURA-V2.md` §7.1 — **acrescentar G9–G12** e **emendar G4**

Texto em §8 desta Emenda, aplicável verbatim. **G4 passa a ler:** *"média ≤120 caracteres por clipe **e nenhum clipe individual >320**"*.

### 9.4 `ARQUITETURA-V2.md` §2, linha B12 — substituir a coluna "O que resolve"

**SAI:** `INV-14`
**ENTRA:** `INV-14. É a parte canônica de DOIS blocos de molde (o teto de M1). Casa de sin/con/para; segundo bloco à escolha do SKU.`

### 9.5 `PRODUTO.md` §0 — **corrigir os quatro exemplos**, que estão certos na necessidade e errados na forma

**SAI:**

> **Exílio da gramática.** Uma "tabela de exílio" chegou a banir tempos verbais. Só que sem `ya pagué` o turista paga duas vezes; sem `reservé` o hotel decide o que era a reserva; sem `dejé` não se recupera objeto; e sem o imperfeito de cortesia (`quería` em vez de `quiero`) ele soa grosseiro em toda transação. Nada disso é fluência — é ferramenta.

**ENTRA:**

> **Exílio da gramática.** Uma "tabela de exílio" chegou a banir tempos verbais. Só que sem uma forma de dizer *"está pago"* o turista paga duas vezes; sem `Tengo una reserva a nombre de…` o hotel decide o que era a reserva; sem `Me he dejado el móvil aquí` não se recupera objeto; e sem `quería` ele leva o registro do balcão de bar para a recepção, a farmácia e o guichê da Renfe — e trava. Nada disso é fluência: é ferramenta.
>
> **Nota de forma (Emenda do Núcleo Gerador, §3):** a necessidade está certa nos quatro casos; **a frase proposta estava errada em três.** `ya pagué` é a forma latino-americana → a fala primária é **`Ya está pagado.`** (adjetival, sem tempo a escolher, e desloca a alegação de mim para a conta). `reservé` é desnecessário → o corpus **já tem** `Tengo una reserva a nombre de…` no presente. `dejé` vira **`Me he dejado + [objeto] + [lugar]`**. E `quería` **não entra como corretivo de grosseria** — entra porque não codifica interlocutor e porque é o registro dos balcões onde `ponme` não cabe; enquadrá-lo como antídoto de grosseria contradiz o achado pragmático do próprio SKU (Espanha é cortesia positiva; o erro do britânico é o excesso de acolchoamento) e brigaria com a permissão que o produto precisa dar.
>
> **O princípio que sai daqui:** *a maior parte das necessidades "de passado" do turista é necessidade de **estado presente** disfarçada. Ele não precisa de "eu paguei" — precisa de "está pago".*

### 9.6 `PRODUTO.md` §0, tabela "O que muda e o que fica" — completar a linha

**SAI:** `| A **tabela de exílio** de gramática (ver a Emenda do Núcleo Gerador) | **Produção falada** como coração do método |`
**ENTRA:** `| A **tabela de exílio** de gramática — substituída pela **Emenda do Núcleo Gerador** (espinha geradora em M1 + exílio residual), com critério de corte falsificável e portão de build G9 | **Produção falada** como coração do método |`

### 9.7 `PRODUTO.md` INV-14 — **substituir o Teste e o Por quê**

**ENTRA:**

> **Teste:** o SKU declara **8 a 12 moldes** em `src/lib/course/nucleo.ts`. Cada um: casca congelada + buraco preenchido por **coisa do mundo** (nunca por forma que o aluno tenha de flexionar) · **≥2 substituições treinadas em voz alta** · **≥2 recalls em partes posteriores com encaixe novo** · **≥2 tiles do modo consulta**. **Nenhum molde tem parte própria.** E **≥45% dos alvos de produção do SKU (≥50% em M1) são gerados por molde declarado** — G9.
> **Por quê:** é como se cobre um domínio infinito com esforço finito, sem virar tabela de conjugação. E é a diferença entre um kit e um phrasebook falado: **o inventário resolve a cena; o molde resolve a cena que mudou.**

### 9.8 `PRODUTO.md` anti-padrão 1 — **acrescentar a segunda metade**

**ENTRA** (após o texto atual):

> **E o anti-padrão gêmeo, que é o oposto e custa igual: ensinar 20 frases da mesma família como 20 itens soltos.** Se o áudio nunca diz que a peça troca, o aluno decora 20 e não monta a 21ª. Sintoma medido: `¿Puedo + [inf]` gera **14 frases** no inventário do ¡Dime! e **não está na lista de moldes**. **Molde não declarado é molde desperdiçado.**

### 9.9 `PRODUTO.md` Apêndice A — **acrescentar quatro linhas**

> - [ ] Se a parte declara `moldes`: cada um tem `tipoBuraco` do mundo, ≥2 substituições, ≥2 `recallEm` e ≥2 tiles (G9/G10)
> - [ ] Se a parte declara `moldes`: existe `clique` não-vazio, com ≥3 nomes de lugar da própria parte e **zero** categorias gramaticais (§5.3 da Emenda)
> - [ ] Nenhum `responde` exige escolher entre `ser` e `estar`, nem concordar adjetivo com algo que não seja o falante (§4.1 da Emenda)
> - [ ] Toda forma verbal produzida está na whitelist do SKU (G11); forma nova vem com justificativa escrita
> - [ ] Nenhum `promptPt` contém a palavra do encaixe traduzida (R-B), nem anuncia a troca (R-E)

### 9.10 `PRODUTO.md` Apêndice B — **acrescentar duas dívidas**

> 7. **92% dos `promptPt` do Hablá (554/600) são tradução seca sem cena** — viola INV-3 e impede qualquer drill de troca. É o defeito mais disseminado do acervo. Corrigir no mesmo lote da extração do Kit Rioplatense.
> 8. **Vocabulário de molde instável no ¡Dime!** — *slot machine / template / the shape / the frame*, 24 ocorrências, quatro palavras. Travar em **"the frame"** (EN) e **"molde"** (PT-BR).

---

## Pendências que exigem conferência antes de virar áudio

1. **`ya he pagado` × `ya pagué` no peninsular** — INFERÊNCIA FORTE, **NÃO CONFERIDA** em fonte citada. Conferir com revisor peninsular. *(Mitigação já embutida: `Ya está pagado.` é a fala primária e não depende dessa decisão.)*
2. **`me he dejado` × `me dejé`** — mesma conferência, mesma cena.
3. **`quería` em balcão de bar** — a recomendação é **NÃO** usá-lo ali (`ponme`/`me pones` vencem). Confirmar com revisor que `quería una caña` num bar soa **livresco**, e não apenas educado — **a linha de permissão do curso depende disso.**
4. **`¿Se puede?` sozinho, dito apontando** — confirmar aceitabilidade e frequência antes de embarcar como forma fixa.
5. **Japonês e turco: nenhuma frase-alvo deste documento passou por revisor nativo.** Bloqueante para o SKU japonês (Onda 1.4).
6. **Conflito entre docs canônicos sobre o SKU Espanha** (§6.0, item 3) — decisão do dono, não desta emenda.

---

**Arquivos lidos e medidos:**
`D:\dev\_projects\curso-espanha\docs\ARQUITETURA-V2.md` · `D:\dev\_projects\curso-espanha\docs\PRODUTO.md` (idêntico a `D:\dev\_projects\curso-tailandes\docs\PRODUTO.md`) · `D:\dev\_projects\curso-espanha\docs\pesquisa-espanha.md` · `D:\dev\_projects\curso-espanha\docs\syllabus-espanha.md` · `D:\dev\_projects\curso-tailandes\docs\PORTFOLIO.md` · corpora `ep-*.json` em `D:\dev\_projects\curso-espanha\src\lib\course\`, `D:\dev\_projects\curso-espanol\src\lib\course\`, `D:\dev\_projects\curso-tailandes\src\lib\course\`, `D:\dev\_projects\curso-mandarim\src\lib\course\`.

**Fontes bibliográficas citadas:** Pimsleur, *A Memory Schedule*, MLJ 51(2), 1967 · Paulston, *Structural Pattern Drills: A Classification*, Foreign Language Annals, 1970 · Shea & Morgan, *JEP: HLM* 5, 179–187, 1979 · Nattinger & DeCarrico, *Lexical Phrases and Language Teaching*, 1992 (*sentence builders*) · Wray, *Formulaic sequences in second language teaching*, Applied Linguistics 21(4), 2000 · Hickey, *Politeness in Spain: Thanks But No 'Thanks'*, in *Politeness in Europe*, 2005.
