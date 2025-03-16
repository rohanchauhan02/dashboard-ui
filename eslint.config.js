import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] }, // Ignore the dist directory
  {
    extends: [
      js.configs.recommended, // ESLint recommended rules
      ...tseslint.configs.recommended, // TypeScript recommended rules
    ],
    files: ['**/*.{ts,tsx}'], // Apply to TypeScript and TSX files
    languageOptions: {
      ecmaVersion: 2020, // Use ECMAScript 2020
      sourceType: 'module', // Use ES modules
      globals: {
        ...globals.browser, // Browser globals (e.g., window, document)
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX support
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks, // React Hooks plugin
      'react-refresh': reactRefresh, // React Refresh plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // React Hooks recommended rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Allow constant exports
      ],
      // Additional custom rules
      'no-console': 'warn', // Warn on console.log
      'no-unused-vars': 'warn', // Warn on unused variables
      'react-hooks/exhaustive-deps': 'warn', // Warn on missing dependencies in useEffect
    },
  },
);
