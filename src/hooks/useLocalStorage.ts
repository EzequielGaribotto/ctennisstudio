import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        const parsedValue = JSON.parse(stored);
        if (JSON.stringify(parsedValue) !== JSON.stringify(value)) {
          setValue(parsedValue);
        }
      }
    } catch (error) {
      console.warn(`Failed to load ${key} from localStorage:`, error);
    }
  }, [key, value]);

  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.warn(`Failed to save ${key} to localStorage:`, error);
      setValue(newValue);
    }
  };

  return [value, setStoredValue];
}
