"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { getCMSLinkHref } from "@/lib/cms-link";
import type { CMSLinkType } from "@/lib/cms-link";
import type { AnnouncementBar as AnnouncementBarType } from "@/payload-types";

const LOCAL_STORAGE_KEY = "announcement-bar-dismissed";
const CSS_VAR_HEIGHT = "--announcement-bar-height";

const BG_COLORS = {
	primary: "bg-primary",
	emergency: "bg-red-600",
	alert: "bg-orange-500",
	dark: "bg-zinc-950",
	subtle: "bg-zinc-100 dark:bg-zinc-800",
} as const;

const TEXT_COLORS = {
	white: "text-white",
	black: "text-zinc-950",
} as const;

const setCssHeight = (height: number | string) => {
	document.documentElement.style.setProperty(
		CSS_VAR_HEIGHT,
		typeof height === "number" ? `${height}px` : height,
	);
};

export function AnnouncementBar({ data }: { data: AnnouncementBarType }) {
	// 1. Destructure with defaults and strict typing
	const {
		enabled = false,
		isDismissible = false,
		backgroundColor = "primary",
		textColor = "white",
		interval = 5,
		messages = [],
		orientation = "horizontal",
	} = data;

	const [isVisible, setIsVisible] = useState(false);
	const barRef = useRef<HTMLDivElement>(null);

	const isVertical = orientation === "vertical";

	// 2. Initialize Embla Carousel explicitly
	const [emblaRef] = useEmblaCarousel(
		{
			loop: true,
			axis: isVertical ? "y" : "x",
		},
		[Autoplay({ delay: (interval || 5) * 1000, stopOnInteraction: false })],
	);

	// 3. Handle visibility & global CSS height variables securely
	useEffect(() => {
		if (!enabled || !messages || messages.length === 0) {
			setIsVisible(false);
			setCssHeight(0);
			return;
		}

		const isDismissed = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (isDismissed !== "true") {
			setIsVisible(true);
		} else {
			setCssHeight(0);
		}
	}, [enabled, messages]);

	// Update document CSS height tracking for layout pushdowns when visible
	useEffect(() => {
		if (isVisible && barRef.current) {
			setCssHeight(barRef.current.offsetHeight);
		}
	}, [isVisible]);

	// 4. Wrap with useCallback to avoid unnecessary recreations
	const handleDismiss = useCallback(() => {
		setIsVisible(false);
		localStorage.setItem(LOCAL_STORAGE_KEY, "true");
		setCssHeight(0);
	}, []);

	// Render nothing if not visible
	if (!isVisible) return null;

	// Resolve style classes
	const bgColorClass =
		BG_COLORS[backgroundColor as keyof typeof BG_COLORS] || BG_COLORS.primary;
	const textColorClass =
		TEXT_COLORS[textColor as keyof typeof TEXT_COLORS] || TEXT_COLORS.white;

	return (
		<aside
			ref={barRef}
			style={{ zIndex: 70 }}
			className={cn(
				"fixed top-0 left-0 w-full overflow-hidden transition-all duration-300 ease-in-out",
				bgColorClass,
				textColorClass,
			)}
			aria-label="Site Announcements"
		>
			<div className="container mx-auto px-4 py-2 flex items-center justify-center">
				{/* Carousel Inner Wrapper */}
				<div
					className={cn(
						"flex-1 overflow-hidden",
						isVertical ? "h-6 md:h-8" : "h-auto",
					)}
					ref={emblaRef}
				>
					<div className={cn("flex", isVertical ? "flex-col h-full" : "")}>
						{messages.map((message, index) => {
							const hasLink = !!message.link;

							const content = (
								<div
									className={cn(
										"flex items-center justify-center gap-2 text-sm md:text-base font-medium w-full h-full px-2",
										isVertical ? "min-h-0" : "min-w-0 h-auto",
									)}
								>
									<span className="truncate max-w-full text-center">
										{message.text}
									</span>
									{hasLink && (
										<ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
									)}
								</div>
							);

							if (!hasLink) {
								return (
									<div
										key={message.id || `announcement-${index}`}
										className="flex-[0_0_100%] h-full flex items-center"
									>
										{content}
									</div>
								);
							}

							return (
								<Link
									key={message.id || `announcement-${index}`}
									href={getCMSLinkHref(message.link as CMSLinkType)}
									target={
										(message.link as CMSLinkType).newTab ? "_blank" : undefined
									}
									className="group flex-[0_0_100%] flex items-center w-full h-full hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded outline-none"
								>
									{content}
								</Link>
							);
						})}
					</div>
				</div>

				{/* Dismissal Interactivity */}
			</div>
			{isDismissible ? (
				<button
					type="button"
					onClick={handleDismiss}
					className={cn(
						"ml-4 p-1 rounded-full transition-colors shrink-0 outline-none focus-visible:ring-2 absolute right-4 top-1/2 -translate-y-1/2",
						textColor === "white"
							? "hover:bg-white/20 focus-visible:ring-white"
							: "hover:bg-black/10 focus-visible:ring-black",
					)}
					aria-label="Dismiss announcement"
				>
					<X className="w-4 h-4" />
				</button>
			) : null}
		</aside>
	);
}
