"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion, useMotionValue, animate } from "motion/react";
import { cn } from "@/lib/utils";
import { THEME_CONFIG } from "@/lib/theme-config";
import { Droplets, Wrench, CircleDot, Waves, Briefcase } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function ThemeSwitcher() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const ref = React.useRef<HTMLDivElement>(null);
	const isDraggingRef = React.useRef(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	const themes = [
		{
			name: "system",
			label: "System",
			icon: Droplets,
			activeColor: "bg-blue-500 text-white",
		},
		{
			name: "industrial",
			label: "Industrial",
			icon: Wrench,
			activeColor: "bg-orange-600 text-white",
		},
		{
			name: "copper",
			label: "Copper",
			icon: CircleDot,
			activeColor: "bg-orange-700 text-white",
		},
		{
			name: "ocean",
			label: "Ocean",
			icon: Waves,
			activeColor: "bg-teal-600 text-white",
		},
		{
			name: "professional",
			label: "Professional",
			icon: Briefcase,
			activeColor: "bg-[#1e3a5f] text-amber-400",
		},
	];

	// Find current theme object to show its icon
	const currentTheme = themes.find((t) => t.name === theme) || themes[0];
	const CurrentIcon = currentTheme.icon;

	if (!mounted || !THEME_CONFIG.showSwitcher) {
		return null;
	}

	const handleDragEnd = () => {
		// Reset dragging state after a small delay to prevent click triggering
		setTimeout(() => {
			isDraggingRef.current = false;
		}, 150);

		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const winW = window.innerWidth;
		const winH = window.innerHeight;
		const padding = 24;

		// Calculate distances to edges
		const distLeft = rect.left;
		const distRight = winW - rect.right;
		const distTop = rect.top;
		const distBottom = winH - rect.bottom;

		const minDist = Math.min(distLeft, distRight, distTop, distBottom);

		let targetX = x.get();
		let targetY = y.get();

		// Determine snap target
		// We adjust the MOTION VALUE (x/y), which is the delta from the CSS origin.
		// NewVal = CurrentVal + (TargetScreenPos - CurrentScreenPos)

		if (minDist === distLeft) {
			// Snap to Left
			targetX = x.get() + (padding - rect.left);
			// Clamp Y
			const clampedTop = Math.max(
				padding,
				Math.min(rect.top, winH - padding - rect.height),
			);
			targetY = y.get() + (clampedTop - rect.top);
		} else if (minDist === distRight) {
			// Snap to Right
			targetX = x.get() + (winW - padding - rect.width - rect.left);
			// Clamp Y
			const clampedTop = Math.max(
				padding,
				Math.min(rect.top, winH - padding - rect.height),
			);
			targetY = y.get() + (clampedTop - rect.top);
		} else if (minDist === distTop) {
			// Snap to Top
			targetY = y.get() + (padding - rect.top);
			// Clamp X
			const clampedLeft = Math.max(
				padding,
				Math.min(rect.left, winW - padding - rect.width),
			);
			targetX = x.get() + (clampedLeft - rect.left);
		} else {
			// Snap to Bottom
			targetY = y.get() + (winH - padding - rect.height - rect.top);
			// Clamp X
			const clampedLeft = Math.max(
				padding,
				Math.min(rect.left, winW - padding - rect.width),
			);
			targetX = x.get() + (clampedLeft - rect.left);
		}

		animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
		animate(y, targetY, { type: "spring", stiffness: 300, damping: 30 });
	};

	return (
		<div className="fixed bottom-6 right-6 z-9999">
			<motion.div
				ref={ref}
				style={{ x, y }}
				drag
				dragMomentum={false}
				onDragStart={() => {
					isDraggingRef.current = true;
				}}
				onDragEnd={handleDragEnd}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				className="cursor-grab active:cursor-grabbing"
			>
				<Popover>
					<PopoverTrigger asChild>
						<button
							type="button"
							onClick={(e) => {
								if (isDraggingRef.current) {
									e.preventDefault();
									e.stopPropagation();
								}
							}}
							className="h-10 w-10 rounded-full text-white shadow-xl border border-gray-500 flex items-center justify-center transition-colors bg-black"
						>
							<CurrentIcon className="w-4 h-4" />
							<span className="sr-only">Toggle theme</span>
						</button>
					</PopoverTrigger>
					<PopoverContent
						side="top"
						className="w-auto p-1 bg-neutral-950 border-neutral-800"
						align="center"
					>
						<div className="flex flex-col gap-1">
							{themes.map((t) => {
								const Icon = t.icon;
								const isActive = t.name === theme;
								return (
									<button
										key={t.name}
										type="button"
										onClick={() => setTheme(t.name)}
										className={cn(
											"flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs transition-colors hover:bg-neutral-800 text-neutral-400 font-medium",
											isActive && cn("shadow-sm", t.activeColor),
										)}
									>
										<Icon className="w-3.5 h-3.5" />
										<span>{t.label}</span>
									</button>
								);
							})}
						</div>
					</PopoverContent>
				</Popover>
			</motion.div>
		</div>
	);
}
