import {
	defineConfig,
	presetAttributify,
	presetMini,
	presetTypography,
	presetWebFonts,
	transformerAttributifyJsx,
} from 'unocss';

export default defineConfig({
	presets: [
		presetAttributify({
			prefix: 'un-',
			prefixedOnly: true,
		}),
		presetMini(),
		presetTypography(),
		presetWebFonts({
			provider: 'fontsource',
			fonts: {
				sans: 'karla',
				serif: 'alegreya',
			},
		}),
	],
	theme: {
		colors: {
			neutral200: '#EFEFEF',
		},

		// colors: {
		// boofoo: '#FFF000',
		// },
	},
	transformers: [transformerAttributifyJsx()],
});
