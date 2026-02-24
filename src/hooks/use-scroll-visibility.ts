"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollVisibilityOptions {
	/** Pixels to scroll before visibility changes (default: 50) */
	threshold?: number;
	/** Pixels from top where element is always visible (default: 10) */
	topOffset?: number;
}

/**
 * Custom hook for scroll-aware visibility.
 * Returns true when scrolling up (or at top), false when scrolling down.
 */
export function useScrollVisibility(options: UseScrollVisibilityOptions = {}) {
	const { threshold = 50, topOffset = 10 } = options;

	const [isVisible, setIsVisible] = useState(true);
	const lastScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollDifference = currentScrollY - lastScrollY.current;

			// Only hide/show if we've scrolled past the threshold
			if (scrollDifference > threshold) {
				// Scrolling down past threshold - hide
				setIsVisible(false);
				lastScrollY.current = currentScrollY;
			} else if (scrollDifference < -threshold) {
				// Scrolling up past threshold - show
				setIsVisible(true);
				lastScrollY.current = currentScrollY;
			}

			// Always visible at top of page
			if (currentScrollY < topOffset) {
				setIsVisible(true);
				lastScrollY.current = 0;
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [threshold, topOffset]);

	return isVisible;
}
