# SCHEMA DO EPISÓDIO — os campos que os portões leem

> **O que este documento é.** A definição dos campos que um `ep-*.json` precisa declarar para que os portões do `PRODUTO.md` §9 deixem de ser prosa. É o item 4 da Onda 0 da `GRADE-36-ESPANHA.md` §7, resolvido campo a campo: onde vive, que tipo tem, qual portão o lê, quando é obrigatório e um exemplo real da Espanha.
> **Vigência:** 2026-07-27 · **Escopo:** ¡Dime! EN → Espanha, e o formato é de catálogo (os 20 SKUs) · Em conflito com `PRODUTO.md`, o PRODUTO vence; em conflito com `slots.json` e `moldes.json`, **o arquivo executável vence**.

**Régua de estado (herdada do PRODUTO, e este documento a leva a sério).** Toda linha abaixo marcada **ATIVO** foi lida no script, no disco, hoje, com número de linha. Toda linha **PENDENTE** é código que ainda não existe e está na tabela do §8. A auditoria adversarial derrubou a versão anterior porque metade dela afirmava como FATO o que o repositório desmentia — aqui, quando eu digo que um portão lê um campo, é porque eu abri o arquivo.

---

## 1. A restrição que decide tudo: as três zonas de um episódio

Antes de nomear campo, é preciso saber onde a informação pode morar, porque **uma das zonas vira áudio pago e as outras não**.

`scripts/lib/collect-audio.mjs` é o extractor único (o que impediu a repetição do desastre alemão). Ele percorre **apenas `ep.steps[]`**, e só emite job de TTS para `s.audioKey` / `s.promptAudioKey` (FATO: `collectJobs`, linhas 29–41). Consequência direta, e é ela que organiza este schema:

| zona | onde | vira áudio? | serve para |
|---|---|---|---|
| **A — raiz do episódio** | `ep.campo` | **nunca**, em nenhuma hipótese | declaração do autor, lida por portão e por revisor humano |
| **B — step com `audioKey`** | `ep.steps[i]` | **sim, custa crédito** | a fala em si |
| **C — step sem `audioKey`** | `ep.steps[i]` | não | marcação de anatomia e de atribuição (`tom`, `bloco`, `molde`, `gesto`) |

**A regra de alocação (LEI deste schema):** *o que o aluno ouve vive num step; o que o revisor confere vive na raiz; e quando os dois precisam existir, a raiz carrega a **declaração** e o step carrega a **fala**, com um `audioKey` opcional ligando os dois.*

Isso resolve a dúvida que aparece em `permissao`, `espelho`, `frasePiso` e `clique` — os quatro são **texto falado** e ao mesmo tempo **coisa que um portão precisa achar sem interpretar áudio**. Duplicar a string na raiz é barato (zero crédito, zero risco de ir ao TTS) e é o que torna o portão escrevível em cinco linhas em vez de heurística sobre o corpo do episódio.

**Segunda restrição, e é boa notícia:** `src/routes/episodio/[id]/+page.ts` carrega os JSON com `import.meta.glob<{ default: Episode }>` — o tipo é **asserido, não checado**. Campo novo no JSON **não quebra o build nem o `svelte-check`** e é inerte no player. O corolário é desconfortável e precisa estar escrito: **nada além dos validadores confere estes campos.** Se o portão não for escrito, o campo é decoração.

---

## 2. O que existe hoje no disco (FATO, medido em 27/07/2026)

Varredura dos 24 `ep-*.json`:

**Chaves de raiz, em 100% dos arquivos:** `id · nivel · numero · parte · titulo · subtitulo · aprofundar` + `slot` (15 arquivos) **ou** `dissolveEm` (9) + `moldura` (nos 15 com `slot`).

**Chaves de step, o universo inteiro do corpus:** `tipo · voz · audioKey · pt · es · pinyin · tts · promptVoz · promptAudioKey · promptPt · promptTts · gesto`.

**Não existe, em nenhum dos 24 arquivos, nenhuma ocorrência de:** `cena · decisao · permissao · espelho · frasePiso · fatosDatados · fichasCulturais · moldes · clique · tom · molde · tipoBuraco · bloco`.

`gesto` existe em **11 steps de 3 arquivos**: `ep-e01a` (9), `ep-e01b` (1), `ep-e01c` (1). Confirma a medição da grade §4 e o diagnóstico do G16: a regra "aquecimento em toda parte" está violada em 21 dos 24 arquivos.

**Armadilha de nomenclatura, e ela é permanente neste SKU:** o campo chama-se `pt` mas **contém inglês** — é a língua do comprador, não o português. `collect-audio` manda `s.pt` para a voz-guia (Alice, en-GB). Todo campo declarativo criado abaixo segue a mesma convenção: **escrito na língua do comprador do SKU**, porque é nela que os léxicos do `valida-tom.mjs` estão escritos e é nela que o texto falado já está.

---

## 3. A tabela mestra

| campo | zona | tipo | portão que lê | obrigatório quando |
|---|---|---|---|---|
| `tom` | step (C) | `'ganha' \| 'protege'` | **G2** — ATIVO (`valida-tom.mjs` L139-140) | **só na virada de tom** — ver §5 |
| `bloco` | step (C) | enum fechado | **G7** — ATIVO (L248) · G16 PENDENTE | no primeiro step de cada bloco da anatomia |
| `molde` | step (C) | id de `moldes.json` | **G9** — ATIVO (L299-304) | em todo `responde`/`shadow` cujo alvo é instância de molde declarado |
| `gesto` | step (C) | `1 \| 2 \| 3 \| 4` | G16 PENDENTE (já renderizado por `EpisodioPlayer.svelte` L493) | primeiro step de **todas** as 36 partes |
| `cena` | raiz (A) | `string` | G16 PENDENTE | **36/36** |
| `decisao` | raiz (A) | `string` | G16 PENDENTE (T2) | **10/10 de M2** |
| `emJogo` | raiz (A) | `'dinheiro' \| 'tempo' \| 'ambos'` | G16 PENDENTE (T2) | junto de `decisao` |
| `permissao` | raiz (A) | `string` | **G5** — ATIVO (L217) | todas de M2/M3 + toda parte de M1 com `fichasCulturais` |
| `fichasCulturais[]` | raiz (A) | `Ficha[]` (6 campos) | **G7** — ATIVO (L242-244) | toda parte com cápsula cultural |
| `espelho` | raiz (A) | `string` | **G7** — ATIVO (L246-249) | **8/8 de M3**; opcional em M2 |
| `frasePiso` | raiz (A) | `string` | G16 PENDENTE (INV-18) | ≥1 por módulo (3 no SKU); livre nas demais |
| `fatosDatados[]` | raiz (A) | `Fato[]` | **G13** PENDENTE (INV-23) | toda parte que enuncia número, preço, lei, prazo ou regra de fronteira |
| `moldes[]` | raiz (A) | `string[]` | G16 PENDENTE | toda parte que é **CASA** de molde |
| `clique` | raiz (A) | `{ contagem: string[]; desconto: string }` | **G16** ATIVO | toda parte com `moldes` não vazio |

> **Correção de 2026-07-27 (achada por revisor da Onda 2).** Esta linha dizia `string`. O `valida-tom.mjs` lê `clique.contagem` como array e os três arquivos que já têm o campo usam objeto — **o disco decide**, e o schema é que estava desatualizado. O `clique` é o fecho de três batidas: `contagem` são os lugares onde o molde acabou de servir (≥3, e da própria parte), e `desconto` é a frase que diz ao aluno que ninguém lhe deu aquelas frases, ele as montou. Manter `string` aqui faria o próximo autor escrever um campo que o portão não consegue ler.
| `consulta` | **step `responde`** | `string[]` (ids de folha) | **G8** | todo `responde` que resolve uma situação consultável |
| `tipoBuraco` | **`moldes.json`** (+ step, opcional) | enum fechado | **G10** PENDENTE | os 15 moldes declarados |


