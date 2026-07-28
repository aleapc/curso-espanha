#!/usr/bin/env bash
# Deploy do ¡Dime! EN pro GitHub Pages (aleapc.github.io/curso-espanha).
# Rode com o Bash tool:  bash deploy.sh
#
# HISTÓRICO RASO, de propósito. O gh-pages carrega ~250 MB de áudio, e um deploy
# que EMPILHA commits fez o repositório chegar a 393 MB — cada publicação somava
# outra cópia do áudio ao histórico. Aqui cada deploy RECRIA o branch com um
# commit único (árvore órfã) e faz push --force: o gh-pages nunca guarda mais que
# uma versão do site. O que se perde é o histórico de deploys (que ninguém
# consulta); o fonte, esse sim versionado, vive no branch main.
#
# NOTA sobre o mito do Norton: durante muito tempo se acreditou que "git.exe é
# bloqueado de escrever em D:". É FALSO — o que travava era o git-dir caindo num
# AppData redirecionado pelo sandbox do app, e um index.lock órfão. Com o git-dir
# dentro do projeto, git escreve em D: sem problema. O worktree em D:/tmp continua
# sendo a escolha certa, mas por velocidade de I/O, não por bloqueio.
set -e
cd "$(dirname "$0")"

BASE=/curso-espanha
echo "→ build com BASE_PATH=$BASE"
MSYS_NO_PATHCONV=1 BASE_PATH=$BASE npm run build
grep -q "assets: \"$BASE\"" build/index.html || { echo "ABORTADO: base path ausente no build"; exit 1; }

WT=/d/tmp/ce-wt
git worktree remove --force "$WT" 2>/dev/null || true
git worktree prune
rm -rf "$WT"

# Árvore órfã: um branch gh-pages novo a cada deploy, sem herdar o histórico.
git worktree add --orphan -b gh-pages-novo "$WT"
(
  cd "$WT"
  cp -r "$OLDPWD/build/." .
  touch .nojekyll
  git config core.autocrlf false
  rm -f .git/index.lock 2>/dev/null || true   # resíduo de um deploy interrompido
  git add -A
  git -c user.name='aleapc' -c user.email='aleapc@gmail.com' \
    commit -q -m "deploy $(date '+%Y-%m-%d %H:%M')"
  git push --force origin HEAD:gh-pages
)
git worktree remove --force "$WT" 2>/dev/null || git worktree prune
git branch -D gh-pages-novo 2>/dev/null || true
echo "✓ Publicado em https://aleapc.github.io$BASE/ (gh-pages recriado, sem inchar o histórico)"
