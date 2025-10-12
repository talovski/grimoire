import { BASE_URL } from './consts';
import { transformClass } from './transformers/classTransformer';
import type { ClassListData } from './types/ClassData';

export async function fetcher<T>(path: string): Promise<T> {
	console.log(`${BASE_URL}${path}`);
	const res = await fetch(`${BASE_URL}${path}`);
	return (await res.json()) as T;
}

export async function fetchClasses(path: string) {
	const raw = await fetcher<ClassListData>(path);
	console.log('RAW', raw);
	return raw.results.map(transformClass);
}