### O campo `consulta` — como um exercício vira card do cheat-sheet

Marque num step `responde` as folhas de `src/lib/consulta/taxonomia.ts` que ele resolve: `"consulta": ["mesa/bebida", "chegar/balcao"]`. O `build-consulta.mjs` monta o card a partir dele e **absorve os vizinhos** — o `ouvir` imediatamente anterior vira o que ELE diz antes, o imediatamente posterior vira o que ELE responde.

**É isso que faz a TROCA**, que é o diferencial contra o phrasebook: o phrasebook dá a SUA fala e te abandona no segundo seguinte, quando o garçom responde. Nós damos você diz X → ouve Y → responde Z. E a troca **já está paga**: toda escada de escalada autorada nos episódios — o garçom que desmente *"un poquito no pasa nada, ¿no?"*, a garçonete que elogia o prato, admite o presunto e ainda entrega o caldo de peixe no arroz — hoje é ouvida uma vez e descartada no fim da lição.

**O índice é multigrafo, não árvore:** um card pendura em várias folhas. Custo de folha duplicada é zero; custo de busca que falha é o produto inteiro.

**Meta por parte: 3 a 6 cards.** O G8 quebra a build se alguma folha ficar vazia, se o tile `simpatia` tiver menos de 8 cards no curso, ou se mais de 15% dos cards forem de folha reativa ("deu errado") — o teto existe porque foi por aí que a deriva defensiva entrou da primeira vez.

**Quatro campos que não estavam na lista da Onda 0 e entram aqui com motivo:**
- `bloco` — **o `valida-tom.mjs` já o lê hoje** (`s.bloco === 'espelho'`, L248) e nenhum arquivo o tem. É um campo fantasma vivo no script.
- `moldes[]` e `clique` — o **G16 do PRODUTO §9 os lê literalmente** ("parte com `moldes` tem `clique` não-vazio com ≥3 nomes de lugar da própria parte"). Sem defini-los, o G16 é inescrevível. A lista da Onda 0 os esqueceu.
- `emJogo` — proposta minha, e a justificativa está no §4.7: sem ele, o teste de T2 é "string não vazia", que é carimbo, não portão.

---

## 4. Campo a campo

### 4.1 `tom` — step

**Tipo:** `'ganha' | 'protege'`. **Zona:** step, sem `audioKey` próprio (é marcação, não fala).
**Portão:** G2, **ATIVO**. O script faz `steps.filter(s => s.tom === 'ganha')` ÷ `filter(s => s.tom === 'protege')`, exige ≥2:1 em M2/M3 (erro) e ≥1:1 em M1 (aviso), e hoje cai no ramo `if (!ganha && !protege)` → aviso "G2 não pode ser medido" em 24 de 24 arquivos.
**Obrigatoriedade:** **apenas no step em que o tom vira.** A regra de derivação inteira está no §5, porque é meia decisão de produto, não um detalhe de tipo.
**Por que no step e não na raiz:** a raiz já tem `moldura`, que é a mesma pergunta feita sobre a parte inteira. O G2 existe justamente para pegar o que a `moldura` esconde — a parte anunciada como ganho cujo miolo é medo. Marcar tom na raiz seria declarar duas vezes a mesma coisa e perder o portão.
**Exemplo real:** `ep-e05a` (B14, `moldura: "protege"` no disco). O bloco do DCC é defensivo, mas o **clique** dele é ganho puro — *"10 to 13% of every purchase of the trip stays in your pocket"*. Esse step abre com `"tom": "ganha"` e os cinco seguintes herdam. Custo: uma marcação.

---

### 4.2 `bloco` — step

**Tipo:** string de vocabulário **fechado**: `aquecimento | callback | cena | corpo | molde | capsula | permissao | espelho | clique | recap | piso`. São os dez blocos da anatomia do PRODUTO §4 mais `piso`.
**Zona:** step. **Declarado só no primeiro step do bloco** — mesma disciplina de `tom`: campo de bloco se declara na virada, nunca em todo step.
**Portão:** G7 já lê `s.bloco === 'espelho'` (**ATIVO**, L248). G16 passa a lê-lo para a lei **"a ordem é lei: cena → produção → regra"**, que hoje é a maior lei sem teste do produto. Teste concreto e barato: `índice(bloco:'cena') < índice(primeiro responde) < índice(bloco:'clique'|'recap')`.
**Obrigatoriedade:** os blocos que um portão precisa achar — `aquecimento`, `cena`, `clique`, `espelho`, `recap` — são obrigatórios onde a anatomia os exige; os demais são bem-vindos e nunca cobrados.
**Aviso de tipo que evita um bug futuro:** `valida-tom.mjs` L248 também aceita `s.tipo === 'espelho'`. **Não usar.** Os cinco tipos de passo são fechados por LEI (`intro | ouvir | responde | shadow | recap`, PRODUTO §4) e um sexto tipo faria o player cair no ramo `else` de renderização. O espelho é `bloco`, nunca `tipo`.

---

### 4.3 `molde` — step

**Tipo:** id existente em `moldes.json` — hoje `M1`…`M12`, e `S1`/`S2`/`S3` quando os três moldes sociais forem acrescentados.
**Zona:** step, e **só em `responde` e `shadow`** — são os únicos tipos que o G9 varre (L299). Pôr `molde` num `ouvir` é inerte.
**Portão:** G9, **ATIVO**. Ele mapeia frase-alvo única (`s.es`) → molde, mede `geradas/total`, exige ≥45% no SKU, ≥50% em M1, ≥35% em M2. Hoje mede **0%**.
**Obrigatoriedade:** sempre que o `es` do step é instância de um molde declarado. **Nunca herdado, nunca em cascata** — e a assimetria com `tom` é deliberada: a herança de `tom` pode ser barrada por léxico, a de `molde` não pode ser barrada por nada, e ela infla exatamente o numerador que o G9 mede. Herança onde o autor lucra e ninguém consegue conferir é fraude com sintaxe bonita.
**Exemplo real:** em `ep-e08a` (B17), o step `e08a-estomago-e` tem `es: "¿Me puede recomendar algo para el dolor de estómago?"` → `"molde": "M8"`. É redisparo de `¿Me puede + [inf]?`, cuja casa é B03.

**Três coisas que este campo obriga a resolver antes de a Onda 1 começar** (todas em §9): o teto de 12 hard-coded no G9, a divergência de identidade do `M12` entre a grade e o `moldes.json`, e a trava "molde em uma parte só = erro" que dispara em falso enquanto o corpus estiver parcialmente marcado.

---

### 4.4 `gesto` — step

**Tipo:** `1 | 2 | 3 | 4` (já tipado em `types.ts` L88). **Zona:** step.
**Portão:** G16, PENDENTE — "`gesto` declarado no primeiro step".
**Obrigatoriedade:** **no primeiro step de todas as 36 partes**, sem exceção (invariante do gesto, PRODUTO §3.4). Hoje: 3 arquivos de 24.
**Atenção — este campo não é só declaração, ele desenha na tela.** `EpisodioPlayer.svelte` L493 renderiza `<GestoRitmo gesto={step.gesto} />` sempre que o campo existe. Duas consequências práticas: (a) declare-o num step `intro` de abertura (`bloco: "aquecimento"`), como já fazem `e01b` e `e01c`, e não num `responde`, senão a mão aparece durante a pausa de fala; (b) `mapaGestos: true` (os quatro programas lado a lado) fica **só em B01** — em qualquer outra parte é ruído visual.
**Qual programa:** M1 usa o programa que o som da parte cobra (1 metrônomo / 2 palma plana são o padrão de abertura). **M2 e M3 usam 3 (soco) ou 4 (flick)**, porque a perda ali não é vogal, é fala rápida (grade §4, mudança de uso 1). **A01 usa o programa 1 de propósito** e contra a intuição: enquanto a voz do sul derruba o `-s`, a mão mantém as batidas iguais.
**Exemplo real:** `ep-e01c` step 0 → `{"tipo":"intro","voz":"Alice","audioKey":"e01c-n01","gesto":2}`.

