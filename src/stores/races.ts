import { createResource } from 'solid-js';
import { fetchRaces } from '~/lib/fetcher';

export const [races] = createResource(() => 'v1/races/', fetchRaces);
