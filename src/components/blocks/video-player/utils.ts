/**
 * Formats seconds into a time string (M:SS or H:MM:SS)
 */
export function formatTime(seconds: number): string {
	if (Number.isNaN(seconds) || !Number.isFinite(seconds)) return "0:00";
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Calculates the seek position from a client X coordinate
 */
export function calculateSeekPosition(
	clientX: number,
	progressBar: HTMLDivElement | null,
	duration: number,
): number {
	if (!progressBar || !duration) return -1;

	const rect = progressBar.getBoundingClientRect();
	const pos = (clientX - rect.left) / rect.width;
	return Math.max(0, Math.min(1, pos)) * duration;
}
