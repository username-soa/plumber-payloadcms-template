"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { calculateSeekPosition } from "../utils";

interface UseVideoProgressOptions {
	videoRef: React.RefObject<HTMLVideoElement | null>;
	duration: number;
	onDragStateChange?: (isDragging: boolean) => void;
}

interface UseVideoProgressReturn {
	progressRef: React.RefObject<HTMLDivElement | null>;
	isDragging: boolean;
	handleProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	handleProgressMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
	handleProgressTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
	handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export function useVideoProgress(
	options: UseVideoProgressOptions,
): UseVideoProgressReturn {
	const { videoRef, duration, onDragStateChange } = options;

	const progressRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);

	const seekTo = useCallback(
		(clientX: number) => {
			const video = videoRef.current;
			const progressBar = progressRef.current;
			if (!video) return;

			const seekTime = calculateSeekPosition(clientX, progressBar, duration);
			if (seekTime >= 0) {
				video.currentTime = seekTime;
			}
		},
		[videoRef, duration],
	);

	const handleProgressClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			seekTo(e.clientX);
		},
		[seekTo],
	);

	const handleProgressMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(true);
			onDragStateChange?.(true);
			seekTo(e.clientX);
		},
		[seekTo, onDragStateChange],
	);

	const handleProgressTouchStart = useCallback(
		(e: React.TouchEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(true);
			onDragStateChange?.(true);
			if (e.touches.length > 0) {
				seekTo(e.touches[0].clientX);
			}
		},
		[seekTo, onDragStateChange],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const video = videoRef.current;
			if (!video) return;

			const step = duration * 0.05;
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				video.currentTime = Math.max(0, video.currentTime - step);
			} else if (e.key === "ArrowRight") {
				e.preventDefault();
				video.currentTime = Math.min(duration, video.currentTime + step);
			}
		},
		[videoRef, duration],
	);

	// Global mouse/touch move and up handlers for dragging
	useEffect(() => {
		if (!isDragging) return;

		const handleMouseMove = (e: MouseEvent) => {
			seekTo(e.clientX);
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (e.touches.length > 0) {
				seekTo(e.touches[0].clientX);
			}
		};

		const handleEnd = () => {
			setIsDragging(false);
			onDragStateChange?.(false);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleEnd);
		document.addEventListener("touchmove", handleTouchMove);
		document.addEventListener("touchend", handleEnd);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleEnd);
			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("touchend", handleEnd);
		};
	}, [isDragging, seekTo, onDragStateChange]);

	return {
		progressRef,
		isDragging,
		handleProgressClick,
		handleProgressMouseDown,
		handleProgressTouchStart,
		handleKeyDown,
	};
}