---

### 4.5 `cena` — raiz

**Tipo:** `string`, uma frase, ≤200 caracteres. **Zona:** raiz.
**Portão:** G16, PENDENTE — "campo `cena` não vazio". Par com `bloco: "cena"` no step onde a cena é aberta em voz alta.
**Obrigatoriedade:** **36/36.** É o teste de INV-1 ("toda parte nomeia uma cena com consequência"), hoje a lei mais central do produto e sem nenhum teste (auditoria, achado 21).
**Por que na raiz:** a `cena` não é a narração — é a **declaração** de que existe uma, e é ela que o revisor lê em três segundos antes de abrir 50 steps. A narração da cena vive no step; as duas coexistem pela regra do §1.
**Definição, exemplos bons e ruins:** §6, porque é a segunda pergunta que este documento tinha que responder.

---

### 4.6 `decisao` — raiz

**Tipo:** `string`. **Zona:** raiz. **Portão:** G16, PENDENTE — trava T2, "`decisao` não vazio em toda parte de M2".
**Obrigatoriedade:** **10/10 de M2.** Livre (e bem-vinda) em M1/M3, nunca cobrada.
**A colisão de nome que precisa estar escrita:** **`slots.json` já tem um campo `decisao`** em cada um dos 10 slots de M2 (L34-43), em português, dizendo o que aquele slot põe em jogo no catálogo inteiro. O campo do episódio é outro: é o que **esta** parte, neste SKU, nesta língua, põe em jogo, escrito na língua do comprador. São duas strings com donos diferentes, exatamente como o par "rótulo de UI × janela de consumo" do PRODUTO §3.1. **Não sincronizar as duas por script** — sincronizar exigiria traduzir, e traduzir prompt é o anti-padrão 9.
**Exemplo real (I03):** `"which dish, and for how much — the €14.20 set lunch against the €26 à la carte plate you already know how to pronounce"`.

---

### 4.7 `emJogo` — raiz

**Tipo:** `'dinheiro' | 'tempo' | 'ambos'`. **Zona:** raiz, sempre junto de `decisao`. **Portão:** G16, PENDENTE.
**Por que existe.** T2 não diz "toda parte de M2 declara uma decisão", diz "**uma decisão com dinheiro ou tempo em jogo**". Um portão que só checa string não vazia aprova `"decisao": "conversar melhor"` — que é precisamente a deriva para "conversação" que a trava existe para impedir, e que a auditoria (achado 11) registrou como a trava que já sumiu uma vez de um documento canônico. Com o enum, o autor tem que **nomear a aposta**, e o custo é uma palavra por parte, dez no SKU inteiro.
**Alternativa considerada e recusada:** obrigar a `decisao` a conter um token de moeda ou de hora por regex. Reprova I05 ("fico ou saio da conversa") e I02 ("onde ponho o corpo"), que são decisões legítimas de **tempo social**. O enum aceita as duas e continua barrando a habilidade solta.
**Exemplo real (I01):** `"decisao": "what time I eat — and whether I eat in a place that lives off tourists"` · `"emJogo": "ambos"`.

---

### 4.8 `permissao` — raiz

**Tipo:** **`string`**, na língua do comprador. **Zona:** raiz.
**Portão:** G5, **ATIVO**: `if (!p.j.permissao || !String(p.j.permissao).trim())` (L217), rodando em todo módulo **exceto** `basico` (L216 dá `continue`).
**Por que string e não objeto** — e esta é uma decisão tomada contra a elegância, pelo estado do disco: `String({}).trim()` devolve `"[object Object]"`, que é truthy e não vazio. **Um objeto passaria no G5 mesmo vazio**, silenciosamente. Enquanto o G5 estiver escrito assim, `permissao` é string. Quem quiser o ponteiro para o áudio usa o campo irmão `permissaoAudioKey` (opcional, não lido por portão nenhum hoje).
**Obrigatoriedade:** 18 partes de M2/M3 pelo portão como ele está. O PRODUTO §4 pede mais — "≥1 por parte de M2/M3 **e por parte cultural de M1**" — e o G5 atual não cobre M1. A extensão é uma linha e está no §8: em `basico`, exigir `permissao` quando `fichasCulturais` não estiver vazio.
**Exemplo real (I02):** `"'Ponme una caña' is not rude. It is the normal register at a Spanish bar, and the padding you would add at home is what marks you out."`

---

### 4.9 `fichasCulturais[]` — raiz

**Nome do campo: `fichasCulturais`, plural, array.** A grade §7 chama-o de `fichaCultural.ondeNaoVale`, no singular. **A grade está errada e o disco decide:** `valida-tom.mjs` L242 faz `for (const fc of p.j.fichasCulturais || [])` e cobra `fc.ondeNaoVale` citando `fc.sinal` na mensagem de erro. Adotar o nome da grade deixaria o G7 vendo array vazio e **passando 100% das partes sem conferir nada** — o pior modo de falha possível, porque é silencioso.

**Portão:** G7, **ATIVO** para `ondeNaoVale`. Os outros cinco campos da Ficha de 6 Campos (PRODUTO §5.3) não têm portão e são conferência humana; ficam nomeados aqui para que a ficha seja um objeto e não uma string solta:

```
{ sinal, suaLeitura, oQueEAli, oQueVoceFaz, oQueMelhora, ondeNaoVale, evidencia?, audioKeys? }
```

- `sinal` — observável e filmável, comportamento, nunca traço.
- `suaLeitura` — primeira pessoa, na voz do comprador, sem correção ainda.
- `oQueEAli` — função social. **`evidencia`** é o rótulo da régua do PRODUTO: `'FATO' | 'INFERENCIA' | 'CONSENSO' | 'NAO_CONFERIDO'`. Nada `NAO_CONFERIDO` vira áudio.
- `oQueVoceFaz` — ato corporal ou fala.
- `oQueMelhora` — o **ganho**, nunca o risco evitado. Campo upbeat obrigatório.
- `ondeNaoVale` — o contraexemplo. **É o único que quebra o build.**
- `audioKeys?` — ponteiro opcional para os clipes onde a cápsula é falada.

**Obrigatoriedade:** toda parte com cápsula cultural — 30–45 s em M1, o episódio inteiro em M3. Uma ficha por item cultural, não uma por parte.
**Exemplo real (B11, da grade):** `sinal: "The barman says '¡Dime!' and looks at you for about a second and a half."` · `ondeNaoVale: "Not at a hotel breakfast counter, where they will wait as long as you like — the clock is a bar clock, not a Spanish clock."`

---

### 4.10 `espelho` — raiz

