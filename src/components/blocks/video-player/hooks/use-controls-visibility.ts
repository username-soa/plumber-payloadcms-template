"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseControlsVisibilityOptions {
	isPlaying: boolean;
	isDragging: boolean;
	hideDelay?: number;
}

interface UseControlsVisibilityReturn {
	showControls: boolean;
	resetControlsTimeout: () => void;
	handleMouseLeave: () => void;
}

export function useControlsVisibility(
	options: UseControlsVisibilityOptions,
): UseControlsVisibilityReturn {
	const { isPlaying, isDragging, hideDelay = 3000 } = options;

	const [showControls, setShowControls] = useState(true);
	const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

	const resetControlsTimeout = useCallback(() => {
		if (hideControlsTimeout.current) {
			clearTimeout(hideControlsTimeout.current);
		}
		setShowControls(true);

		if (isPlaying && !isDragging) {
			hideControlsTimeout.current = setTimeout(() => {
				setShowControls(false);
			}, hideDelay);
		}
	}, [isPlaying, isDragging, hideDelay]);

	const handleMouseLeave = useCallback(() => {
		if (isPlaying && !isDragging) {
			setShowControls(false);
		}
	}, [isPlaying, isDragging]);

	// Initialize and cleanup timeout
	useEffect(() => {
		resetControlsTimeout();
		return () => {
			if (hideControlsTimeout.current) {
				clearTimeout(hideControlsTimeout.current);
			}
		};
	}, [resetControlsTimeout]);

	// Show controls when video ends
	useEffect(() => {
		if (!isPlaying && !isDragging) {
			setShowControls(true);
		}
	}, [isPlaying, isDragging]);

	return {
		showControls,
		resetControlsTimeout,
		handleMouseLeave,
	};
}
