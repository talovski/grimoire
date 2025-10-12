import CharacterPreview from '@/components/CharacterPreview';
import ClassList from '@/components/ClassList';

export default function Create() {
	return (
		<div>
			<h1>Creare your character</h1>
			<div class="grid grid-cols-[1fr_auto]">
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
