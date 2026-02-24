import type { Block } from "payload";

export const CheckboxGroupBlock: Block = {
	slug: "checkboxGroup",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "CheckboxGroupLabel",
			},
		},
	},
	labels: {
		singular: "Checkbox Group",
		plural: "Checkbox Groups",
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "name",
					type: "text",
					label: "Name (Lowercase, no spaces)",
					required: true,
					admin: { width: "50%" },
				},
				{
					name: "label",
					type: "text",
					label: "Label",
					admin: { width: "50%" },
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
					admin: { width: "50%" },
				},
				{
					name: "required",
					type: "checkbox",
					label: "Required",
					defaultValue: false,
					admin: { width: "50%", style: { paddingTop: "44px" } },
				},
			],
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
	],
};
