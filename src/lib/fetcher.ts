import { BASE_URL } from './consts';

export async function fetcher<T>(path: string): Promise<T> {
	console.log(`${BASE_URL}${path}`);
	const res = await fetch(`${BASE_URL}${path}`);
	return (await res.json()) as T;
}
