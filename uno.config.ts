import {
	defineConfig,
	presetAttributify,
	presetTypography,
	presetWebFonts,
	presetWind3,
	transformerAttributifyJsx,
} from 'unocss';

export default defineConfig({
	presets: [
		presetAttributify({
			prefix: 'css',
		}),
		presetWind3(),
		presetTypography(),
		presetWebFonts({
			fonts: {
				sans: 'PT Sans',
				serif: 'Alegreya',
				mono: 'JetBrains Mono',
			},
		}),
	],
	transformers: [transformerAttributifyJsx()],
});
