import { createSignal } from 'solid-js';

export function createToggle(initial = false) {
	const [value, setValue] = createSignal(initial);
	const toggle = () => setValue(v => !v);
	return [value, toggle] as const;
}
