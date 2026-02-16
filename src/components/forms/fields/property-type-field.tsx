"use client";

import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { PropertyTypeToggle } from "@/components/ui/property-type-toggle";

type PropertyTypeFieldProps = {
	name: string;
	label?: string;
	required?: boolean;
};

export function PropertyTypeField({
	name,
	label,
	required,
}: PropertyTypeFieldProps) {
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
						<PropertyTypeToggle value={field.value} onChange={field.onChange} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
