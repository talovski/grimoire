import { createResource } from 'solid-js';
import { fetcher } from '~/lib/fetcher';

export const [races] = createResource(() => 'v1/races/', fetcher);
