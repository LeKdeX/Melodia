#!/usr/bin/env node
// TASK-001 — Vérification automatisée des wikilinks/citations sur docs/.
// docs/TASK_BREAKDOWN.md §5, docs/ARCHITECTURE_REVIEW.md §7,
// docs/DOCUMENTATION_CHECKLIST.md §4.
//
// Zero-dependency by design: M0 runs before the pnpm workspace exists
// (TASK-006+, EPIC-002), so this script must not assume any package.json,
// tsconfig, or installed tooling — only Node's own built-ins.
//
// Usage: node scripts/verify-docs.mjs
// Exit code: 1 if any broken wikilink is found, 0 otherwise (orphans and
// unresolved section citations are reported but never fail the run — they
// are signals for the human review in TASK-002, not hard errors).

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  loadDocs,
  findBrokenLinks,
  findOrphans,
  checkSectionCitations,
} from './lib/doc-graph.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.resolve(__dirname, '..', 'docs');

function countWikilinks(docs) {
  let total = 0;
  for (const content of docs.values()) {
    total += (content.match(/\[\[[A-Za-z_.]+\.md\]\]/g) ?? []).length;
  }
  return total;
}

async function main() {
  const docs = await loadDocs(docsDir);
  const broken = findBrokenLinks(docs);
  const orphans = findOrphans(docs);
  const unresolvedCitations = checkSectionCitations(docs);

  console.log(`Documents scannés : ${docs.size}`);
  console.log(`Wikilinks totaux : ${countWikilinks(docs)}`);
  console.log('');

  console.log(`Liens cassés : ${broken.length}`);
  for (const { file, target } of broken) {
    console.log(`  - ${file} -> [[${target}]] (cible introuvable)`);
  }
  console.log('');

  console.log(`Documents sans référence entrante : ${orphans.length}`);
  for (const file of orphans) {
    console.log(`  - ${file}`);
  }
  console.log('');

  console.log(
    `Citations de section potentiellement non résolues (heuristique, à revérifier manuellement — voir TASK-002) : ${unresolvedCitations.length}`,
  );
  for (const { file, target, section } of unresolvedCitations) {
    console.log(`  - ${file} cite [[${target}]] §${section}, en-tête §${section} introuvable dans ${target}`);
  }

  if (broken.length > 0) {
    process.exitCode = 1;
  }
}

main();
