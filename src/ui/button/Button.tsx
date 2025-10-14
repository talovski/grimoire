import type { JSX } from 'solid-js';

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	// as: 'button' | 'a';
	children: JSX.Element;
	styleExtend?: string;
}

export function Button(props: ButtonProps) {
	return (
		<button
			class={`
				relative h-fit rounded-xs border-1 border-solid border-neutral-500 bg-neutral-200 px-2 py-1
				shadow-xs transition-all duration-150
				hover:border-neutral-600 hover:bg-neutral-300 hover:shadow-sm
				focus:translate-z-0.5 focus:border-neutral-600 focus:shadow-sm
				focus-visible:outline-neutral-600
				active:scale-[97%]
			`}
			{...props}
		>
			{props.children}
		</button>
	);
}
