import { createSignal, For, Show } from 'solid-js';
import type { CleanClass } from '@/lib/types/ClassData';
import { setCharacter } from '@/stores/character';

export default function ClassCard({ classData }: { classData: CleanClass }) {
	const [showTable, setTable] = createSignal(false);
	const [showMoreFeats, setShowMoreFeats] = createSignal(false);

	return (
		<div class="bg-neutral200 pos-relative rounded-md p-5 grid grid-cols-[1fr_auto] shadow-sm">
			<h3 class="text-2xl p-b-2">{classData.name}</h3>
			<button
				class="grid-col-start-2 pos-sticky top-14 pos-relative z-1 shadow-lg hover:shadow-xl"
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
				<button class="flex gap-1" onclick={() => setShowMoreFeats((prev) => !prev)}>
					{showMoreFeats() ? 'Hide' : 'Show'} higher level features{' '}
					<span>
						<Chevron isOpen={showMoreFeats()} />
					</span>
				</button>
				<div
					class="text-sm p-t-3 grid transition-all duration-400 ease-in-out gap-3 grid-rows-[0fr]"
					style={{
						'grid-template-rows': showMoreFeats() ? '1fr' : '0fr',
						visibility: showMoreFeats() ? 'visible' : 'hidden',
					}}
				>
					<div class="overflow-hidden flex flex-col gap-3">
						<For each={classData.features.progression}>{(feat) => <ClassFeature feat={feat} />}</For>
					</div>
				</div>
			</div>

			<div class="grid-col-span-2 p-t-3">
				<button class="flex gap-1" onclick={() => setTable((prev) => !prev)}>
					{showTable() ? 'Hide' : 'Show'} progression table{' '}
					<span>
						<Chevron isOpen={showTable()} />
					</span>
				</button>
				<div
					class="text-sm p-t-3 grid transition-all duration-400 ease-in-out gap-3"
					style={{
						'grid-template-rows': showTable() ? '1fr' : '0fr',
						visibility: showTable() ? 'visible' : 'hidden',
					}}
				>
					<div class="overflow-hidden flex flex-col gap-3">
						<div innerHTML={classData.table} />
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
