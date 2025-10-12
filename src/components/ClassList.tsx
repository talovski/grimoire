import { For } from 'solid-js';
import ClassCard from './ClassCard';
import { classes } from '~/stores/classes';

export default function ClassList() {
	return (
		<div class="flex flex-col gap-8">
			<For each={classes()}>
				{classData => <ClassCard classData={classData} />}
			</For>
		</div>
	);
}
