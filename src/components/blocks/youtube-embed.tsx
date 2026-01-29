"use client";

import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
	/** YouTube video ID or full URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID) */
	id: string;
	platform?: "youtube" | "vimeo";
	title?: string;
	className?: string;
}

/**
 * Extracts the YouTube video ID from various URL formats.
 * Also accepts a plain video ID for backwards compatibility.
 */
function extractVideoId(input: string): string | null {
	if (!input) return null;

	// If it's already just a video ID (11 characters for YouTube)
	if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
		return input;
	}

	try {
		const urlObj = new URL(input);
		const hostname = urlObj.hostname.replace(/^www\./, "");

		// Standard YouTube URL: youtube.com/watch?v=VIDEO_ID
		if (hostname === "youtube.com" || hostname === "youtube-nocookie.com") {
			const videoId = urlObj.searchParams.get("v");
			if (videoId) return videoId;

			// Embed URL: youtube.com/embed/VIDEO_ID
			const embedMatch = urlObj.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
			if (embedMatch) return embedMatch[1];
		}

		// Short URL: youtu.be/VIDEO_ID
		if (hostname === "youtu.be") {
			const videoId = urlObj.pathname.slice(1);
			if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
				return videoId;
			}
		}
	} catch {
		// If URL parsing fails, return null
		return null;
	}

	return null;
}

export function YouTubeEmbed({
	id,
	platform = "youtube",
	title = "Embedded Video",
	className,
}: YouTubeEmbedProps) {
	// Extract video ID from URL or use as-is
	const videoId = platform === "youtube" ? extractVideoId(id) : id;

	// YouTube URL structure
	const ytSrc = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
	// Vimeo URL structure
	const vimeoSrc = `https://player.vimeo.com/video/${id}`;

	const src = platform === "youtube" ? ytSrc : vimeoSrc;

	if (!src) {
		return (
			<div
				className={cn(
					"relative w-full rounded-xl overflow-hidden border border-red-300 bg-red-50 dark:bg-red-950/30 aspect-video my-6 flex items-center justify-center",
					className,
				)}
			>
				<p className="text-red-600 dark:text-red-400">
					Invalid YouTube URL or video ID
				</p>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"relative w-full rounded-xl overflow-hidden border border-border bg-black aspect-video my-6",
				className,
			)}
		>
			<iframe
				src={src}
				title={title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				className="absolute top-0 left-0 w-full h-full"
			/>
		</div>
	);
}
