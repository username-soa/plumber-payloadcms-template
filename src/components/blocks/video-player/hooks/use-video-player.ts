"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseVideoPlayerOptions {
	initialMuted?: boolean;
	autoplay?: boolean;
}

interface VideoPlayerState {
	isPlaying: boolean;
	currentTime: number;
	duration: number;
	buffered: number;
	isMuted: boolean;
	volume: number;
	isEnded: boolean;
}

interface VideoPlayerActions {
	togglePlay: () => void;
	toggleMute: () => void;
	handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	seek: (time: number) => void;
}

interface UseVideoPlayerReturn {
	videoRef: React.RefObject<HTMLVideoElement | null>;
	state: VideoPlayerState;
	actions: VideoPlayerActions;
}

export function useVideoPlayer(
	options: UseVideoPlayerOptions = {},
): UseVideoPlayerReturn {
	const { initialMuted = false } = options;

	const videoRef = useRef<HTMLVideoElement>(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [buffered, setBuffered] = useState(0);
	const [isMuted, setIsMuted] = useState(initialMuted);
	const [volume, setVolume] = useState(1);
	const [isEnded, setIsEnded] = useState(false);

	// Video event handlers
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleTimeUpdate = () => {
			setCurrentTime(video.currentTime);
			if (video.buffered.length > 0) {
				setBuffered(video.buffered.end(video.buffered.length - 1));
			}
		};

		const handleLoadedMetadata = () => {
			setDuration(video.duration);
		};

		const handleDurationChange = () => {
			if (video.duration && Number.isFinite(video.duration)) {
				setDuration(video.duration);
			}
		};

		const handlePlay = () => {
			setIsPlaying(true);
			setIsEnded(false);
		};

		const handlePause = () => {
			setIsPlaying(false);
		};

		const handleEnded = () => {
			setIsPlaying(false);
			setIsEnded(true);
		};

		// Check if video already has duration (metadata already loaded)
		if (video.duration && Number.isFinite(video.duration)) {
			setDuration(video.duration);
		}

		video.addEventListener("timeupdate", handleTimeUpdate);
		video.addEventListener("loadedmetadata", handleLoadedMetadata);
		video.addEventListener("durationchange", handleDurationChange);
		video.addEventListener("play", handlePlay);
		video.addEventListener("pause", handlePause);
		video.addEventListener("ended", handleEnded);

		return () => {
			video.removeEventListener("timeupdate", handleTimeUpdate);
			video.removeEventListener("loadedmetadata", handleLoadedMetadata);
			video.removeEventListener("durationchange", handleDurationChange);
			video.removeEventListener("play", handlePlay);
			video.removeEventListener("pause", handlePause);
			video.removeEventListener("ended", handleEnded);
		};
	}, []);

	const togglePlay = useCallback(() => {
		const video = videoRef.current;
		if (!video) return;

		if (isEnded) {
			video.currentTime = 0;
			video.play();
		} else if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	}, [isEnded]);

	const toggleMute = useCallback(() => {
		const video = videoRef.current;
		if (!video) return;

		video.muted = !video.muted;
		setIsMuted(!isMuted);
	}, [isMuted]);

	const handleVolumeChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const video = videoRef.current;
			if (!video) return;

			const newVolume = Number.parseFloat(e.target.value);
			video.volume = newVolume;
			setVolume(newVolume);
			setIsMuted(newVolume === 0);
			video.muted = newVolume === 0;
		},
		[],
	);

	const seek = useCallback((time: number) => {
		const video = videoRef.current;
		if (!video) return;
		video.currentTime = time;
	}, []);

	return {
		videoRef,
		state: {
			isPlaying,
			currentTime,
			duration,
			buffered,
			isMuted,
			volume,
			isEnded,
		},
		actions: {
			togglePlay,
			toggleMute,
			handleVolumeChange,
			seek,
		},
	};
}
