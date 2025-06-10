import { cookies } from 'next/headers';
import 'server-only';

export async function saveFilterToCookie<T extends { pageIndex: number }>(filter: T, cookieName: string) {
  const cookieStore = await cookies();
  filter.pageIndex = 0;

  cookieStore.set({
    name: cookieName,
    value: JSON.stringify(filter),
    maxAge: 150
  });
}

export async function getFilterFromCookie<T>(cookieName: string, defaultValue: T) {
  const cookieStore = await cookies();

  const value = cookieStore.get(cookieName)?.value;
  if (value) {
    return JSON.parse(value) as T;
  }

  return defaultValue;
}