**Tipo:** `string`. **Zona:** raiz. **Portão:** G7, **ATIVO** (L246-249): aceita `p.j.espelho` **ou** um step com `bloco === 'espelho'`.
**Decisão:** a raiz é a casa canônica; `bloco: "espelho"` no step é o ponteiro opcional para onde a linha é falada. Motivo: o portão precisa achar o espelho sem ler o corpo do episódio, e a raiz é a zona que não custa crédito.
**Obrigatoriedade:** **8/8 de M3** (o G7 erra hoje em qualquer parte `avancado` sem espelho). Opcional e recomendado em M2 — a grade já escreveu os de I02 e A03.
**O que é:** TRAVA-C do PRODUTO §5.3 — *para cada comportamento local explicado, uma linha sobre o comportamento **do aluno** que é estranho lá*. Sem ele, a parte cultural vira lei sobre um povo com o aluno de fora do quadro.
**Exemplo real (A07, da grade):** `"Holding eighty centimetres of distance is not respect there — it reads as coldness."`

---

### 4.11 `frasePiso` — raiz

**Tipo:** `string`. **Zona:** raiz. **Portão:** G16, PENDENTE — "≥1 por módulo" (INV-18).
**Obrigatoriedade:** ≥1 por módulo, ou seja **3 no SKU inteiro**; qualquer parte pode declarar. O lugar natural é o fecho de módulo (B18, I10, A08), mas a grade já prevê uma em B10, e o portão conta por módulo justamente para não engessar onde ela cai.
**A regra que o portão consegue testar:** sucesso comparado ao **turista médio, nunca ao nativo**. Guarda concreta e barata: a string não pode conter `native | fluent | like a local | fluency`. Não pega tudo, mas pega a recaída típica.
**Exemplo real (B12):** `"Four sentences you did not learn, from one you did. Most people who spend a fortnight in Spain never build a single one."`

---

### 4.12 `fatosDatados[]` — raiz

**Tipo:** array de objetos. **Zona:** raiz. **Portão:** G13, PENDENTE — "todo item tem `fonte`, `ano` e `revisarAte`; **data vencida = erro de build**" (INV-23).

```
{ id, afirmacao, valor?, fonte, ano, revisarAte, evidencia, risco?, audioKeys? }
```

- `id` — slug estável, porque o mesmo fato aparece em mais de uma parte e no modo consulta.
- `afirmacao` — na língua do comprador, **exatamente como vai ao ar**.
- `fonte` — órgão/publicação. Nunca "pesquisa interna".
- `ano` — inteiro, o ano do dado.
- `revisarAte` — **ISO `YYYY-MM-DD`**. É o campo que faz o build apodrecer sozinho e avisar.
- `evidencia` — `'FATO' | 'INFERENCIA' | 'CONSENSO' | 'NAO_CONFERIDO'`.
- `risco` — `'alto' | 'medio' | 'baixo'`, opcional, herdado da tabela de obsolescência da `pesquisa-espanha.md`.

**Obrigatoriedade:** toda parte que enuncia número, preço, lei, prazo, requisito de fronteira ou valor de multa. Na Espanha os concentradores são **B04, B05 e I09**, e a lista longa passa por B07 (tarifas fixas de táxi), B11 (Ley 7/2022 art. 18.3), B13 (Reg. UE 1169/2011 e RD 126/2015), B14 (markup do DCC), I03 (€14,20), I04 e I10.
**Por que a data de revisão e não só o ano:** o SKU inteiro envelhece na velocidade do seu fato mais perecível, e este SKU carrega os mais perecíveis do catálogo. Um fato com ano e sem validade é dívida que não vence nunca — e portanto não é paga.
**Exemplo real (B05, o item mais datado do curso, com a fonte que a pesquisa cita):**

```json
{
  "id": "ees-operacional",
  "afirmacao": "The EES replaced the passport stamp at the external border: face photo plus four fingerprints the first time, roughly four minutes at a self-service kiosk.",
  "fonte": "Comissão Europeia, DG HOME — Regulamento (UE) 2025/1534",
  "ano": 2026,
  "revisarAte": "2026-12-01",
  "evidencia": "FATO",
  "risco": "alto",
  "audioKeys": ["e02b-n03", "e02b-n04"]
}
```

E o caso que mostra por que o campo tem que existir antes de a Onda 6 tocar em B04 — um fato cuja **redação depende do estado dele**:

```json
{
  "id": "etias-status",
  "afirmacao": "There is no ETIAS to buy today. If a website offers to sell you one, it is a scam. Check again 60 days before you fly.",
  "fonte": "Comissão Europeia (taxa de €20 confirmada 17/jul/2025); imprensa jul/2026 sobre adiamento para 2027 — sem confirmação oficial até 26/jul/2026",
  "ano": 2026,
  "revisarAte": "2026-10-01",
  "evidencia": "CONSENSO",
  "risco": "alto"
}
```

---

### 4.13 `moldes[]` — raiz

**Tipo:** `string[]` de ids de `moldes.json`. **Zona:** raiz. **Portão:** G16, PENDENTE.
**Semântica, e ela é estreita de propósito:** `moldes` lista os moldes de que **esta parte é CASA** — não os que ela redispara. Motivo: o `clique` é o fecho de uma parte que **planta** um molde (PRODUTO §5.2); redisparo não deve clique nenhum, e listá-los aqui faria o G16 cobrar clique em 20 partes.
**Cross-check de graça, e é o melhor argumento para o campo existir:** o G16 pode comparar `ep.moldes` com o campo `casa` de `moldes.json` e errar na divergência. É a checagem que teria pego, sozinha, a contradição do `Quería` (grade adota B12, `moldes.json` diz `"casa": "B09"` — auditoria, achado 7) **no dia em que ela nasceu**, em vez de três documentos depois.
**Exemplo real (B12):** `"moldes": ["M5", "M1"]` — os dois blocos que o teto de M1 permite.

---

### 4.14 `clique` — raiz

**Tipo:** `string`, na língua do comprador. **Zona:** raiz; o clipe falado vive no step com `bloco: "clique"`, e `cliqueAudioKey` é o ponteiro opcional.
**Portão:** G16, PENDENTE — "parte com `moldes` tem `clique` não-vazio com **≥3 nomes de lugar da própria parte** e **zero categorias gramaticais**".
**Obrigatoriedade:** toda parte com `moldes` não vazio. Ocupa o slot do bloco final (T4): quando a parte planta molde, "Gramática em foco" **é** o clique.
**As três batidas (PRODUTO §5.2), que são regra de autoria e não formato de dado:** (1) a contagem — devolva os **lugares**, não as frases; (2) o desconto — diga o que **não** custou; (3) o piso falsificável. Deixei `clique` como string única, e não como objeto de três campos, por um motivo prático: o teste do G16 é lexical de qualquer jeito (contar nomes de lugar, barrar `subjunctive|conditional|imperfect|past tense`), e um objeto só acrescentaria um `String(obj)` que passa quando está vazio — o mesmo buraco do `permissao`.
**Exemplo real (B12):** `"You have just ordered in a bakery, a market, a hotel desk and a pharmacy. Nobody taught you those four sentences. You built them out of one."`

---

### 4.15 `tipoBuraco` — e por que ele **não** vive no episódio

**Decisão, e é a única divergência deste schema em relação à lista da Onda 0:** `tipoBuraco` vive em **`moldes.json`**, um por molde declarado, e no step apenas como refinamento opcional.

