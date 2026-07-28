# PLANO-QUIZ — o re-corte dos quizzes do ¡Dime! (EN → Espanha)

> **O que este documento é:** o plano do item 5 da Onda 0 (`GRADE-36-ESPANHA` §7) — qual quiz cobre quais slots novos, o que se reusa do diálogo-alvo, o que se refaz nas intros, quanto custa e em que ordem se escreve. **Nada aqui foi executado.** Nenhum `quiz-*.json` foi criado, apagado ou editado; `quiz-nav.ts` está intacto.
> **Régua de evidência (PRODUTO §0):** **FATO** = medido no repositório em 27/07/2026 · **INFERÊNCIA** = projeção declarada sobre unidades FATO. Onde a conta diverge do que outro doc afirma, a divergência está nomeada.

---

## 1. O problema, medido

**FATO.** Existem **11 `quiz-ep-*.json`**, indexados pela numeração de **episódio** (`quiz-ep-e01` … `quiz-ep-c03`), que a grade de 36 slots extingue. Somam **158 clipes** (11 intros + 147 linhas de diálogo) e **7.635 créditos** pelas unidades medidas — a `GRADE` §6 e o `PRODUTO` §5.5 citam **7.658**; a diferença de 23 cr é de arredondamento de método e não muda nenhuma decisão. **Os 158 mp3 estão todos no disco** (`static/audio/`), o que é o que torna o reuso real e não teórico.

**FATO — a repartição do custo, que é o que decide tudo neste plano:**

| camada | clipes | caracteres | cr/char | créditos | % |
|---|---:|---:|---:|---:|---:|
| **intro na voz-guia** (Alice) | 11 | 3.719 | 0,5 | **1.860** | 24% |
| **diálogo em língua-alvo** (Carmen · Emilio) | 147 | 5.775 | 1,0 | **5.775** | 76% |
| **perguntas** (texto, sem áudio) | — | — | — | **0** | 0% |
| | **158** | | | **7.635** | |

Média do clipe de diálogo: **39,3 caracteres** (≈ 39 cr). Média da intro: **338 caracteres** (≈ 169 cr), maior 488.

**A consequência operacional, e é a espinha deste plano:** o diálogo-alvo é **três quartos** do dinheiro e é **integralmente reaproveitável** — as cenas de balcão, fronteira, maquininha e comisaría não mudam quando a grade muda, porque quem mudou foi o índice, não a Espanha. A intro é **um quarto** e é **integralmente perdida**, porque ela narra o agrupamento antigo ("*two of you walk into a busy bar…*" é a intro do grupo `e03`, e o grupo `e03` deixa de existir). **Reusa-se o caro; refaz-se o barato.** Nenhuma outra ordem de operações cabe no orçamento.

**A terceira camada é a mais barata de todas e a mais esquecida:** as **perguntas não têm áudio**. Uma pergunta de reconhecimento custa **zero créditos**. Toda vez que um fato novo puder ser cobrado como pergunta sobre um clipe que já existe, ele **não vira clipe** — é a regra que fecha o orçamento (§5).

**O que quebra se nada for feito (FATO, lido no código):**
- `src/lib/course/quiz-nav.ts` monta `quizDoEpisodio` por `import.meta.glob('./quiz-*.json')` e deriva o id do **nome do arquivo**; `src/routes/+page.svelte` linha 189 consome `quizDoEpisodio[ep.id]`, onde `ep.id` vem do agrupamento `e01a → e01` de `course/index.ts`. Sem episódios, **não há chave** e o link some da home.
- `src/routes/quiz/[id]/+page.ts` linha 17 resolve qualquer id não-prova como **`quiz-ep-<x>.json`**. Um arquivo com outro prefixo é gerado por `entries` e depois **404 no `load`** — prerender verde, página morta.

---

## 2. A decisão: 12 quizzes por FASE DA JORNADA

**Vem de `GRADE` §2 e obedece a `PRODUTO` §5.5, lei 2 ("o quiz é indexado por slot, não por episódio").** O agrupamento é a fase, que é a mesma coisa que o campo `fase` de `slots.json` — ou seja, o índice novo já existe no contrato e não precisa ser inventado.

