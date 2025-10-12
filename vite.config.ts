/// <reference types="vitest" />
import path from 'node:path';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
	plugins: [UnoCSS(), solid()],
	css: {
		modules: { localsConvention: 'camelCase' },
	},
	test: {
		environment: 'happy-dom',
	},
	worker: {
		format: 'es',
	},
	resolve: {
		alias: { '@': path.resolve(__dirname, './src') },
	},
});
