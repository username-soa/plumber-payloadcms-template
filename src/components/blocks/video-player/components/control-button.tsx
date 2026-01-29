"use client";

import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface ControlButtonProps {
	onClick: () => void;
	ariaLabel: string;
	tooltipText: string;
	shortcutKey?: string;
	icon: React.ReactNode;
	className?: string;
}

export function ControlButton({
	onClick,
	ariaLabel,
	tooltipText,
	shortcutKey,
	icon,
	className,
}: ControlButtonProps) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					type="button"
					onClick={onClick}
					className={cn(
						"p-1.5 text-white transition-colors hover:bg-gray-400/30 rounded-full cursor-pointer",
						className,
					)}
					aria-label={ariaLabel}
				>
					{icon}
				</button>
			</TooltipTrigger>
			<TooltipContent
				side="top"
				sideOffset={26}
				className="bg-gray-950/20 backdrop-blur-sm border-gray-700/50 text-white flex items-center gap-1.5 py-1 px-2"
			>
				<span className="drop-shadow-md">{tooltipText}</span>
				{shortcutKey && (
					<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
						{shortcutKey}
					</kbd>
				)}
			</TooltipContent>
		</Tooltip>
	);
}