| # | id | fase | slots | rótulo (EN) |
|---|---|---|---|---|
| **Q1** | `q-f01` | antes de embarcar | B01 B02 B03 B04 | Sounds, greetings and the repair kit |
| **Q2** | `q-f02` | chegar | B05 B06 B07 | Passport, four fingerprints, and a taxi with a meter |
| **Q3** | `q-f03` | circular | B08 B09 B10 | Asking, validating, and the signs that lie |
| **Q4** | `q-f04` | comer | B11 B12 B13 | Ordering it the way you actually eat |
| **Q5** | `q-f05` | gastar | B14 B15 | The bill, the machine, and half a kilo of that |
| **Q6** | `q-f06` | dormir e voltar | B16 B17 B18 | The room, the green cross, and the last morning |
| **Q7** | `q-f07` | aproveito ① | I01 I02 I03 | The clock, the counter and the dish |
| **Q8** | `q-f08` | aproveito ② | I04 I05 I06 | The night, the five questions, and your own story |
| **Q9** | `q-f09` | aproveito ③ | I07 I08 | Saying it was good, and being asked back |
| **Q10** | `q-f10` | aproveito ④ | I09 I10 | Rules with a price tag, and money without drama |
| **Q11** | `q-f11` | leio a sala ① | A01 A02 A03 A04 | What you hear when it isn't to you |
| **Q12** | `q-f12` | leio a sala ② | A05 A06 A07 A08 | The other language, the calendar, and goodbye |

**Governança, herdada do que já existe (FATO: hoje 12–15 linhas e 6–8 perguntas por quiz):** **12 a 16 linhas de diálogo · 6 a 8 perguntas · 1 intro ≤ 250 caracteres · zero `responde`.** O teto da intro não é estético: é a única alavanca que fecha o orçamento (§5), e o quiz **não** é medido pelo G4 (FATO: `valida-tom.mjs` linha 80 lê só `ep-*.json`), então aqui a disciplina é humana e precisa estar escrita.

**Zero `responde` é lei** (`PRODUTO` §5.5, lei 1): o quiz é a única superfície do produto onde é legítimo pedir que o aluno **escolha** em vez de falar, e ele não conta em G3.

---

## 3. O mapa de re-corte, quiz a quiz

Legenda: **REUSA** = a linha migra com `audioKey` e texto **inalterados**, custo **0** · **NOVA** = clipe a gravar.

### Q1 · `q-f01` — antes de embarcar (B01–B04)
| origem | audioKeys | o que entrega |
|---|---|---|
| REUSA `q-e01` inteiro | `qe01-d1` … `qe01-d13` (13) | a cafeteria de Madri de ponta a ponta: cumprimentar ao entrar (B02), `Dime`, pedir, **o kit de reparo inteiro** — `¿puedes hablar más despacio?`, `no entiendo`, `¿me lo escribes?` (B03), o preço com o `th` de `cincuenta` (B01), `hasta luego` ao sair |
| REUSA perguntas de `q-e02` | — | as duas perguntas de **B04** que já estão escritas e são texto puro: o golpe do ETIAS vendido a €59 e a janela móvel 90/180 |

**Novas: 0 linhas.** É o quiz mais barato do curso e o mais bem servido pelo acervo — o diálogo de `q-e01` já *é* a fase "antes de embarcar" sem saber. Só a intro é nova.
**Custo: ~125 cr.**

### Q2 · `q-f02` — chegar (B05–B07)
| origem | audioKeys | o que entrega |
|---|---|---|
| REUSA `q-e02` | `q-e02-d1` … `q-e02-d10` (10) | a fronteira inteira: `Mire a la cámara`, os quatro dedos (EES), **as três respostas prontas** e `Aquí tiene la reserva` (B05) |
| REUSA `q-e02` | `q-e02-d13` (1) | `Quiero una tarjeta SIM de prepago, solo datos` — B06 |
| REUSA `q-c02` | `qc02-d1`, `qc02-d2` (2) | **el romero**: o golpe do alecrim e o `No, gracias. No me interesa.` — beat de B07 |
| REUSA `q-e06` | `qe06-d1`, `qe06-d5`, `qe06-d7` (3) | o homem que grita `¿Taxi, amigo?`, `¿Es tarifa fija, verdad?` e `Pare aquí. ¿Me da un recibo?` — B07 |

