import type { Block } from "payload";
import { background } from "@/fields/background";
import { customLexical } from "@/lib/lexical-config";

export const LegalContentBlock: Block = {
	slug: "legalContent",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "LegalContentLabel",
			},
		},
	},
	labels: {
		singular: "Legal Content",
		plural: "Legal Contents",
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
			name: "content",
			type: "richText",
			editor: customLexical,
			required: true,
		},
	],
};
