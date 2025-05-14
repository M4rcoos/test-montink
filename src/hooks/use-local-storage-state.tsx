
import { useState, useEffect, useCallback } from "react";

interface StorageItem<T> {
  value: T;
  expiry: number;
}

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
  ttl = 15 * 60 * 1000 // 15 minutes in milliseconds
): [T, (value: T | ((val: T) => T)) => void] {
  // Get stored value
  const readValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsedItem: StorageItem<T> = JSON.parse(item);
        const now = new Date().getTime();

        if (now < parsedItem.expiry) {
          return parsedItem.value;
        } else {
          window.localStorage.removeItem(key);
        }
      }
      return initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Update local storage when state changes
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        const expiry = new Date().getTime() + ttl;
        const item: StorageItem<T> = {
          value: valueToStore,
          expiry: expiry,
        };

        window.localStorage.setItem(key, JSON.stringify(item));
        setStoredValue(valueToStore);
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue, ttl]
  );

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue, setValue];
}
