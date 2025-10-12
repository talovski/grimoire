import { createEffect, createSignal, on, Show, For } from 'solid-js';
import { character } from '~/stores/character';
import { classes } from '~/stores/classes';
import type { SkillChoice } from '~/lib/types/Api';

export default function CharacterPreview() {
	const [highlight, setHighlight] = createSignal(false);
	const [visible, setVisible] = createSignal(false);
	const currentClass = () => classes()?.find(c => c.slug === character.class);
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	createEffect(
		on(
			() => character.class,
			() => {
				if (character.class) {
					setHighlight(true);
					clearTimeout(timeoutId);
					timeoutId = setTimeout(() => {
						setHighlight(false);
						setVisible(true);
					}, 600);
				}
			},
		),
	);

	return (
		<aside
			class="pos-sticky top-14 h-fit w-[280px] rounded-md bg-neutral200 p-4 transition-all duration-300"
			classList={{
				'scale-105': highlight(),
				'visible': highlight() && visible(),
				'invisible': !highlight() && !visible(),
			}}
		>
			<p>
				<span class="font-bold">Class</span>
				:
				<span>{character.class?.[0].toUpperCase()}</span>
				{character.class?.slice(1)}
			</p>
			<p>
				<span class="font-bold">HP</span>
				:
				{' '}
				{character.hit_die}
			</p>
			<Show when={!!character.class}>
				<p>
					<span class="font-bold">Hit die</span>
					:
					{' '}
					1d
					{character.hit_die}
				</p>
				<p>
					<span class="font-bold">Armor</span>
					:
					{' '}
					{character.armor.join(', ')}
				</p>
				<p>
					<span class="font-bold">Weapons</span>
					:
					{' '}
					{character.weapons.join(', ')}
				</p>
				<p>
					<span class="font-bold">Saving throws</span>
					:
					{' '}
					{character.saving_throws.join(', ')}
				</p>

				<SkillProficiencies skills={currentClass()?.skillChoices} />
			</Show>
		</aside>
	);
}

function SkillProficiencies(props: { skills: SkillChoice | null | undefined }) {
	const [selected, setSelected] = createSignal<string[]>([]);

	function handleSelected(option: string) {
		const max = props?.skills?.choose;
		if (!max) return null;

		setSelected(prev => prev.includes(option)
			? prev.filter(item => item !== option)
			: prev.length < max
				? [...prev, option]
				: prev,
		);
	}

	return (
		<Show when={props?.skills?.choose}>
			<div class="p-t-3">
				<p>
					Now you need to choose
					{' '}
					{props?.skills?.choose}
					{' '}
					skills
				</p>
				<For each={props?.skills?.from}>
					{(skill) => {
						return (
							<div>
								<label for={`skill-` + skill}>{skill}</label>
								<input
									id={`skill-` + skill}
									name={`skill-` + skill}
									type="checkbox"
									onChange={() => handleSelected(skill)}
									checked={selected().includes(skill)}
									disabled={!!props?.skills?.choose && !selected().includes(skill) && selected().length >= props?.skills?.choose}
								/>
							</div>
						);
					}}
				</For>
			</div>
		</Show>
	);
}
