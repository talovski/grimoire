import { type Accessor, createSignal, createEffect } from 'solid-js';

export function createPrevious<T>(value: Accessor<T>) {
	const [prev, setPrev] = createSignal<T>();

	createEffect((last: T | undefined) => {
		setPrev(() => last);
		return value();
	}, value());

	return prev;
}
