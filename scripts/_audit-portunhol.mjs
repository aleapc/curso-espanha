// Auditoria temporária: acha espanhol na FALA em português (Bia/Eduardo).
// PT voices falam: intro/recap -> s.pt ; responde -> s.promptPt (promptVoz default Bia).
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'lib', 'course');
const files = readdirSync(dir).filter((f) => /^ep-.*\.json$/.test(f)).sort();

const PT_VOICES = new Set(['Bia', 'Eduardo', 'narrador']);
// Sinais de espanhol num texto que deveria ser 100% português:
const ES_SIGNS = [
  /[¿¡ñ]/,                                   // pontuação/letra exclusivas do ES
  /\b(que tengas|que te|ojalá|vos|sos|tenés|querés|querría|podrías|deberías|tendrías|vengas|ayudes|vayas|llegues|pruebes|sea|guste)\b/i,
  /\b(el|la|los|las|un|una|unos|unas)\s+[a-záéíóú]+/i, // artigo ES + palavra (heurística fraca)
  /\b(está|cómo|qué|dónde|cuándo|gracias|por favor|hola|chau|buenos|buenas|señor|señora|usted|nosotros)\b/i,
  /\b(comprar|hablar|tener|querer|poder|hacer|ir|comer)\b/i // infinitivos ES iguais? cuidado
];

let respTotal = 0, respWithEs = 0, respEsChars = 0, ptOnlyChars = 0;
const introHits = [];
const sampleResp = [];

// Remove o trecho ES embutido pra estimar a versão "só PT" do promptPt.
function ptOnly(prompt, es) {
  let t = prompt;
  if (es) {
    // tira a frase ES (e variações sem pontuação) do prompt
    const esClean = es.replace(/[¿¡.!?]/g, '').trim();
    for (const variant of [es, esClean]) {
      const i = t.toLowerCase().indexOf(variant.toLowerCase());
      if (i >= 0) { t = (t.slice(0, i) + t.slice(i + variant.length)); }
    }
  }
  return t.replace(/,\s*\./g, '.').replace(/\s{2,}/g, ' ').replace(/\s+,/g, ',').replace(/,\s*,/g, ',').trim();
}

function looksSpanish(text) {
  if (!text) return false;
  if (/[¿¡ñ]/.test(text)) return true;
  return /\b(que tengas|ojalá|tenés|querés|querría|podrías|deberías|tendrías|vengas|vayas|llegues|pruebes|cómo andás|qué onda|dale|che|usted|señor|señora)\b/i.test(text);
}

for (const f of files) {
  const ep = JSON.parse(readFileSync(join(dir, f), 'utf8'));
  for (const s of ep.steps || []) {
    if (s.tipo === 'responde') {
      respTotal++;
      const prompt = s.promptPt || '';
      const es = s.es || '';
      const hasEs = es && prompt.toLowerCase().includes(es.replace(/[¿¡.!?]/g, '').trim().toLowerCase());
      if (hasEs || /[¿¡ñ]/.test(prompt)) {
        respWithEs++;
        respEsChars += prompt.length;
        const po = ptOnly(prompt, es);
        ptOnlyChars += po.length;
        if (sampleResp.length < 8) sampleResp.push({ f, before: prompt, after: po });
      }
    } else if (s.tipo === 'intro' || s.tipo === 'recap') {
      if (looksSpanish(s.pt)) introHits.push({ f, key: s.audioKey, pt: s.pt });
    }
  }
}

console.log('=== RESPONDE (promptPt falado pela Bia) ===');
console.log(`Total responde: ${respTotal}`);
console.log(`Com espanhol embutido: ${respWithEs} (${Math.round(100*respWithEs/respTotal)}%)`);
console.log(`Chars atuais desses prompts: ${respEsChars} (~${Math.ceil(respEsChars*0.5)} créditos p/ regerar como estão)`);
console.log(`Chars se virarem SÓ PT: ${ptOnlyChars} (~${Math.ceil(ptOnlyChars*0.5)} créditos p/ regerar a versão limpa)`);
console.log('\n--- amostras (antes -> depois) ---');
for (const s of sampleResp) console.log(`[${s.f}]\n  ANTES: ${s.before}\n  DEPOIS: ${s.after}`);
console.log(`\n=== INTRO/RECAP (s.pt falado pela Bia) com cheiro de espanhol: ${introHits.length} ===`);
for (const h of introHits.slice(0, 25)) console.log(`[${h.f}] ${h.key}: ${h.pt}`);
