import { createSignal, Show } from 'solid-js';

export default function Dropdown() {
	const [isOpen, setIsOpen] = createSignal(false);
	return (
		<div>
			<div class="pos-relative overflow-auto">
				<button onClick={() => setIsOpen(prev => !prev)}>Open dropdown</button>
				<Show when={isOpen()}>
					<div class="absolute top-0 bg-neutral200" role="listbox">
						Opt
					</div>
				</Show>
			</div>
			yoyoyoyoyoyo
		</div>
	);
}
