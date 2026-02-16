"use client";

import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { UrgencySelector } from "@/components/ui/urgency-selector";

type UrgencyFieldProps = {
	name: string;
	label?: string;
	required?: boolean;
};

export function UrgencyField({ name, label, required }: UrgencyFieldProps) {
	const { control } = useFormContext();
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="space-y-3">
					{label && (
						<FormLabel>
							{label} {required && <span className="text-red-500">*</span>}
						</FormLabel>
					)}
					<FormControl>
						<UrgencySelector value={field.value} onChange={field.onChange} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
