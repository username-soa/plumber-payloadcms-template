"use client";

import { cn } from "@/lib/utils";
import {
	Play,
	Pause,
	Volume2,
	VolumeX,
	Volume1,
	RotateCcw,
	Minimize2,
	Maximize2,
	PictureInPicture,
	PictureInPicture2,
} from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatTime } from "../utils";

interface VideoControlsProps {
	isPlaying: boolean;
	isEnded: boolean;
	isMuted: boolean;
	volume: number;
	currentTime: number;
	duration: number;
	isFullscreen: boolean;
	isPiP: boolean;
	onTogglePlay: () => void;
	onToggleMute: () => void;
	onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onToggleFullscreen: () => void;
	onTogglePiP: () => void;
}

export function VideoControls({
	isPlaying,
	isEnded,
	isMuted,
	volume,
	currentTime,
	duration,
	isFullscreen,
	isPiP,
	onTogglePlay,
	onToggleMute,
	onVolumeChange,
	onToggleFullscreen,
	onTogglePiP,
}: VideoControlsProps) {
	return (
		<div className="flex items-center justify-between md:px-4 px-2 pb-2.5">
			{/* Left Controls */}
			<div className="flex items-center">
				{/* Play/Pause */}
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							onClick={onTogglePlay}
							className="text-white bg-gray-950/20 backdrop-blur-sm rounded-full p-1"
							aria-label={isEnded ? "Replay" : isPlaying ? "Pause" : "Play"}
						>
							<div className="p-2 hover:bg-gray-400/30 rounded-full transition-colors">
								{isEnded ? (
									<RotateCcw className="w-6 h-6" />
								) : isPlaying ? (
									<Pause className="w-6 h-6" fill="currentColor" />
								) : (
									<Play className="w-6 h-6" fill="currentColor" />
								)}
							</div>
						</button>
					</TooltipTrigger>
					<TooltipContent
						side="top"
						sideOffset={26}
						className="bg-gray-950/20 backdrop-blur-sm border-gray-700/50 text-white flex items-center gap-1.5 py-1 px-2"
					>
						<span className="drop-shadow-md">
							{isEnded ? "Replay" : isPlaying ? "Pause" : "Play"}
						</span>
						{!isEnded && (
							<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
								k
							</kbd>
						)}
					</TooltipContent>
				</Tooltip>

				{/* Volume Group */}
				<div className="ml-1 bg-gray-950/20 backdrop-blur-sm rounded-full p-1">
					<div className="flex items-center justify-center group/volume p-1.5 hover:bg-gray-400/30 rounded-full transition-colors">
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									type="button"
									onClick={onToggleMute}
									className="text-white transition-colors"
									aria-label={isMuted ? "Unmute" : "Mute"}
								>
									{isMuted || volume === 0 ? (
										<VolumeX className="w-5 h-5" />
									) : volume < 0.5 ? (
										<Volume1 className="w-5 h-5" />
									) : (
										<Volume2 className="w-5 h-5" />
									)}
								</button>
							</TooltipTrigger>
							<TooltipContent
								side="top"
								sideOffset={26}
								className="bg-gray-950/20 backdrop-blur-sm border-gray-700/50 text-white flex items-center gap-1.5 py-1 px-2"
							>
								<span className="drop-shadow-md">
									{isMuted ? "Unmute" : "Mute"}
								</span>
								<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
									m
								</kbd>
							</TooltipContent>
						</Tooltip>
						{/* Volume Slider */}
						<div
							className={cn(
								"w-0 overflow-hidden transition-all duration-200 ease-out flex items-center h-4",
								"group-hover/volume:w-16 group-hover/volume:ml-3",
							)}
						>
							<input
								type="range"
								min="0"
								max="1"
								step="0.05"
								value={isMuted ? 0 : volume}
								onChange={onVolumeChange}
								className={cn(
									"w-16 h-1 bg-white/30 rounded-full appearance-none cursor-pointer",
									"[&::-webkit-slider-thumb]:appearance-none",
									"[&::-webkit-slider-thumb]:w-3",
									"[&::-webkit-slider-thumb]:h-3",
									"[&::-webkit-slider-thumb]:rounded-full",
									"[&::-webkit-slider-thumb]:bg-white",
									"[&::-moz-range-thumb]:w-3",
									"[&::-moz-range-thumb]:h-3",
									"[&::-moz-range-thumb]:rounded-full",
									"[&::-moz-range-thumb]:bg-white",
									"[&::-moz-range-thumb]:border-none",
								)}
							/>
						</div>
					</div>
				</div>

				{/* Time Display */}
				<div className="text-white text-sm font-normal tabular-nums ml-2 bg-gray-950/20 backdrop-blur-sm rounded-full p-1">
					<div className="py-1.5 px-2.5 hover:bg-gray-400/30 rounded-full transition-colors">
						<span>{formatTime(currentTime)}</span>
						<span className="text-white/60 mx-1.5">/</span>
						<span className="text-white/60">{formatTime(duration)}</span>
					</div>
				</div>
			</div>

			{/* Right Controls */}
			<div className="flex gap-1.5 items-center bg-gray-950/20 backdrop-blur-sm rounded-full p-1">
				{/* Mini player (Picture-in-Picture) */}
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							onClick={onTogglePiP}
							className="p-1.5 text-white transition-colors hover:bg-gray-400/30 rounded-full cursor-pointer"
							aria-label={isPiP ? "Exit mini player" : "Mini player"}
						>
							{isPiP ? (
								<PictureInPicture className="w-5 h-5" />
							) : (
								<PictureInPicture2 className="w-5 h-5" />
							)}
						</button>
					</TooltipTrigger>
					<TooltipContent
						side="top"
						sideOffset={26}
						className="bg-gray-950/20 backdrop-blur-sm border-gray-700/50 text-white flex items-center gap-1.5 py-1 px-2"
					>
						<span className="drop-shadow-md">
							{isPiP ? "Exit mini player" : "Mini player"}
						</span>
						<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
							i
						</kbd>
					</TooltipContent>
				</Tooltip>

				{/* Fullscreen */}
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							onClick={onToggleFullscreen}
							className="p-1.5 text-white transition-colors hover:bg-gray-400/30 rounded-full cursor-pointer"
							aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
						>
							{isFullscreen ? (
								<Minimize2 className="w-5 h-5" />
							) : (
								<Maximize2 className="w-5 h-5" />
							)}
						</button>
					</TooltipTrigger>
					<TooltipContent
						side="top"
						sideOffset={26}
						className="bg-gray-950/20 backdrop-blur-sm border-gray-700/50 text-white flex items-center gap-1.5 py-1 px-2"
					>
						<span className="drop-shadow-md">
							{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
						</span>
						<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
							f
						</kbd>
					</TooltipContent>
				</Tooltip>
			</div>
		</div>
	);
}