**Novas: 0 linhas. 16 reusadas.** O caixa eletrônico de rua × Euronet — o fato mais valioso de B06 — entra como **pergunta sobre a linha do táxi**, não como clipe: é a aplicação direta da regra de §5.
**Custo: ~125 cr.**

### Q3 · `q-f03` — circular (B08–B10)
| origem | audioKeys | o que entrega |
|---|---|---|
| REUSA `q-e06` | `qe06-d8` … `qe06-d13` (6) | suplemento de aeroporto, `¿Dónde está el control de acceso?`, `vía 12`, o portão que fecha antes, a mala no arco — B09 |
| **NOVAS** | 6 clipes | **B08 não tem uma linha sequer no acervo**, e é a CASA de dois moldes (M3 `¿Hay…?` e M7 `¿Dónde está…?`). O bloco é: pergunta binária → resposta com três ruas e um gesto → `¿Está lejos?` → `¿Me lo escribe?` → o dedo. Sem ele, o quiz de "circular" cobra metrô e não cobra a pergunta que o módulo inteiro existe para ensinar |
| **B10 — quiz VISUAL, zero áudio** | — | `SALIDA` × `SALIDAS`, `TIRAR`, `PLANTA BAJA`, `SOLO EFECTIVO`, `VÍA × ANDÉN`, `COCINA CERRADA`. Duas destas perguntas **já estão escritas** em `q-e08` (perguntas 6 e 7) e migram de graça |

**Novas: 6 linhas · 12 no total.** **Custo: ~395 cr.**

### Q4 · `q-f04` — comer (B11–B13)
| origem | audioKeys | o que entrega |
|---|---|---|
| REUSA `q-e03` | `qe03-d1` … `qe03-d8` (8) | `Buenas` / `Dime`, `¿Es el mismo precio en la barra?`, o suplemento de terraza, `¿Me pones dos cañas?`, **`la carta` e não `el menú`**, `¿Esto es tapa, media ración o ración?` — B11 e B12 |
| REUSA `q-e04` | `qe04-d2`, `qe04-d3`, `qe04-d4`, `qe04-d7`, `qe04-d8`, `qe04-d9` (6) | `soy alérgico a los frutos secos`, o `un poquito no pasa nada, ¿no?` da garçonete, **`Es alergia, no es manía`**, `¿Lleva jamón o chorizo?` e o jamón picadito nas judías verdes — B13, e é a CASA de M6 |

**Novas: 0 linhas. 14 reusadas.** Segundo quiz de custo só de intro. **Comer é onde o acervo é mais rico, e é também onde o produto é melhor — não é coincidência.**
**Custo: ~125 cr.**

### Q5 · `q-f05` — gastar (B14–B15)
| origem | audioKeys | o que entrega |
|---|---|---|
| REUSA `q-e05` | `qe05-d1` … `qe05-d11` (11) | a conta, a nota de cinquenta que ninguém troca, **o DCC inteiro** (`¿Desea pagar en su moneda?` → `Cóbreme en euros, en moneda local. Sin conversión.`) e a tela de gorjeta com `Sin propina` — B14, *the part that pays for the app* |
| **NOVAS** | 4 clipes | B15 não tem diálogo no acervo: `¿Puedo probármelo?` / os probadores ao fundo / `¿Tiene una talla más grande?` / `Póngame medio kilo de esto` |

**Novas: 4 · 15 no total.** **Custo: ~305 cr.**

