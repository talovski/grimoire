import { createResource, For } from 'solid-js';
import CharacterPreview from '@/components/CharacterPreview';
import cn from '@/styles/create.module.css';
import { fetcher } from '../lib/fetcher';
import type { ClassData } from '../lib/types/ClassData';
import { setCharacter } from '../stores/character';

export default function Create() {
	const [classes] = createResource(() => `v1/classes/`, fetcher<ClassData>);

	return (
		<div>
			<h1>Creare your character</h1>
			<div class={cn.page}>
				<form>
					<input placeholder="" />
					<div>
						<For each={classes()?.results}>
							{(chClass) => (
								<div>
									<h3>{chClass.name}</h3>
									<button onclick={() => setCharacter('class', chClass.slug)}>Select class</button>
								</div>
							)}
						</For>
					</div>
				</form>
				<CharacterPreview />
			</div>
		</div>
	);
}
