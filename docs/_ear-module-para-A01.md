# O EAR MODULE, extraído de `ep-e01c.json` — matéria-prima de A01

> **Por que este arquivo existe.** A Onda 1 reescreveu `ep-e01c.json` como **B03** (a casa do molde
> `¿Me puede + [X]?`). O *ear module* que estava enterrado ali **sai** do Básico e vira **A01 inteiro**
> (`GRADE-36-ESPANHA.md` §1 e §2). Se ele saísse sem ficar escrito em lugar nenhum, o autor de A01
> teria de reconstruí-lo do zero — e, pior, teria de **regravar clipes que já existem em mp3**.
> Isto aqui é o conteúdo removido, verbatim, com as chaves de áudio.
>
> **Estado:** matéria-prima, não roteiro. **Não é spec.** Em conflito com `PRODUTO.md`,
> `GRADE-36-ESPANHA.md` ou `SCHEMA-EPISODIO.md`, esses vencem.
> **Data da extração:** 2026-07-27 · **Origem:** `src/lib/course/ep-e01c.json`, versão anterior à reescrita de B03.

---

## 1. ⚠️ Não apague estes mp3

A partir da reescrita de B03, estas chaves **deixam de ser referenciadas por qualquer `ep-*.json`** e
`scripts/valida-audio.mjs` passa a listá-las como **órfãs**. Isso é esperado e é **avisado, não é erro**.
**Não apague nenhuma delas até A01 estar escrito**, porque são gravações prontas que A01 vai reusar:

```
e01c-09  e01c-10  e01c-11  e01c-12  e01c-13  e01c-14  e01c-15
```

Também ficam órfãs, e estas **podem** ser descartadas quando A01 fechar (são narração da guia que a
dieta do G4 vai refazer de qualquer jeito): `e01c-01 · e01c-03 · e01c-05 · e01c-06 · e01c-06b ·
e01c-16 · e01c-17 · e01c-18`.

---

## 2. A dependência de casting, que é bloqueante (INV-21)

O material abaixo foi gravado com **Carmen = Madri** e **Emilio = o sul**. **Emilio é, ao mesmo tempo,
o modelo masculino padrão dos outros 23 episódios (235 clipes).** É exatamente isso que INV-21 proíbe:
*uma voz nunca acumula os papéis de modelo padrão e de sotaque regional* — modelo contaminado ensina o
sotaque como se fosse o padrão (`GRADE-36-ESPANHA.md` §9.5, achado 17 da auditoria).

**Consequência para A01:** os clipes de sotaque do sul (`e01c-11`, `e01c-13`, e o `e01c-15` de
`vosotros` se for lido com erosão) **têm de ser regravados na 5ª voz** — a que o
`syllabus-espanha.md` já batizou de **Rocío (Sevilha), só no ear module, nunca como modelo**. Os clipes
de Madri (`e01c-10`, `e01c-12`) seguem válidos na voz de Carmen. Orçado em ~800 créditos
(`GRADE-36-ESPANHA.md` §6, linha "A01 — 5ª voz").

---

## 3. Os steps, verbatim

### 3.1 Abertura do ear module — `e01c-09` (Alice, narração)

> Now the second half, and it's different from anything else in this course: you are not going to say a
> single word for the next few minutes. This is the ear module. Here's the problem it solves. You learn
> Spanish from clear, careful recordings — like Carmen there — and then you land in Seville and a man
> asks you something in which the letter S appears to have been abolished, and you conclude that you've
> learned the wrong language. You haven't. Spain's Spanish, especially in the south and in ordinary fast
> speech everywhere, drops sounds. The S at the end of a syllable turns into a puff of air or vanishes.
> The D between vowels falls out. It is not sloppy and it is not a dialect you need to learn — you will
> never need to speak like this. You will absolutely need to understand it, because it's exactly where
> the English runs out. So: same sentence, twice. Carmen from Madrid, then Emilio doing his cousin from
> Seville. Don't copy the second one. Just stop being frightened of it.