**Tipo:** `string[]` no molde, `string` no step. Vocabulário fechado do PRODUTO §9 G10: `coisa · lugar · comida · ingrediente · numero · defeito · sintoma · acao · objeto-perdido · quantidade`. Qualquer valor em `pessoa | tempo | modo | aspecto | genero` = **erro de build**.
**Portão:** G10, PENDENTE.
**Por quê.** O G10 é o portão de admissão P1 do PRODUTO §5.1 — *"o buraco é preenchido por coisa do mundo, nunca por algo do sistema"*. Isso é propriedade **do molde**, não da instância: se `Quería + [X]` aceita um buraco tipado por tempo verbal, ele deixa de ser molde, e a frase onde isso aparece é irrelevante. Declarar no step significaria 140 declarações redundantes onde 15 bastam, e — pior — permitiria que o mesmo molde tivesse buraco "coisa" em 139 steps e "tempo" em um, sem que o portão soubesse qual é a verdade.
**O refinamento no step existe porque um molde real tem mais de um tipo de buraco.** M5 (`sin / con / para + [X]`) recebe `sin gluten` (ingrediente), `para llevar` (acao), `para dos` (quantidade) e `para el seguro` (coisa). Então `moldes.json` declara o **conjunto** e o step pode declarar **qual** — útil para o autor e para o card de consulta, nunca obrigatório.
**Exemplo real:** em `moldes.json`, `M6` (`¿Lleva + [ingrediente]?`) → `"tipoBuraco": ["ingrediente"]`. `M5` → `"tipoBuraco": ["ingrediente", "acao", "quantidade", "coisa"]`.

---

## 5. A regra de derivação do `tom` — como o G2 sai do papel sem custar 1.800 marcações

**O problema, com número.** O G2 está ATIVO e é **inaplicável**: nenhum step declara `tom` (FATO, §2). A leitura ingênua da regra é "marque `tom` em todo step". O corpus final projetado é de **≈1.800 steps** (grade §6: ~50 clipes × 36 partes). Marcar step a step é caro, é chato, e — o que é pior — vira ruído: 1.800 marcações que ninguém relê são 1.800 marcações que ninguém confere.

**A regra, em três linhas.**

> **1. O padrão é a `moldura` da parte.** Todo step herda `tom` = `ep.moldura`. Zero marcação.
> **2. Marca-se só a virada.** Um `tom` declarado num step vale **daquele step em diante**, até o próximo `tom` declarado. Um *beat* defensivo dentro de uma parte de ganho custa **duas** marcações: `protege` onde ele começa, `ganha` onde ele acaba.
> **3. A cascata nunca atravessa arquivo.** Ela reinicia em cada parte, no valor da `moldura` daquela parte.

Resolvedor, e ele tem que viver numa função só, importada pelo G2 e pelo relatório, para que os dois nunca discordem:

```js
function resolveTom(ep) {
  let atual = ep.moldura === 'protege' ? 'protege' : 'ganha';
  return (ep.steps || []).map((s) => {
    if (s.tom === 'ganha' || s.tom === 'protege') atual = s.tom;
    return atual;
  });
}
```

**A conta.** Uma parte tem tipicamente 1 a 3 *beats* de tom contrário — é o próprio PRODUTO que define o defensivo como *beat* dentro de partes de ganho (§3.2, regra 9). Isso dá 2 a 6 marcações por parte: **~150 no curso inteiro, contra ~1.800.** Redução de 92%, e cada uma das 150 é uma decisão editorial que alguém tomou de propósito.

**Por que não fechar o beat sozinho.** A tentação é `tomAte` ou "o beat dura N steps". Recusado: prazo em número de steps quebra silenciosamente na primeira edição que insere um `responde` no meio, e quebra **para o lado que favorece o autor** (o beat defensivo encolhe e o saldo melhora sem ninguém mexer no tom). Fechar explicitamente custa um caractere e aparece no diff.

**O arame de tropeço, sem o qual a derivação vira barganha.** A herança **paga ao autor**: numa parte `ganha`, não marcar nada dá saldo `N:0` = infinito, e o G2 passa com louvor sem que ninguém tenha declarado coisa nenhuma. Isso é inaceitável, e a solução é a que o próprio `valida-tom.mjs` já usa no G1 — **o léxico acusa, nunca absolve**, numa direção só:

> **G2b.** Para cada step de narração (`intro`, `recap`, e o `promptPt` de um `responde`) cujo tom **resolvido** é `ganha`, se o texto casar com `LEXICO_PERDA`: **erro em M2/M3, aviso em M1** — a mesma divisão de severidade que o G2 já faz hoje (L149). Mensagem: *"beat defensivo não declarado"*.

Com isso, o caminho barato (não marcar nada) só é seguro quando a parte realmente não tem defesa dentro; assim que ela tem, o léxico bate. E o autor tem duas saídas honestas, ambas de um caractere: marcar o beat, ou reescrever a linha.

**O que esta régua NÃO faz, e precisa estar escrito.** O léxico tem cobertura fraca — foi medido: nos 24 títulos, a leitura humana achou 11 partes defensivas e o léxico achou 3. Ele vai deixar passar defesa escrita em palavras que ele não conhece. A cascata não conserta isso e não pretende: ela torna o G2 **mensurável e barato**, e a revisão humana com a Ficha de 6 Campos continua sendo quem pega o resto.

**Ferramenta que faz a declaração ser relida:** `node scripts/valida-tom.mjs --tom` imprimindo, por parte, o mapa de corridas resolvido —
`I03  ganha×7 · protege×3 (steps 12-14) · ganha×22  →  22:3 = 7,3:1`. Custo: dez linhas. É o que transforma "eu declarei" em "eu vi o que declarei".

---

## 6. O que é uma boa `cena`

> ### Uma `cena` é uma linha que diz **onde o corpo do aluno está**, **quem está do outro lado esperando**, e **o que muda nos próximos trinta segundos se ele não abrir a boca**.

**Os três testes, na ordem em que reprovam mais rápido:** (1) **dá para filmar?** — se não há lugar e hora, é tese; (2) **tem alguém esperando?** — se não há interlocutor, é habilidade solta; (3) **alguma coisa acontece se ele ficar calado?** — se não, é curiosidade.

### Três boas

1. **B11** — *"Ten to two, the bar is three deep, the barman looks at you, says '¡Dime!', and gives you about a second and a half before he moves on."*
   Filmável, interlocutor com nome e relógio rodando dentro da própria frase. O custo do silêncio é explícito: ele passa para o próximo.
2. **B14** — *"The card machine on the table is offering you £68.40 instead of €80, and the waiter is standing there waiting for you to press something."*
   O relógio é o garçom de pé. A consequência é numerada, e é a mesma coisa que o episódio vende.
3. **B18** — *"Twenty to eight in the morning, the case is already in the taxi boot, and your phone is on the counter of the bar where you had the last coffee."*
   Cena de recuperação de objeto sem a palavra "roubo" — e é exatamente a distinção que a parte inteira ensina (`me he dejado`, não `me han robado`).

### Duas ruins

4. ❌ **"Learning how to order food in Spain."**
   Falha nos três testes de uma vez: não tem lugar, não tem ninguém do outro lado, e nada acontece se o aluno ficar calado. É a formulação que nomeia **a habilidade** em vez da cena — e é a mesma cabeça que produz título de categoria e reprova em T1. *Conserto:* pôr um corpo e um relógio → a cena 1 acima.

5. ❌ **"Spaniards eat late."**
   Não é cena, é tese sobre um povo: gentílico + cópula, que é o que o G6 barra quando vira narração. Não tem interlocutor, não tem consequência, e o aluno não tem nada a fazer com ela. *Conserto, e o conteúdo sobrevive inteiro:* **"Half past eight, you walk into a restaurant, and the only other people eating are a German couple."** — mesmo fato, agora com corpo, hora e uma decisão a tomar.

**Duas regras de redação que saem daí:** a `cena` é escrita em **presente e em segunda pessoa**, porque é assim que ela vai ao ar; e **não é o título** — o título nomeia a cena em cinco palavras, a `cena` a descreve em uma linha. Um `cena` que é cópia do `titulo` não passou por nenhuma cabeça.

---

## 7. As adições a `src/lib/types.ts`

