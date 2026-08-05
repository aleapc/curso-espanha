# TAKEOVER-STATE.md — estado técnico exato, 2026-08-01

Gerado por inspeção direta do disco/Git/GitHub nesta máquina, agora. Não
repete o histórico do projeto nem decisões de produto — isso está em
`HANDOFF-CODEX.md` e `SESSAO-COMPLETA-2026-08-01.md`, no mesmo diretório.
Este documento é só fato verificável: o que está no disco, o que está no
Git local, o que está no GitHub, o que diverge entre os dois.

Máquina: Windows, PowerShell 7 + Git Bash disponíveis. Usuário do Git:
`aleapc <aleapc@gmail.com>` (usado explicitamente via `-c user.name`/`-c
user.email` nos commits de deploy, não é a config global).

---

## 1. Estado de cada repositório

### `curso-espanha` (EN→Espanha)
- **Caminho local:** `D:\dev\_projects\curso-espanha`
- **Remoto:** `https://github.com/aleapc/curso-espanha.git`
- **Branch atual:** `main`
- **Último commit local (HEAD):** `3309294f39cb91f13b2cf1bca1500169ac5ba435` — "Adiciona registro narrativo da sessão junto ao handoff"
- **`origin/main` real (após `git fetch`):** `3759d30c65987ce066e776d4f7c367e9716b1a9f` — **2 commits atrás do HEAD local**
- **Commits locais não enviados:**
  ```
  3309294 Adiciona registro narrativo da sessão junto ao handoff
  b0c15e5 Adiciona documento de passagem para continuidade sem interrupção (Codex)
  ```
  Ambos são só documentação (`docs/HANDOFF-CODEX.md`, `docs/SESSAO-COMPLETA-2026-08-01.md`) — **zero mudança de código/conteúdo do curso**. O site publicado (gh-pages) já reflete `3759d30`, então não há divergência entre o que está no ar e o código-fonte a esse respeito.
- **`git status --short`:**
  ```
   M docs/MATRIZ-CORREDORES.html
   M src/lib/components/KitBusca.svelte
   M src/routes/+layout.svelte
   M src/routes/+page.svelte
  ?? src/lib/curso.config.ts
  ?? curso-espanha-wip.patch
  ```
  (a última linha é o próprio patch gerado por esta tarefa, ver §9)
- **GitHub Pages:** branch `gh-pages`, path `/`. `gh-pages` remoto tem **1 commit** (o script de deploy deste repo recria a branch como árvore órfã a cada publicação — ver §4). URL ao vivo: `https://aleapc.github.io/curso-espanha/`.

### `curso-espanha-de` (DE→Espanha)
- **Caminho local:** `D:\dev\_projects\curso-espanha-de`
- **Remoto:** `https://github.com/aleapc/curso-espanha-de.git`
- **Branch atual:** `main`
- **Último commit (HEAD = origin/main, sincronizados):** `82b766bca5032fd5004f4bfa100fdf58039e90a8` — "Estrutura de jornada + rótulo duplo de nível + portão G1 por língua"
- **Commits locais não enviados:** nenhum.
- **`git status --short`:** vazio (working tree limpo).
- **GitHub Pages:** branch `gh-pages`, path `/`. `gh-pages` remoto tem **4 commits** (script antigo, acumula histórico a cada deploy — ver §4). URL: `https://aleapc.github.io/curso-espanha-de/`.

### `curso-espanha-fr` (FR→Espanha)
- **Caminho local:** `D:\dev\_projects\curso-espanha-fr`
- **Remoto:** `https://github.com/aleapc/curso-espanha-fr.git`
- **Branch atual:** `main`
- **Último commit (HEAD = origin/main, sincronizados):** `c7d8dc83b141e400bce6ad78f3a938d7010cb406` — "Estrutura de jornada + rótulo duplo de nível + portão G1 por língua + b16"
- **Commits locais não enviados:** nenhum.
- **`git status --short`:** vazio.
- **GitHub Pages:** branch `gh-pages`, path `/`. `gh-pages` remoto tem **3 commits**. URL: `https://aleapc.github.io/curso-espanha-fr/`.

