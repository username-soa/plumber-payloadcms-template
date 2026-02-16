"use client";

import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type TextareaFieldProps = {
	name: string;
	label?: string;
	placeholder?: string;
	required?: boolean;
};

export function TextareaField({
	name,
	label,
	placeholder,
	required,
}: TextareaFieldProps) {
	const { control } = useFormContext();

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && (
						<FormLabel>
							{label} {required && <span className="text-red-500">*</span>}
						</FormLabel>
					)}
					<FormControl>
						<Textarea
							{...field}
							placeholder={placeholder}
							value={field.value || ""}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
