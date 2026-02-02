import type { Block } from "payload";

export const BackLinkBlock: Block = {
	slug: "backLink",
	labels: {
		singular: "Back Link",
		plural: "Back Links",
	},
	fields: [
		{
			name: "label",
			type: "text",
			label: "Label",
			defaultValue: "Back to Home",
		},
		{
			name: "href",
			type: "text",
			label: "Link URL",
			defaultValue: "/",
		},
		{
			name: "centered",
			type: "checkbox",
			label: "Centered",
			defaultValue: true,
		},
	],
};
