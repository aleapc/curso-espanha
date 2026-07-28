# Briefing do autor de parte — ¡Dime! (EN → Espanha)

> Este arquivo vai **junto** com toda tarefa de escrita de episódio. Não substitui o `PRODUTO.md`: é o extrato operacional dele, na ordem em que se usa ao escrever. Em conflito, o `PRODUTO.md` vence.

## Primeiro comando, antes de qualquer leitura

```bash
npm run briefing B16
```

Ele imprime, **derivado do roster**, de quais moldes o seu slot é CASA, quais ele
REDISPARA e quais ele ensina sem declarar. Use a saída dele, não uma lista que
alguém digitou no pedido.

**Por que isto é o primeiro passo.** Ao despachar as ondas 2 e 3 eu digitei a
lista de moldes de cada parte à mão e ela divergiu do roster: o autor do B09 foi
mandado redisparar três moldes quando o roster prometia quatro, e o do B16 ficou
sem dois. Os autores fizeram exatamente o que foi pedido, e o portão G9c derrubou
a build por quatro promessas quebradas. É a mesma doença que já apareceu no
rótulo de consumo, no id de molde e no título do índice — **duas canônicas para a
mesma informação** — desta vez no processo, não no código. Quem despacha uma onda
cola a saída deste comando; quem escreve a parte confere contra ela.

## Antes de escrever, leia nesta ordem

1. `docs/PRODUTO.md` — a lei. Sobretudo §2 (o filtro), §3 (a espinha), §4 (o template de uma parte) e §9 (os anti-padrões).
2. `docs/GRADE-36-ESPANHA.md` — a linha do **seu** slot: o que ele cobre, a origem, os moldes e a cápsula cultural.
3. `src/lib/course/slots.json` — a função canônica do slot, e de quem ele é (`par` ou `destino`).
4. `src/lib/course/moldes.json` — se o seu slot é **casa** de um molde, é ali que está a forma, o encaixe e os exemplos que você tem que fazer o aluno produzir.
5. `docs/pesquisa-espanha.md` — os fatos do destino. **Nada que não esteja lá ou numa fonte citada vira áudio.**
6. `src/lib/course/ep-e08a.json` — **o modelo de moldura upbeat.** É o melhor exemplar do acervo: uma parte sobre adoecer que abre como boa notícia. Leia antes de escrever qualquer parte que toque em risco.

## O que o seu arquivo tem que declarar

```jsonc
{
  "slot": "B12",              // canônico; sem isto o build quebra
  "nivel": "basico",          // tem que bater com o módulo do slot
  "moldura": "ganha",         // ou "protege" — e o script confere contra o título
  "permissao": "…",           // o que o aluno PODE fazer; obrigatório em M2/M3 e nas partes culturais de M1
  "steps": [ { "tipo": "…", "tom": "ganha|protege", "molde": "M1", … } ]
}
```

## As sete réguas que quebram o build

| # | Régua | O número |
|---|---|---|
| **G1** | A moldura que você declara tem que bater com o que o título diz | curso ≤6/36 · M1 ≤4/18 |
| **G2** | Saldo apetitivo: steps de ganho ÷ steps de proteção | ≥2:1 em M2/M3 · ≥1:1 em M1 |
| **G3** | O aluno **fala** | ≥4 `responde` por parte, média ≥8 em M1/M2 |
| **G4** | **Anti-palestra** — as duas metades | média ≤120 chars/clipe **e** nenhum clipe >320 |
| **G5** | Toda proibição vem com uma permissão | `permissao` não vazio |
| **G6** | Zero adjetivo de povo | 0 ocorrências de "os espanhóis são…" |
| **G9** | Taxa de geração por molde declarado | ≥45% no SKU · ≥50% em M1 |
| **G9d** | A CASA vem antes de todo redisparo | slot anterior à casa não é redisparo — é **prévia** |

## As armadilhas específicas deste curso

**O G4 é a régua que você mais vai violar.** A linha de base medida do ¡Dime! é **578 caracteres por clipe de narração com 94% dos clipes acima do teto** — o maior tem 1.914, quase dois minutos de guia falando sem o aluno abrir a boca. Escreva a narração como quem fala com alguém de pé numa calçada, não como quem escreve um parágrafo. Se um clipe não cabe em 120 caracteres, ele provavelmente é dois clipes com um `responde` no meio.

**O molde se ensina em quatro tempos, e eles são obrigatórios:** nomear o molde → nomear a peça que troca → **trocar na frente do aluno** → mandar o aluno trocar num `responde`. Um molde apresentado e não trocado é um molde desperdiçado — o aluno decora a frase e não monta a seguinte.

**Redisparo e prévia não são a mesma coisa, e o comando acima diz qual é a sua.** Redisparo é o molde VOLTANDO: encaixe novo, sem reapresentação, e a casa dele já ficou para trás. **Prévia** é o molde APARECENDO antes da casa — legítimo, e às vezes é a melhor coisa que a parte faz — mas obedece a três regras: frase inteira (nada de mandar trocar peça), **modelo nativo em `ouvir` antes do `responde`** (sem isso o aluno produz uma forma que ninguém disse, que é o erro nº 1 das ondas 1 a 4), e nenhuma linha dizendo que ele «já tem» a peça. Do outro lado: se o seu slot é a **casa**, a narração não pode apresentar o molde como novidade se ele já teve prévia — o G9d nasceu de `b14-n31` fazendo exatamente isso.

**R-B: o `promptPt` não pode conter a palavra do encaixe.** Se o prompt diz "peça um café", o aluno traduz em vez de escolher. Diga a cena ("você está no balcão e quer aquilo que todo mundo está bebendo"), não a resposta.

**R-E: proibido anunciar a troca.** Nada de "agora vamos praticar a substituição". O aluno sente o poder do molde trocando, não sendo avisado de que vai trocar.

**Título nomeia CENA, nunca categoria gramatical.** "O passado", "Os pronomes", "O subjuntivo" quebram o build literalmente.

**Cultura é comportamento com consequência, mais a permissão junto da proibição.** Nunca "eles valorizam a harmonia". A ficha tem seis campos e um deles é **onde a regra NÃO vale** — sem ele vira lei sobre um povo, e o G7 barra.

**Todo card de consulta é uma TROCA, não uma fala.** O phrasebook dá a sua frase e te abandona. Nós damos: você diz X → ouve Y → responde Z. O `ouve` é o produto.

## O que já está resolvido e você não deve reabrir

- `Quería` é a casa de **B12**, não B09 — a copy do bloco já está escrita.
- `Me gustaría` está **cortado e nomeado**: acolchoamento de livro didático que deixa o britânico sem ser servido.
- Subjuntivo em subordinada está **fora**, e `¿Hay + [X]?` existe literalmente para absorvê-lo.
- O teto de **12 moldes declarados é lei** — não declare um décimo terceiro para melhorar o G9.
