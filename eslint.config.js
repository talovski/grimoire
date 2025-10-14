import eslint from '@eslint/js';
import json from '@eslint/json';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import tailwind from 'eslint-plugin-better-tailwindcss';
import importPlugin from 'eslint-plugin-import';
import solid from 'eslint-plugin-solid/configs/typescript';
import tseslint from 'typescript-eslint';

export default defineConfig(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	tseslint.configs.stylistic,
	json.configs.recommended,
	solid,
	stylistic.configs.customize({
		indent: 'tab',
		quotes: 'single',
		semi: true,
		jsx: true,
	}),
	{
		plugins: { import: importPlugin },
		settings: {
			'import/resolver': { typescript: true, node: true },
			'import/internal-regex': '^~/',
		},
		rules: {
			'import/order': [
				'warn',
				{
					groups: [
						['builtin', 'external'],
						['internal', 'parent', 'sibling', 'index'],
						['type'],
					],
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
			'import/newline-after-import': 'warn',
			'no-undef': 'off',
			'solid/no-innerhtml': 'off',
		},
	},
	{
		plugins: { 'better-tailwindcss': tailwind },
		rules: {
			...tailwind.configs['recommended-warn'].rules,
			...tailwind.configs['recommended-error'].rules,

			// or configure rules individually
			'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: 100, indent: 'tab' }],
		},
		settings: {
			'better-tailwindcss': {
				entryPoint: 'src/index.css',
			},
		},
	},
	{
		plugins: { stylistic: stylistic },
		rules: {
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/indent-binary-ops': ['off'],
		},
	},
);
