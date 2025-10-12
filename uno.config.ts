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
	extendTheme: (theme) => {
		return {
			...theme,
			colors: {
				neutral200: '#EFEFEF',
				red100: '#223535',
			},
		};
	},
	transformers: [transformerAttributifyJsx()],
});
