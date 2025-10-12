import eslint from '@eslint/js';
import json from '@eslint/json';
import stylistic from '@stylistic/eslint-plugin';
import unocss from '@unocss/eslint-config/flat';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import solid from 'eslint-plugin-solid/configs/recommended';
import tseslint from 'typescript-eslint';

export default defineConfig(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	tseslint.configs.stylistic,
	json.configs.recommended,
	unocss,
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
);
