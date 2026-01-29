"use client";

import { cn } from "@/lib/utils";
import type { RefObject } from "react";

interface VideoProgressBarProps {
	progress: number;
	bufferedProgress: number;
	isDragging: boolean;
	progressRef: RefObject<HTMLDivElement | null>;
	onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
	onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
	onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export function VideoProgressBar({
	progress,
	bufferedProgress,
	isDragging,
	progressRef,
	onMouseDown,
	onTouchStart,
	onKeyDown,
}: VideoProgressBarProps) {
	return (
		<div className="px-3 group/progress">
			<div
				ref={progressRef}
				role="slider"
				tabIndex={0}
				aria-label="Video progress"
				aria-valuenow={Math.round(progress)}
				aria-valuemin={0}
				aria-valuemax={100}
				className={cn(
					"relative w-full cursor-pointer py-4 touch-none",
					"focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50",
				)}
				onMouseDown={onMouseDown}
				onTouchStart={onTouchStart}
				onKeyDown={onKeyDown}
			>
				{/* Progress Track */}
				<div
					className={cn(
						"relative w-full bg-white/30 transition-all duration-150 pointer-events-none",
						"h-1 group-hover/progress:h-1.5",
						isDragging && "h-1.5",
					)}
				>
					{/* Buffered */}
					<div
						className="absolute top-0 left-0 h-full bg-white/50"
						style={{ width: `${bufferedProgress}%` }}
					/>
					{/* Progress (Primary color) */}
					<div
						className="absolute top-0 left-0 h-full bg-primary"
						style={{ width: `${progress}%` }}
					/>
					{/* Scrubber Dot */}
					<div
						className={cn(
							"absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg",
							"scale-0 group-hover/progress:scale-100 transition-transform duration-150",
							isDragging && "scale-115",
						)}
						style={{ left: `calc(${progress}% - 6px)` }}
					/>
				</div>
			</div>
		</div>
	);
}