Não quebram nada: os JSON entram por `import.meta.glob<{ default: Episode }>`, cujo tipo é **asserido, não checado**. Tudo é opcional no tipo — **a obrigatoriedade é dos portões, não do TypeScript**, e é assim que tem que ser, senão os 24 arquivos legados param de compilar no meio da obra.

```ts
export type Tom = 'ganha' | 'protege';
export type Bloco =
  | 'aquecimento' | 'callback' | 'cena' | 'corpo' | 'molde'
  | 'capsula' | 'permissao' | 'espelho' | 'clique' | 'recap' | 'piso';
export type TipoBuraco =
  | 'coisa' | 'lugar' | 'comida' | 'ingrediente' | 'numero'
  | 'defeito' | 'sintoma' | 'acao' | 'objeto-perdido' | 'quantidade';
export type Evidencia = 'FATO' | 'INFERENCIA' | 'CONSENSO' | 'NAO_CONFERIDO';

export interface FichaCultural {
  sinal: string;        // observável e filmável — comportamento, nunca traço
  suaLeitura: string;   // 1ª pessoa, na voz do comprador, sem correção ainda
  oQueEAli: string;     // função social
  oQueVoceFaz: string;  // ato corporal ou fala
  oQueMelhora: string;  // o GANHO, nunca o risco evitado
  ondeNaoVale: string;  // o contraexemplo — é este que o G7 cobra
  evidencia?: Evidencia;
  audioKeys?: string[];
}

export interface FatoDatado {
  id: string;
  afirmacao: string;
  valor?: string;
  fonte: string;
  ano: number;
  revisarAte: string;   // ISO YYYY-MM-DD — vencida = erro de build (G13)
  evidencia: Evidencia;
  risco?: 'alto' | 'medio' | 'baixo';
  audioKeys?: string[];
}

// --- acréscimos a Step ---
//   tom?: Tom;               // só na VIRADA — cascata em §5
//   bloco?: Bloco;           // só no primeiro step do bloco
//   molde?: string;          // id de moldes.json; só em 'responde' e 'shadow'
//   tipoBuraco?: TipoBuraco; // refinamento opcional do buraco declarado no molde

// --- acréscimos a Episode ---
//   slot?: string;            // já em uso nos 15 arquivos
//   dissolveEm?: string[];    // já em uso nos 9 em trânsito
//   moldura?: Tom;            // já em uso
//   cena?: string;                 // 36/36
//   decisao?: string;              // 10/10 em M2
//   emJogo?: 'dinheiro' | 'tempo' | 'ambos';
//   permissao?: string;            // STRING — ver §4.8
//   permissaoAudioKey?: string;
//   espelho?: string;              // 8/8 em M3
//   frasePiso?: string;            // ≥1 por módulo
//   moldes?: string[];             // só os de que a parte é CASA
//   clique?: string;
//   cliqueAudioKey?: string;
//   fichasCulturais?: FichaCultural[];
//   fatosDatados?: FatoDatado[];
```

E uma dívida de comentário para pagar junto: `types.ts` L78 ainda documenta as vozes como *"Leti/Eduardo (PT) · Ana/Diego (ES)"*, que não são o elenco deste SKU (Alice · George · Emilio · Carmen). É a mesma dívida que o PRODUTO já registra no apêndice.

---

## 8. O que cada portão precisa ganhar para ler estes campos

Estado medido no disco em 27/07/2026. **Nada aqui é "já está protegido".**

| portão | estado real | o que falta escrever |
|---|---|---|
| **G2** | **ATIVO**, mas cego | trocar `s.tom` pelo `resolveTom(ep)` do §5 + escrever o **G2b** (arame de tropeço) + a flag `--tom` |
| **G4b** | **⚠️ JÁ ESTÁ ESCRITO** — `valida-tom.mjs` L203-207 implementa o teto de 320 por clipe | **nada.** O PRODUTO §9 e a grade §7 o chamam de PENDENTE e "a emenda mais urgente do script". **Está errado: corrigir os dois documentos** |
| **G5** | **ATIVO** para M2/M3 (L214-219) | estender a `basico`: exigir `permissao` quando `fichasCulturais.length > 0` |
| **G7** | **ATIVO** (L241-251) | nada para `ondeNaoVale` e `espelho`. Opcional: cobrar os outros 5 campos da ficha |
| **G9** | **ATIVO** (L291-359) | **três correções antes da Onda 1** — §9, itens 1, 2 e 3 |
| **G10** | PENDENTE | ler `tipoBuraco` de `moldes.json`, exigi-lo nos 15, barrar o enum de sistema |
| **G13** | PENDENTE | varrer `fatosDatados[]`; faltando `fonte`/`ano`/`revisarAte` = erro; `revisarAte < hoje` = erro |
| **G16** | PENDENTE | `cena` · `decisao`+`emJogo` em M2 · `gesto` no 1º step · `frasePiso` ≥1/módulo · título × categoria gramatical · `moldes`→`clique` com ≥3 lugares · ordem `cena < responde < clique` via `bloco` · `moldes` × `casa` de `moldes.json` |
| **prebuild** | **NÃO EXISTE** no `package.json` (FATO, conferido) | continua sendo o item nº 1 de qualquer plano — nenhum destes portões roda em build hoje |

**Custo de marcação do SKU inteiro, para orçar a Onda 0 de verdade:**

| campo | marcações | observação |
|---|---:|---|
| `cena` | 36 | uma linha por parte |
| `gesto` | 36 | primeiro step |
| `permissao` | ~24 | 18 de M2/M3 + as culturais de M1 |
| `decisao` + `emJogo` | 20 | 10 partes × 2 campos |
| `espelho` | ~12 | 8 de M3 + os de M2 que a grade já escreveu |
| `frasePiso` | ~8 | mínimo 3 |
| `moldes` + `clique` | ~24 | 12 casas operacionais + 3 sociais, com clique |
| `tom` | **~150** | pela cascata do §5 — seriam ~1.800 sem ela |
| `molde` | ~140 | por step de alvo; **sem cascata, por decisão** |
| `tipoBuraco` | 15 | em `moldes.json`, não nos episódios |
| `fatosDatados` | ~25 itens | concentrados em B04, B05, I09 |
| **total** | **≈490** | contra ≈2.150 no esquema ingênuo |

As `fichasCulturais` não entram na conta porque não são marcação: são o conteúdo cultural em si, que o PRODUTO §5.3 já obriga a escrever nos seis campos antes de virar áudio.

---

## 9. Conflitos que este schema encontrou no disco e que precisam de decisão

Os três primeiros **quebram o build no dia em que o `prebuild` for ligado**. Estão em ordem de urgência.

**1. O teto de 12 do G9 barra os três moldes sociais.** `valida-tom.mjs` L347: `if (declarados.size > 12) erros.push(...)`. O PRODUTO §5.1 subiu o teto para **12 operacionais + 3 sociais = 15**. No dia em que S1/S2/S3 entrarem em `moldes.json`, o G9 **falha o build por 15 > 12** — e a mensagem vai dizer "lista inflada", que é o diagnóstico errado. Correção: contar as duas famílias separadamente (`operacionais ≤ 12`, `sociais ≤ 3`), não simplesmente subir o número para 15, senão a trava anti-fraude vira teto único de 15 operacionais. `moldes.json._regras.teto` também diz "o 12 é LEI" e precisa da mesma edição.

