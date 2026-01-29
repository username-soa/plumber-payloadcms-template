"use client";

import type { RefObject } from "react";

export interface VideoPlayerProps {
	src: string;
	poster?: string;
	className?: string;
	autoplay?: boolean;
	loop?: boolean;
	muted?: boolean;
}

export interface VideoState {
	isPlaying: boolean;
	currentTime: number;
	duration: number;
	buffered: number;
	isMuted: boolean;
	volume: number;
	isFullscreen: boolean;
	showControls: boolean;
	isDragging: boolean;
	isEnded: boolean;
	isPiP: boolean;
}

export interface VideoRefs {
	videoRef: RefObject<HTMLVideoElement | null>;
	containerRef: RefObject<HTMLDivElement | null>;
	progressRef: RefObject<HTMLDivElement | null>;
}

export interface VideoActions {
	togglePlay: () => void;
	toggleMute: () => void;
	toggleFullscreen: () => Promise<void>;
	togglePiP: () => Promise<void>;
	handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	seek: (time: number) => void;
}

export interface ProgressBarProps {
	progress: number;
	bufferedProgress: number;
	duration: number;
	isDragging: boolean;
	onSeek: (clientX: number) => void;
	onDragStart: () => void;
	onDragEnd: () => void;
	progressRef: RefObject<HTMLDivElement | null>;
}

export interface ControlButtonProps {
	onClick: () => void;
	ariaLabel: string;
	tooltipText: string;
	shortcutKey?: string;
	icon: React.ReactNode;
	className?: string;
}
