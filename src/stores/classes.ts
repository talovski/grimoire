import { createResource } from 'solid-js';
import { fetchClasses } from '~/lib/fetcher';

export const [classes] = createResource(() => 'v1/classes/', fetchClasses);
