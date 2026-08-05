import test from 'node:test';
import assert from 'node:assert/strict';
import {
  extractWikilinks,
  extractSectionCitations,
  extractHeadingNumbers,
  buildGraph,
  findBrokenLinks,
  findOrphans,
  checkSectionCitations,
} from './doc-graph.mjs';

test('extractWikilinks finds every [[Target.md]] occurrence, including repeats on one line', () => {
  const content = 'Voir [[A.md]] et aussi [[B.md]] puis encore [[A.md]].';
  assert.deepEqual(extractWikilinks(content), ['A.md', 'B.md', 'A.md']);
});

test('extractSectionCitations pairs a target with its cited section number, including suffixed sections', () => {
  const content = 'Voir [[A.md]] §3 et [[B.md]] §11bis pour le détail.';
  assert.deepEqual(extractSectionCitations(content), [
    { target: 'A.md', section: '3' },
    { target: 'B.md', section: '11bis' },
  ]);
});

test('extractHeadingNumbers reads the leading number of each markdown heading', () => {
  const content = '# Title\n\n## 3. Gabarit\n\n### 13bis. Niveau\n\nParagraphe sans titre.';
  assert.deepEqual(extractHeadingNumbers(content), new Set(['3', '13bis']));
});

test('extractHeadingNumbers and extractSectionCitations agree on a dotted number followed by a suffix (e.g. "3.0bis")', () => {
  const heading = '### 3.0bis Gabarit de Pull Request (ajout Engineering Handbook)';
  assert.deepEqual(extractHeadingNumbers(heading), new Set(['3.0bis']));

  const citation = 'Utilisez le gabarit déjà acté ([[GIT_WORKFLOW.md]] §3.0bis).';
  assert.deepEqual(extractSectionCitations(citation), [{ target: 'GIT_WORKFLOW.md', section: '3.0bis' }]);
});

test('findBrokenLinks flags a wikilink whose target file does not exist, tolerating the known Document.md placeholder', () => {
  const docs = new Map([
    ['A.md', 'Renvoie vers [[B.md]] et vers [[C.md]] (inexistant) et vers [[Document.md]] (placeholder toléré).'],
    ['B.md', 'Aucun lien.'],
  ]);
  assert.deepEqual(findBrokenLinks(docs), [{ file: 'A.md', target: 'C.md' }]);
});

test('findOrphans reports a document with zero incoming references, even if it has outgoing links', () => {
  const docs = new Map([
    ['A.md', 'Renvoie vers [[B.md]].'],
    ['B.md', 'Renvoie vers [[A.md]].'],
    ['C.md', 'Isolé : personne ne le cite, et il ne cite personne.'],
  ]);
  assert.deepEqual(findOrphans(docs), ['C.md']);
});

test('findOrphans does not flag a document that is referenced by at least one other document', () => {
  const docs = new Map([
    ['A.md', 'Renvoie vers [[B.md]].'],
    ['B.md', 'Renvoie vers [[A.md]].'],
  ]);
  assert.deepEqual(findOrphans(docs), []);
});

test('checkSectionCitations flags a cited section number absent from the target document headings', () => {
  const docs = new Map([
    ['A.md', 'Voir [[B.md]] §5 pour le détail.'],
    ['B.md', '## 3. Autre section\n\nContenu.'],
  ]);
  assert.deepEqual(checkSectionCitations(docs), [{ file: 'A.md', target: 'B.md', section: '5' }]);
});

test('checkSectionCitations does not flag a citation whose section number exists as a heading in the target', () => {
  const docs = new Map([
    ['A.md', 'Voir [[B.md]] §3 pour le détail.'],
    ['B.md', '## 3. La bonne section\n\nContenu.'],
  ]);
  assert.deepEqual(checkSectionCitations(docs), []);
});

test('checkSectionCitations skips a citation whose target document is itself missing (already reported as a broken link)', () => {
  const docs = new Map([['A.md', 'Voir [[Ghost.md]] §3.']]);
  assert.deepEqual(checkSectionCitations(docs), []);
});

test('buildGraph tracks incoming references only toward files that actually exist in the corpus', () => {
  const docs = new Map([
    ['A.md', 'Renvoie vers [[B.md]] et [[Ghost.md]].'],
    ['B.md', 'Rien.'],
  ]);
  const { incoming } = buildGraph(docs);
  assert.deepEqual([...incoming.get('B.md')], ['A.md']);
  assert.equal(incoming.has('Ghost.md'), false);
});
