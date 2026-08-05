import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import boundaries from 'eslint-plugin-boundaries';

// Ordre interne "de @data vers @app" (CODING_STANDARDS.md §3) : couches
// fondation d'abord, @app en dernier parmi les alias internes.
const INTERNAL_LAYER_ORDER = ['@platform', '@data', '@entities', '@shared', '@features', '@app'];

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    // eslint-plugin-import enregistré manuellement, sans son preset "recommended" :
    // celui-ci active import/no-unresolved, dont le résolveur par défaut ne
    // comprend pas la convention d'extension `.js`→`.ts` de ce monorepo (faux
    // positifs constatés empiriquement) — hors périmètre de TASK-014, qui ne
    // demande que l'ordre d'import (§3 de CODING_STANDARDS.md), pas la
    // résolution de module. eslint-plugin-boundaries préparé (enregistré) mais
    // non activé — aucune règle "boundaries/*" ci-dessous, activation prévue
    // en TASK-027/028.
    plugins: {
      import: importPlugin,
      boundaries,
    },
    rules: {
      // ENGINEERING_MANIFESTO.md §2 / TYPESCRIPT_GUIDE.md §8 : any interdit sauf
      // justification explicite en commentaire, vérifiée en revue humaine.
      '@typescript-eslint/no-explicit-any': 'error',

      // TYPESCRIPT_GUIDE.md §8 : imports de type toujours séparés des imports
      // de valeur, jamais `import { type X, y }` combiné — auto-fixable.
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports' },
      ],

      // ACCESSIBILITY_GUIDE.md §9ter : sous-ensemble explicitement cité comme
      // bloquant, au-delà du preset "recommended" déjà appliqué ci-dessus.
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',

      // CODING_STANDARDS.md §3 : bibliothèques externes → alias internes par
      // couche (de @data vers @app) → imports relatifs locaux — auto-fixable.
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: INTERNAL_LAYER_ORDER.map((alias, index) => ({
            pattern: `${alias}/**`,
            group: 'internal',
            position: index === 0 ? 'before' : undefined,
          })),
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc' },
          'newlines-between': 'always',
        },
      ],
    },
  },
);
