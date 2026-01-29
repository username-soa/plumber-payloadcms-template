"use client";

import { cn } from "@/lib/utils";
import { Play, Pause, RotateCcw } from "lucide-react";

interface PlayOverlayProps {
	isPlaying: boolean;
	isEnded: boolean;
	showControls: boolean;
	onTogglePlay: () => void;
}

export function PlayOverlay({
	isPlaying,
	isEnded,
	showControls,
	onTogglePlay,
}: PlayOverlayProps) {
	return (
		<div
			className={cn(
				"absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300",
				showControls || !isPlaying ? "opacity-100" : "opacity-0",
			)}
		>
			<button
				type="button"
				onClick={onTogglePlay}
				className={cn(
					"pointer-events-auto",
					"w-16 h-16 md:w-20 md:h-20 rounded-full",
					"flex items-center justify-center",
					"bg-white/20 backdrop-blur-xl border border-white/30",
					"text-white shadow-2xl",
					"hover:bg-white/30 hover:scale-105",
					"active:scale-95",
					"transition-all duration-200",
				)}
				aria-label={isEnded ? "Replay" : isPlaying ? "Pause" : "Play"}
			>
				{isEnded ? (
					<RotateCcw className="w-7 h-7 md:w-8 md:h-8" />
				) : isPlaying ? (
					<Pause className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" />
				) : (
					<Play className="w-7 h-7 md:w-8 md:h-8 ml-1" fill="currentColor" />
				)}
			</button>
		</div>
	);
}
