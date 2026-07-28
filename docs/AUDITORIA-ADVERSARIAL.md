# Auditoria adversarial da spec e da grade — 2026-07-27

> Os 23 achados que impediram a v1 de virar lei. Mantido porque **documentar o erro é o que impede a recaída**: metade deles é a spec afirmando como FATO coisas que o repositório desmente, que é exatamente o modo de falha que os portões existem para pegar.

## 1
FATO FALSO 1 — PRODUTO §5.1 e INV-14 mandam declarar os moldes em `src/lib/course/nucleo.ts`. Esse arquivo NÃO existe. O que existe, escrito hoje às 12:39, é `src/lib/course/moldes.json` (v1, 12 moldes, com casa/redisparos/tiles) e é ele que `valida-tom.mjs` lê no G9. A grade (Onda 0) manda escrever o nucleo.ts inexistente — se um agente obedecer, o curso passa a ter dois rosters de molde e o G9 lê o errado.

## 2
FATO FALSO 2 — PRODUTO §8 chama o lint de `scripts/lint-tom.mjs`. O arquivo real é `scripts/valida-tom.mjs` (21 KB, `npm run tom`), e ele JÁ implementa G1–G9. A grade manda 'escrever scripts/lint-tom.mjs com G1–G12' como se não existisse nada.

## 3
FATO FALSO 3 — PRODUTO §8 afirma duas vezes que os validadores rodam no `prebuild` e 'falham o build'. Não há `prebuild` no package.json: nem `valida-estrutura.mjs` nem `valida-tom.mjs` rodam em build nenhum. A lei mais importante do documento ('CI vermelho sobrevive, opinião não') é hoje literalmente inexecutável.

## 4
PORTÕES DECLARADOS E NÃO IMPLEMENTADOS — G10 (encaixe do mundo), G11 (whitelist de formas verbais) e G12 (núcleo receptivo) não existem no script. G4 implementa só a média ≤120; o teto individual de 320 caracteres — que PRODUTO chama de 'a segunda metade não é opcional' — não está escrito. `--outline` não roda sobre `course/index.ts` (roda sobre os `ep-*.json`, e `index.ts` não tem campo `moldura`), logo o gate da fase de syllabus descrito no §8 não existe.

## 5
ONDA 0 DA GRADE ESTÁ OBSOLETA E, SE EXECUTADA AO PÉ DA LETRA, QUEBRA O REPO — ela manda 'acrescentar o campo slot aos 24 ep-*.json'. Já está feito: 15 arquivos declaram `slot` e 9 declaram `dissolveEm` (os que se repartem). Dar um `slot` único a um arquivo que se divide (e03c → B11+B14) dispara o erro 'slot preenchido DUAS vezes'. Também manda escrever `src/lib/consulta/taxonomia.ts`, que já existe com os 12 tiles.

## 6
PÔR `valida-estrutura.mjs` NO PREBUILD NA ONDA 0 DEIXA O BUILD VERMELHO POR TRÊS ONDAS — ME VIRO é `travado: true` e hoje tem 5 slots vazios (B06, B08, B10, B15, B18). O validador acusa 'faltam N slots' e sai 1 até a Onda 3 terminar. Falta o modo escalonado (`--estrito`), que a versão corrigida introduz.

## 7
CONTRADIÇÃO COM O ÚNICO ARQUIVO DE MOLDES QUE EXISTE — a grade adota CASA de `Quería` = B12; `moldes.json` diz `"casa": "B09"` e nem lista B12 nos redisparos. A grade 'resolve' o conflito em prosa e deixa o arquivo executável contradizendo a decisão. (A decisão B12 está certa — a copy já escrita usa audioKeys `e03b-*` e `ep-e03b` É o B12, que é o slot dono=par — mas exige editar `moldes.json`, e isso não estava em lugar nenhum.)

