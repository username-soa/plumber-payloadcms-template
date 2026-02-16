import { Block } from "payload";
import { background } from "@/fields/background";

export const UrgencyBlock: Block = {
	slug: "urgency",
	labels: {
		singular: "Urgency Selector",
		plural: "Urgency Selectors",
	},
	fields: [
		background,
		{
			name: "name",
			type: "text",
			label: "Name (Lowercase, no spaces)",
			required: true,
			defaultValue: "urgency",
		},
		{
			name: "label",
			type: "text",
			label: "Label",
			defaultValue: "How urgent is this?",
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
