import type { ClassData } from '@/lib/types/ClassData';
import { setCharacter } from '@/stores/character';

export default function ClassCard({ classData }: { classData: ClassData }) {
	return (
		<div>
			<h3>{classData.name}</h3>
			<button onclick={() => setCharacter('class', classData.slug)}>Select class</button>
		</div>
	);
}
