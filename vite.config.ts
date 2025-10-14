/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
	plugins: [tailwindcss(), solid()],
	test: {
		environment: 'happy-dom',
	},
	worker: {
		format: 'es',
	},
	resolve: {
		alias: { '~': path.resolve(__dirname, './src') },
	},
});
