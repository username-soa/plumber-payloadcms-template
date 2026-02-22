"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import DynamicIcon from "@/components/ui/dynamic-icon";
import type { Media, Page } from "@/payload-types";
import { getMediaUrl } from "@/lib/payload-utils";
import { getCMSLinkHref } from "@/lib/cms-link";

export type MarqueeBlockProps = Extract<
	NonNullable<Page["layout"]>[number],
	{ blockType: "marquee" }
>;

export const MarqueeBlockComponent: React.FC<MarqueeBlockProps> = ({
	animation,
	style,
	separator,
	items,
}) => {
	const {
		direction = "left",
		speed = 40,
		gap = 40,
		verticalPadding = 80,
		fadeEdges = true,
		pauseOnHover = true,
	} = animation || {};

	const {
		bg = "transparent",
		decoration = "none",
		textColor = "#000000",
		fontWeight = "400",
		fontSize = 32,
		letterSpacing = 0,
	} = style || {};

	const {
		type: sepType = "icon",
		size: sepSize = 24,
		icon: sepIcon,
	} = separator || {};

	const fontWeightClass = {
		"100": "font-thin",
		"300": "font-light",
		"400": "font-normal",
		"500": "font-medium",
		"600": "font-semibold",
		"700": "font-bold",
		"900": "font-black",
	}[fontWeight || "400"];

	const textStyle: React.CSSProperties = {
		fontSize: `${fontSize}px`,
		letterSpacing: `${letterSpacing}px`,
		color: textColor || undefined,
	};

	const renderSeparator = () => {
		if (!sepType || sepType === "none") return null;

		return (
			<div className="flex items-center justify-center shrink-0 opacity-50">
				{sepType === "icon" && sepIcon && (
					<DynamicIcon name={sepIcon} size={Number(sepSize)} />
				)}
			</div>
		);
	};

	return (
		<section
			className={cn(
				"relative w-full overflow-hidden flex flex-col items-center justify-center",
			)}
			style={{
				paddingTop: `${verticalPadding}px`,
				paddingBottom: `${verticalPadding}px`,
				backgroundColor: bg || undefined,
			}}
		>
			{decoration === "dots" && (
				<div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />
			)}
			<div className="relative z-10 w-full flex flex-col justify-center">
				<Marquee
					reverse={direction === "right"}
					pauseOnHover={!!pauseOnHover}
					repeat={Math.max(6, Math.ceil(30 / Math.max(1, items?.length || 1)))}
					className={cn(
						fadeEdges &&
							"mask-[linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
					)}
					style={
						{
							"--duration": `${speed}s`,
							"--gap": `${gap}px`,
						} as React.CSSProperties
					}
				>
					{items?.map((item, index) => {
						const content = (
							<div
								key={item.id || index}
								className="flex items-center"
								style={{ gap: `${gap}px` }}
							>
								<div className="flex items-center shrink-0">
									{item.type === "text" && item.text && (
										<span
											className={cn("whitespace-nowrap", fontWeightClass)}
											style={textStyle}
										>
											{item.text}
										</span>
									)}
									{item.type === "image" && item.image && (
										<div className="relative h-8 md:h-12 w-auto aspect-video">
											<Image
												src={getMediaUrl(item.image as Media) || ""}
												alt={item.text || "Marquee Image"}
												fill
												className="object-contain"
											/>
										</div>
									)}
								</div>
								{renderSeparator()}
							</div>
						);

						if (item.link) {
							const href = getCMSLinkHref({
								...item.link,
								label: item.link.label || "",
							} as import("@/lib/cms-link").CMSLinkType);
							if (href !== "#") {
								return (
									<Link
										key={item.id || index}
										href={href}
										target={item.link.newTab ? "_blank" : undefined}
										className="hover:opacity-80 transition-opacity"
									>
										{content}
									</Link>
								);
							}
						}

						return content;
					})}
				</Marquee>
			</div>
		</section>
	);
};
