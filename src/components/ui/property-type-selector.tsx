"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface PropertyTypeSelectorProps {
	value?: string;
	onChange: (value: string) => void;
	className?: string;
	label?: string;
	required?: boolean;
}

const PROPERTY_TYPES = [
	{ id: "residential", label: "Residential" },
	{ id: "commercial", label: "Commercial" },
];

export function PropertyTypeSelector({
	value,
	onChange,
	className,
	label,
	required,
}: PropertyTypeSelectorProps) {
	return (
		<div className={cn("space-y-3", className)}>
			{label && (
				<Label className="text-base">
					{label} {required && <span className="text-red-500">*</span>}
				</Label>
			)}
			<RadioGroup
				value={value}
				onValueChange={onChange}
				className="grid grid-cols-2 gap-4"
			>
				{PROPERTY_TYPES.map((type) => (
					<Label
						key={type.id}
						htmlFor={`property-${type.id}`}
						className={cn(
							"flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all w-full",
							value === type.id
								? "bg-primary/10 border-primary"
								: "bg-muted/50 border-transparent hover:border-border",
						)}
					>
						<RadioGroupItem value={type.id} id={`property-${type.id}`} />
						<span className="font-medium">{type.label}</span>
					</Label>
				))}
			</RadioGroup>
		</div>
	);
}