## 8
ROSTER DE MOLDES INCONSISTENTE EM TRÊS LUGARES — a grade declara 12 = 8 principais + Otra/Otro + Ya está + Soy/Estoy + `Me he dejado`; `moldes.json` declara 12 com `¿Tengo que + [inf]?` DENTRO e `Me he dejado` FORA; e a própria grade se contradiz: a linha B09 declara `¿Tengo que?` como 'T2 (CASA)' enquanto o §8.6 o lista entre os quatro que ficam de fora da declaração.

## 9
A LEI 'M2 NÃO INTRODUZ MOLDE NENHUM' É VIOLADA TRÊS VEZES PELO PRIMEIRO SKU — I07 planta o molde de APRECIAÇÃO, I03 o de ESCOLHA e I05 o de PREFERÊNCIA, e a coluna 'moldes' das três linhas escreve '0 novos' na mesma célula em que nomeia o molde novo. Uma lei que a primeira implementação quebra em três partes não é lei: ou some ou ganha exceção nomeada (a versão corrigida cria a exceção fechada dos 3 moldes SOCIAIS e sobe o teto para 12 operacionais + 3 sociais).

## 10
MATERIAL BOM PERDIDO — NUCLEO §7.4 ranqueia os quatro moldes ausentes prioritários: 1º apreciação, 2º escolha, 3º grau, 4º COMBINAR (`¿nos vemos a las ocho en la plaza?`), e diz textualmente que sem COMBINAR 'I05 e I08 não fecham: o aluno entende o convite e não consegue marcar'. A grade entrega os dois primeiros e some com os dois últimos sem uma linha de justificativa — e o I08 dela, de fato, não tem como marcar nada. (GRAU é legitimamente descartável na Espanha por NUCLEO §1.5 — cozinha não apimentada — mas isso precisa estar escrito.)

## 11
A TRAVA R2 SUMIU DO PRODUTO — ARQUITETURA §1.3 tinha cinco travas; a R5 foi revogada com razão, mas R1–R4 foram absorvidas sem nome e a R2 ('toda parte de M2 se prende a uma decisão com dinheiro ou tempo em jogo; sem essa trava M2 vira conversação') desapareceu. É exatamente a trava que I05 e I06 da grade precisam para não virarem aula de conversação.

## 12
O MODO CONSULTA FOI PERDIDO — o PRODUTO diz que 'substitui integralmente ARQUITETURA-V2.md' e não traz o §4 dela: os 12 tiles com ids IDÊNTICOS em todos os SKUs (que é literalmente a uniformidade que o dono pediu, e o ativo de cross-sell), o princípio da TROCA, os números de governança e o comportamento por data do voo. Sobraram só migalhas no G8. `src/lib/consulta/taxonomia.ts` já existe e não é citado.

## 13
ARITMÉTICA DE PARTES ERRADA — §3.1 diz 'Piso 36, teto 38' e §3.3 permite até 4 partes de extensão. 36 + 2 (M3 até 10) + 4 = 42, não 38. Um SKU como o japonês, que a própria spec diz ativar 3 extensões, já estoura o teto publicado.

## 14
A CONTA DE NARRAÇÃO ESTÁ ERRADA — a grade diz 'narração = 72% do custo (159.528 chars × 0,5 = 79.764)'. Medido agora: a voz-guia inclui também os 175 prompts de `responde`, e o total é 462 clipes / 188.595 chars / 94.298 créditos = 85,6% dos 110.160. A língua-alvo inteira custa 15.862 (14,4%). Consequência: reescrever narração custa mais do que a grade orça, e as derivações de 2.686 / 1.880 / 900 cr não fecham entre si (1.880 é 70% de 2.686, não 72%; 900 não é 35% de 1.880).

## 15
A CAMADA DE QUIZ É INVISÍVEL NOS DOIS ARTEFATOS — existem 11 `quiz-ep-*.json` indexados pela numeração antiga (`quiz-ep-e01`…`quiz-ep-c03`) que a grade extingue, valendo 158 clipes e 7.658 créditos (7% do SKU). O PRODUTO declara leitura obrigatória 'de quem produza episódio, syllabus, QUIZ…' e depois nunca define o que é um quiz; a grade cita 'quiz visual' em B10 e 'quiz é briga ou carinho?' em A02 sem mapear nem orçar nada. Zero crédito previsto, zero regra de re-corte.

