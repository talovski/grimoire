import { createEffect, createSignal, on, Show } from 'solid-js';
import { character } from '../stores/character';

export default function CharacterPreview() {
	const [highlight, setHighlight] = createSignal(false);
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
			class="w-[280px] p-4 pos-sticky top-4 h-fit transition-colors duration-600 rounded-md"
			classList={{ 'bg-neutral200': highlight() }}
		>
			<p>
				<span class="font-bold">Class</span>: <span>{character.class?.[0].toUpperCase()}</span>
				{character.class?.slice(1)}
			</p>
			<p>
				<span class="font-bold">HP</span>: {character.hit_die}
			</p>
			<Show when={!!character.class}>
				<p>
					<span class="font-bold">Hit die</span>: 1d{character.hit_die}
				</p>
				<p>
					<span class="font-bold">Armor</span>: {character.armor.join(', ')}
				</p>
				<p>
					<span class="font-bold">Weapons</span>: {character.weapons.join(', ')}
				</p>
				<p>
					<span class="font-bold">Saving throws</span>: {character.saving_throws.join(', ')}
				</p>
			</Show>
		</aside>
	);
}