### Q6 · `q-f06` — dormir e voltar (B16–B17–B18)
| origem | audioKeys | o que entrega |
|---|---|---|
| REUSA `q-e07` | `qe07-d1`, `qe07-d2`, `qe07-d3`, `qe07-d8`, `qe07-d9` (5) | `Tengo una reserva a nombre de…`, a **ficha de viajeros** (RD 933/2021, não é golpe), o ar-condicionado que não funciona, a troca de quarto — B16 |
| REUSA `q-e08` | `qe08-d3`, `qe08-d5`, `qe08-d8`, `qe08-d13` (4) | `Me han robado el móvil y la cartera`, `Ha sido en el metro, hace diez minutos`, **`Hice la denuncia por internet. Vengo a ratificarla.`** e a `farmacia de guardia` — B17 |
| **NOVAS** | 5 clipes | **a premissa invertida de B16** (2): `Quería otra habitación, si es posible. ¿Tienen una planta más alta?` + a resposta. **B18** (3): `¿Puedo dejar las maletas hasta las seis?` · `Me he dejado la chaqueta en la habitación` · `Sí, está en recepción.` — B18 é a CASA de M12 e não tem uma linha no acervo |

**Novas: 5 · 14 no total.** **Custo: ~350 cr.**
⚠️ **Este quiz depende de B17, que não aparece em nenhuma onda de despacho do §7 da grade** (ver §7 deste plano).

### Q7 · `q-f07` — I01 I02 I03
| origem | audioKeys | o que entrega |
|---|---|---|
| REUSA `q-c01` | `q-c01-d1` … `q-c01-d13`, menos 2 (11) | **é o relógio espanhol já gravado**: `¿Están sirviendo comidas?` às 19h20, `la cocina abre a las ocho y media`, barra × terraza, `Aquí no, cariño. Esto no es Granada.`, reservar às nove e meia, `¿Cuántos sois?` — I01 e I02 quase verbatim |
| **NOVAS** | 3 clipes | **I03 é a CASA de S2 ESCOLHA** e o quiz tem que carregá-la: `¿Qué lleva el menú del día?` / `De primero, ensaladilla o sopa; de segundo, pulpo o pollo.` / **`¿Cuál me recomienda, el pulpo o el pollo?`** |

**Novas: 3 · 14 no total.** **Custo: ~260 cr.**

### Q8 · `q-f08` — I04 I05 I06
| origem | audioKeys | o que entrega |
|---|---|---|
| REUSA `q-c03` | `qc03-d9`, `qc03-d11` (2) | `¡Bon dia! ¿Qué os pongo?` e `Sois ingleses, ¿no?` — **`vosotros` no ouvido**, que é exatamente o que I05 pede e o aluno nunca produz |
| **NOVAS** | 11 clipes | I04 (3): a rodada, `¿Podemos pagar por separado?` pedido **antes** de fechar a conta. I05 (5): as cinco perguntas de sempre + a resposta com **S3 PREFERÊNCIA** (`Me gusta mucho, sobre todo…`). I06 (3): `Ayer fui a…` / `Comí…` / `Me encantó…`, as três formas lacradas |

**Novas: 11 · 13 no total. É o quiz mais caro do curso — e honestamente caro:** I04, I05 e I06 são partes 100% novas, sem uma linha de origem no acervo. Cortar aqui é cortar a única cena em que o aluno **devolve** alguma coisa à conversa.
**Custo: ~620 cr.**

### Q9 · `q-f09` — I07 I08
| origem | audioKeys | o que entrega |
|---|---|---|
| REUSA `q-c02` | `qc02-d6`, `qc02-d8`, `qc02-d10`, `qc02-d11`, `qc02-d12`, `qc02-d13` (6) | **a reclamação calma que resolve**, inteira e já gravada: `¿me trae la cuenta detallada?` → `Aquí hay un cargo que no estaba en la carta. ¿Qué es?` → `Es el cubierto` → **`La hoja de reclamaciones, por favor`** → `Se lo quito` — metade de I07 vem de graça |
| **NOVAS** | 8 clipes | I07 (4): **S1 APRECIAÇÃO**, a CASA — `Estaba buenísimo, de verdad` · `¡Qué sitio más bonito!` · o retorno `¿Le ha gustado el arroz?` · `Se lo digo al cocinero`. I08 (4): o convite, o brinde `¡Salud!` e **COMBINAR** — `¿Nos vemos a las ocho en la plaza?` / `Vale, allí estaré` |

