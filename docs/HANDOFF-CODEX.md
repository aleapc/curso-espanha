# HANDOFF — Kit de Bordo / ¡Dime! — para continuar sem o Claude

Escrito em 2026-08-01. Se você é o Codex (ou qualquer outro agente) assumindo
este trabalho porque os tokens do Claude resetam sexta (07/ago), leia este
documento inteiro antes de tocar em qualquer arquivo. Ele é autocontido —
não depende de acesso à memória do Claude — mas se você tiver acesso ao
filesystem local, os arquivos em
`C:\Users\aapc_\.claude\projects\D--dev\memory\*.md` têm contexto histórico
mais rico (grep por "kit_de_bordo", "dime", "espanha").

O dono do projeto (aleapc) é brasileiro, comunica em PT-BR, trata por "você",
prefere ação concreta a explicação longa. Não pergunte o óbvio; decida com o
melhor julgamento e registre a decisão.

---

## 1. O que é este produto

**Kit de Bordo** ("¡Dime!" é o nome do curso de espanhol especificamente) —
portfólio de PWAs de "espanhol/francês/etc. de sobrevivência para viagem",
não curso de idioma completo. Filtro de todo conteúdo: **"isso torna a
viagem mais proveitosa?"** — não "isso ensina gramática correta?". Ver
`_projects/curso-espanha/docs/PRODUTO.md` (a spec canônica de produto —
LEIA antes de escrever qualquer conteúdo novo).

Cada curso é um **SKU = comprador × destino**. O **destino** é o ativo caro
(fala nativa gravada + 47 imagens); o **comprador** (a voz-guia + a língua da
UI) é barato — trocar comprador sobre um destino já gravado é "derivar", não
"traduzir" (ver §5 abaixo, é a lei mais importante deste repo).

## 2. Estado AO VIVO agora (verificado, 2026-08-01)

Coluna Espanha **4/4 completa**, todos publicados no GitHub Pages:

| Curso | URL | Repo | Comprador | Alvo |
|---|---|---|---|---|
| EN→Espanha | https://aleapc.github.io/curso-espanha/ | `aleapc/curso-espanha` (público) | inglês | espanhol |
| DE→Espanha | https://aleapc.github.io/curso-espanha-de/ | `aleapc/curso-espanha-de` (público) | alemão | espanhol |
| FR→Espanha | https://aleapc.github.io/curso-espanha-fr/ | `aleapc/curso-espanha-fr` (público) | francês | espanhol |
| IT→Espanha | https://aleapc.github.io/curso-espanha-it/ | `aleapc/curso-espanha-it` (público) | italiano | espanhol |

Todos: 36 partes (contrato de slots), estrutura de "14 episódios de jornada"
na home, nomes de nível com rótulo duplo na língua do comprador
(ex. `"Grundstufe · Ich komme klar"`).

**Mapa de status vivo:** https://aleapc.github.io/kit-de-bordo-mapa/ — repo
`aleapc/kit-de-bordo-mapa`, working tree em
`C:\Users\aapc_\dev-hosting\kit-de-bordo-mapa` (fora do `D:\dev` de propósito
— git.exe tem bloqueio de escrita em D: por política do Norton nesta
máquina; C: não tem esse bloqueio). **Para atualizar o mapa:** editar
`index.html` nesse diretório (mesmo arquivo que
`_projects/curso-espanha/docs/MATRIZ-CORREDORES.html`, mantenha os dois em
sync ou trate o do `dev-hosting` como o canônico), `git add -A && git commit
&& git push origin main` — o Pages repinta sozinho. É standalone (`<!doctype
html>` completo com CSS próprio) porque um artifact anterior tinha bug de
fonte escura sobre fundo escuro quando o container/tema não injetava
`background`.

