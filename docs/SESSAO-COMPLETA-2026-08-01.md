# Sessão completa — Kit de Bordo / ¡Dime! — 2026-08-01

Registro narrativo da sessão inteira (Claude Code, modelo Opus 4.8 depois
trocado para Sonnet 5), para dar contexto a quem assumir o trabalho a
partir daqui (ex.: Codex). Para instruções operacionais objetivas, ver
`D:\dev\_projects\curso-espanha\docs\HANDOFF-CODEX.md` — este arquivo é o
"porquê" e a história; aquele é o "o que fazer agora".

O dono do projeto (aleapc) é brasileiro, comunica em PT-BR, trata por
"você", prefere ação concreta a explicação longa.

---

## Parte 1 — o que já vinha acontecendo antes desta sessão (resumo herdado)

O projeto é **"Kit de Bordo"** — portfólio de PWAs de idioma de
sobrevivência para viagem. **¡Dime!** é o curso de espanhol para quem vai à
Espanha. Cada SKU = comprador × destino; destino é caro (fala nativa +
imagens), comprador é barato (voz-guia trocada sobre o mesmo destino —
"derivar", nunca "traduzir").

Estado ao entrar nesta sessão: EN→Espanha e DE→Espanha já estavam no ar.
FR→Espanha estava pronto mas ainda não publicado. IT→Espanha tinha as 36
partes e áudio gerados mas em repositório **privado**, aguardando decisão
do dono sobre torná-lo público.

Havia também uma mudança de estrutura de exibição pendente: o dono olhou um
dos PWAs e não gostou do roteiro — queria voltar à estrutura familiar
Básico/Intermediário/Avançado **combinada** com o agrupamento por jornada
do turista (aeroporto → imigração → táxi → hotel → restaurante → loja →
pedir direção). Depois de eu propor um meio-termo (manter os 3 níveis com
rótulo duplo — "Básico · Me viro" — e agrupar as 36 partes em episódios de
jornada), o dono aprovou primeiro no italiano (o curso ainda não publicado,
"campo de teste seguro") e depois confirmou "vá em frente" para rolar a
mudança em DE e FR também, e corrigir o nome de nível do EN (que também
tinha uma regressão: o gerador de outline vazava nomes de nível em inglês
para os cursos derivados).

## Parte 2 — o que aconteceu nesta sessão, em ordem

### 2.1 — Rollout da estrutura de jornada para DE e FR + fix do EN

Rodei um workflow com 3 agentes em paralelo (um por curso: DE, FR, EN) que:
- Em **DE** e **FR**: adicionou o mapa `EP_META` (14 episódios de jornada,
  nomes traduzidos) + `SLOT_EPISODIO` (mapa de slot→episódio) em
  `src/lib/course/index.ts`, e corrigiu os 3 nomes de nível em
  `scripts/gera-outline.mjs` para a língua do comprador com rótulo duplo
  (ex. alemão: `"Grundstufe · Ich komme klar"`; francês: `"Débutant · Je me
  débrouille"`).
- Em **EN**: só corrigiu os nomes de nível (rótulo duplo em inglês: `"Basic
  · Get by"`) — **sem** adicionar o agrupamento de episódios, porque o EN
  está "meio-migrado" (mistura ids legado `e0Xa` com ids de slot `b0X`) e
  agrupar ali reintroduziria o bug antigo de "duas aulas sem relação
  aparecendo como um card só".

Os 3 builds (com os portões de validação, não só `vite build` cru) saíram
verdes. Comitei os 3 (mensagens descrevendo estrutura de jornada + rótulo
duplo + o fix do portão G1 — ver 2.2), fiz push do `main` dos 3, e depois
rodei os 3 `deploy.sh` **em série** (eles compartilham um worktree em
`/d/tmp/cd-wt`, não pode ser em paralelo). Verifiquei ao vivo via `curl` +
`grep` que os nomes de nível corretos apareciam e a regressão em inglês
tinha desaparecido — e no EN, especificamente, procurei o HTML renderizado
pra confirmar (`<h2 class="text-lg font-bold">Basic · Get by</h2>`).

### 2.2 — Um bug que apareceu no caminho: o portão de tom (G1) era monolíngue

