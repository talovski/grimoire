import { BASE_URL } from './consts';
import { transformClass } from './transformers/classTransformer';
import type { ClassData, ResponseListData } from './types/ClassData';
import type { RaceData } from './types/Race';

export async function fetcher<T>(path: string): Promise<T> {
	const res = await fetch(`${BASE_URL}${path}`);
	return (await res.json()) as T;
}

export async function fetchClasses(path: string) {
	const raw = await fetcher<ResponseListData<ClassData>>(path);
	return raw.results.map(transformClass);
}

export async function fetchRaces(path: string) {
	const raw = await fetcher<ResponseListData<RaceData>>(path);
	return raw.results;
}
