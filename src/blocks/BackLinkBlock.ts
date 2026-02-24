import type { Block } from "payload";
import { background } from "@/fields/background";

export const BackLinkBlock: Block = {
	slug: "backLink",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "BackLinkLabel",
			},
		},
	},
	labels: {
		singular: "Back Link",
		plural: "Back Links",
	},
	fields: [
		background,
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
		{
			type: "row",
			fields: [
				{
					name: "label",
					type: "text",
					label: "Label",
					defaultValue: "Back to Home",
					admin: { width: "33%" },
				},
				{
					name: "href",
					type: "text",
					label: "Link URL",
					defaultValue: "/",
					admin: { width: "33%" },
				},
				{
					name: "alignment",
					type: "select",
					label: "Alignment",
					defaultValue: "center",
					options: [
						{ label: "Left", value: "left" },
						{ label: "Center", value: "center" },
						{ label: "Right", value: "right" },
					],
					admin: { width: "33%" },
				},
			],
		},
	],
};
