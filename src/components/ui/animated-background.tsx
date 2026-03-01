"use client";

import type React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedBackgroundProps {
	decoration?: "none" | "dots" | null;
	animation?: "none" | "active" | string | null;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
	decoration,
	animation,
}) => {
	if (!decoration || decoration === "none") return null;

	const isDots = decoration === "dots";

	const baseStyle = isDots
		? {
				backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
				backgroundSize: "40px 40px",
			}
		: {};

	// Apply all animations if it's active! (including legacy "panning" string if hardcoded)
	const isAnimated = animation && animation !== "none";

	return (
		<div
			className="absolute inset-0 overflow-hidden pointer-events-none z-0"
			style={{
				maskImage:
					"radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)",
				WebkitMaskImage:
					"radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)",
			}}
		>
			<div
				className={cn(
					"absolute text-foreground/20 w-full h-full left-0 top-0",
					isAnimated && "animate-pan-bg animate-pulse",
				)}
				style={{
					...baseStyle,
					...(isAnimated ? { backgroundAttachment: "fixed" } : {}),
				}}
			/>
		</div>
	);
};
