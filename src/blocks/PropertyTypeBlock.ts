import type { Block } from "payload";

export const PropertyTypeBlock: Block = {
	slug: "propertyType",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "PropertyTypeLabel",
			},
		},
	},
	labels: {
		singular: "Property Type Selector",
		plural: "Property Type Selectors",
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
					defaultValue: "propertyType",
					admin: { width: "33%" },
				},
				{
					name: "label",
					type: "text",
					label: "Label",
					defaultValue: "Property Type",
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
