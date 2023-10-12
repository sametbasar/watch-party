module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'unused-imports', 'prettier', 'tailwindcss'],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'tailwindcss/no-custom-classname': 'off', // Disabled otherwise nightmare to allow each custom tailwind classes
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
