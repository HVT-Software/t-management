import { useState } from "react";
import { version } from "../package.json";

const prefix = `transform:${version}:`;

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once

  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window?.localStorage.getItem(prefix + key) || initialValue;
      // Parse stored json or if none return initialValue
      return typeof item === "string" ? JSON.parse(item) : item;
    } catch {
      // If error also return initialValue
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to sessionStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      window.localStorage.setItem(prefix + key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
