/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    // ── Selector Rules ──
    'no-duplicate-selectors': true,
    'selector-class-pattern': /^[a-z][a-z0-9-]*(__[a-z][a-z0-9-]*)?(--[a-z][a-z0-9-]*)?$/,
    'max-nesting-depth': [4, { ignoreAtRules: ['media', 'supports', 'include'] }],

    // ── Property Rules ──
    'no-duplicate-properties': [true, { ignore: ['consecutive-duplicates-with-different-values'] }],
    'shorthand-property-no-redundant-values': true,
    'declaration-block-no-redundant-longhand-properties': true,

    // ── Value Rules ──
    'color-hex-length': 'short',
    'length-zero-no-unit': true,
    'declaration-no-important': true,

    // ── Block Rules ──
    'block-no-empty': true,
    'no-empty-source': true,

    // ── SCSS Rules ──
    'scss/dollar-variable-pattern': /^[a-z][a-z0-9-]*$/,
    'scss/no-global-function-name': true,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'layer',
          'theme',
          'utility',
          'variant',
          'custom-variant',
          'use',
          'forward',
          'include',
          'mixin',
          'extend',
        ],
      },
    ],

    // ── Formatting ──
    'indentation': 2,
    'string-quotes': 'single',
    'color-named': 'never',
  },
  ignoreFiles: [
    'node_modules/**',
    '.next/**',
    '**/*.module.scss',
  ],
}