**2. `M12` aponta para dois moldes diferentes, e o G9 não consegue ver.** No disco, `moldes.json` M12 = **`Me he dejado + [X] + [lugar]`**, casa B18, e o `_regras` lista `¿Tengo que + [inf]?` entre os **não declarados**. A `GRADE-36-ESPANHA.md` §1 diz **M12 = `¿Tengo que+[inf]?`** e a linha de B09 declara "M12 (CASA)"; a mesma grade lista `Me he dejado` entre os não declarados (linha 33). Um autor de B09 vai escrever `"molde": "M12"` querendo dizer `¿Tengo que?` — **o id existe, o G9 aceita, e a atribuição fica errada em silêncio para sempre.** É o pior tipo de erro que este schema pode produzir. Decisão do dono, e a auditoria já apontou isso uma vez (achado 8) sem que fosse resolvido no arquivo.
> **Recomendação:** trocar os ids ordinais por slugs estáveis — `QUERIA`, `PUEDO`, `HAY`, `ME-PONE`, `SIN-CON-PARA`, `LLEVA`, `DONDE`, `ME-PUEDE`, `OTRA`, `YA-ESTA`, `SOY-ESTOY`, `ME-HE-DEJADO`, `APRECIACION`, `ELECCION`, `PREFERENCIA`. Id ordinal convida a renumerar, e renumerar molde é reescrever o significado de 140 marcações de uma vez. O `molde` é a única chave estrangeira do corpus; ela tem que ser ilegível para máquina e óbvia para humano. Se a troca for recusada, o mínimo é **corrigir a grade para o que o `moldes.json` diz** e nunca o inverso.

**3. A trava "molde em uma parte só" dispara em falso durante a obra.** `valida-tom.mjs` L357-359 erra quando um molde aparece em um único slot. Isso é correto no fim (P5: molde não recuperado em ≥2 partes é frase) e **é falso durante as ondas 1 a 6**, quando a casa já está marcada e os redisparos ainda não foram escritos. Precisa entrar no mesmo modo escalonado do `--estrito` que a grade já previu para o `valida-estrutura.mjs`: aviso enquanto houver slot vazio, erro depois.

**4. `fichaCultural` (grade) × `fichasCulturais` (script).** Resolvido acima em favor do disco (§4.9). A grade §7 precisa ser corrigida — adotar o nome dela faria o G7 passar sem conferir nada.

**5. `G4b` está descrito como pendente e está escrito.** `PRODUTO.md` §9 o marca **PENDENTE** e o chama de "a emenda mais urgente do script"; a grade §7 manda escrevê-lo; a `BRIEFING-AUTOR.md` já o descreve como ativo. O código está no disco em `valida-tom.mjs` L203-207. É o anti-padrão 4 na direção contrária — desta vez a spec subestima a proteção, o que é bem menos grave, mas manda um agente reescrever o que já existe.

**6. `permissao` em M1.** O PRODUTO §4 pede permissão "por parte cultural de M1"; o G5 pula `basico` inteiro (L216). Enquanto não for estendido, **nenhuma parte de M1 é cobrada** — inclusive B02 e B13, que são as duas onde a permissão carrega mais peso.

---

## 10. Um episódio inteiro, anotado

**I03 — "The dish you were never going to order"**, o slot que exercita mais campos deste schema: é M2 (`decisao` + `emJogo` + `permissao` obrigatórios), é **casa do molde social S2 (ESCOLHA)** — logo deve `moldes` e `clique` —, carrega um fato datado com fonte real e tem cápsula cultural com espelho.

> ⚠️ **O que este exemplo é e não é.** É um **esqueleto de estrutura**, para mostrar os campos em posição. Os `audioKey` seguem a convenção observada no corpus (`n`=narração da guia, `p`=prompt, sufixo `-c`/`-e` = Carmen/Emilio) mas **não existem no disco** e nenhum mp3 foi gravado. O corpo está elidido onde a estrutura já se repete: o episódio real tem ~50 steps e ≥8 `responde`. O arquivo real é **JSON puro** — os comentários abaixo são só para leitura.

