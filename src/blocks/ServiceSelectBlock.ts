import type { Block } from "payload";

export const ServiceSelectBlock: Block = {
	slug: "serviceSelect",
	labels: {
		singular: "Service Select",
		plural: "Service Selects",
	},
	fields: [
		{
			name: "name",
			type: "text",
			label: "Name (Lowercase, no spaces)",
			required: true,
			defaultValue: "service",
		},
		{
			name: "label",
			type: "text",
			label: "Label",
			defaultValue: "Select a Service",
		},
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
			defaultValue: true,
		},
	],
};
