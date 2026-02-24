import type { Block } from "payload";

export const ServiceSelectBlock: Block = {
	slug: "serviceSelect",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "ServiceSelectLabel",
			},
		},
	},
	labels: {
		singular: "Service Select",
		plural: "Service Selects",
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
					defaultValue: "service",
					admin: { width: "33%" },
				},
				{
					name: "label",
					type: "text",
					label: "Label",
					defaultValue: "Select a Service",
					admin: { width: "33%" },
				},
				{
					name: "width",
					type: "number",
					label: "Field Width (percentage)",
					defaultValue: 100,
					admin: { width: "33%" },
				},
			],
		},

		{
			name: "required",
			type: "checkbox",
			label: "Required",
			defaultValue: true,
		},
	],
};
