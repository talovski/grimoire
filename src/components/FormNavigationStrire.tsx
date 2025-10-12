import { character } from '~/stores/character';
import type { FormStage } from '~/stores/create-form';

const stageNames: Record<FormStage, { index: FormStage; name: string }> = {
	class: { index: 'class', name: 'Class' },
	race: { index: 'race', name: 'Race' },
	ability_scores: { index: 'ability_scores', name: 'Ability Scores' },
	background: { index: 'background', name: 'Background' },
	name: { index: 'name', name: 'Name' },
};
export default function FormNavigationStrip() {
	return (
		<div class="bg-neutral-300 pos-fixed left-0 top-0 z-2 w-full flex items-center gap-6 p-y-2 p-inline-8 shadow-sm">
			<button
				class="animate-appear transition-background flex items-center border-1 border-solid transition-duration-300"
				classList={{
					'bg-greenish text-neutral-50 gap-2': !!character?.class,
				}}
			>
				{stageNames.class.name}
				<Check show={!!character?.class} />
			</button>
			<Arrow />
			<button>{stageNames.race.name}</button>
			<Arrow />
			<button>{stageNames.ability_scores.name}</button>
			<Arrow />
			<button>{stageNames.background.name}</button>
			<Arrow />
			<button>{stageNames.name.name}</button>
		</div>
	);
}

function Arrow() {
	return (
		<svg
			class="w-4"
			fill="none"
			height="24"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M5 12h14" />
			<path d="m12 5 7 7-7 7" />
		</svg>
	);
}

function Check(props: { show: boolean }) {
	return (
		<svg
			class="transition-all"
			classList={{ 'w-4': props.show, 'w-0': !props.show }}
			fill="none"
			height="24"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M20 6 9 17l-5-5" />
		</svg>
	);
}
