<script lang="ts">
  import { base } from '$app/paths';
  import QuizPlayer from '$lib/components/QuizPlayer.svelte';
  import { outline } from '$lib/course';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const quiz = data.quiz;

  // Mesmo defeito que a rota de episódio já tinha corrigido e que este arquivo
  // gêmeo ficou carregando: 'Básico / Intermediário / Avançado' codificado em
  // PORTUGUÊS num curso vendido para britânicos, e uma segunda canônica para o
  // nome do módulo. Derivar do outline mata as duas de uma vez.
  const nivelLabel = outline.find((m) => m.nivel === quiz.nivel)?.nome ?? '';
</script>

<a href="{base}/" class="text-sm text-oceano">← back</a>

<header class="mt-2">
  <p class="text-xs font-semibold uppercase tracking-wide text-terracota">
    {nivelLabel} · Quiz
  </p>
  <h1 class="text-2xl font-extrabold leading-tight">{quiz.titulo}</h1>
  <p class="text-carvao/70">{quiz.subtitulo}</p>
</header>

<div class="mt-4">
  <QuizPlayer {quiz} />
</div>
