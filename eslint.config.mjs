import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tsEslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all
});

/**
 * @type {import('eslint').Config[]}
 */
export default tsEslint.config(
  { ignores: ['**/.next/*', '**/public/*.js', 'integration/', 'scripts/'] },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...compat.extends(
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/recommended',
    'prettier'
  ),
  ...pluginQuery.configs['flat/recommended'],
  {
    plugins: {
      prettier,
      'jsx-a11y': pluginJsxA11y,
      eslint
      // '@typescript-eslint': tsPlugin
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        project: ['./apps/*/tsconfig.json', './libs/*/tsconfig.json', './tsconfig.eslint.json']
      }
    },

    rules: {
      ...pluginJsxA11y.flatConfigs.recommended.rules,
      'prettier/prettier': 1,
      'react/react-in-jsx-scope': 0,
      'react/jsx-props-no-spreading': 0,
      'import/extensions': 0,
      'import/prefer-default-export': 0,
      'no-restricted-exports': 0,
      'react/function-component-definition': 0,
      'import/no-named-as-default': 0,
      'no-param-reassign': 0,
      'react/require-default-props': 0,
      'react/prop-types': 0,
      'arrow-body-style': 0,
      'react/destructuring-assignment': 0,
      'prefer-destructuring': 0,
      'consistent-return': 0,
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info']
        }
      ],
      'max-lines': [
        'warn',
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true
        }
      ],
      'no-underscore-dangle': 0,
      '@typescript-eslint/no-throw-literal': 0,
      'no-unused-vars': 0,
      '@next/next/no-html-link-for-pages': 0,
      '@typescript-eslint/no-empty-object-type': 0,
      'react-hooks/exhaustive-deps': 0, // can turn off, sometime we don't need to check exhaustive deps, we can ensure manually by each context
      'react-hooks/rules-of-hooks': 0,
      'jsx-a11y/no-autofocus': 0,
      'react/jsx-pascal-case': [
        1,
        {
          ignore: ['MRT_*']
        }
      ],
      '@typescript-eslint/lines-between-class-members': 0,
      'no-void': 0,
      'react/display-name': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/triple-slash-reference': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      'no-use-before-define': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
);
