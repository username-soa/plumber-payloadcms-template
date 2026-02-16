import { Block } from "payload";

export const PropertyTypeBlock: Block = {
	slug: "propertyType",
	labels: {
		singular: "Property Type Selector",
		plural: "Property Type Selectors",
	},
	fields: [
		{
			name: "name",
			type: "text",
			label: "Name (Lowercase, no spaces)",
			required: true,
			defaultValue: "propertyType",
		},
		{
			name: "label",
			type: "text",
			label: "Label",
			defaultValue: "Property Type",
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