## 16
NÚMEROS DE MEDIÇÃO A CORRIGIR — 'geração G9 23% → ~50%': hoje é 0% medido (nenhum step declara `molde`), e 23% não existe em nenhuma medição. 'moldura 46%': 46% é a leitura humana registrada (11/24), o script mede 42% (10/24) hoje. '159.528 chars' → 159.585. '938 clipes / 213 MB / ~330 alvos = 10,5 MB de 213 MB — 95% dos bytes': medido, 938 jobs (940 mp3 em disco, 2 órfãos), narração 462 clipes/193,7 MB (92,3%), língua-alvo 476 clipes/16,1 MB. E '578 chars/clipe' (intro+recap, que é o que o G4 mede) não é a mesma régua que os '218' do dossiê anterior (média sobre os 938 clipes) — a grade mistura as duas sem nomear.

## 17
ERRO DE FATO SOBRE O ELENCO — a grade diz que 'o ear module usa Emilio tanto como modelo de Madri quanto como voz do sul'. Medido em `ep-e01c`: CARMEN é Madri e EMILIO é o sul — e o problema é justamente que Emilio é, ao mesmo tempo, o modelo masculino padrão dos outros 23 episódios (235 clipes). Além disso a 5ª voz já tem nome no syllabus: 'Rocío (Sevilha) só no ear module, nunca como modelo'.

## 18
CITAÇÕES QUEBRADAS — a grade cita 'régua §6.2, pureza do modelo' e 'régua §6.10' (prefers-reduced-motion). O §6 do ARQUITETURA vai só até 6.5 e o §6.2 é 'O índice por situação — build, não runtime'. As fontes reais são `syllabus-espanha.md` linha 9 e o próprio `GestoRitmo.svelte` linha 57.

## 19
'QUATRO SLOTS DE M1 FICAM VAZIOS' — o validador diz cinco (B06, B08, B10, B15, B18). B15 tem material de origem (metade de e05b), então a conclusão de +3 partes e +8.000 créditos sobrevive, mas a premissa como está escrita é falsa e o próximo agente vai conferir.

## 20
DUAS CANÔNICAS PARA A MESMA STRING — PRODUTO §3.1 dá o rótulo de consumo de M2 como 'No caminho'; `slots.json` v2.0.0 grava `"consumo": "o voo e os 2 primeiros dias"`. Nenhum script confere, e slots.json só pode ser editado com bump de versão e re-validação dos 4 cursos.

## 21
LEIS SEM TESTE (as que serão violadas) — 'toda parte nomeia uma cena' (não há campo `cena`), 'a ordem é lei: cena → produção → regra', R-B (o prompt não pode conter a palavra do encaixe), R-E ('verificado por regex' — não está), vocabulário de molde estável (PT 'molde' / EN 'the frame'), 'a voz-guia nunca fala a língua-alvo', 'romanização nunca vai ao TTS', 'o aquecimento do gesto em TODA parte' (hoje só 11 steps do corpus inteiro têm campo `gesto`), '≥1 frase de piso por módulo'. E a maior: não existe validade para fato datado — EES, ETIAS, ZBE, €14,20, contactless — num produto cuja própria pesquisa mantém tabela de risco de obsolescência.

## 22
HIGIENE DE ARQUIVO — o PRODUTO manda ler 'as versões anteriores de ARQUITETURA-V2.md e NUCLEO-GERADOR.md' como material de trabalho, mas elas agora existem em DUAS cópias e em nenhum dos caminhos citados: `docs/ARQUITETURA-V2.md.removido` e `docs/_superado/ARQUITETURA-V2.md`. Escolher uma e apagar a outra, e citar o caminho certo.

## 23
SINAL DE RECAÍDA (leve, mas é o anti-padrão 2) — a grade descreve I06 como 'O SLOT LACRADO do passado'. O conteúdo está certo (três formas fixas, proibido abrir), mas rotular um slot pelo nome do paradigma é exatamente o que fez o agente anterior escrever um episódio de passado. Reescrito na versão corrigida.