import type React from "react";
import { cn } from "@/lib/utils";

export type PaddingOption = "none" | "small" | "default" | "big";

interface SectionWrapperProps {
	children: React.ReactNode;
	className?: string;
	paddingTop?: PaddingOption | string | null;
	paddingBottom?: PaddingOption | string | null;
	background?: {
		bg?: "transparent" | "muted" | null;
		decoration?: "none" | "dots" | null;
	};
}

const paddingClasses: Record<string, string> = {
	none: "0",
	small: "8",
	default: "16",
	big: "24",
};

// Add helper for background styles
const getBackgroundClass = (bg: string | undefined | null) => {
	switch (bg) {
		case "muted":
			return "bg-muted";
		default:
			return "bg-transparent"; // transparent is default
	}
};

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
	children,
	className,
	paddingTop = "default",
	paddingBottom = "default",
	background,
}) => {
	const ptKey =
		paddingTop && paddingClasses[paddingTop] ? paddingTop : "default";
	const pbKey =
		paddingBottom && paddingClasses[paddingBottom] ? paddingBottom : "default";

	const bgClass = getBackgroundClass(background?.bg);
	const decorationStyle =
		background?.decoration === "dots"
			? {
					backgroundImage:
						"radial-gradient(circle, currentColor 1px, transparent 1px)",
					backgroundSize: "20px 20px",
					opacity: 0.8, // subtle effect
				}
			: {};

	return (
		<section
			className={cn(
				`pt-${paddingClasses[ptKey]}`,
				`pb-${paddingClasses[pbKey]}`,
				bgClass,
				"relative",
				className,
			)}
			style={
				background?.decoration === "dots"
					? {
							backgroundImage:
								"radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)", // Default fallback
							...decorationStyle,
						}
					: undefined
			}
		>
			<div className="mx-auto px-6 md:px-12 container relative z-10">
				{children}
			</div>
		</section>
	);
};
