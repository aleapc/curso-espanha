#!/usr/bin/env bash
# Deploy do ¡Dime! pro GitHub Pages (aleapc.github.io/curso-espanha).
# Usa WORKTREE em D:/tmp (objetos ficam no git-dir do AppData — git.exe é
# bloqueado de escrever object DB em D:; um clone puro falha, worktree não).
# Rode com o Bash tool:  bash deploy.sh
set -e
cd "$(dirname "$0")"
echo "→ build com BASE_PATH=/curso-espanha"
MSYS_NO_PATHCONV=1 BASE_PATH=/curso-espanha npm run build
grep -q 'assets: "/curso-espanha"' build/index.html || { echo "ABORTADO: base path ausente no build"; exit 1; }
WT=/d/tmp/ce-wt
git fetch origin gh-pages
git worktree remove --force "$WT" 2>/dev/null || true
git worktree prune
git worktree add -f -B gh-pages "$WT" origin/gh-pages
( cd "$WT"
  find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
  cp -r "$OLDPWD/build/." .
  touch .nojekyll
  git add -A
  git -c user.name='aleapc' -c user.email='aleapc@gmail.com' commit -q -m "deploy $(date '+%Y-%m-%d %H:%M')" --allow-empty
  git push origin gh-pages )
git worktree remove --force "$WT" 2>/dev/null || git worktree prune
echo "✓ Publicado em https://aleapc.github.io/curso-espanha/"
