"use client";

import { useEffect } from "react";

interface UseKeyboardShortcutsOptions {
	containerRef: React.RefObject<HTMLDivElement | null>;
	togglePlay: () => void;
	toggleMute: () => void;
	toggleFullscreen: () => Promise<void>;
	togglePiP: () => Promise<void>;
}

export function useKeyboardShortcuts(
	options: UseKeyboardShortcutsOptions,
): void {
	const { containerRef, togglePlay, toggleMute, toggleFullscreen, togglePiP } =
		options;

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			// Only handle if the container or its children are focused
			if (
				!container.contains(document.activeElement) &&
				document.activeElement !== container
			) {
				return;
			}

			// Ignore if user is typing in an input
			const target = e.target as HTMLElement;
			if (
				target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.isContentEditable
			) {
				return;
			}

			switch (e.key.toLowerCase()) {
				case " ":
				case "k":
					e.preventDefault();
					togglePlay();
					break;
				case "m":
					e.preventDefault();
					toggleMute();
					break;
				case "f":
					e.preventDefault();
					toggleFullscreen();
					break;
				case "i":
					e.preventDefault();
					togglePiP();
					break;
			}
		};

		container.addEventListener("keydown", handleKeyDown);
		return () => {
			container.removeEventListener("keydown", handleKeyDown);
		};
	}, [containerRef, togglePlay, toggleMute, toggleFullscreen, togglePiP]);
}
