import CharacterPreview from '~/components/CharacterPreview';
// import ClassList from '~/components/ClassList';
import FormNavigationStrip from '~/components/FormNavigationStrire';
import type { JSX } from 'solid-js';

export default function Create(props: { children?: JSX.Element }) {
	return (
		<div class="px-8 py-14">
			<FormNavigationStrip />
			<h1>Creare your character</h1>
			<div class="pos-relative grid grid-cols-[1fr_auto] gap-6 pt-3">
				{props.children}
				{/* <ClassList /> */}
				<CharacterPreview />
			</div>
		</div>
	);
}
