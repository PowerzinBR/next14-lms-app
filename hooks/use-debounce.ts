import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay?: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}