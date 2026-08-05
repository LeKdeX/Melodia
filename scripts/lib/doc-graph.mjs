// Pure graph logic for docs/ wikilink verification (TASK-001).
// No I/O here — loadDocs() is the only function that touches the filesystem,
// so the rest stays trivially unit-testable against in-memory fixtures.

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const WIKILINK_RE = /\[\[([A-Za-z_.]+\.md)\]\]/g;

// A section number is an integer, optionally followed by a Latin ordinal
// suffix (bis/ter/...), optionally followed by a dotted sub-number that can
// itself carry its own suffix — both orders occur in this corpus (e.g.
// "§11bis" and "§3.0bis").
const SUFFIX = '(?:bis|ter|quater|quinquies|sexies|septies|octies|nonies|decies)?';
const SECTION_NUMBER = `[0-9]+${SUFFIX}(?:\\.[0-9]+${SUFFIX})?`;
const SECTION_CITATION_RE = new RegExp(
  `\\[\\[([A-Za-z_.]+\\.md)\\]\\]\\s*§\\s*(${SECTION_NUMBER})`,
  'g',
);
const HEADING_RE = new RegExp(`^#{1,4}\\s+(${SECTION_NUMBER})\\b`);

// docs/DOCUMENTATION_CHECKLIST.md §4 — the one tolerated exception, a known
// template placeholder rather than a real broken reference.
const TOLERATED_PLACEHOLDERS = new Set(['Document.md']);

export function extractWikilinks(content) {
  return [...content.matchAll(WIKILINK_RE)].map((m) => m[1]);
}

export function extractSectionCitations(content) {
  return [...content.matchAll(SECTION_CITATION_RE)].map((m) => ({
    target: m[1],
    section: m[2],
  }));
}

export function extractHeadingNumbers(content) {
  const numbers = new Set();
  for (const line of content.split('\n')) {
    const m = HEADING_RE.exec(line);
    if (m) numbers.add(m[1]);
  }
  return numbers;
}

export async function loadDocs(docsDir) {
  const entries = await readdir(docsDir);
  const files = entries.filter((f) => f.endsWith('.md')).sort();
  const docs = new Map();
  for (const file of files) {
    docs.set(file, await readFile(path.join(docsDir, file), 'utf8'));
  }
  return docs;
}

export function buildGraph(docs) {
  const fileSet = new Set(docs.keys());
  const incoming = new Map();
  for (const file of fileSet) incoming.set(file, new Set());

  for (const [file, content] of docs) {
    for (const target of extractWikilinks(content)) {
      if (fileSet.has(target)) incoming.get(target).add(file);
    }
  }
  return { fileSet, incoming };
}

export function findBrokenLinks(docs) {
  const fileSet = new Set(docs.keys());
  const broken = [];
  for (const [file, content] of docs) {
    for (const target of extractWikilinks(content)) {
      if (!fileSet.has(target) && !TOLERATED_PLACEHOLDERS.has(target)) {
        broken.push({ file, target });
      }
    }
  }
  return broken;
}

export function findOrphans(docs) {
  const { incoming } = buildGraph(docs);
  const orphans = [];
  for (const [file, referrers] of incoming) {
    if (referrers.size === 0) orphans.push(file);
  }
  return orphans.sort();
}

// Heuristic, not authoritative: flags a cited "§N" whose target document has
// no heading starting with that same number. False positives are possible
// (e.g. a section referenced by name rather than number) — this narrows what
// a human reviewer needs to sample-check, it does not replace that review
// (docs/DOCUMENTATION_CHECKLIST.md §4, §6).
export function checkSectionCitations(docs) {
  const unresolved = [];
  for (const [file, content] of docs) {
    for (const { target, section } of extractSectionCitations(content)) {
      const targetContent = docs.get(target);
      if (!targetContent) continue; // already surfaced by findBrokenLinks
      if (!extractHeadingNumbers(targetContent).has(section)) {
        unresolved.push({ file, target, section });
      }
    }
  }
  return unresolved;
}