Ao revisar o `git status` dos 3 repos antes de comitar, vi mudanças extras
que eu não tinha feito nesta sessão (provavelmente de uma tarefa em
background/outra sessão rodando em paralelo): `scripts/valida-tom.mjs`
ganhou roteamento por língua na função `cheiraPerda` (antes rodava um
léxico fixo en+pt+de independente da língua real do SKU — o `"con"` inglês
de "con man" batia na preposição italiana `"con"`, dando falso positivo; e
nunca checava francês nem italiano de verdade, dando falso negativo). A
correção lê `audio.config.json._g14.guiaLingua` e roteia pro léxico certo.
Isso pegou 2 erros reais: IT b16 (moldura "ganha" com subtítulo "non
funziona", ajustado para "va sistemato") e FR b16 (idem, "ne marche pas" →
"est à remettre en état"). Revisei os diffs, confirmei que eram o fix
correto (idêntico nos 3 repos, só o hash do blob mudava), e deixei entrar
no mesmo commit.

### 2.3 — Publicação do italiano (com aprovação explícita do dono)

Antes de publicar o italiano, expliquei ao dono que o passo restante — só
esse — era tornar o repo privado em público (Pages não serve repo privado)
e pedi **go/no-go explícito**, porque é o tipo de ação com cara de
"lançamento público". O dono respondeu **"Go e me mostre o nosso mapa
atualizado por favor."**

Executei: `gh repo edit ... --visibility public`, depois `bash deploy.sh`
(primeiro deploy, cria a branch `gh-pages` órfã), depois habilitei o Pages
via `gh api` (o `-f` simples não funcionou porque a API exige um corpo JSON
aninhado `{"source":{"branch":...}}`, não paridade de flags soltas).
Verifiquei ao vivo: níveis em italiano corretos, zero regressão inglesa, e
— o teste que importa de verdade porque já mordeu o alemão antes — abri uma
folha do `/kit` (`/kit/taxi/destino/`) via JS no browser e confirmei **4
`<article>` pós-hidratação**, igual ao SSR. Sem esse teste, um bug de id
duplicado (ver §3 do handoff técnico) teria passado batido com build verde.

### 2.4 — O mapa de corredores: hospedagem fixa + correção de contraste

Fui atualizar o mapa de status (que já existia como Artifact do Claude,
`550ac472...`) para refletir Espanha 4/4 e o próximo item do roadmap. O
dono, ao ver o resultado, pediu 3 coisas:
1. Corrigir cores — fonte escura contra fundo escuro não funciona.
2. Marcação de status (no ar / próximo / em produção) mais forte —
   estava discreta demais (só um anel fino).
3. **Hospedar num endereço fixo no GitHub** que eu mantenha atualizado —
   não mais um Artifact "solto".

Fiz as três: reescrevi o HTML como página `<!doctype html>` standalone com
CSS próprio (`html,body{background:var(--ground);color:var(--ink)}` —
antes dependia do container/tema injetar isso, e não injetava sempre);
troquei a marcação de "anel fino + dot 7px" por **fundo sólido colorido +
ícone** (✓ verde para "no ar", ▶ roxo para "próximo") com legenda em chips
preenchidos; adicionei um botão de toggle de tema manual (◐) que crava
`data-theme` na raiz. Criei o repo `aleapc/kit-de-bordo-mapa` (working tree
em `C:\Users\aapc_\dev-hosting\kit-de-bordo-mapa` — **fora** de `D:\dev` de
propósito, porque o `git.exe` desta máquina está bloqueado de escrever em
`D:` por uma política do Norton, e `C:` não tem esse bloqueio), habilitei o
Pages, e verifiquei visualmente via screenshot no browser interno — o
contraste e a marcação ficaram corretos.

URL final: **https://aleapc.github.io/kit-de-bordo-mapa/**

### 2.5 — O conflito de roteiro que precisou ser trazido ao dono

