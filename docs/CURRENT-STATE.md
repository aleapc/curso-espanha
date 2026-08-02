# Estado atual — Kit de Bordo / ¡Dime! — 2026-08-01

Este é o checkpoint operacional posterior à passagem Claude → Codex. Os arquivos
`HANDOFF-CODEX.md`, `SESSAO-COMPLETA-2026-08-01.md` e `TAKEOVER-STATE.md`
continuam preservados como histórico do ponto de transferência.

## Produção

A coluna Espanha está completa, validada e publicada:

| Curso | Situação | `main` |
|---|---|---|
| EN → Espanha | no ar | `50ad153` |
| DE → Espanha | no ar | `9fcade2` |
| FR → Espanha | no ar | `c89e306` |
| IT → Espanha | no ar | `034513c` |

Os quatro cursos têm busca global discreta, Google Tradutor com o par correto e
rota `/bolso`. O EN oferece conversão EUR/GBP/USD offline-first; DE/FR/IT mostram
a orientação de moeda comum em euro.

## Faxina de consistência concluída

- descrições dos três níveis localizadas em DE, FR e IT, inclusive na fonte do
  gerador para não regressarem;
- títulos HTML de FR e IT corrigidos;
- builds e portões de estrutura, tom e áudio aprovados nos três derivados;
- `gh-pages` republicado em série e conferido;
- working trees locais reconciliados com o `main` remoto;
- backups anteriores à reconciliação preservados em
  `backup/pre-reconcile-20260801`;
- `deploy.sh` não alterado;
- mapa canônico e cópia em `docs/MATRIZ-CORREDORES.html` permanecem idênticos.

## Próxima frente

Abrir França como segundo acervo, começando por EN → França. A derivação deve
preservar a lei: estrutura pode ser reutilizada; texto e núcleo gerador devem ser
autorados para a interferência inglês ↔ francês, nunca traduzidos do espanhol.

Antes de áudio em escala, manter os controles já definidos:

1. fechar a autoria das 36 partes e o núcleo gerador;
2. executar bake-off curto das vozes;
3. obter revisão de francês nativo;
4. só então gerar o lote de áudio e publicar.

O pipeline de imagens da França pode caminhar em paralelo e não bloqueia autoria,
áudio de teste nem build com degradês de fallback.
