import { createSignal, For, Show } from 'solid-js';
import type { CleanClass } from '@/lib/types/ClassData';
import { setCharacter } from '@/stores/character';

export default function ClassCard({ classData }: { classData: CleanClass }) {
	const [showProgression, setShowProgression] = createSignal(false);
	return (
		<div class="pos-relative grid grid-cols-[1fr_auto]">
			<h3>{classData.name}</h3>
			<button
				class="grid-col-start-2 pos-sticky top-4"
				onclick={() =>
					setCharacter({
						class: classData.slug,
						hit_die: classData.hitDie,
						armor: classData.proficiencies.armor,
						weapons: classData.proficiencies.weapons,
						saving_throws: classData.proficiencies.savingThrows,
					})
				}
			>
				Select class
			</button>
			<div class="grid-col-span-2">
				<For each={classData.features.level1}>{(feat) => <ClassFeature feat={feat} />}</For>
			</div>
			<div class="grid-col-span-2 p-t-3">
				<button onclick={() => setShowProgression((prev) => !prev)}>
					{showProgression() ? 'Hide' : 'Show'} progression
				</button>
				<Show when={showProgression()}>
					<div class="text-sm p-t-3" innerHTML={classData.table} />
				</Show>
			</div>
		</div>
	);
}

function ClassFeature({ feat }: { feat: { title: string; level: number; description: string[] } }) {
	const [showMore, setShowMore] = createSignal(false);

	return (
		<div>
			<p class="font-bold">{feat.title}</p>
			<div class="grid grid-cols-[1fr_auto]">
				<div innerHTML={feat.description[0]} />
				<Show when={feat.description.length > 1}>
					<button class="grid-col-start-2 h-fit" onclick={() => setShowMore((prev) => !prev)}>
						<Chevron isOpen={showMore()} />
					</button>
					<div class="grid-col-span-2">
						<Show when={showMore()}>
							<For each={feat.description.slice(1)}>{(desc) => <div innerHTML={desc} />}</For>
						</Show>
					</div>
				</Show>
			</div>
		</div>
	);
}

function Chevron(props: { isOpen: boolean }) {
	console.log('isOpen', props.isOpen);
	return (
		<svg
			class={`${props.isOpen ? 'rotate-180' : 'yo'} sakdmaskdm`}
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
			<path d="m6 9 6 6 6-6" />
		</svg>
	);
}
