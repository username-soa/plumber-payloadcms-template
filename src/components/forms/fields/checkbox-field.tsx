"use client";

import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

type CheckboxFieldProps = {
	name: string;
	label?: string;
	required?: boolean;
};

export function CheckboxField({ name, label, required }: CheckboxFieldProps) {
	const { control } = useFormContext();

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-row items-start space-x-3 space-y-0">
					<FormControl>
						<Checkbox checked={field.value} onCheckedChange={field.onChange} />
					</FormControl>
					<div className="space-y-1 leading-none">
						<FormLabel>
							{label} {required && <span className="text-red-500">*</span>}
						</FormLabel>
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
