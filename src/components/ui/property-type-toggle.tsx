"use client";

import { cn } from "@/lib/utils";

interface PropertyTypeToggleProps {
	value?: string;
	onChange: (value: string) => void;
	className?: string;
}

const options = [
	{ label: "Residential", value: "residential" },
	{ label: "Commercial", value: "commercial" },
];

export function PropertyTypeToggle({
	value,
	onChange,
	className,
}: PropertyTypeToggleProps) {
	return (
		<div
			className={cn(
				"flex p-1 bg-muted rounded-[10px] w-full relative",
				className,
			)}
		>
			{options.map((option) => {
				const isSelected = value === option.value;
				return (
					<button
						key={option.value}
						type="button"
						onClick={() => onChange(option.value)}
						className={cn(
							"flex-1 py-2 px-4 rounded-[10px] text-sm font-medium transition-all duration-200 z-10",
							isSelected
								? "bg-background text-foreground shadow-sm ring-1 ring-border"
								: "text-muted-foreground hover:text-foreground",
						)}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
