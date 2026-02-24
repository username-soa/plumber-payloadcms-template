"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Briefcase, CircleDot, Droplets, Waves, Wrench } from "lucide-react";
import { animate, motion, useMotionValue } from "motion/react";
import { useTheme } from "next-themes";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { THEME_CONFIG } from "@/lib/theme-config";
import { cn } from "@/lib/utils";

const THEMES = [
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
] as const;

const SNAP_PADDING = 24;
const DRAG_TIMEOUT = 150;

export function ThemeSwitcher() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const dragRef = useRef<HTMLDivElement>(null);
	const isDraggingRef = useRef(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleDragEnd = useCallback(() => {
		// Reset dragging state after a small delay to prevent click triggering
		const timer = setTimeout(() => {
			isDraggingRef.current = false;
		}, DRAG_TIMEOUT);

		if (!dragRef.current) return;

		const rect = dragRef.current.getBoundingClientRect();
		const winW = window.innerWidth;
		const winH = window.innerHeight;

		// Calculate distances to edges
		const distLeft = rect.left;
		const distRight = winW - rect.right;
		const distTop = rect.top;
		const distBottom = winH - rect.bottom;

		const minDist = Math.min(distLeft, distRight, distTop, distBottom);

		let targetX = x.get();
		let targetY = y.get();

		// Pre-calculate clamped values to keep within screen bounds
		const clampedY = Math.max(
			SNAP_PADDING,
			Math.min(rect.top, winH - SNAP_PADDING - rect.height),
		);
		const clampedX = Math.max(
			SNAP_PADDING,
			Math.min(rect.left, winW - SNAP_PADDING - rect.width),
		);

		// Determine snap target
		switch (minDist) {
			case distLeft:
				targetX += SNAP_PADDING - rect.left;
				targetY += clampedY - rect.top;
				break;
			case distRight:
				targetX += winW - SNAP_PADDING - rect.width - rect.left;
				targetY += clampedY - rect.top;
				break;
			case distTop:
				targetY += SNAP_PADDING - rect.top;
				targetX += clampedX - rect.left;
				break;
			case distBottom:
				targetY += winH - SNAP_PADDING - rect.height - rect.top;
				targetX += clampedX - rect.left;
				break;
		}

		animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
		animate(y, targetY, { type: "spring", stiffness: 300, damping: 30 });

		return () => clearTimeout(timer);
	}, [x, y]);

	if (!mounted || !THEME_CONFIG.showSwitcher) {
		return null;
	}

	const currentTheme = THEMES.find((t) => t.name === theme) || THEMES[0];
	const CurrentIcon = currentTheme.icon;

	return (
		<div className="fixed bottom-6 right-6 z-9999">
			<motion.div
				ref={dragRef}
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
							className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-500 bg-black text-white shadow-xl transition-colors"
						>
							<CurrentIcon className="h-4 w-4" />
							<span className="sr-only">Toggle theme</span>
						</button>
					</PopoverTrigger>
					<PopoverContent
						side="top"
						align="center"
						className="w-auto border-neutral-800 bg-neutral-950 p-1"
					>
						<div className="flex flex-col gap-1">
							{THEMES.map((t) => {
								const Icon = t.icon;
								const isActive = t.name === theme;

								return (
									<button
										key={t.name}
										type="button"
										onClick={() => setTheme(t.name)}
										className={cn(
											"flex items-center gap-2 rounded-sm px-3 py-1.5 text-xs font-medium text-neutral-400 transition-colors hover:bg-neutral-800",
											isActive && cn("shadow-sm", t.activeColor),
										)}
									>
										<Icon className="h-3.5 w-3.5" />
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
