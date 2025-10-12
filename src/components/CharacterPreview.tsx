import { character } from '../stores/character';

export default function CharacterPreview() {
	return (
		<aside>
			<p>Class: {character.class}</p>
		</aside>
	);
}
