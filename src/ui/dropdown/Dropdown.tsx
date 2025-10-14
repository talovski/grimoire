import { createSignal, createUniqueId, type JSX, onCleanup, onMount } from 'solid-js';
import { Button } from '../button/Button';

interface DropdownProps {
	multiSelect?: boolean;
	children: JSX.Element;
	btnContent: string | JSX.Element;
	contentStyleExtend?: JSX.DOMAttributes<HTMLElement>['class'];
	btnStyleExtend?: JSX.DOMAttributes<HTMLElement>['class'];
	contentAttrs?: JSX.HTMLAttributes<HTMLDivElement>;
}

export default function Dropdown(props: DropdownProps) {
	const [open, setOpen] = createSignal(false);
	const dropdownId = createUniqueId();
	let buttonRef!: HTMLButtonElement;
	let menuRef!: HTMLDivElement;

	const isFocusable = (element: HTMLElement): boolean => {
		if ((element as HTMLButtonElement | HTMLInputElement).disabled) return false;
		if (element.getAttribute('aria-disabled') === 'true') return false;

		return element.tabIndex >= 0;
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (!open()) return;

		if (e.key === 'Escape') {
			setOpen(false);
			buttonRef.focus();
		}
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			const allElements = Array.from(menuRef?.querySelectorAll('*') || []) as HTMLElement[];
			const items = allElements.filter(isFocusable);
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

		if (e.key === 'Enter' && document.activeElement?.id === dropdownId) {
			e.preventDefault();
			if (!props.multiSelect) {
				setOpen(false);
				buttonRef.focus();
			}
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
				attrs={{
					'ref': buttonRef,
					'aria-haspopup': 'true',
					'aria-expanded': open(),
					'onClick': () => setOpen(!open()),
				}}
				styleExtend={props.btnStyleExtend}
			>
				{props.btnContent}
			</Button>
			{open() && (
				<div
					{...props.contentAttrs}
					ref={menuRef}
					id={dropdownId}
					role="menu"
					class={`
						absolute top-9 z-1 min-w-48 rounded-xs border-1 border-solid border-neutral-300 bg-neutral-100
						p-3 shadow-xl
					` + props.contentStyleExtend}
				>
					{props.children}
				</div>
			)}
		</div>
	);
}
