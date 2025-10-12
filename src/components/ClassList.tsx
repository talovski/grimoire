import { createEffect, createResource, For } from 'solid-js';
import { fetchClasses } from '@/lib/fetcher';
import ClassCard from './ClassCard';

export default function ClassList() {
	const [classes] = createResource(() => `v1/classes/`, fetchClasses);

	createEffect(() => {
		console.log('classes', classes());
	});

	return (
		<div class="flex flex-col gap-8">
			<For each={classes()}>{(classData) => <ClassCard classData={classData} />}</For>
		</div>
	);
}