### `curso-espanha-it` (IT→Espanha)
- **Caminho local:** `D:\dev\_projects\curso-espanha-it`
- **Remoto:** `https://github.com/aleapc/curso-espanha-it.git`
- **Branch atual:** `main`
- **Último commit local (HEAD):** `88cdbfe05f8312e0d0333b19ff9e425a48fabba1` — "Italiano: estrutura de episódios de jornada + rótulo duplo de nível"
- **`origin/main` real:** `2c52002fd2bfb29e92ba95948d79471087d689ec` — **⚠️ 1 commit atrás do HEAD local. Este commit NUNCA foi enviado ao GitHub** (ver BLOQUEIOS REAIS, item 1).
- **Commits locais não enviados:**
  ```
  88cdbfe Italiano: estrutura de episódios de jornada + rótulo duplo de nível
  ```
- **`git status --short`:**
  ```
   M static/audio/manifest.json
  ```
  Confirmado: mesmo conjunto de 2352 chaves antes/depois — é reordenação, não perda/adição de conteúdo (provavelmente efeito colateral de algum script de build/regeneração rodado durante a sessão). Não é urgente, mas decidir se comita ou descarta (`git checkout -- static/audio/manifest.json`) antes de seguir.
- **GitHub Pages:** branch `gh-pages`, path `/`. `gh-pages` remoto tem **1 commit** (primeiro deploy). URL: `https://aleapc.github.io/curso-espanha-it/`. **O site ao vivo reflete o código do commit `88cdbfe`** (build local rodou sobre o working tree que já tinha esse commit) — só o `main` no GitHub que ficou atrás.

### `kit-de-bordo-mapa`
- **Caminho local:** `C:\Users\aapc_\dev-hosting\kit-de-bordo-mapa` (fora de `D:\dev` — ver §6, item sobre bloqueio de escrita do Norton)
- **Remoto:** `https://github.com/aleapc/kit-de-bordo-mapa.git`
- **Branch atual:** `main`
- **Último commit (HEAD = origin/main, sincronizados):** `1bd95787929b12408cd6f9d5305a4189197cc876` — "Mapa: próximo alinhado ao roteiro (EN→França, item #3) + contraste/marcação fortes"
- **Commits locais não enviados:** nenhum.
- **`git status --short`:** vazio.
- **GitHub Pages:** habilitado via `gh api` na branch `main`, path `/` (não usa `gh-pages` — é publicação direta da branch principal, repo estático simples, sem `deploy.sh`). URL: `https://aleapc.github.io/kit-de-bordo-mapa/`.

---

## 2. `curso-espanha` — exatamente o que está fora de commit

**Arquivos tocados (enumeração completa, igual ao `git status --short` acima — nada além disto):**
- Modificados: `docs/MATRIZ-CORREDORES.html`, `src/lib/components/KitBusca.svelte`, `src/routes/+layout.svelte`, `src/routes/+page.svelte`
- Novo (untracked): `src/lib/curso.config.ts`
- Removidos: nenhum.

**Confirmação explícita:** não há nenhuma outra alteração fora deste conjunto de 5 arquivos. `git status --short` foi rodado com `git fetch` fresco imediatamente antes, e é a fonte desta lista — não há diff invisível, nem stash, nem arquivo `--assume-unchanged`.

```
$ git stash list
(vazio)
```

