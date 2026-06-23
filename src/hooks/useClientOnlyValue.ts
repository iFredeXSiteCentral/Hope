
'use client';

import { useState, useEffect } from 'react';

/**
 * A hook to safely use values that are only available on the client,
 * preventing hydration mismatches.
 * @param valueProvider A function that returns the client-only value.
 * @param fallbackValue The value to use during server-side rendering and initial client render.
 * @returns The client-side value after hydration, or the fallback value before.
 */
export function useClientOnlyValue<T>(valueProvider: () => T, fallbackValue: T): T {
  const [value, setValue] = useState<T>(fallbackValue);

  useEffect(() => {
    setValue(valueProvider());
  }, [valueProvider]);

  return value;
}
