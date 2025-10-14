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
			class="sticky top-14 h-fit w-[280px] rounded-md p-4 transition-all duration-300"
			classList={{
				'scale-105': highlight(),
				'visible': highlight() && visible(),
				'invisible': !highlight() && !visible(),
			}}
		>
			<p>
				<span class="font-bold">Class:</span>
				{' '}
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
		if (!max) return;

		setSelected(prev => prev.includes(option)
			? prev.filter(item => item !== option)
			: prev.length < max
				? [...prev, option]
				: prev,
		);
	}

	return (
		<Show when={props?.skills?.choose} keyed>
			{choose => (
				<form class="p-t-3">
					<fieldset class="border-none p-0">
						<legend class="p-b-2">
							Choose
							{' '}
							{choose}
							{' '}
							skill
							{choose > 1 ? 's' : ''}
							{' '}
							(
							{selected().length}
							/
							{choose}
							{' '}
							selected)
						</legend>
						<div class="flex flex-col gap-2">
							<For each={props?.skills?.from}>
								{(skill) => {
									const isSelected = () => selected().includes(skill);
									const isDisabled = () => !isSelected() && selected().length >= props.skills!.choose;

									return (
										<label
											class="flex cursor-pointer items-center gap-2"
											classList={{
												'opacity-50 cursor-not-allowed': isDisabled(),
											}}
										>
											<input
												type="checkbox"
												name="skills"
												value={skill}
												onChange={() => handleSelected(skill)}
												checked={isSelected()}
												disabled={isDisabled()}
											/>
											<span>{skill}</span>
										</label>
									);
								}}
							</For>
						</div>
					</fieldset>
				</form>
			)}
		</Show>
	);
}