Repositórios locais (todos em `D:\dev\_projects\` exceto o mapa):
`curso-espanha`, `curso-espanha-de`, `curso-espanha-fr`, `curso-espanha-it`.
Todos SvelteKit 2 + Svelte 5 runes + `@sveltejs/adapter-static` +
`@vite-pwa/sveltekit`. Cada um tem `deploy.sh` na raiz (usa um worktree em
`/d/tmp/cd-wt` — roda via Git Bash, não PowerShell — que faz build com
`BASE_PATH` correto, cria/atualiza a branch `gh-pages` órfã, e faz push).

## 3. EM ANDAMENTO NESTA SESSÃO — as 3 "adições de viajante"

O dono pediu 3 features **transversais** (valem para os 4 cursos vivos +
qualquer curso futuro):

1. **Busca por situação alcançável de qualquer tela** (não só na tela 0 do
   `/kit`) — digitar "conta"/"restaurante" e cair direto na frase+áudio.
2. **Link para o Google Tradutor** com o par de idiomas do curso pré-setado.
3. **Conversor de moedas + utilidades de viajante** (tomadas/voltagem,
   emergência 112, água/gorjeta) — só relevante para o comprador **EN**
   (GB/EUA), porque DE/FR/IT→Espanha já usam euro.

### Decisão de produto importante que eu (Claude) tomei e você deve respeitar

`src/lib/consulta/indice.ts` tem um comentário de lei:
> *"não é a entrada primária (PRODUTO.md §6: 'nunca busca como entrada
> primária')... é a saída de emergência de quem já sabe a palavra"*

A busca **tem** que continuar visualmente discreta (ring fino, sem fundo
"herói", sem texto de placeholder chamativo) mesmo estando agora alcançável
do header em toda tela. Não a promova a um campo de busca proeminente — isso
violaria a lei documentada. Se tiver dúvida, prefira menos visível, não mais.

### O que já foi feito (só em `curso-espanha`, o EN — ainda NÃO replicado)

- ✅ `src/lib/curso.config.ts` **criado** — config central (buyerLang,
  targetLang, translatorPair, destCurrency, homeCurrencies, timeZone).
  Todo componente novo lê daqui; nada de idioma/moeda hard-coded fora deste
  arquivo.
- ✅ `src/lib/components/KitBusca.svelte` — adicionada prop `direcao:
  'cima'|'baixo'` (cima = comportamento original no rodapé do /kit; baixo =
  ancorada no header).
- ✅ `src/routes/+layout.svelte` — header ganhou dois ícones novos (🔎 busca
  toggle, ⋯ menu com Tradutor + "Traveler's pocket"). O menu ⋯ abre um
  dropdown pequeno; a busca abre uma barra full-width abaixo do header
  (reusa `KitBusca` com `direcao="baixo"`).
- ✅ `src/routes/+page.svelte` — o link do tradutor na home (antes genérico,
  `https://translate.google.com`) agora usa `curso.translatorPair`. Card
  novo "💱 Traveler's pocket" linkando para `/bolso/` (rota que **ainda não
  existe** — ver próximo passo).

### O QUE FALTA (ordem recomendada)

1. **Criar a rota `/bolso`** (`src/routes/bolso/+page.svelte` +
   `+page.ts` com `export const prerender = true`). Conteúdo:
   - **Conversor de moedas**, só se `curso.homeCurrencies.length > 0` (no
     EN é `['GBP','USD']`; em DE/FR/IT será `[]` → mostrar nota "todos usam
     o euro, sem conversão necessária" em vez do conversor).
   - Taxas: **offline-first**. Recomendação do plano original: embutir um
     `rates.json` estático (base EUR, com campo `date`) gerado de uma fonte
     confiável (BCE/`eurofxref-daily.xml` ou, mais simples, hardcode com
     data e nota "atualize antes de viajar" como os guias do casal já
     fazem — ver §4). Refresh opcional via `fetch` para
     `https://api.frankfurter.app/latest?from=EUR&to=GBP,USD` (sem chave,
     CORS liberado) só quando há rede, com timeout curto e fallback
     silencioso. NÃO bloquear a tela esperando rede.
   - **Tomadas/voltagem**: Espanha = tipo C/F, 230V. Se comprador é GB
     (tipo G) ou EUA (tipo A, 120V), mostrar o contraste.
   - **Emergência**: 112 (número único da UE) — uma linha + `<a
     href="tel:112">`.
   - **2-3 linhas estáticas**: água da torneira é potável na Espanha;
     gorjeta ~5-10% não obrigatória; devolução de IVA para turista
     extra-UE com cartão.
   - Referência de implementação (o que PORTAR, adaptando pivô
     USD→**EUR**): `D:\dev\_projects\guia-uruguai-pwa\src\routes\bolso\+page.svelte`
     (conversor tri-direcional, parser tolerante a "1.000,00" e "1,000.00",
     taxas em `localStorage`) e
     `D:\dev\_projects\guia-uruguai-pwa\src\lib\usefulInfo.ts` (formato dos
     dados de emergência/locais). **NÃO porte** o phrasebook nem o clima
     nem o GPS "perto de mim" — o curso de língua já É o phrasebook (o
     `/kit`), e clima/GPS são território dos guias de viagem, não deste
     produto.
2. **Testar localmente** (`npm run dev` em `curso-espanha`) e depois
   **buildar** (`npm run build`) — o build roda `prebuild` que inclui os
   validadores de tom/estrutura (`npm run tom`, `npm run estrutura:estrito`
   etc.), então qualquer erro de schema aparece aí antes do deploy.
3. **Verificar renderização pós-hidratação**, não só que o build passou.
   **Há um bug histórico real** (ver §6) de cards que renderizam no SSR e
   desaparecem no cliente por chave duplicada em `{#each}` — sempre abra a
   página de fato (local ou ao vivo) e confira que os elementos aparecem
   depois do JS rodar, não confie só em "build verde".
4. **Replicar para DE/FR/IT**: copiar `curso.config.ts` para cada repo
   trocando `buyerLang`/`translatorPair`/`homeCurrencies` (DE/FR/IT →
   `homeCurrencies: []`), copiar as mesmas edições de `+layout.svelte` /
   `+page.svelte` / `KitBusca.svelte` / a rota `/bolso`. Como os 4 cursos
   divergiram um pouco em estrutura (DE/FR/IT têm o agrupamento de "14
   episódios de jornada" que o EN não tem — ver §6), **não faça um diff
   cego** — abra cada `+layout.svelte`/`+page.svelte` de destino e adapte
   à estrutura local, mudando só o que essas 3 features exigem.
5. **`git add` + commit + push do `main`** de cada repo, depois `bash
   deploy.sh` (roda em Git Bash) de cada um, na ordem que preferir — eles
   usam o mesmo worktree `/d/tmp/cd-wt` então **rode em série, não em
   paralelo** (um deploy por vez, espere terminar antes do próximo).
6. **Verificar ao vivo** as 4 URLs depois do deploy (curl + grep pelo texto
   esperado, ou abrir no browser) antes de considerar terminado.
7. **Atualizar o mapa** (`kit-de-bordo-mapa`) se o status de algum curso
   mudar — não é o caso desta tarefa (os 4 já estão "no ar"), mas se algo
   quebrar e precisar reverter, o mapa é a fonte visual que o dono checa.

## 4. Os PWAs de viagem do casal (fonte das utilidades a portar)

Não são cursos de língua — são guias de viagem completos, do mesmo dono:
- `D:\dev\_projects\guia-uruguai-pwa` — https://aleapc.github.io/guia-uruguai/
- `D:\dev\_projects\guia-puerto-varas-pwa` — https://aleapc.github.io/guia-puerto-varas/
- Também existem `guia-peru`, `guia-tailandia`, `garoa` (agenda cultural),
  todos da mesma família de padrão (PWA, sync de casal por código
  WhatsApp, offline-first). Não confundir o propósito: guias = "planejar a
  viagem inteira"; ¡Dime! = "aprender a falar o suficiente pra sobreviver".

## 5. A lei de derivação (importante se você tocar em qualquer coisa que não seja as 3 adições)

**"Deriva-se a ESTRUTURA, nunca se TRADUZ o TEXTO."** Ao criar um SKU
comprador×destino novo sobre um destino já gravado: REUSA os clipes de fala
nativa (mesmo `audioKey`, custo zero), REUSA as imagens do destino
(byte-idênticas entre compradores — imagem é ativo do DESTINO, não do
comprador), e **RE-DERIVA** (não traduz) a narração-guia + o núcleo gerador
(`moldes.json`, falsos-amigos, gag-âncora) — cada comprador tem sua própria
tabela de interferência fonética com o alvo.

## 6. Bugs históricos que já mordeu — não repita

- **Colisão de id de card**: `build-consulta.mjs` fazia `id do card =
  audioKey`. Em derivações que reusam o mesmo clipe espanhol em episódios
  diferentes, isso gerava ids duplicados → Svelte 5 aborta o bloco
  `{#each}` **na hidratação** → a folha renderiza certo no SSR (view-source
  mostra os cards) e fica **vazia no cliente**. Só aparece renderizando de
  verdade no browser e contando `<article>` pós-hidratação — build e
  cobertura verdes não pegam isso. Já corrigido nos 4 repos atuais
  (dedupe + sufixo `~N` + guard que aborta o build se sobrar duplicata),
  mas se você tocar em `scripts/build-consulta.mjs` de qualquer repo,
  preserve esse guard.
- **Nomes de nível em inglês vazando pros derivados**: `gera-outline.mjs`
  tinha os 3 nomes de nível (`'Get by'`, `'Get the good stuff'`, `'Read the
  room'`) fixos em inglês; regenerar o outline num SKU derivado sobrescrevia
  o nome traduzido. Corrigido — cada repo tem os nomes na própria língua com
  rótulo duplo. Se você regenerar outline em algum repo, confira que o
  nome de nível continua na língua certa depois.
- **Portão de tom (`valida-tom.mjs`) monolíngue**: a função `cheiraPerda`
  (detecta se um subtítulo tem "moldura de perda" quando devia ter "moldura
  de ganho") rodava um léxico fixo (en+pt+de) independente da língua real
  do SKU — dava falso-positivo (`"con"` inglês de "con man" batendo na
  preposição italiana `"con"`) ou falso-negativo (nunca checava
  francês/italiano). Corrigido: roteia por `audio.config.json._g14.guiaLingua`.
  Se você criar um SKU numa língua nova, adicione o léxico dela em
  `LEXICO_PERDA_<LINGUA>` e no mapa `_LEXICOS_PERDA`.
- **git.exe bloqueado de escrever em `D:\dev`** por política do Norton
  nesta máquina (não é geral — é desta máquina específica). Repos que
  precisam de working tree fora de `D:\dev` (como o mapa) vivem em
  `C:\Users\aapc_\dev-hosting\`. Se um `git push`/`git commit` falhar
  estranhamente em D:, mova o working tree pra C: em vez de debugar o git.

## 7. Próximo item do roadmap (NÃO começar sem o dono confirmar — está em pausa)

**EN→França** — abrir o 2º acervo (francês nativo, não derivação). É
**caro** (autoria de conteúdo do zero + gravação nova + revisor nativo
francês obrigatório antes de gerar áudio em escala). Havia um plano de Fase
0 completo desenhado (tabela de interferência EN↔FR, mapa dos 36 slots,
elenco de voz, gag-âncora `préservatif`/`monnaie`, proporção 12+12) — **NÃO
EXECUTE** isso sem o dono revisar/aprovar as decisões marcadas no plano
(tom da gag-âncora, quem é o revisor nativo francês, aprovação do bake-off
de voz). O plano completo estava salvo em
`C:\Users\aapc_\AppData\Local\Temp\claude\...\scratchpad\PLANO-EN-FRANCA.md`
(caminho de sessão temporário — pode não existir mais; se precisar, refaça
a pesquisa a partir do zero, os dossiês-fonte devem estar em
`_projects/curso-tailandes/docs/RANKING-DESTINOS.md` §4 item #3 e no
`PORTFOLIO.md` do mesmo diretório, que **diverge** do RANKING sobre incluir
destinos europeus — o `RANKING-DESTINOS.md` é v3 e se autodeclara
"substitui todos os rankings anteriores"; o `PORTFOLIO.md §2.2/D26`
(que exclui Espanha/França/Itália) está **superado** nessa dimensão
específica, mas ainda vale para tudo de loja/preço/marca).

**Bloqueio real, não-crítico**: as imagens do destino França ainda não
foram geradas (o pipeline de imagens roda numa máquina Mac separada do
dono, que processa uma fila em `D:\dev\kit-imagens\pedidos\`; a entrega cai
em `D:\dev\kit-imagens\entregues\destino-franca\`, hoje vazia). Isso **não
bloqueia** texto/áudio/build — só a home mostra emoji-degradê em vez de
foto até a entrega chegar (é o mesmo padrão usado no alemão, que subiu sem
imagem e recebeu depois).

## 8. Como verificar tudo antes de dizer "terminado"

Para qualquer alteração que toque um `curso-espanha*`:
```bash
cd D:/dev/_projects/curso-espanha        # (ou -de / -fr / -it)
npm run build                             # roda prebuild com os portões
```
Se passar, `bash deploy.sh` publica. Depois, confirme ao vivo:
```bash
curl -s "https://aleapc.github.io/curso-espanha/?cb=$(date +%s)" | grep -o "TEXTO_ESPERADO"
```
E para qualquer coisa que envolva o `/kit` (cards), abra a folha de fato no
browser e confira que os cards aparecem — não confie só no HTTP 200.

## 9. Custo/modelo

O dono está monitorando gasto de token (perto do limite semanal, reset
07/ago). Para trabalho mecânico (editar código, replicar entre repos, fazer
deploy) não é necessário o modelo mais caro/raciocínio mais alto — só para
decisões de conteúdo/tom (ex. o plano do França) vale usar mais poder de
raciocínio. Sem workflow multi-agente para isto — é trabalho sequencial e
bem especificado, um agente só resolve.