### `docs/MATRIZ-CORREDORES.html` — diff
```diff
--- a/docs/MATRIZ-CORREDORES.html
+++ b/docs/MATRIZ-CORREDORES.html
@@ -1,5 +1,11 @@
+<!doctype html>
+<html lang="pt-BR">
+<head>
+<meta charset="utf-8">
+<meta name="viewport" content="width=device-width, initial-scale=1">
 <title>Kit de Bordo — Mapa de Corredores</title>
 <style>
+  html,body{margin:0;min-height:100vh;background:var(--ground);color:var(--ink);-webkit-text-size-adjust:100%}
   :root{
     --ground:#e9edef; --paper:#f7f9fa; --cell:#fbfcfd; --ink:#182029; --ink-2:#465563; --muted:#6f7d89;
     --line:#d3dade; --line-2:#c1cacf; --accent:#0e5a5a;
@@ -72,8 +78,13 @@
   td.np{color:var(--muted);font-size:10px;font-family:var(--sans)}
   td.blank{color:var(--line-2)}
   td.home{background:repeating-linear-gradient(45deg,transparent,transparent 4px,color-mix(in srgb,var(--muted) 22%,transparent) 4px,color-mix(in srgb,var(--muted) 22%,transparent) 5px);color:var(--muted);font-family:var(--sans);font-size:10px}
-  td.sku{box-shadow:inset 0 0 0 2px var(--sc)}
-  td.sku .badge{position:absolute;top:2px;right:2px;width:7px;height:7px;border-radius:50%;background:var(--sc)}
+  td.sku{font-weight:800;box-shadow:inset 0 0 0 3px color-mix(in srgb,var(--sc) 60%,#000)}
+  td.sku.sk-live{background:var(--live)!important;color:#fff!important}
+  td.sku.sk-next{background:var(--next)!important;color:#fff!important}
+  td.sku.sk-prod{background:var(--prod)!important;color:#fff!important}
+  td.sku .badge{position:absolute;top:-1px;right:2px;font-size:12px;font-weight:900;line-height:1.2;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.4)}
+  .theme-toggle{position:fixed;top:12px;right:12px;z-index:9;font-family:var(--sans);font-size:12px;padding:.4rem .7rem;border-radius:8px;border:.5px solid var(--line-2);background:var(--paper);color:var(--ink);cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.12)}
+  .theme-toggle:hover{border-color:var(--accent)}
   .caveat{margin:1.1rem 0 0;padding:.8rem 1rem;border-left:3px solid var(--accent);background:var(--paper);border-radius:0 10px 10px 0;font-size:13px;color:var(--ink-2)}
   .caveat b{color:var(--ink);font-weight:500}
   .road{margin-top:1.8rem}
@@ -86,7 +97,9 @@
   footer{margin-top:2rem;padding-top:1rem;border-top:.5px solid var(--line);font-size:11.5px;color:var(--muted);line-height:1.6}
   .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}
 </style>
-
+</head>
+<body>
+<button id="themeToggle" class="theme-toggle" aria-label="Alternar tema claro/escuro">◐ tema</button>
 <div class="wrap">
   ... (resto idêntico ao index.html canônico em kit-de-bordo-mapa; ver nota abaixo)
```
**Nota crítica:** este arquivo é uma **cópia paralela** do `index.html` do repo `kit-de-bordo-mapa` (o mapa canônico). Já foi confirmado byte-a-byte idêntico ao canônico:
```
$ diff docs/MATRIZ-CORREDORES.html "C:/Users/aapc_/dev-hosting/kit-de-bordo-mapa/index.html"
(sem saída — idênticos)
```
Ou seja: **o trabalho já está commitado e publicado** (no repo `kit-de-bordo-mapa`); só falta decidir se vale comitar esta cópia dentro de `curso-espanha` também (histórico/redundância) ou descartar o diff (`git checkout -- docs/MATRIZ-CORREDORES.html`) e manter só a canônica externa.

### `src/lib/components/KitBusca.svelte` — diff completo
```diff
--- a/src/lib/components/KitBusca.svelte
+++ b/src/lib/components/KitBusca.svelte
@@ -9,6 +9,10 @@
   // E ela NÃO é a entrada primária (PRODUTO.md §6) — é a saída de emergência de
   // quem já sabe a palavra. Por isso é uma linha discreta, não um campo herói.
 
+  // `direcao`: 'cima' (padrão, tela do /kit — o polegar no rodapé) ou 'baixo'
+  // (âncora no header, onde o teclado nasce embaixo, não em cima).
+  let { direcao = 'cima' }: { direcao?: 'cima' | 'baixo' } = $props();
+
   let termo = $state('');
   const achados = $derived(buscar(termo));
   const procurando = $derived(termo.trim().length >= 2);
@@ -26,7 +30,9 @@
     <!-- Resultados ABRINDO PARA CIMA: o teclado ocupa a metade de baixo, e uma
          lista que abrisse para baixo nasceria embaixo dele. -->
     <div
-      class="absolute bottom-full left-0 right-0 mb-2 max-h-[46dvh] overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-lg ring-1 ring-black/15"
+      class="absolute left-0 right-0 max-h-[46dvh] overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-lg ring-1 ring-black/15 {direcao === 'baixo'
+        ? 'top-full mt-2'
+        : 'bottom-full mb-2'}"
     >
       {#if achados.length}
         <ul>
```

### `src/routes/+layout.svelte` — diff
O `git diff` mostra o arquivo inteiro como removido+adicionado (linhas `-73,+144`) por **churn de fim-de-linha** (o arquivo original está em CRLF; a edição gravou em LF/CRLF misto — comportamento já visto e documentado no repo: `warning: in the working copy of ... LF will be replaced by CRLF`). **Não é reescrita de conteúdo** — validado nesta tarefa aplicando o patch num clone limpo e comparando com `diff -b` (ignora espaço/EOL): idêntico. Resumo funcional do que mudou (não o diff cru, que é ruído de EOL):
- Import de `curso` (`$lib/curso.config`) e `KitBusca`.
- Dois estados novos: `buscaAberta`, `menuAberto`.
- `translatorHref` derivado de `curso.translatorPair`.
- Header: dois botões novos (🔎 busca, ⋯ menu) ao lado dos pills de perfil; menu dropdown com links pro Tradutor e pro `/bolso/`; barra de busca (`KitBusca direcao="baixo"`) abaixo do header quando `buscaAberta`.
- Nenhuma lógica de service worker foi tocada.

