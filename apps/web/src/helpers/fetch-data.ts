export async function fetchJson<T extends object = Record<string, unknown>>(
  url: string,
): Promise<T> {
  const response = await fetch(url);
  return response.json() as T;
}
