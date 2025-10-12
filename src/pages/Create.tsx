import CharacterPreview from '@/components/CharacterPreview';
import ClassList from '@/components/ClassList';

export default function Create() {
	return (
		<div class="m-inline-8 bg-neutral-200">
			<h1>Creare your character</h1>
			<div class="pos-relative grid grid-cols-[1fr_auto] gap-6">
				<ClassList />
				<CharacterPreview />
			</div>
		</div>
	);
}
