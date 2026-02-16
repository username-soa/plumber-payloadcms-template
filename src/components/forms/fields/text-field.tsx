"use client";

import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define props for the component
type TextFieldProps = {
	name: string;
	label?: string;
	placeholder?: string;
	required?: boolean;
	type?: string;
};

export function TextField({
	name,
	label,
	placeholder,
	required,
	type = "text",
}: TextFieldProps) {
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
						<Input
							{...field}
							placeholder={placeholder}
							type={type}
							value={field.value || ""} // Ensure controlled input
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
