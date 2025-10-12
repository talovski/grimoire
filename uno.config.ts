import { defineConfig, presetAttributify, presetMini, presetTypography, transformerAttributifyJsx } from 'unocss';

export default defineConfig({
	presets: [
		presetAttributify({
			prefix: 'un-',
			prefixedOnly: true,
		}),
		presetMini(),
		presetTypography(),
	],
	transformers: [transformerAttributifyJsx()],
});
