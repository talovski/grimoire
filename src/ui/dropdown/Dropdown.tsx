import { createSignal, onCleanup, onMount } from 'solid-js';
import { Button } from '../button/Button';

export default function Dropdown() {
	const [open, setOpen] = createSignal(false);
	let buttonRef!: HTMLButtonElement;
	let menuRef!: HTMLUListElement;

	const handleKeyDown = (e: KeyboardEvent) => {
		if (!open()) return;

		if (e.key === 'Escape') {
			setOpen(false);
			buttonRef.focus();
		}
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			const items = Array.from(menuRef?.querySelectorAll('[role="menuitem"]') || []) as HTMLElement[];
			const curr = items.indexOf(document.activeElement as HTMLElement);

			switch (e.key) {
				case 'ArrowDown': {
					const next = curr < items.length - 1 ? curr + 1 : 0;
					items[next].focus();
					break;
				}
				case 'ArrowUp': {
					const prev = curr > 0 ? curr - 1 : items.length - 1;
					items[prev].focus();
					break;
				}
			}
		}

		if (e.key === 'Enter' && document.activeElement?.getAttribute('role') === 'menuitem') {
			e.preventDefault();
			setOpen(false);
			buttonRef.focus();
		}
	};

	const handleClickOutside = (e: MouseEvent) => {
		if (!menuRef.contains(e.target as Node)
        && !buttonRef.contains(e.target as Node)) {
			setOpen(false);
		}
	};

	onMount(() => {
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('click', handleClickOutside);
	});

	onCleanup(() => {
		document.removeEventListener('keydown', handleKeyDown);
		document.removeEventListener('click', handleClickOutside);
	});

	return (
		<div class="relative">
			<Button
				ref={buttonRef}
				aria-haspopup="true"
				aria-expanded={open()}
				onClick={() => setOpen(!open())}
			>
				open or close
			</Button>
			{open() && (
				<ul
					ref={menuRef}
					role="menu"
					class={`
						absolute top-9 z-1 min-w-48 rounded-xs border-1 border-solid border-neutral-300 bg-neutral-100
						p-3 shadow-xl
					`}
				>
					<li role="menuitem"><a role="menuitem" tabIndex={0}>Item 1</a></li>
					<li role="menuitem"><a role="menuitem" tabIndex={0}>Item 2</a></li>
				</ul>
			)}
		</div>
	);
}
