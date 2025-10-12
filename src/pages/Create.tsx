import CharacterPreview from '@/components/CharacterPreview';
import ClassList from '@/components/ClassList';

export default function Create() {
	return (
		<div class="m-inline-8">
			<h1>Creare your character</h1>
			<div class="pos-relative grid grid-cols-[1fr_auto] gap-6">
				<div>
					<form>
						<input placeholder="" />
					</form>
					<ClassList />
				</div>
				<CharacterPreview />
			</div>
		</div>
	);
}
