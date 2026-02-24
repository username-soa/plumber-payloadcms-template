import type { Block } from "payload";

export const UrgencyBlock: Block = {
	slug: "urgency",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "UrgencyLabel",
			},
		},
	},
	labels: {
		singular: "Urgency Selector",
		plural: "Urgency Selectors",
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
					defaultValue: "urgency",
					admin: { width: "33%" },
				},
				{
					name: "label",
					type: "text",
					label: "Label",
					defaultValue: "How urgent is this?",
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
