import { cn } from "@/lib/utils";

interface SpacingProps {
	size?: "small" | "medium" | "large";
}

export function Spacing({ size = "medium" }: SpacingProps) {
	// Heights:
	// small: 32px (mobile) / 48px (desktop)
	// medium: 64px (mobile) / 96px (desktop)
	// large: 96px (mobile) / 128px (desktop)
	const height = {
		small: "h-8 md:h-12",
		medium: "h-16 md:h-24",
		large: "h-24 md:h-32",
	};

	return <div className={cn("w-full", height[size])} aria-hidden="true" />;
}
