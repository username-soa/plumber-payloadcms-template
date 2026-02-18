/**
 * useDebounce Hook
 *
 * Delays updating a value until a specified delay has passed without changes.
 * Useful for search inputs to avoid firing requests on every keystroke.
 *
 * @param value  - The value to debounce
 * @param delay  - Delay in milliseconds (default: 300ms)
 * @returns The debounced value, updated only after the delay has elapsed
 *
 * @example
 * const debouncedQuery = useDebounce(query, 300);
 */

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay);
		// Cleanup: cancel the timer if value or delay changes before it fires
		return () => clearTimeout(timer);
	}, [value, delay]);

	return debouncedValue;
}
