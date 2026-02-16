import type { Control, FieldValues, Path } from "react-hook-form";

export type FieldProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
	description?: string;
	placeholder?: string;
	required?: boolean;
	defaultValue?: any;
	options?: { label: string; value: string }[];
};