⚠️ **1.045 caracteres — 3,3× o teto individual do G4b (320).** Este clipe **não pode voltar como está**.
A01 o quebra em quatro ou cinco clipes com escuta no meio.

### 3.2 O par mínimo de erosão do `-s` — `e01c-10` / `e01c-11`

| chave | voz | `es` | `tts` | `pinyin` | glosa (`pt`) |
|---|---|---|---|---|---|
| `e01c-10` | Carmen (Madri) | `¿Cuántas cosas más?` | `¿Cuántas cosas más?` | `KWAN-tahs KOH-sahs MAHS` | 👂 'Anything else?' — Madrid. Every syllable in place, all three S's audible. |
| `e01c-11` | Emilio (sul) → **Rocío** | `¿Cuánta' cosa' má'?` | `¿Cuánta cosa má?` | `KWAN-tah KOH-thah MAH` | 👂 Same question, further south. Every S has evaporated. Same words, same meaning, and you are still being asked whether you want anything else. |

### 3.3 O par mínimo do `-d-` intervocálico — `e01c-12` / `e01c-13`

| chave | voz | `es` | `tts` | `pinyin` | glosa (`pt`) |
|---|---|---|---|---|---|
| `e01c-12` | Carmen (Madri) | `El pescado está muy bueno.` | idem | `el pehs-KAH-dhoh ehs-TAH mwee BWEH-noh` | 👂 'The fish is very good.' — The careful version. |
| `e01c-13` | Emilio (sul) → **Rocío** | `El pescao está mu bueno.` | idem | `el pehs-KAO ehs-TAH moo BWEH-noh` | 👂 And the real one. 'Pescado' became 'pescao' — the D between vowels just left. This happens in relaxed speech all over Spain, not only in the south, so learn to hear it: cansado becomes cansao, tomado becomes tomao. |

### 3.4 O `-s` como H aspirado + a entrada de `vosotros` — `e01c-14` (Alice, narração)

> Two more things for your ears only. First, the S again — in the south it often becomes a soft H, so
> 'dos cervezas' comes out as something like 'doh thervetha'. If all you take from this module is 'the S
> can vanish', you'll survive Seville. Second, and this one catches out anyone who learned Spanish in the
> Americas: Spain has an extra word for 'you plural' — vosotros — with its own verb endings that simply
> don't exist in Latin America. You are travelling as a two, so you are permanently on the receiving end
> of it and will need to produce it approximately never. So we've put it where it belongs: in your ear,
> not your mouth. If you ever do need it, 'ustedes' works perfectly and marks you as a foreigner, which
> you are. Recognise the two questions coming up and you've covered most of what a couple ever gets asked.

⚠️ **882 caracteres.** Mesmo destino do 3.1: quebrar.
⚠️ **"You are travelling as a two"** é resíduo do casal *hard-coded* (`PRODUTO.md`, Apêndice). Em A01
isso vem do onboarding ou some.

### 3.5 As duas perguntas de `vosotros` — `e01c-15`

| chave | voz | `es` | `pinyin` | glosa (`pt`) |
|---|---|---|---|---|
| `e01c-15` | Emilio | `¿Habéis reservado? ¿Qué vais a tomar?` | `ah-BEH-ees rreh-sehr-BAH-dhoh? keh BAH-ees ah toh-MAR` | 👂 'Have you booked? What are you two having?' — The two vosotros questions you'll hear at every restaurant door and every bar. Just say 'sí' or 'no', or order. Nothing else is required of you. |

**Nota de destino:** `GRADE-36-ESPANHA.md` manda `vosotros` para **A05** ("a outra língua"), não para A01
— A05 redispara os moldes na 2ª pessoa do plural. `e01c-15` portanto vai para **A05**, e A01 fica só
com a erosão fonética. Os dois autores precisam saber disso ou o material vai para os dois lugares.

