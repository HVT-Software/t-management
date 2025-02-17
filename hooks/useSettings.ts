import { useLocalStorage } from "./useLocalStorage";

export function useSettings(name: string, initialValue: object) {
  return useLocalStorage(`settings:${name}`, initialValue);
}
