import { useSessionStorage } from "@hooks/useSessionStorage";

export type Language = string;

export function useData(type: Language) {
  return type ? useSessionStorage(`data:${type}`, json) : [,];
}


export const json = JSON.stringify(
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false
  },
  null,
  2
);
