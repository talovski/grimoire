import { createResource, For } from 'solid-js';
import { fetcher } from '@/lib/fetcher';
import type { ClassListData } from '@/lib/types/ClassData';
import ClassCard from './ClassCard';

export default function ClassList() {
	const [classes] = createResource(() => `v1/classes/`, fetcher<ClassListData>);

	return (
		<div>
			<For each={classes()?.results}>{(classData) => <ClassCard classData={classData} />}</For>
		</div>
	);
}
