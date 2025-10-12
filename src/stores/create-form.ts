import { createSignal } from 'solid-js';

export type FormStage = 'class' | 'race' | 'ability_scores' | 'background' | 'name';

export const [stage, setStage] = createSignal<FormStage>('class');