**Novas: 8 · 14 no total.** **Custo: ~485 cr.**
🔒 **É o quiz que não pode ser cortado por orçamento.** Ele é a única passagem de reconhecimento sobre S1 (a célula literalmente vazia do produto) e sobre COMBINAR (o molde recuperado no achado 10). Sem ele, o aluno ouve o elogio e o convite pela primeira e única vez dentro do episódio.

### Q10 · `q-f10` — I09 I10
| origem | audioKeys | o que entrega |
|---|---|---|
| REUSA `q-c03` | `qc03-d1` … `qc03-d7` (7) | **I09 inteiro, já gravado**: sem camiseta fora da praia, a cerveja na rua, `¿De cuánto es la multa?`, `Ciento veinte euros. Y se paga aquí mismo, con tarjeta.`, `¿Me lo puede dar por escrito?` |
| REUSA `q-e05` (compartilhado com Q5) | `qe05-d10`, `qe05-d11` (2) | a tela de 10/15/20% e o `Sin propina, gracias` — I10 |
| **NOVAS** | 2 clipes | `¿Podemos pagar a partes iguales?` + a resposta |

**Novas: 2 · 11 no total.** **Custo: ~215 cr.**

### Q11 · `q-f11` — A01 A02 A03 A04
| origem | audioKeys | o que entrega |
|---|---|---|
| REUSA `q-c03` | `qc03-d11`, `qc03-d12` (2) | `¿Y qué pensáis de todo el lío de la independencia?` → **`No conozco bien el tema, cuénteme.`** — A04 exato, e a habilidade é a não-fala |
| **EMPRESTA de A01** | os clipes da **5ª voz** | o drill de reconhecimento do *ear module* — os moldes ouvidos em velocidade real. **Custo zero para este plano:** já está orçado na linha "A01 — 5ª voz (Sevilha), 800 cr" da `GRADE` §6. O quiz **aponta** para os `audioKey` de A01, não regrava nada |
| **NOVAS** | 4 clipes | A02: a implicância afetuosa — `¡Qué burro eres, tío!` / `Anda ya.` / `¡Qué me estás contando!` / a resposta que ri. **Formato obrigatório da pergunta: "isto é briga ou carinho?"**, reconhecimento puro (`PRODUTO` §5.3: humor é receptivo) |

**Novas: 4.** **Custo: ~305 cr.**
⚠️ **Dependência dura: não escrever antes de a Onda 5 ter gravado A01 na 5ª voz.**

### Q12 · `q-f12` — A05 A06 A07 A08
| origem | audioKeys | o que entrega |
|---|---|---|
| REUSA `q-c03` | `qc03-d8`, `qc03-d9`, `qc03-d10` (3) | `Bon dia` na porta, o `¡Bon dia!` de volta e o atendimento que muda — A05 exato |
| **NOVAS** | 4 clipes | A06 (2): `¿Están abiertos hoy?` / `Cerramos todo agosto. Abrimos el uno de septiembre.` A08 (2): `Ha estado genial. Volveré.` / `Que os vaya muy bien.` |
| **reconhecimento visual, zero áudio** | — | `obert/tancat`, `sortida`, `lavabos/serveis`, `irteera`, `saída/pechado` — A05 é receptivo por desenho, e placa se reconhece com o olho |

**Novas: 4 · 7 no total.** **Custo: ~305 cr.**

---

## 4. O placar do reuso

**INFERÊNCIA sobre unidades FATO.**

| | linhas | créditos |
|---|---:|---:|
| diálogo-alvo existente | 147 | 5.775 |
| **reusado** (98 linhas distintas, 3 delas em dois quizzes) | **98** | **≈ 3.850** |
| **descartado** (não cabe em nenhuma fase) | 49 | ≈ 1.925 |
| intros existentes — **100% descartadas** | 11 | 1.860 |
| **preservado do investimento de 7.635 cr** | | **≈ 3.850 (50%)** |

