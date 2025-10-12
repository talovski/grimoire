import { createSignal, For, Show } from 'solid-js';
import type { CleanClass } from '@/lib/types/ClassData';
import { setCharacter } from '@/stores/character';

export default function ClassCard({ classData }: { classData: CleanClass }) {
	const [showProgression, setShowProgression] = createSignal(false);
	return (
		<div class="bg-neutral100 pos-relative rounded-md p-5 grid grid-cols-[1fr_auto] shadow-sm">
			<h3 class="text-2xl p-b-2">{classData.name}</h3>
			<button
				class="grid-col-start-2 pos-sticky top-4 pos-relative z-1 shadow-lg hover:shadow-xl"
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
			<div class="grid-col-span-2 flex flex-col gap-3">
				<For each={classData.features.level1}>{(feat) => <ClassFeature feat={feat} />}</For>
			</div>
			<div class="grid-col-span-2 p-t-3">
				<button class="flex gap-1" onclick={() => setShowProgression((prev) => !prev)}>
					{showProgression() ? 'Hide' : 'Show'} progression{' '}
					<span>
						<Chevron isOpen={showProgression()} />
					</span>
				</button>
				<div
					class="text-sm p-t-3 grid transition-all duration-400 ease-in-out gap-3"
					style={{
						'grid-template-rows': showProgression() ? '1fr' : '0fr',
						visibility: showProgression() ? 'visible' : 'hidden',
					}}
				>
					<div class="overflow-hidden flex flex-col gap-3">
						<div innerHTML={classData.table} />
						<For each={classData.features.progression}>{(feat) => <ClassFeature feat={feat} />}</For>
					</div>
				</div>
			</div>
		</div>
	);
}

function ClassFeature({ feat }: { feat: { title: string; level: number; description: string[] } }) {
	const [showMore, setShowMore] = createSignal(false);

	return (
		<div>
			<p class="font-bold">{feat.title}</p>
			<div class="grid grid-cols-[1fr_auto] column-gap-2">
				<div innerHTML={feat.description[0]} />
				<Show when={feat.description.length > 1}>
					<button class="grid-col-start-2 h-fit p-0" onclick={() => setShowMore((prev) => !prev)}>
						<Chevron isOpen={showMore()} />
					</button>
					<div
						class="grid-col-span-2 p-l-4 grid transition-all duration-400 ease-in-out"
						style={{
							'grid-template-rows': showMore() ? '1fr' : '0fr',
							visibility: showMore() ? 'visible' : 'hidden',
						}}
					>
						<div style={{ overflow: 'hidden' }}>
							<For each={feat.description.slice(1)}>{(desc) => <div innerHTML={desc} />}</For>
						</div>
					</div>
				</Show>
			</div>
		</div>
	);
}

function Chevron(props: { isOpen: boolean }) {
	return (
		<svg
			class="transition-transform duration-400 ease-in-out scale-75"
			classList={{
				'rotate-180': props.isOpen,
			}}
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