Ao investigar qual seria "o próximo curso", li dois documentos-fonte no
disco (`curso-tailandes/docs/PORTFOLIO.md` e `RANKING-DESTINOS.md`) e achei
uma contradição real: o `PORTFOLIO.md` (mais antigo) tem uma decisão
explícita **D26** dizendo que Espanha/Itália/França/Grécia **NÃO** deveriam
virar SKU ("o turista atravessa com Google Tradutor e cartão"). Isso é
literalmente o oposto do que a sessão vinha construindo. Em vez de decidir
sozinho ou assumir que uma resolução anterior (registrada em memória, "o
RANKING supera o PORTFOLIO nisso") ainda era válida, **trouxe o conflito
explicitamente ao dono**, mostrando os dois textos: o `RANKING-DESTINOS.md`
é versão 3 e se autodeclara *"substitui todos os rankings anteriores de
destino/língua"*, com uma seção inteira (§5) dedicada a mostrar que o
ranking antigo "media exotismo, não risco" (Tailândia/Japão são Nível 1 no
State Dept; França/Itália/Turquia/México são Nível 2 — mais arriscados na
prática, e ninguém tinha visto isso porque a régua velha pesava demais
escrita+tom). O `PORTFOLIO.md` continua valendo para tudo de loja/preço/
marca/convite — só a *ordem de destinos* é a parte superada.

Concluí (e o dono não contestou) que o próprio fato de EN/DE/FR/IT→Espanha
já estarem no ar e serem exatamente os itens #1/#2/#4 do RANKING v3 era a
prova prática de que o roteiro certo já estava sendo seguido — e que o
próximo item **é EN→França** (item #3: abre o 2º acervo mais reutilizável,
o francês, ~35,2M/ano em 8 corredores, voz-guia inglesa por ser QA-segura).

### 2.6 — Pedido do dono por 3 features transversais ("adições de viajante")

No meio da apresentação do roteiro, o dono pediu, mid-turn (sem esperar o
fim do meu turno):
1. **Busca por situação** — achar rápido o conteúdo certo sem ter que
   voltar à lição e escutar o áudio de novo (ex. "estou num restaurante na
   França, como peço a conta?").
2. **Link para abrir o Google Tradutor**.
3. **Conversor de moedas** e demais utilidades que os PWAs de guia do casal
   (Uruguai, Puerto Varas) já têm — pedindo que eu **investigasse e
   sugerisse**, não que eu simplesmente implementasse.

Rodei dois workflows em paralelo:
- Um investigando os guias (`guia-uruguai-pwa`, `guia-puerto-varas-pwa`) e
  o `/kit` do ¡Dime! e sintetizando uma proposta concreta.
- Outro fazendo a "Fase 0" (plano de scoping, não implementação) do
  EN→França: tabela de interferência fonética inglês↔francês, mapa dos 36
  slots ao conteúdo francês, elenco de voz, corte reuso×novo, núcleo
  gerador (gag-âncora, falsos amigos, nome do molde).

Os dois voltaram ricos. Da investigação dos guias, o achado mais
importante: **o conversor de moedas só faz sentido para o comprador
inglês** (GB/EUA) — os compradores DE/FR/IT→Espanha já usam euro, então
para eles o conversor é inútil e deveria virar uma nota "todos usam a mesma
moeda" em vez de um widget funcional. Também achei que a busca **já
existe** no código (`KitBusca.svelte` + `consulta/indice.ts`) — só está
presa na tela inicial do `/kit`; não era preciso construir do zero, só
tornar alcançável de qualquer tela.

Apresentei as duas propostas (adições de viajante + plano do França) com
minhas recomendações em cada decisão pendente, e perguntei se podia seguir.

## Parte 3 — a virada de custo (o dono ficou preocupado com o gasto de tokens)

O dono mostrou um screenshot da barra de status do Claude Code com "Approaching
weekly usage limit" e perguntou o que eu recomendava. Expliquei que o maior
fator de custo era o **Ultracode** (modo que a sessão tinha ligado, que
instrui a usar workflows multi-agente exaustivamente em toda tarefa —
literalmente "custo de token não é restrição"), e recomendei: desligar o
Ultracode, trabalhar sem leque de agentes para tarefas de implementação
mecânica, e trocar de modelo (Opus → Sonnet) para esse tipo de trabalho,
guardando o Opus para decisões de conteúdo/raciocínio pesado.

O dono desligou o Ultracode, perguntou "continuo no Opus 4.8?" (respondi
recomendando Sonnet 5 para o trabalho mecânico de agora), perguntou "qual
Sonnet?" (respondi: Sonnet 5, `claude-sonnet-5` — não os antigos 4.5/3.7), e
trocou via `/model claude-sonnet-5`.

## Parte 4 — implementação das 3 adições (começada, incompleta)

Depois de decidir os 6 pontos pendentes da proposta com defaults próprios
(porque o dono pediu "resposta completa, sem fatiar"):
1. Moeda de casa do EN → GBP + USD.
2. Frescor das taxas → embutidas offline + refresh opcional quando há rede.
3. Escopo do `/bolso` v1 → conversor + tomadas/voltagem + 112 + água/gorjeta.
4. Busca → ícone no header, alcançável em qualquer tela, substring (sem
   fuzzy por ora).
5. Menu do header → criar um "⋯" agregando tradutor + bolso.
6. França → herda o mesmo desenho quando chegar (não implementado agora).

Comecei a implementar **só no curso EN** (`curso-espanha`), como base para
depois replicar nos outros 3. Antes de tocar no header, investiguei o
código existente e achei uma tensão de produto real: `consulta/indice.ts`
tem um comentário que documenta como **lei** que a busca "nunca é entrada
primária" (PRODUTO.md §6) — é uma "saída de emergência" deliberadamente
discreta (ring fino, sem campo herói), hoje só na tela 0 do `/kit`, abrindo
**para cima** (o polegar no rodapé). A proposta original do workflow queria
promovê-la a um ícone fixo no header em todas as telas — decidi que isso
era compatível com o pedido do dono **sem** violar a lei, desde que a busca
continuasse visualmente discreta (não um campo de busca "hero") — só
ficando **alcançável**, não proeminente.

### O que já foi feito (código):
- **Criado** `src/lib/curso.config.ts` — config central com
  `buyerLang`/`targetLang`/`translatorPair`/`destCurrency`/
  `homeCurrencies`/`timeZone`. É o arquivo que, ao derivar, muda por
  inteiro — nenhum componente novo tem idioma/moeda hard-coded fora dele.
- **Editado** `src/lib/components/KitBusca.svelte` — nova prop `direcao:
  'cima'|'baixo'` (cima = comportamento original; baixo = quando ancorada
  no header, porque lá o teclado nasce embaixo, não em cima).
- **Editado** `src/routes/+layout.svelte` — o header ganhou dois ícones
  novos ao lado dos pills de perfil: 🔎 (toggle de busca, abre uma barra
  full-width abaixo do header reusando `KitBusca` com `direcao="baixo"`) e
  ⋯ (menu pequeno com "🗣️ Google Translator" e "💱 Traveler's pocket").
- **Editado** `src/routes/+page.svelte` — o link do tradutor na home (que
  antes ia para `https://translate.google.com` genérico) agora usa
  `curso.translatorPair` para montar a URL com `sl`/`tl` corretos; e foi
  adicionado um novo card "💱 Traveler's pocket" linkando para `/bolso/`
  (mesmo estilo visual do card do tradutor).

### O que NÃO foi feito ainda (interrompido para escrever os documentos de passagem):
- A rota `/bolso` em si (`src/routes/bolso/+page.svelte` + `+page.ts`) —
  **ainda não existe**. É o próximo passo lógico: conversor de moedas
  (condicional a `homeCurrencies.length > 0`), tomadas/voltagem, 112,
  água/gorjeta/IVA. Ver detalhes de implementação no `HANDOFF-CODEX.md`.
- Nenhum teste local (`npm run dev`) nem build (`npm run build`) foi
  rodado ainda sobre essas edições — **fazer isso antes de qualquer commit**.
- Nada foi replicado para DE/FR/IT ainda.
- O plano do EN→França (Fase 0, já pronto) **não foi executado** — está
  deliberadamente pausado aguardando decisões do dono (tom da gag-âncora,
  quem é o revisor nativo francês, aprovação de voz) e, agora, o
  orçamento de token.

## Parte 5 — o pedido atual (o motivo deste arquivo)

O dono, preocupado em ficar sem tokens antes do reset semanal (sexta,
07/ago), pediu um documento de passagem para o Codex continuar o trabalho
sem interrupção, e depois pediu que a conversa inteira fosse exportada para
um `.md` para ele enviar manualmente (eu não tenho integração direta com o
Codex). Este arquivo é essa exportação; o `HANDOFF-CODEX.md` (no repo
`curso-espanha/docs/`) é o documento operacional objetivo — ambos devem ser
enviados juntos.

---

*Fim do registro. Para instruções de "o que fazer agora, passo a passo",
ver `HANDOFF-CODEX.md`.*
