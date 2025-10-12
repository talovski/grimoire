import { Show } from 'solid-js';
import { character } from '../stores/character';

export default function CharacterPreview() {
	return (
		<aside class="w-[280px] pos-sticky top-4 h-fit">
			<p>Class: {character.class}</p>
			<p>HP: {character.hit_die}</p>
			<Show when={!!character.class}>
				<p>Hit die: 1d{character.hit_die}</p>
				<p>Armor: {character.armor.join(', ')}</p>
				<p>Weapons: {character.weapons.join(', ')}</p>
				<p>Saving throws: {character.saving_throws.join(', ')}</p>
			</Show>
		</aside>
	);
}
