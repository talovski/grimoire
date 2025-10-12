/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
	plugins: [solid()],
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
