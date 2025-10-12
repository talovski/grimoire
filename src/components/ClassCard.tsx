import { createSignal, For, Show } from 'solid-js';
import { setCharacter } from '~/stores/character';
import { character } from '~/stores/character';
import { classes } from '~/stores/classes';
import type { CleanClass } from '~/lib/types/ClassData';

export default function ClassCard(props: { classData: CleanClass }) {
	const [showTable, setTable] = createSignal(false);
	const [showMoreFeats, setShowMoreFeats] = createSignal(false);

	const currentClass = () => classes()?.find(c => c.slug === character.class);

	return (
		<div class="pos-relative grid grid-cols-[1fr_auto] rounded-md bg-neutral-100 p-5 shadow-sm">
			<h3 class="p-b-2 text-2xl">{props.classData.name}</h3>
			<button
				class="pos-relative pos-sticky top-14 z-1 grid-col-start-2 shadow-lg hover:shadow-xl"
				onClick={() =>
					setCharacter({
						class: props.classData.slug,
						hit_die: props.classData.hitDie,
						armor: props.classData.proficiencies.armor,
						weapons: props.classData.proficiencies.weapons,
						saving_throws: props.classData.proficiencies.savingThrows,
					})}
			>
				{currentClass()?.slug === props.classData.slug ? 'Selected' : 'Select class'}
			</button>
			<div class="grid-col-span-2 flex flex-col gap-3">
				<For each={props.classData.features.level1}>
					{feat => <ClassFeature feat={feat} />}
				</For>
			</div>
			<div class="grid-col-span-2 p-t-3">
				<button
					class="flex items-center gap-1"
					onClick={() => setShowMoreFeats(prev => !prev)}
				>
					{showMoreFeats() ? 'Hide' : 'Show'}
					{' '}
					higher level features
					{' '}
					<Chevron isOpen={showMoreFeats()} />
				</button>
				<div
					class="grid gap-3 p-t-3 text-sm transition-all duration-400 ease-in-out"
					classList={{
						'grid-rows-[1fr] visible': showMoreFeats(),
						'grid-rows-[0fr] invisible': !showMoreFeats(),
					}}
				>
					<div class="flex flex-col gap-3 overflow-hidden">
						<For each={props.classData.features.progression}>
							{feat => <ClassFeature feat={feat} />}
						</For>
					</div>
				</div>
			</div>

			<div class="grid-col-span-2 p-t-3">
				<button class="flex items-center gap-1" onClick={() => setTable(prev => !prev)}>
					{showTable() ? 'Hide' : 'Show'}
					{' '}
					progression table
					{' '}
					<Chevron isOpen={showTable()} />
				</button>
				<div
					class="grid gap-3 p-t-3 text-sm transition-all duration-400 ease-in-out"
					style={{
						'grid-template-rows': showTable() ? '1fr' : '0fr',
						'visibility': showTable() ? 'visible' : 'hidden',
					}}
				>
					<div class="flex flex-col gap-3 overflow-hidden">
						<div innerHTML={props.classData.table} />
					</div>
				</div>
			</div>
		</div>
	);
}

function ClassFeature(props: {
	feat: { title: string; level: number; description: string[] };
}) {
	const [showMore, setShowMore] = createSignal(false);

	return (
		<div>
			<p class="font-bold">{props.feat.title}</p>
			<div class="column-gap-2 grid grid-cols-[1fr_auto]">
				<div innerHTML={props.feat.description[0]} />
				<Show when={props.feat.description.length > 1}>
					<button
						class="grid-col-start-2 h-fit p-0"
						onClick={() => setShowMore(prev => !prev)}
					>
						<Chevron isOpen={showMore()} />
					</button>
					<div
						class="grid grid-col-span-2 p-l-4 transition-all duration-400 ease-in-out"
						style={{
							'grid-template-rows': showMore() ? '1fr' : '0fr',
							'visibility': showMore() ? 'visible' : 'hidden',
						}}
					>
						<div class="overflow-hidden">
							<For each={props.feat.description.slice(1)}>
								{desc => <div innerHTML={desc} />}
							</For>
						</div>
					</div>
				</Show>
			</div>
		</div>
	);
}

function Chevron(props: { isOpen: boolean }) {
	return (
		<div
			class="i-lucide-chevron-down transition-transform duration-300 ease-in-out"
			classList={{
				'rotate-180': props.isOpen,
			}}
		/>
	);
}
