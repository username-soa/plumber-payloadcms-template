import type { Block } from "payload";
import { background } from "@/fields/background";

export const SubServicesBlock: Block = {
	slug: "subServices",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "SubServicesLabel",
			},
		},
	},
	labels: {
		singular: "Sub-Services Grid",
		plural: "Sub-Services Grids",
	},
	fields: [
		background,
		{
			type: "row",
			fields: [
				{
					name: "tag",
					type: "text",
					label: "Tag (Top Label)",
					admin: {
						width: "50%",
					},
				},
				{
					name: "title",
					type: "text",
					label: "Title",
					required: true,
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
					name: "highlightedText",
					type: "text",
					label: "Highlighted Text (within Title)",
					admin: {
						width: "50%",
						description: "Text to highlight within the Title. Case-sensitive.",
					},
				},
				{
					name: "description",
					type: "textarea",
					label: "Description",
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
