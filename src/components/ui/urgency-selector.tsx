"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Clock, Calendar, MessageSquare } from "lucide-react";

interface UrgencyOption {
	value: string;
	label: string;
	description: string;
	icon: React.ElementType;
	colorClass: string;
}

const options: UrgencyOption[] = [
	{
		value: "emergency",
		label: "Emergency",
		description: "Water flooding, burst pipe, no water",
		icon: AlertTriangle,
		colorClass: "text-red-500",
	},
	{
		value: "urgent",
		label: "Urgent",
		description: "Same-day preferred",
		icon: Clock,
		colorClass: "text-orange-500",
	},
	{
		value: "scheduled",
		label: "Scheduled",
		description: "Within a few days",
		icon: Calendar,
		colorClass: "text-blue-500",
	},
	{
		value: "quote",
		label: "Just a Quote",
		description: "No rush, getting estimates",
		icon: MessageSquare,
		colorClass: "text-green-500",
	},
];

interface UrgencySelectorProps {
	value?: string;
	onChange: (value: string) => void;
	className?: string;
}

export function UrgencySelector({
	value,
	onChange,
	className,
}: UrgencySelectorProps) {
	return (
		<div className="space-y-3">
			<div
				className={cn(
					"grid grid-cols-1 md:grid-cols-2 gap-3 w-full",
					className,
				)}
			>
				{options.map((option) => {
					const isSelected = value === option.value;
					const Icon = option.icon;

					return (
						<button
							key={option.value}
							type="button"
							onClick={() => onChange(option.value)}
							className={cn(
								"flex gap-1.5 flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02]",
								"bg-muted/50 border-transparent hover:border-border",
								isSelected && "border-border",
							)}
						>
							<div
								className={cn(
									"flex items-center gap-2 font-semibold",
									option.colorClass,
								)}
							>
								<Icon className="w-4 h-4" />
								<span>{option.label}</span>
							</div>
							<span className="text-xs text-muted-foreground">
								{option.description}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
