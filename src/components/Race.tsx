import { createEffect } from 'solid-js';
import { races } from '~/stores/races';

export default function Race() {
	createEffect(() => {
		console.log('races', races());
	});
	return <div>hewwo</div>;
}
