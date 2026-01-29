import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
	className?: string;
	reverse?: boolean;
	pauseOnHover?: boolean;
	children?: React.ReactNode;
	repeat?: number;
	[key: string]: any;
}

export default function Marquee({
	className,
	reverse,
	pauseOnHover = false,
	children,
	repeat = 4,
	...props
}: MarqueeProps) {
	const copies = useMemo(
		() => Array.from({ length: repeat }, (_, i) => i),
		[repeat],
	);

	return (
		<div
			{...props}
			className={cn(
				"group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] gap-(--gap)",
				{
					"flex-row": true,
					"flex-col": false,
				},
				className,
			)}
		>
			{copies.map((key) => (
				<div
					key={key}
					className={cn("flex shrink-0 justify-around gap-(--gap)", {
						"animate-marquee flex-row": !reverse,
						"animate-marquee-reverse flex-row": reverse,
						"group-hover:paused": pauseOnHover,
					})}
				>
					{children}
				</div>
			))}
		</div>
	);
}
