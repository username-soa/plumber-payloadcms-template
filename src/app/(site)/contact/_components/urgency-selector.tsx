"use client";

import { AlertTriangle, Clock, Calendar, MessageSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export const URGENCY_OPTIONS = [
	{
		id: "emergency",
		label: "Emergency",
		description: "Water flooding, burst pipe, no water",
		icon: AlertTriangle,
		color: "text-red-500",
		selectedBg: "bg-red-100 border-red-500 dark:bg-red-950",
	},
	{
		id: "urgent",
		label: "Urgent",
		description: "Same-day preferred",
		icon: Clock,
		color: "text-orange-500",
		selectedBg: "bg-orange-100 border-orange-500 dark:bg-orange-950",
	},
	{
		id: "scheduled",
		label: "Scheduled",
		description: "Within a few days",
		icon: Calendar,
		color: "text-blue-500",
		selectedBg: "bg-blue-100 border-blue-500 dark:bg-blue-950",
	},
	{
		id: "quote",
		label: "Just a Quote",
		description: "No rush, getting estimates",
		icon: MessageSquare,
		color: "text-green-500",
		selectedBg: "bg-green-100 border-green-500 dark:bg-green-950",
	},
];

interface UrgencySelectorProps {
	value: string;
	onValueChange: (value: string) => void;
}

export function UrgencySelector({
	value,
	onValueChange,
}: UrgencySelectorProps) {
	return (
		<div className="space-y-3">
			<Label className="text-base font-semibold">
				How urgent is your request? *
			</Label>
			<RadioGroup
				value={value}
				onValueChange={onValueChange}
				className="grid grid-cols-2 gap-3"
			>
				{URGENCY_OPTIONS.map((option) => (
					<Label
						key={option.id}
						htmlFor={`urgency-${option.id}`}
						className={cn(
							"flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02]",
							value === option.id
								? option.selectedBg
								: "bg-muted/50 border-transparent hover:border-border",
						)}
					>
						<div className="flex items-center gap-2">
							<RadioGroupItem
								value={option.id}
								id={`urgency-${option.id}`}
								className="sr-only"
							/>
							<option.icon className={cn("w-4 h-4", option.color)} />
							<span className="font-semibold text-sm">{option.label}</span>
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							{option.description}
						</p>
					</Label>
				))}
			</RadioGroup>
		</div>
	);
}
