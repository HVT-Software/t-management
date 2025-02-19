import { useLocalStorage } from "./useLocalStorage";

export function useSettings<T = any>(name: string, initialValue: T) {
  return useLocalStorage<T>(`settings:${name}`, initialValue);
}
