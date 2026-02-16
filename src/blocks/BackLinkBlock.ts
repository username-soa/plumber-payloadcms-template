import type { Block } from "payload";
import { background } from "@/fields/background";

export const BackLinkBlock: Block = {
	slug: "backLink",
	labels: {
		singular: "Back Link",
		plural: "Back Links",
	},
	fields: [
		background,
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
		{
			type: "row",
			fields: [
				{
					name: "paddingTopOption",
					type: "select",
					label: "Padding Top",
					defaultValue: "default",
					options: [
						{ label: "None", value: "none" },
						{ label: "Small", value: "small" },
						{ label: "Default", value: "default" },
						{ label: "Big", value: "big" },
					],
					admin: {
						width: "50%",
					},
				},
				{
					name: "paddingBottomOption",
					type: "select",
					label: "Padding Bottom",
					defaultValue: "default",
					options: [
						{ label: "None", value: "none" },
						{ label: "Small", value: "small" },
						{ label: "Default", value: "default" },
						{ label: "Big", value: "big" },
					],
					admin: {
						width: "50%",
					},
				},
			],
		},
	],
};
