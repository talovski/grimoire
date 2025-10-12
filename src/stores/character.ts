import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import type { CharacterType } from '../lib/types/Character';

export const EMPTY_CHAR: CharacterType = {
	name: '',
	level: 1,
	class: null,
	ability_scores: {
		dex: 8,
		cha: 8,
		con: 8,
		int: 8,
		str: 8,
		wis: 8,
	},
	hp_at_level_one: 0,
	race: '',
	hit_die: '',
	AC: 10,
	ACModifier: '',
	speed: 30,
	skills: [''],
	armor: '',
	saving_throws: [''],
};

export const [character, setCharacter] = createStore<CharacterType>(EMPTY_CHAR);
