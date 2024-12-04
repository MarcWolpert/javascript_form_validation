import globals from 'globals';
import pluginJs from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: pluginJs.configs.recommended,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	{
		ignores: ['**/node_modules/**', '**/dist/**', '**/webpack.*.js'],
	},
	...compat.extends('airbnb-base'),
	pluginJs.configs.recommended,
	{
		files: ['**/*.js'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
		},
		rules: {
			indent: ['error', 'tab'],
			'no-tabs': 'off',
			'no-shadow': [
				'error',
				{
					builtinGlobals: false,
					hoist: 'functions',
					allow: [],
				},
			],
			'no-use-before-define': [
				'error',
				{
					functions: false,
					classes: true,
					variables: true,
				},
			],
			'no-unused-expressions': 'error',
			'no-sequences': 'error',
			'no-void': 'error',
			'no-plusplus': 'error',
			'max-len': ['error', { code: 100 }],
			'vars-on-top': 'error',
			'block-scoped-var': 'error',
			'no-param-reassign': 'error',
			'operator-linebreak': ['off'],
		},
	},
];
