import { Block } from "payload";
import { background } from "@/fields/background";

export const CheckboxGroupBlock: Block = {
	slug: "checkboxGroup",
	labels: {
		singular: "Checkbox Group",
		plural: "Checkbox Groups",
	},
	fields: [
		background,
		{
			name: "name",
			type: "text",
			label: "Name (Lowercase, no spaces)",
			required: true,
		},
		{
			name: "label",
			type: "text",
			label: "Label",
		},
		{
			name: "options",
			type: "array",
			label: "Options",
			minRows: 1,
			fields: [
				{
					name: "label",
					type: "text",
					required: true,
				},
				{
					name: "value",
					type: "text",
					required: true,
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "width",
					type: "number",
					label: "Field Width (percentage)",
					defaultValue: 100,
				},
				{
					name: "required",
					type: "checkbox",
					label: "Required",
					defaultValue: false,
				},
			],
		},
	],
};
