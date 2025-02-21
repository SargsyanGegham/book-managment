import { useState, useEffect } from 'react';

/**
 * Custom React hook that returns a debounced value.
 * The value is updated only after the specified delay has passed 
 * since the last change.
 *
 * @param <T> - The type of the value.
 * @param value - The input value to be debounced.
 * @param delay - The debounce delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
