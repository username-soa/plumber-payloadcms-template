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

type CheckboxGroupFieldProps = {
	name: string;
	label?: string;
	options: { label: string; value: string }[];
	required?: boolean;
};

export function CheckboxGroupField({
	name,
	label,
	options,
	required,
}: CheckboxGroupFieldProps) {
	const { control } = useFormContext();

	return (
		<FormField
			control={control}
			name={name}
			render={() => (
				<FormItem>
					<div className="mb-4">
						{label && (
							<FormLabel className="text-base">
								{label} {required && <span className="text-red-500">*</span>}
							</FormLabel>
						)}
					</div>
					<div className="flex flex-col gap-3 ml-2">
						{options.map((option) => (
							<FormField
								key={option.value}
								control={control}
								name={name}
								render={({ field }) => {
									return (
										<FormItem
											key={option.value}
											className="flex flex-row items-start space-x-3 space-y-0"
										>
											<FormControl>
												<Checkbox
													checked={field.value?.includes(option.value)}
													onCheckedChange={(checked) => {
														return checked
															? field.onChange([
																	...(field.value || []),
																	option.value,
																])
															: field.onChange(
																	field.value?.filter(
																		(value: string) => value !== option.value,
																	),
																);
													}}
												/>
											</FormControl>
											<FormLabel className="font-normal cursor-pointer text-sm">
												{option.label}
											</FormLabel>
										</FormItem>
									);
								}}
							/>
						))}
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