```jsonc
{
  "id": "i03",
  "slot": "I03",                    // contrato; sem slot ou dissolveEm o build falha
  "nivel": "intermediario",         // tem que bater com slots.json
  "numero": 21,
  "titulo": "The dish you were never going to order",
  "subtitulo": "Weekday lunch, three courses, bread, a drink and pudding — and the waiter has already decided what is good today",
  "moldura": "ganha",               // G1 · e é o PADRÃO da cascata de tom (§5)

  // ── G16 ─────────────────────────────────────────────────────────────────
  "cena": "Ten past two on a Tuesday, a bar two streets off the square, the waiter reels off today's menu in one breath and stands there with the pad open.",
  "decisao": "which dish, and for how much — the €14.20 set lunch against the €26 a la carte plate you already know how to pronounce",
  "emJogo": "ambos",                // T2: a aposta é nomeada, não presumida
  "frasePiso": "You will order a three-course Spanish lunch without a translated menu. Most people who spend a fortnight here never do it once.",

  // ── G16 · a parte é CASA de S2, logo deve o clique ───────────────────────
  "moldes": ["S2"],                 // cross-check contra "casa" em moldes.json
  "clique": "You have just chosen between two dishes at a market stall, a set lunch and a wine list. Nobody gave you those three sentences. You built them out of one question.",
  "cliqueAudioKey": "i03-n11",

  // ── G5 ──────────────────────────────────────────────────────────────────
  "permissao": "You do not have to understand the whole list. Take the one word you caught, or point at the next table and say 'lo mismo'. Nobody is marking your comprehension.",
  "permissaoAudioKey": "i03-n08",

  // ── G7 · TRAVA-C, opcional em M2 e a grade já a escreveu ─────────────────
  "espelho": "Reading the whole menu back at the waiter to check you got it right is the bit that reads as odd there. Nobody checks. Everybody just orders.",

  // ── G7 · Ficha de 6 Campos; ondeNaoVale é o que quebra o build ───────────
  "fichasCulturais": [
    {
      "sinal": "He closes the menu, says the name of a dish you have never heard, and waits.",
      "suaLeitura": "He is testing whether I understood. If I say yes and I am wrong, something horrible arrives.",
      "oQueEAli": "In a house that cooks one thing properly that day, naming it is a recommendation, not a question — the kitchen has already decided.",
      "oQueVoceFaz": "Say yes. Or say 'lo mismo' and point at the next table.",
      "oQueMelhora": "You eat what the house does well, instead of what you can already pronounce.",
      "ondeNaoVale": "Not on a tourist strip with a photo menu — there the list is the same every day and the recommendation means nothing.",
      "evidencia": "CONSENSO",
      "audioKeys": ["i03-n09", "i03-n10"]
    }
  ],

  // ── G13 · INV-23 ────────────────────────────────────────────────────────
  "fatosDatados": [
    {
      "id": "menu-del-dia-preco",
      "afirmacao": "The national average for a menú del día is about €14.20.",
      "valor": "€14,20",
      "fonte": "Hostelería de España + Edenred, divulgado em 2026",
      "ano": 2026,
      "revisarAte": "2027-04-01",
      "evidencia": "FATO",
      "risco": "medio",
      "audioKeys": ["i03-n03"]
    },
    {
      "id": "menu-del-dia-nao-obrigatorio",
      "afirmacao": "Not every restaurant has to offer one — and any course that tells you it is required by law is out of date.",
      "fonte": "docs/pesquisa-espanha.md — a obrigatoriedade da era franquista foi revogada; síntese jurídica secundária, sem fonte primária citada",
      "ano": 2026,
      "revisarAte": "2028-01-01",
      "evidencia": "CONSENSO",
      "risco": "baixo"
    }
  ],

  "steps": [
    // 1. AQUECIMENTO — gesto no primeiro step de TODAS as 36 partes (G16).
    //    Em M2/M3 o programa é 3 (soco) ou 4 (flick): a perda aqui é fala rápida.
    { "tipo": "intro", "voz": "Alice", "audioKey": "i03-n01",
      "bloco": "aquecimento", "gesto": 3,
      "pt": "Part twenty-one. Warm-up: the punch. One syllable per word carries it, and only one. Me-NU. Se-GUN-do. Re-co-MIEN-da." },

    // 2. CALLBACK — o primeiro `responde` é SEMPRE recuperação da parte anterior
    //    (I02, o balcão). Molde declarado: o alvo é instância de M4 (G9).
    { "tipo": "responde", "voz": "Carmen", "promptVoz": "Alice",
      "bloco": "callback", "molde": "M4",
      "promptAudioKey": "i03-p01",
      "promptPt": "Yesterday's bar, same barman, same second and a half. Ask him for the small beer. Speak now.",
      "audioKey": "i03-cana-c", "es": "¿Me pones una caña?",
      "pinyin": "meh POH-nes OO-nah KAH-nyah", "pt": "a small beer, please" },

    // 3. A CENA — abre por experiência, nunca por tese (PRODUTO §4, bloco 3).
    //    A ordem é lei e agora é testável: cena < primeiro responde de corpo < clique.
    { "tipo": "intro", "voz": "Alice", "audioKey": "i03-n02",
      "bloco": "cena",
      "pt": "Ten past two, Tuesday. A bar two streets off the square. The waiter says four dish names in one breath and stops, pad open, looking at you." },

    { "tipo": "intro", "voz": "Alice", "audioKey": "i03-n03",
      "pt": "That was the menú del día. Three courses, bread, a drink, pudding or coffee — about fourteen euros twenty. It is the best-value meal in the country and it only exists at weekday lunch." },
    //   ↑ o número vem de fatosDatados[menu-del-dia-preco]. Fato no áudio,
    //     fonte e validade no arquivo: é isso que o G13 confere.

    // ── beat defensivo: 2 marcações de tom fecham as duas viradas (§5) ──────
    { "tipo": "intro", "voz": "Alice", "audioKey": "i03-n04",
      "tom": "protege",
      "pt": "One warning, because half the internet gets it wrong: nobody is obliged to offer it, and a free tapa with your drink is a Granada habit, not a Spanish law. Expect neither and be pleased by both." },

    { "tipo": "intro", "voz": "Alice", "audioKey": "i03-n05",
      "tom": "ganha",
      "pt": "Right. The sentence that does the work today is a choice between two things. You are not asking what is good. You are asking which of these two." },
    //   ↑ do step 1 ao 4 o tom resolvido é 'ganha' por herança da moldura;
    //     step 5 vira para 'protege'; step 6 volta. Saldo G2 desta parte: 2 marcações.

    // ── BLOCO DO MOLDE — S2 ESCOLHA nasce aqui e em nenhum outro lugar ──────
    { "tipo": "ouvir", "voz": "Emilio", "audioKey": "i03-cual-e",
      "bloco": "molde",
      "es": "¿Cuál me recomienda: el arroz o el pescado?",
      "pinyin": "KWAL meh rreh-koh-MYEN-dah: el ah-RROTH oh el pes-KAH-dhoh",
      "pt": "Which do you recommend: the rice or the fish?" },

    // R-A: cada troca muda de LUGAR, não só de palavra. R-B: o prompt não contém
    // a palavra do encaixe. R-E: nada de "agora troque".
    { "tipo": "responde", "voz": "Carmen", "promptVoz": "Alice", "molde": "S2",
      "promptAudioKey": "i03-p02",
      "promptPt": "The waiter has named two mains and you caught both. One is the thing the kitchen is famous for and you have no idea which. Put the choice back to him. Speak now.",
      "audioKey": "i03-cual-c", "es": "¿Cuál me recomienda: el arroz o el pescado?", "pt": "which of the two" },

    { "tipo": "responde", "voz": "Emilio", "promptVoz": "Alice", "molde": "S2",
      "promptAudioKey": "i03-p03",
      "promptPt": "Different day. A market stall, two cheeses in front of you, and the woman behind the counter has all afternoon. Ask her the same thing about these. Speak now.",
      "audioKey": "i03-queso-e", "es": "¿Cuál me recomienda: este o aquel?", "pt": "this one or that one" },

    { "tipo": "responde", "voz": "Carmen", "promptVoz": "Alice", "molde": "M3",
      "promptAudioKey": "i03-p04",
      "promptPt": "Your friend cannot eat wheat and the set lunch is already on the table. Ask whether there is anything at all without it. Speak now.",
      "audioKey": "i03-singluten-c", "es": "¿Hay algo sin gluten?", "pt": "anything without gluten" },
    //   ↑ redisparo de M3 com encaixe novo: conta no G9 e cumpre P5.

    // … corpo continua: ≥8 `responde` na parte (G3), com M6 (¿Lleva…?) e
    //   M1 (Quería…) redisparados, e o degrau 4 da escada R-C —
    //   "o que você não sabe dizer" — fechando o bloco.

    // ── CÁPSULA CULTURAL (30-45 s) → PERMISSÃO → CLIQUE → RECAP ────────────
    { "tipo": "intro", "voz": "Alice", "audioKey": "i03-n09", "bloco": "capsula",
      "pt": "Watch what he does next. He closes the menu, says one dish name, and waits. That is not a test. In a place that cooks one thing properly today, naming it is the recommendation." },

    { "tipo": "intro", "voz": "Alice", "audioKey": "i03-n08", "bloco": "permissao",
      "pt": "And you do not have to understand the whole list. Take the one word you caught, or point at the next table and say 'lo mismo'. Nobody is marking your comprehension." },
    //   ↑ mesma string do campo `permissao` da raiz: a raiz declara, o step fala.

    { "tipo": "intro", "voz": "Alice", "audioKey": "i03-n11", "bloco": "clique",
      "pt": "You have just chosen between two dishes at a market stall, a set lunch and a wine list. Nobody gave you those three sentences. You built them out of one question." },
    //   ↑ as três batidas: a contagem devolve os LUGARES (não as frases),
    //     o desconto diz o que não custou, e o piso é falsificável.

    { "tipo": "recap", "voz": "Alice", "audioKey": "i03-r01", "bloco": "recap",
      "pt": "Out loud, one more time. Which of the two do you recommend — the rice or the fish?" }
  ],

  "aprofundar": { /* fora do player: por que 'cuál' e não 'qué', e por que
                     você nunca vai precisar saber disso para almoçar */ }
}
```

**Contas desta parte, para o revisor repetir:** `tom` = 2 marcações para 50 steps · `molde` = 1 por step de alvo, sem herança · `gesto` = 1, no primeiro step · G2 resolvido ≈ 47 ganha : 3 protege · `moldes: ["S2"]` bate com `casa: "I03"` em `moldes.json` quando S2 for acrescentado (Onda 0, item 2).

---

## 11. Ordem de execução

1. **Editar `moldes.json`** com as cinco edições da Onda 0 **mais** `tipoBuraco` nos 15 moldes, **mais** a decisão do §9.2 sobre os ids.
2. **Corrigir os três documentos** onde eles divergem do disco: `fichasCulturais` (grade §7), `G4b` já escrito (PRODUTO §9 e grade §7), `M12` (grade §1).
3. **Escrever o `resolveTom` + G2b** e as flags — é a peça que destrava a marcação de todo o resto, e sem ela os autores das ondas 1 a 6 não têm regra de `tom` para seguir.
4. **Escrever G10, G13, G16** e as três correções do G9 (§9, itens 1–3).
5. **Ligar o `prebuild`**, com `valida-estrutura.mjs` em modo aviso.
6. **Só então despachar a Onda 1.** O portão vale muito mais como grade de proteção do que como auditoria depois — e uma marcação errada custa reescrita, não crédito, apenas enquanto não tiver virado mp3.