**Onde morrem as 49 linhas, e por quê:** cenas cuja fase não as comporta sem estourar o teto de 16 — o balcão da locadora de `q-e07` (6 linhas: seguro, caução, etiqueta ambiental, `lleno a lleno`), metade do diálogo de alergia de `q-e04`, o `Marchando` e as linhas de ligação de `q-c02`. **Elas não são lixo: são material de card do modo consulta** (tiles `taxi`, `dieta`, `pagar`), que a `GRADE` §6 já orça em linha separada de 1.200 cr. **Decidir isso no re-corte, não depois** — mp3 que ninguém referencia vira órfão, e o repositório já tem 2 (FATO).

---

## 5. O orçamento, e a única alavanca que o fecha

| item | quantidade | conta | créditos |
|---|---:|---|---:|
| clipes de diálogo **novos** | **47** | 47 × ~45 chars × 1,0 | **≈ 2.115** |
| intros **refeitas** | **12** | 12 × ≤250 chars × 0,5 | **≈ 1.500** |
| linhas reusadas | 98 | `audioKey` e texto inalterados | **0** |
| perguntas | ~85 | texto, sem áudio | **0** |
| clipes de A01 emprestados pelo Q11 | ~6 | já orçados na 5ª voz | **0** |
| | | | **≈ 3.615** |

**Bate com a linha de 3.600 cr da `GRADE` §6 — mas só com a intro a 250 caracteres.** Às 338 de hoje o total vai a **≈ 3.900 (8% acima)**; às 488 do pior caso atual, a **4.400**. **A duração da intro é a única variável livre do orçamento de quiz**, e encurtá-la é ganho duplo: a intro longa é a mesma palestra que o G4 persegue nos episódios, só que numa camada onde nenhum portão a mede.

**A regra que substitui crédito por texto:** todo fato que puder ser **cobrado numa pergunta sobre um clipe que já existe** não vira clipe. Foi assim que B06 (caixa de rua × Euronet), B04 (ETIAS, 90/180) e B10 (as placas inteiras) entraram no plano custando **zero**.

---

## 6. As quatro regras técnicas do re-corte

**1. `audioKey` é dinheiro. Linha reusada migra com a chave E o texto byte a byte idênticos.** `scripts/lib/collect-audio.mjs` deriva `key → (voz, texto)` e `valida-audio.mjs` quebra quando o texto atual não bate com o manifesto. Mudou uma vírgula, é clipe novo — e então **ele leva chave nova**, nunca a antiga.

**2. Reusar a mesma linha em dois quizzes é grátis — e tem uma armadilha.** `collect-audio.mjs` deduplica por chave (`seen`), então o segundo arquivo não gera job. A armadilha: se os dois arquivos trouxerem a **mesma chave com textos diferentes**, o segundo é **silenciosamente ignorado** — sem erro, sem aviso, e o aluno ouve o texto do outro quiz. (É o buraco que o G14 promete cobrir e ainda não cobre.) **Regra: chave repetida ⇒ texto copiado, nunca redigitado.** Neste plano isso vale para `qe05-d10`, `qe05-d11` (Q5 e Q10), `qc03-d9` (Q8 e Q12) e `qc03-d11` (Q8 e Q11).

**3. Os prefixos de chave são inconsistentes hoje e não se conserta agora.** FATO: convivem `qe01-d1`, `q-e02-d1`, `qe03-d1`, `q-c01-d1`, `qc02-d1`. Renomear = regravar = pagar de novo pelos 98 clipes reusados. **As chaves antigas ficam como estão.** Clipe novo nasce no espaço de nomes da fase: `qf03-d1`, `qf08-d5` — assim o que é novo é rastreável e o que é herdado é reconhecível.

**4. Apagar arquivo é a metade fácil; a outra é o órfão.** Ao apagar os 11 `quiz-ep-*.json`, **60 mp3 ficam órfãos** (as 11 intros + as 49 linhas descartadas) e precisam sair de `static/audio/` **e** de `manifest.json`. `valida-audio.mjs` só emite **aviso** para órfão, não erro — ninguém vai ser avisado com força.

---

## 7. A ordem de escrita — por que cada quiz espera

**O princípio: um quiz é a passagem de reconhecimento sobre um grupo de slots, então ele se escreve depois do último slot do grupo.** Escrever antes é quizar conteúdo que ainda vai mudar, e é a forma mais barata de pagar duas vezes.

