"use client";

import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
	beforeUrl: string;
	afterUrl: string;
	beforeLabel?: string;
	afterLabel?: string;
	description?: string;
	className?: string;
}

export function BeforeAfterSlider({
	beforeUrl,
	afterUrl,
	beforeLabel = "Before",
	afterLabel = "After",
	description,
	className,
}: BeforeAfterSliderProps) {
	const [sliderPosition, setSliderPosition] = React.useState(50);

	return (
		<div className={cn("my-8", className)}>
			<div className="relative w-full aspect-video rounded-xl overflow-hidden select-none border border-border">
				{/* After Image (Background) */}
				<div className="absolute inset-0">
					<Image
						src={afterUrl}
						alt="After result"
						fill
						sizes="(max-width: 768px) 100vw, 800px"
						className="object-cover"
					/>
				</div>

				{/* Before Image (Foreground, clipped) */}
				<div
					className="absolute inset-0 overflow-hidden border-r-2 border-white/80"
					style={{ width: `${sliderPosition}%` }}
				>
					{/* Inner container with fixed width to prevent image repositioning */}
					<div
						className="absolute inset-0"
						style={{ width: `${100 / (sliderPosition / 100)}%` }}
					>
						<Image
							src={beforeUrl}
							alt="Before state"
							fill
							sizes="(max-width: 768px) 100vw, 800px"
							className="object-cover"
						/>
					</div>
				</div>

				{/* Slider Control */}
				<div className="absolute inset-0 flex items-center justify-center">
					<input
						type="range"
						min="0"
						max="100"
						value={sliderPosition}
						onChange={(e) => setSliderPosition(parseInt(e.target.value, 10))}
						className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
						aria-label="Compare before and after images"
					/>
					<div
						className="absolute h-full w-10 flex items-center justify-center pointer-events-none z-10"
						style={{ left: `calc(${sliderPosition}% - 20px)` }}
					>
						<div className="h-10 w-10 bg-white rounded-full shadow-lg flex items-center justify-center">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="text-primary"
								aria-hidden="true"
							>
								<path
									d="M18 8L22 12L18 16"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M6 8L2 12L6 16"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>
					{/* Vertical Line */}
					<div
						className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md pointer-events-none z-10"
						style={{ left: `${sliderPosition}%` }}
					/>
				</div>

				{/* Fixed Labels (always visible) */}
				<div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded md:text-sm text-[10px] font-medium backdrop-blur-sm pointer-events-none z-30">
					{beforeLabel}
				</div>
				<div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded md:text-sm text-[10px] font-medium backdrop-blur-sm pointer-events-none z-30">
					{afterLabel}
				</div>
			</div>

			{description && (
				<p className="text-sm text-muted-foreground mt-3 text-center">
					{description}
				</p>
			)}
		</div>
	);
}
