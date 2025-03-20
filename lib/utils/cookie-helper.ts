import { instanceToPlain } from "class-transformer";
import { cookies } from "next/headers";
import "server-only";

export const saveToCookie = async <T>(key: string, data: T) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: key,
    value: JSON.stringify(instanceToPlain(data)),
    maxAge: 150
  });
};

export const getFromCookie = async <T>(key: string) => {
  const cookieStore = await cookies();

  const value = cookieStore.get(key)?.value;
  if (value) {
    return JSON.parse(value) as T;
  }

  return {} as T;
};