| onda | quizzes liberados | por quê |
|---|---|---|
| **Onda 0** (agora) | — | só este plano e a mudança de navegação (§8), que não depende de conteúdo |
| **fim da Onda 2** | **Q1**, **Q2**, **Q4** | os slots são reuso integral (B01–B05) ou fecham na Onda 2 (B07, B11, B12, B13). São os três quizzes de custo só-de-intro: **375 cr entregam 3 dos 12** |
| **fim da Onda 3** | **Q3**, **Q5**, **Q6** | dependem de B10, B14, B18 — e **Q6 depende de B17** (§9) |
| **fim da Onda 4** | **Q7**, **Q8**, **Q9**, **Q10** | M2 inteiro. Q9 sai **junto com I07**, não depois: é o par de reconhecimento do único molde social que abastece o tile `simpatia` |
| **fim da Onda 5** | **Q11**, **Q12** | **dependência dura da 5ª voz** — o drill de Q11 aponta para `audioKey` de A01 que só existem depois do bake-off de casting |

---

## 8. A navegação — o que muda no código (não executado)

**Três arquivos, e a ordem importa: mudar a navegação ANTES de apagar os quizzes antigos deixa a home sem links; apagar antes deixa 404.** Fazer os três na mesma mudança.

1. **`src/lib/course/quiz-nav.ts`** — `quizDoEpisodio` (id de episódio → quiz) morre e vira **`quizDoSlot`** (id de slot canônico → quiz), montado sobre uma tabela `fase → slots` que é a §2 deste plano. A tabela é derivável de `slots.json` pelo campo `fase` para M1; para M2 e M3 os quatro e os dois blocos são decisão editorial e ficam explícitos no arquivo.
2. **`src/routes/quiz/[id]/+page.ts`** linha 17 — hoje resolve todo id não-prova como `quiz-ep-<x>.json`. Passa a resolver `q-fNN` → `quiz-fNN.json`, mantendo o ramo das provas de nível. **Enquanto os dois conjuntos coexistirem, os dois ramos precisam existir**, senão o prerender gera entrada e o `load` devolve 404.
3. **`src/routes/+page.svelte`** linhas 189–196 — o cartão de quiz pendura hoje no grupo de episódio; passa a pendurar no **fim de cada fase**, que é onde o aluno acabou de terminar os slots que o quiz cobra.

**Nada disto é reversível de graça depois de o áudio ser gerado** — por isso a navegação é a primeira coisa a mudar e a única que se pode mudar antes de qualquer crédito ser gasto.

---

## 9. Divergências que este plano encontrou e não resolve sozinho

1. **B17 não está em nenhuma onda de despacho.** FATO, conferido na `GRADE` §7: a Onda 1 despacha B12, B08, B06, B03; a 2, B11, B09, B07, B15, B16, B13; a 3, B14, B10, B18; a 6, B01, B02, B04, B05. São 17 dos 18 slots de ME VIRO — **falta B17**. A §6 o orça como enxerto (590 cr) e a §2 diz que ele absorve metade de `e08b` e os seis golpes de `c02b`, ou seja, tem trabalho real. **Q6 depende dele.** Precisa entrar na Onda 3.
2. **A `GRADE` §6 orça 3.600 cr para os quizzes; este plano fecha em 3.615 com intro de 250 caracteres e estoura para ~3.900 com a intro média de hoje.** Não é erro da grade — é uma premissa que ninguém tinha escrito. Está escrita agora (§5).
3. **7.658 × 7.635 cr.** O número publicado e o medido aqui diferem em 23 cr. Irrelevante para a decisão, registrado para não virar uma terceira medição amanhã.
4. **A prova de nível (`quiz-basico.json` etc.) não existe no disco** — FATO: `quiz-nav.ts` prevê `examDoNivel`, e não há nenhum `quiz-<nivel>.json`. O re-corte não muda isso; fica registrado que a superfície existe no código e não no conteúdo, e que **os 12 quizzes de fase não são a prova de nível** — se ela for querida, é uma decisão e um orçamento separados.
