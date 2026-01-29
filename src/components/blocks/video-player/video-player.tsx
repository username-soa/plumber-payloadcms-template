"use client";

import { useRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { VideoPlayerProps } from "./types";
import {
	useVideoPlayer,
	useVideoProgress,
	useControlsVisibility,
	useFullscreen,
	useKeyboardShortcuts,
} from "./hooks";
import { PlayOverlay, VideoProgressBar, VideoControls } from "./components";

export function VideoPlayer({
	src,
	poster,
	className,
	autoplay = false,
	loop = false,
	muted: initialMuted = false,
}: VideoPlayerProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	// Core video state and actions
	const { videoRef, state, actions } = useVideoPlayer({
		initialMuted,
		autoplay,
	});

	// Track drag state for controls visibility
	const [isDraggingProgress, setIsDraggingProgress] = useState(false);

	// Controls visibility
	const { showControls, resetControlsTimeout, handleMouseLeave } =
		useControlsVisibility({
			isPlaying: state.isPlaying,
			isDragging: isDraggingProgress,
		});

	// Progress bar
	const {
		progressRef,
		isDragging,
		handleProgressMouseDown,
		handleProgressTouchStart,
		handleKeyDown: handleProgressKeyDown,
	} = useVideoProgress({
		videoRef,
		duration: state.duration,
		onDragStateChange: setIsDraggingProgress,
	});

	// Fullscreen and PiP
	const { isFullscreen, isPiP, toggleFullscreen, togglePiP } = useFullscreen({
		containerRef,
		videoRef,
	});

	// Keyboard shortcuts
	useKeyboardShortcuts({
		containerRef,
		togglePlay: actions.togglePlay,
		toggleMute: actions.toggleMute,
		toggleFullscreen,
		togglePiP,
	});

	// Calculate progress percentages
	const progress =
		state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;
	const bufferedProgress =
		state.duration > 0 ? (state.buffered / state.duration) * 100 : 0;

	// Video click handler
	const handleVideoClick = useCallback(() => {
		actions.togglePlay();
	}, [actions]);

	// Video keyboard handler
	const handleVideoKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLVideoElement>) => {
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				actions.togglePlay();
			}
		},
		[actions],
	);

	return (
		<TooltipProvider delayDuration={300}>
			<section
				ref={containerRef}
				aria-label="Video player"
				tabIndex={-1}
				className={cn(
					"relative rounded-xl overflow-hidden border border-border bg-black group focus:outline-none my-6",
					isFullscreen &&
						"rounded-none border-none w-screen h-screen flex items-center justify-center",
					className,
				)}
				onMouseMove={resetControlsTimeout}
				onMouseLeave={handleMouseLeave}
			>
				{/* Video Element */}
				<video
					ref={videoRef}
					src={src}
					poster={poster}
					autoPlay={autoplay}
					loop={loop}
					muted={initialMuted}
					playsInline
					tabIndex={0}
					className={cn(
						"w-full cursor-pointer focus:outline-none",
						isFullscreen ? "h-full object-contain" : "h-auto max-h-[600px]",
					)}
					onClick={handleVideoClick}
					onKeyDown={handleVideoKeyDown}
				/>

				{/* Center Play/Pause Button Overlay */}
				<PlayOverlay
					isPlaying={state.isPlaying}
					isEnded={state.isEnded}
					showControls={showControls}
					onTogglePlay={actions.togglePlay}
				/>

				{/* Bottom Controls */}
				<div
					className={cn(
						"absolute bottom-0 left-0 right-0 z-10",
						"bg-linear-to-t from-black/90 via-black/50 to-transparent",
						"transition-opacity duration-300",
						showControls || !state.isPlaying
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none",
					)}
				>
					{/* Progress Bar */}
					<VideoProgressBar
						progress={progress}
						bufferedProgress={bufferedProgress}
						isDragging={isDragging}
						progressRef={progressRef}
						onMouseDown={handleProgressMouseDown}
						onTouchStart={handleProgressTouchStart}
						onKeyDown={handleProgressKeyDown}
					/>

					{/* Controls Row */}
					<VideoControls
						isPlaying={state.isPlaying}
						isEnded={state.isEnded}
						isMuted={state.isMuted}
						volume={state.volume}
						currentTime={state.currentTime}
						duration={state.duration}
						isFullscreen={isFullscreen}
						isPiP={isPiP}
						onTogglePlay={actions.togglePlay}
						onToggleMute={actions.toggleMute}
						onVolumeChange={actions.handleVolumeChange}
						onToggleFullscreen={toggleFullscreen}
						onTogglePiP={togglePiP}
					/>
				</div>
			</section>
		</TooltipProvider>
	);
}
