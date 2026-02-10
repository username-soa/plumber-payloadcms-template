import type React from "react";
import { cn } from "@/lib/utils";

export type PaddingOption = "none" | "small" | "default" | "big";

interface SectionWrapperProps {
	children: React.ReactNode;
	className?: string;
	paddingTop?: PaddingOption | string;
	paddingBottom?: PaddingOption | string;
}

const paddingClasses: Record<string, string> = {
	none: "0",
	small: "8",
	default: "16",
	big: "24",
};

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
	children,
	className,
	paddingTop = "default",
	paddingBottom = "default",
}) => {
	const ptKey =
		paddingTop && paddingClasses[paddingTop] ? paddingTop : "default";
	const pbKey =
		paddingBottom && paddingClasses[paddingBottom] ? paddingBottom : "default";

	return (
		<section
			className={cn(
				`pt-${paddingClasses[ptKey]}`,
				`pb-${paddingClasses[pbKey]}`,
				className,
			)}
		>
			<div className="mx-auto px-6 md:px-12 container">{children}</div>
		</section>
	);
};
