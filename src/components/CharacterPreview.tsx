import { createEffect, createSignal, on, Show } from 'solid-js';
import { character } from '~/stores/character';
import { classes } from '~/stores/classes';

export default function CharacterPreview() {
	const [highlight, setHighlight] = createSignal(false);
	const currentClass = () => classes()?.find(c => c.slug === character.class);

	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	createEffect(
		on(
			() => character.class,
			() => {
				if (character.class) {
					setHighlight(true);
					clearTimeout(timeoutId);
					timeoutId = setTimeout(() => setHighlight(false), 600);
				}
			},
		),
	);

	return (
		<aside
			class="pos-sticky top-14 h-fit w-[280px] rounded-md p-4 transition-all duration-300"
			classList={{ 'bg-neutral200 scale-105': highlight() }}
		>
			<p>
				<span class="font-bold">Class</span>
				:
				<span>{character.class?.[0].toUpperCase()}</span>
				{character.class?.slice(1)}
			</p>
			<p>
				<span class="font-bold">HP</span>
				:
				{character.hit_die}
			</p>
			<Show when={!!character.class}>
				<p>
					<span class="font-bold">Hit die</span>
					: 1d
					{character.hit_die}
				</p>
				<p>
					<span class="font-bold">Armor</span>
					:
					{character.armor.join(', ')}
				</p>
				<p>
					<span class="font-bold">Weapons</span>
					:
					{character.weapons.join(', ')}
				</p>
				<p>
					<span class="font-bold">Saving throws</span>
					:
					{character.saving_throws.join(', ')}
				</p>

				<Show when={!!currentClass()?.skillChoices?.choose}>
					<div class="p-t-3">
						<p>
							Now you need to choose
							{currentClass()?.skillChoices?.choose}
							{' '}
							skills
						</p>
					</div>
					{/* {currentClass()?.skillChoices?.choose} {currentClass()?.skillChoices?.from} */}
				</Show>
			</Show>
		</aside>
	);
}
