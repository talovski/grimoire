import CharacterPreview from '@/components/CharacterPreview';
import ClassList from '@/components/ClassList';
import FormNavigationStrip from '@/components/FormNavigationStrire';

export default function Create() {
	return (
		<div class="px-8 py-14 bg-neutral-200">
			<FormNavigationStrip />
			<h1>Creare your character</h1>
			<div class="pos-relative pt-3 grid grid-cols-[1fr_auto] gap-6">
				<ClassList />
				<CharacterPreview />
			</div>
		</div>
	);
}