### `src/routes/+page.svelte` — diff completo
```diff
--- a/src/routes/+page.svelte
+++ b/src/routes/+page.svelte
@@ -5,6 +5,9 @@
   import { examDoNivel, quizDoEpisodio } from '$lib/course/quiz-nav';
   import { store, isDone, PROFILES } from '$lib/state.svelte';
   import { encodeSync, importSync, whatsappUrl } from '$lib/sync';
+  import { curso } from '$lib/curso.config';
+
+  const translatorHref = `https://translate.google.com/?sl=${curso.translatorPair.sl}&tl=${curso.translatorPair.tl}&op=translate`;
 
   const perfil = $derived(PROFILES.find((p) => p.id === store.current)!);
 
@@ -79,7 +82,7 @@
 </a>
 
 <a
-  href="https://translate.google.com"
+  href={translatorHref}
   target="_blank"
   rel="noopener"
   class="mt-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-md ring-1 ring-black/5"
@@ -99,6 +102,20 @@
   will not tell you that the same drink costs three prices.
 </p>
 
+<a
+  href="{base}/bolso/"
+  class="mt-3 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-md ring-1 ring-black/5"
+>
+  <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-salvia/15 text-2xl">💱</span>
+  <span class="min-w-0 flex-1">
+    <span class="block font-bold leading-tight text-carvao">Traveler's pocket</span>
+    <span class="block text-xs text-carvao/60"
+      >Currency, plug type, and the emergency number — works with the phone in airplane mode.</span
+    >
+  </span>
+  <span class="shrink-0 text-lg text-carvao/30">→</span>
+</a>
+
 {#each niveis as nivel}
```
**Atenção:** este arquivo agora referencia `{base}/bolso/` — **a rota `/bolso` ainda NÃO existe** (`src/routes/bolso/` não foi criado). O link fica quebrado (404) até a rota ser criada. Idem no menu do `+layout.svelte`.

### `src/lib/curso.config.ts` — conteúdo integral (arquivo novo, untracked)
```ts
// A CONFIG DE CURSO — o que muda entre EN/DE/FR/IT→Espanha (e o futuro →França)
// mora AQUI e só aqui. Componentes agnósticos de língua (busca, tradutor,
// bolso do viajante) leem daqui; nenhum deles tem par de idioma ou moeda
// hard-coded. Derivar um SKU novo = copiar este arquivo e trocar os valores.

export const curso = {
  /** Idioma do comprador (a voz-guia). */
  buyerLang: 'en',
  /** Idioma do destino (a fala nativa ensinada). */
  targetLang: 'es',
  /** Par para o link do Google Tradutor: sl = comprador, tl = destino. */
  translatorPair: { sl: 'en', tl: 'es' },
  /** Moeda do destino. */
  destCurrency: 'EUR',
  /**
   * Moedas de "casa" do comprador que vale converter no bolso do viajante.
   * Vazio quando o comprador já usa a moeda do destino (ex.: DE/FR/IT→Espanha,
   * todos em EUR) — nesse caso o /bolso mostra a nota "mesma moeda", sem conversor.
   */
  homeCurrencies: ['GBP', 'USD'] as string[],
  timeZone: 'Europe/Madrid'
} as const;

export type CursoConfig = typeof curso;
```

---

## 3. Ambiente da máquina

| Item | Valor |
|---|---|
| Node | `v22.23.1` |
| npm | `11.0.0` |
| Git | `2.55.0.windows.3` |
| GitHub CLI | `2.96.0` (2026-07-02) |
| `gh auth status` | `github.com` — logado como `aleapc` (keyring), conta ativa, protocolo HTTPS, escopos do token: `gist`, `read:org`, `repo`, `workflow`. Token omitido. |
| Gerenciador de pacotes efetivo | **npm** — os 4 repos de curso têm `package-lock.json`; nenhum tem `pnpm-lock.yaml` ou `yarn.lock`. |
| `node_modules` já instalado | Sim, nos 4 repos de curso (`curso-espanha*`) — **não precisa de `npm install`** pra buildar como estão agora; só se o `package.json`/lockfile mudar. |
| Variáveis de ambiente | Cada um dos 4 repos de curso tem `.env` (chave `ELEVENLABS_API_KEY=...`) e `.env.example` (mesma chave, valor de exemplo). **Só é necessário pra gerar/validar áudio novo** (`scripts/generate-audio.mjs`, `scripts/qa-asr.mjs`) — build e deploy normais não leem essa variável. Conteúdo do `.env` não reproduzido aqui (segredo); confirmar que o arquivo existe antes de qualquer tarefa de geração de áudio. |
| Arquivos ignorados pelo Git necessários ao build | **`static/audio/*.mp3`** (gitignorado de propósito — 258 MB reprodutíveis a partir do `manifest.json`, que É versionado). Confirmada a presença local: `curso-espanha` 2467 mp3 · `curso-espanha-de` 2370 · `curso-espanha-fr` 2352 · `curso-espanha-it` 2352. **Sem esses arquivos, o build funciona mas o site publicado ficaria sem áudio** — não é o caso agora, estão todos presentes. `audio.config.json` (voz-guia/alvo por curso) **é** rastreado pelo Git — não está fora do repo. |

---

## 4. Os 4 `deploy.sh` — NÃO são idênticos

SHA-256 de cada um:
```
curso-espanha:    53f633b9c6198d220bd25c10d3cd5e853fdd2cd039425cf50a955cf0de52845e
curso-espanha-de: d02e2147d2ac3bc3bd51a53ed0f61a9d7660a3bf4fbd1430e26358d86373ffd3
curso-espanha-fr: 0cc0ebf55b97bf5c8309dc8657e9fa5824e7c7115e4970f0ace178ef8efda533
curso-espanha-it: 637c0a66035cbf791b66c03750d6879377e2418136074f0b442fbe56180038ae
```
**Quatro hashes diferentes — divergência real, não só o `BASE_PATH`.** Dois padrões distintos coexistem:

**Padrão A — só `curso-espanha` (EN).** Recria o branch `gh-pages` como árvore órfã a cada deploy (`git worktree add --orphan`) e faz `git push --force origin HEAD:gh-pages`. Nunca acumula histórico. Já commitado desde `33af27a` (bem antes desta sessão) e comprovadamente testado — `gh-pages` remoto do EN tem exatamente **1 commit**. Trecho relevante:
```bash
BASE=/curso-espanha
echo "→ build com BASE_PATH=$BASE"
MSYS_NO_PATHCONV=1 BASE_PATH=$BASE npm run build
grep -q "assets: \"$BASE\"" build/index.html || { echo "ABORTADO: base path ausente no build"; exit 1; }

WT=/d/tmp/ce-wt
rm -rf "$WT"
git worktree add --orphan -b gh-pages-novo "$WT"
(
  cd "$WT"
  find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
  cp -r "$OLDPWD/build/." .
  touch .nojekyll
  git config core.autocrlf false
  rm -f .git/index.lock 2>/dev/null || true
  git add -A
  git -c user.name='aleapc' -c user.email='aleapc@gmail.com' \
    commit -q -m "deploy $(date '+%Y-%m-%d %H:%M')"
  git push --force origin HEAD:gh-pages
)
git worktree remove --force "$WT" 2>/dev/null || git worktree prune
git branch -D gh-pages-novo 2>/dev/null || true
echo "✓ Publicado em https://aleapc.github.io$BASE/ (gh-pages recriado, sem inchar o histórico)"
```

**Padrão B — `curso-espanha-de`, `curso-espanha-fr`, `curso-espanha-it`.** Reusa/estende o `gh-pages` existente (`git fetch origin gh-pages` + `git worktree add -f -B gh-pages "$WT" origin/gh-pages`), ou cria órfão só no PRIMEIRO deploy (FR e IT têm o branch `if git ls-remote --exit-code --heads origin gh-pages`; DE não tem esse branch condicional, presume-se que o `gh-pages` dele já existia quando esse script foi escrito). Cada deploy soma um commit — por isso DE está em 4 commits e FR em 3. Trecho relevante (variação FR/IT, com a checagem de primeiro deploy):
```bash
echo "→ build com BASE_PATH=/curso-espanha-fr"
MSYS_NO_PATHCONV=1 BASE_PATH=/curso-espanha-fr npm run build
grep -q 'assets: "/curso-espanha-fr"' build/index.html || { echo "ABORTADO: base path ausente no build"; exit 1; }
WT=/d/tmp/cd-wt
if git ls-remote --exit-code --heads origin gh-pages >/dev/null 2>&1; then
  git fetch origin gh-pages
  git worktree add -f -B gh-pages "$WT" origin/gh-pages
else
  echo "→ primeiro deploy: criando a branch gh-pages órfã"
  git worktree add -f "$WT" HEAD
  git -C "$WT" checkout --orphan gh-pages
fi
( cd "$WT"
  find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
  cp -r "$OLDPWD/build/." .
  touch .nojekyll
  git add -A
  git -c user.name='aleapc' -c user.email='aleapc@gmail.com' commit -q -m "deploy $(date '+%Y-%m-%d %H:%M')" --allow-empty
  git push origin gh-pages )
echo "✓ Publicado em https://aleapc.github.io/curso-espanha-fr/"
```
**Nota importante:** DE, FR e IT usam **o mesmo nome de worktree** (`/d/tmp/cd-wt`) — por isso os deploys desses três **têm que rodar em série**, nunca em paralelo (um apaga/reusa o diretório do outro). O EN usa um nome diferente (`ce-wt`) e por isso pode correr em paralelo com qualquer um dos outros três.

**Isto não é um bloqueio** — os 3 deploys em Padrão B funcionam, só acumulam histórico no `gh-pages` (não no `main`, que é o que importa pro código-fonte) a cada publicação. Normalizar os 3 para o Padrão A do EN é uma limpeza válida, não urgente.

---

## 5. Referências para a rota `/bolso`

Os dois arquivos existem, confirmado agora:
- `D:\dev\_projects\guia-uruguai-pwa\src\routes\bolso\+page.svelte` — 199 linhas.
- `D:\dev\_projects\guia-uruguai-pwa\src\lib\usefulInfo.ts` — 124 linhas.

### O que portar
Do `+page.svelte`: a **lógica do conversor tri-direcional** — o padrão de estado (`usd` como fonte da verdade interna, os outros dois campos derivados), a função `parse()` (tolera "1.000,00" pt-BR e "1,000.00" en-US), o padrão `editing` (não reformata o campo que está sendo digitado, só ao perder o foco), e a persistência das taxas em `localStorage` com `loadNum()`. Essa lógica é **genérica** — não depende de UYU/BRL, só precisa trocar os pares de moeda.

Para o ¡Dime!, o pivô muda: nos guias é USD; aqui a moeda **fixa** é `curso.destCurrency` (EUR) e as editáveis são `curso.homeCurrencies` (`['GBP','USD']` no EN; `[]` em DE/FR/IT — nesse caso não mostrar o conversor, só a nota "mesma moeda").

### O que NÃO portar
- **A trilha de `phrases`** (o phrasebook PT→ES do guia). O ¡Dime! **já é** um phrasebook — com áudio, o `/kit` — portar essa lista seria duplicar pior o que o produto já faz melhor. (Esta é a mesma conclusão já registrada em `HANDOFF-CODEX.md` §3.)
- **Os dados específicos de Montevidéu** do `usefulInfo.ts` (hospitais, farmácias, câmbio, consulado brasileiro, `emergencyNumbers` 911/104/105/109) — são do Uruguai, não da Espanha. **Nenhum dado da Espanha equivalente existe nesse arquivo** — precisa ser escrito do zero (número de emergência da UE é **112**, que não aparece em nenhum dos dois arquivos do Uruguai — é conhecimento externo, não um dado a copiar).
- **O componente `TopBar`** (importado no `+page.svelte` do guia) — é específico da estrutura de layout do guia, o ¡Dime! tem o seu próprio header (`+layout.svelte`, já editado nesta sessão).
- **As classes de cor** (`deep/70`, `teal`, etc.) — são os tokens de tema do guia. O ¡Dime! usa outro conjunto (`terracota`, `carvao`, `creme`, `salvia` — ver `tailwind.config`). Reaplicar visualmente com os tokens certos, não copiar as classes cruas.

### Dependências que esses trechos usam
`$app/environment` (`browser`), Svelte 5 runes (`$state`, `$effect`) — ambos já presentes no ¡Dime!, sem novidade de dependência.

### Arquivo adicional indispensável que falta
**Não existe, em nenhum dos dois arquivos, uma fonte pronta para**: tipo de tomada/voltagem (Espanha = C/F, 230V), o número **112**, ou as 2-3 linhas de água/gorjeta/IVA da Espanha. Isso precisa ser **escrito**, não portado — é conteúdo novo, pequeno, sem arquivo de referência no disco.

---

## 6. Riscos e pendências NÃO registrados nos dois handoffs anteriores

1. **`curso-espanha-it`: commit `88cdbfe` nunca foi enviado ao GitHub** (ver §1 e BLOQUEIOS REAIS). Descoberto agora, não estava nos handoffs anteriores porque eles foram escritos antes desta verificação `git fetch` + `git log origin/main..HEAD`.
2. **`curso-espanha-it`: `static/audio/manifest.json` modificado sem commit**, mesmo conteúdo reordenado (não é perda de dados, mas está pendente de decisão — commitar ou descartar).
3. **Os 4 `deploy.sh` divergiram em estratégia** (Padrão A vs B, ver §4) — não documentado antes; não é bloqueio, mas quem for tocar o script de deploy de qualquer um dos 4 repos deve saber que não são intercambiáveis linha a linha.
4. **`+page.svelte` e `+layout.svelte` do `curso-espanha` referenciam `/bolso/`, rota que não existe** — link morto até a rota ser criada. Isso está implícito no HANDOFF-CODEX.md (que já dizia "a rota ainda não existe"), mas o detalhe de que o link **já está no ar apontando pra ela** (nas mudanças não commitadas) é novo.
5. **Máquina: Norton 360 com um serviço interno instável** (`nllToolsSvc.exe`, componente "Norton Tools") — crashando de forma intermitente (confirmado via Event Viewer, eventos 7031/7034 do Service Control Manager), causando falha ao abrir o Microsoft Word nesta sessão. **Não afeta git/npm/node/build/deploy** (todos testados e funcionando normalmente durante esta mesma janela de tempo) — é um problema isolado do Office/Norton, não do projeto. Registrado aqui só porque é um estado real da máquina que outro agente rodando aqui pode encontrar.
6. **Não há processo em background tocando estes repositórios agora.** Verificado: nenhum `node`/`npm`/`vite` outros que os desta inspeção estavam correndo; nenhum `git status` mudou entre o início e o fim desta tarefa.

---

## 7. Último commit comprovadamente funcional (rollback point) por curso

Critério: commit que já foi **verificado ao vivo** (build com portões verde + conteúdo confirmado por `curl`/inspeção de DOM pós-hidratação no site publicado), não só "committed".

| Curso | Commit de rollback | Está em `origin/main`? |
|---|---|---|
| `curso-espanha` (EN) | `3759d30c65987ce066e776d4f7c367e9716b1a9f` | ✅ Sim (é o próprio `origin/main` atual) |
| `curso-espanha-de` (DE) | `82b766bca5032fd5004f4bfa100fdf58039e90a8` | ✅ Sim |
| `curso-espanha-fr` (FR) | `c7d8dc83b141e400bce6ad78f3a938d7010cb406` | ✅ Sim |
| `curso-espanha-it` (IT) | `88cdbfe05f8312e0d0333b19ff9e425a48fabba1` | ❌ **Não** — só existe localmente. Rollback via GitHub cairia em `2c52002` (versão SEM a estrutura de jornada). Rollback local (`git reset --hard 88cdbfe` dentro do clone desta máquina) funciona normalmente. |
| `kit-de-bordo-mapa` | `1bd95787929b12408cd6f9d5305a4189197cc876` | ✅ Sim |

Para reverter o site publicado de qualquer curso ao estado do commit acima: `git checkout <hash>`, depois `bash deploy.sh` (rebuilda e republica do zero).

---

## 8. Comandos exatos

Trocar `curso-espanha` pelo repo desejado (`curso-espanha-de`, `-fr`, `-it`) em qualquer comando abaixo.

**Instalar dependências** (só necessário se `node_modules` não existir ou o lockfile mudar — hoje já está instalado nos 4):
```bash
cd D:/dev/_projects/curso-espanha
npm ci
```

**Iniciar ambiente local:**
```bash
cd D:/dev/_projects/curso-espanha
npm run dev
```

**Executar todos os validadores** (os mesmos que rodam no `prebuild`, isolados):
```bash
cd D:/dev/_projects/curso-espanha
npm run outline:conferir
npm run estrutura:estrito
npm run audio:check
npm run tom
```

**Gerar o build** (roda `prebuild` automaticamente, então já inclui os validadores acima):
```bash
cd D:/dev/_projects/curso-espanha
MSYS_NO_PATHCONV=1 BASE_PATH=/curso-espanha npm run build
```
(troque `/curso-espanha` pelo path certo: `/curso-espanha-de`, `/curso-espanha-fr`, `/curso-espanha-it`)

**Publicar:**
```bash
cd D:/dev/_projects/curso-espanha
bash deploy.sh
```
⚠️ Para DE/FR/IT, que compartilham o worktree `/d/tmp/cd-wt`: rodar **um de cada vez**, nunca em paralelo. O EN (worktree `/d/tmp/ce-wt`) pode rodar junto com qualquer um dos outros.

**Verificar o conteúdo publicado** (cache-buster + grep pelo texto esperado):
```bash
curl -s "https://aleapc.github.io/curso-espanha/?cb=$(date +%s)" | grep -o "TEXTO_ESPERADO_AQUI"
```

**Verificar no navegador que os cards continuam presentes depois da hidratação** (o teste que pegou o bug histórico de id duplicado — ver HANDOFF-CODEX.md §6): abrir uma folha do `/kit` que tenha cards (ex. `/kit/taxi/destino/` no IT) com um browser real, esperar o JS carregar, e contar elementos `<article>` no DOM **depois** da hidratação — não só olhar o HTML de origem (`view-source`/`curl`, que é SSR e sempre mostra os cards mesmo quando o cliente vai renderizar vazio). Com as ferramentas de browser desta sessão, isso foi feito assim:
```js
document.querySelectorAll('article').length
```
executado via JS no console do navegador, na URL da folha, depois de aguardar o carregamento completo. O número deve ser igual ao número de cards que a folha deveria ter (visível também no HTML de origem via `curl`, para comparação).

---

## 9. O patch

Gerado em `D:\dev\_projects\curso-espanha\curso-espanha-wip.patch` (na raiz do repo, como pedido). Contém as 5 alterações do §2 (4 modificações + 1 arquivo novo), no formato de saída padrão do `git diff` (unified diff, compatível com `git apply`).

**Validado nesta tarefa:** aplicado com sucesso (`git apply --check` e `git apply`) sobre um clone limpo no commit `3309294` (o HEAD atual). O conteúdo resultante foi comparado (`diff -b`, ignorando fim-de-linha) contra os arquivos reais do working tree — **idêntico nos 5 arquivos**. SHA-256 do patch: `ec0cb3883acafffe339005aed0b6928028880b31626f2bbcacca5f186fa600b5`.

Para reaplicar em outro clone limpo (a partir do commit `3309294` ou qualquer ancestral compatível):
```bash
cd /caminho/do/clone/limpo
git checkout 3309294   # ou o commit mais recente disponível
cp /caminho/para/curso-espanha-wip.patch .
git apply curso-espanha-wip.patch
```

---

## BLOQUEIOS REAIS

Só itens que impedem outro agente de continuar imediatamente — não recomendações.

1. **`curso-espanha-it`: o commit `88cdbfe` (a mudança de estrutura de jornada) existe só nesta máquina — nunca foi enviado ao GitHub.** Se outro agente clonar `aleapc/curso-espanha-it` do GitHub para trabalhar, vai receber o código **sem** a estrutura de jornada (`origin/main` = `2c52002`), divergente do que está publicado no site ao vivo (que reflete `88cdbfe`, build local). **Ação necessária antes de qualquer trabalho novo no IT a partir de um clone fresco:** `git push origin main` nesta máquina primeiro, ou o próximo agente precisa trabalhar a partir desta mesma máquina/working tree, não de um clone novo.

2. **A rota `/bolso` não existe, mas já é referenciada por dois links não commitados** (`src/routes/+layout.svelte` e `+page.svelte` do `curso-espanha`). Se essas mudanças forem commitadas e publicadas como estão, o link fica morto (404) em produção. **Ação necessária:** criar `src/routes/bolso/+page.svelte` (+ `+page.ts`) antes de comitar/publicar essas mudanças, ou remover os links temporariamente.

3. **O `curso.config.ts` só existe no `curso-espanha` (EN).** Os componentes editados (`+layout.svelte`, `+page.svelte`) importam dele. Esse arquivo **não foi replicado** para `curso-espanha-de`, `-fr`, `-it` — se as mesmas edições de header/home forem copiadas para esses 3 repos sem criar o `curso.config.ts` correspondente (com `homeCurrencies: []` e `translatorPair` certo para cada), o build desses 3 vai falhar por import não resolvido.
