"use client";

import { useCallback, useEffect, useState } from "react";

interface UseFullscreenOptions {
	containerRef: React.RefObject<HTMLDivElement | null>;
	videoRef: React.RefObject<HTMLVideoElement | null>;
}

interface UseFullscreenReturn {
	isFullscreen: boolean;
	isPiP: boolean;
	toggleFullscreen: () => Promise<void>;
	togglePiP: () => Promise<void>;
}

export function useFullscreen(
	options: UseFullscreenOptions,
): UseFullscreenReturn {
	const { containerRef, videoRef } = options;

	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isPiP, setIsPiP] = useState(false);

	// Fullscreen change listener
	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);

	// PiP event listeners
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleEnterPiP = () => setIsPiP(true);
		const handleLeavePiP = () => setIsPiP(false);

		video.addEventListener("enterpictureinpicture", handleEnterPiP);
		video.addEventListener("leavepictureinpicture", handleLeavePiP);

		return () => {
			video.removeEventListener("enterpictureinpicture", handleEnterPiP);
			video.removeEventListener("leavepictureinpicture", handleLeavePiP);
		};
	}, [videoRef]);

	const toggleFullscreen = useCallback(async () => {
		const container = containerRef.current;
		if (!container) return;

		try {
			if (!document.fullscreenElement) {
				await container.requestFullscreen();
			} else {
				await document.exitFullscreen();
			}
		} catch {
			// Fullscreen not supported or blocked
		}
	}, [containerRef]);

	const togglePiP = useCallback(async () => {
		const video = videoRef.current;
		if (!video) return;

		try {
			if (document.pictureInPictureElement === video) {
				await document.exitPictureInPicture();
			} else if (document.pictureInPictureEnabled) {
				await video.requestPictureInPicture();
			}
		} catch {
			// PiP not supported or blocked
		}
	}, [videoRef]);

	return {
		isFullscreen,
		isPiP,
		toggleFullscreen,
		togglePiP,
	};
}