---

## 4. O `aprofundar` removido, verbatim

### 4.1 "What the ear module is training, and why there is no speaking in it"

> Your brain recognises far more than it can produce, so the cheapest gain available is to spend a few
> minutes teaching it what real speech sounds like. Four things happen to Spanish in ordinary fast
> speech, roughly in order of how often you'll meet them. One: the S at the end of a syllable becomes a
> soft H or disappears entirely — 'dos cervezas' becomes 'doh thervetha'. Two: seseo, where the 'th' of
> gracias is pronounced as a plain S — standard in the Canaries, much of Andalusia and all of Latin
> America. Three: the D between vowels drops out — pescado becomes pescao, cansado becomes cansao. This
> one is everywhere in Spain, not just the south. Four: final R and L soften. You will never need to
> speak like this. You will absolutely need to understand it, because it starts exactly where the hotel
> English stops. And one thing you should never do: correct anybody. Down south they'll say 'grasias'.
> They're not wrong and neither are you.

Exemplos: `¿Cuántas cosas más? → ¿Cuánta' cosa' má'?` (Anything else? — Madrid, then Seville) ·
`el pescado → el pescao` (the fish — relaxed speech, anywhere in Spain).

### 4.2 "Vosotros: for your ears only"

> Spain uses vosotros for 'you plural' in informal situations; Latin America uses ustedes for everything
> and most courses written for Americans skip vosotros entirely, which is why it sounds like a foreign
> language when it arrives. Travelling as a couple, you are the target of it constantly and the speaker
> of it almost never — to produce it you'd have to be giving orders to two Spaniards. So learn to
> recognise these six and move on. One geographical get-out: the Canaries and much of western Andalusia
> use 'ustedes' informally too, so if you never hear vosotros in Seville, that isn't your mistake.

Os seis itens de reconhecimento: `¿Qué vais a tomar?` / `¿Qué queréis?` · `¿Habéis reservado?` /
`¿Tenéis reserva?` · `¿Sois vosotros?` · `Tenéis que esperar.` · `Pasad.` / `Sentaos.` · `¿De dónde sois?`

---

## 5. O que A01 tem de ganhar por cima disto (não estava no e01c)

Do `GRADE-36-ESPANHA.md` §1, linha A01, e do `PRODUTO.md` §5.1:

1. **O drill de maior valor/custo do curso: os 12 moldes operacionais ouvidos em velocidade real** —
   `¿Me poneh una caña? · ¿Hay algo pa' picá? · ¿Puedo pagá con tarjeta?`. **Zero frase nova**: redispara
   audioKeys já gravados, mais as versões na 5ª voz. É a virada emocional do módulo e custo de autoria
   quase zero. Depende das Ondas 1–3 estarem gravadas.
2. **`gesto: 1` (metrônomo), de propósito e contra a intuição** (`SCHEMA-EPISODIO.md` §4.4): enquanto a
   voz do sul derruba o `-s`, a mão mantém as batidas iguais. É a demonstração mais barata de que o ritmo
   silábico sobrevive à erosão de consoante.
3. **`espelho` obrigatório** (G7 é ATIVO e erra em qualquer parte `avancado` sem ele).
4. **Zero `responde`** — A01 é a **única** parte do SKU autorizada a ter zero (G3, linha 362 de
   `valida-tom.mjs`, que testa literalmente `zerados[0] !== 'A01'`).
5. **Frase de piso já escrita** na pesquisa (§2.10): *"If all you take from this module is 'the S can
   vanish' — you'll survive Seville."*
6. **Permissão já escrita** (§2.10): *"Down south they'll say 'grasias'. They're not wrong and neither
   are you."*
7. Fenômeno (2), **seseo**, e (4), **`-r`/`-l` final abrandado**, estão na pesquisa §2.10 e **nunca
   foram gravados** — não há clipe para reusar, são material novo.
