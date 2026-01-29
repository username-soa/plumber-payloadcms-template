"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassProps {
	children: React.ReactNode;
	className?: string;
	cornerRadius?: number;
	baseStrength?: number;
	extraBlur?: number;
	softness?: number;
	invert?: number;
}

/**
 * LiquidGlass - A reusable component that applies the iOS-style liquid glass effect
 *
 * @param children - Content to render inside the glass container
 * @param className - Additional classes for the container
 * @param cornerRadius - Border radius in pixels (default: 55)
 * @param baseStrength - Base blur strength (default: 14)
 * @param extraBlur - Additional blur amount (default: 2)
 * @param softness - Edge softness (default: 12)
 * @param invert - Invert percentage (default: 10)
 */
export function LiquidGlass({
	children,
	className,
	cornerRadius = 55,
	baseStrength = 14,
	extraBlur = 2,
	softness = 12,
	invert = 10,
}: LiquidGlassProps) {
	const cssVariables = {
		"--corner-radius": `${cornerRadius}px`,
		"--base-strength": `${baseStrength}px`,
		"--extra-blur": `${extraBlur}px`,
		"--softness": `${softness}px`,
		"--invert": `${invert}%`,
		"--total-strength": "calc(var(--base-strength) + var(--extra-blur))",
		"--edge-width": "calc(0.3px + (var(--softness) * 0.1))",
		"--emboss-width": "calc((var(--softness) * 0.38))",
		"--refraction-width": "calc((var(--softness) * 0.3))",
	} as React.CSSProperties;

	return (
		<div
			className={cn("liquid-glass-container", className)}
			style={cssVariables}
		>
			<div className="liquid-glass-content">{children}</div>
			<div className="liquid-glass-material">
				<div className="liquid-glass-edge-reflection" />
				<div className="liquid-glass-emboss-reflection" />
				<div className="liquid-glass-refraction" />
				<div className="liquid-glass-blur" />
				<div className="liquid-glass-blend-layers" />
				<div className="liquid-glass-blend-edge" />
				<div className="liquid-glass-highlight" />
			</div>
		</div>
	);
}
