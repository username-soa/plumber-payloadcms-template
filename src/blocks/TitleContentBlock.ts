import type { Block } from "payload";
import { link } from "@/fields/link";

export const TitleContentBlock: Block = {
	slug: "titleContent",
	labels: {
		singular: "Title & Content",
		plural: "Title & Content Blocks",
	},
	fields: [
		{
			name: "tagTitle",
			type: "text",
			label: "Tag Title",
			admin: {
				description: "Small tag text displayed above the main title",
			},
		},
		{
			name: "mainTitle",
			type: "text",
			label: "Main Title",
			required: true,
		},
		{
			name: "highlightedText",
			type: "text",
			label: "Highlighted Text",
			admin: {
				description:
					"Text segment from the Main Title to highlight in primary color (case-sensitive)",
			},
		},
		{
			name: "description",
			type: "textarea",
			label: "Description",
		},
		{
			name: "links",
			type: "array",
			label: "Links / Buttons",
			fields: [link()],
		},
		{
			type: "row",
			fields: [
				{
					name: "textAlign",
					type: "select",
					label: "Text Alignment",
					defaultValue: "left",
					options: [
						{ label: "Left", value: "left" },
						{ label: "Center", value: "center" },
						{ label: "Right", value: "right" },
					],
					admin: {
						width: "50%",
					},
				},
				{
					name: "buttonsAlign",
					type: "select",
					label: "Buttons Alignment",
					defaultValue: "left",
					options: [
						{ label: "Left", value: "left" },
						{ label: "Center", value: "center" },
						{ label: "Right", value: "right" },
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
