import type { Block } from "payload";
import { background } from "@/fields/background";

export const ImagesGridBlock: Block = {
	slug: "imagesGrid",
	labels: {
		singular: "Images Grid",
		plural: "Images Grids",
	},
	fields: [
		background,
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
					name: "columns",
					type: "select",
					label: "Items per Row",
					defaultValue: "3",
					options: [
						{ label: "1", value: "1" },
						{ label: "2", value: "2" },
						{ label: "3", value: "3" },
						{ label: "4", value: "4" },
						{ label: "5", value: "5" },
						{ label: "6", value: "6" },
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
		{
			name: "items",
			type: "array",
			label: "Items",
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: true,
				},
				{
					name: "title",
					type: "text",
					label: "Title",
					required: true,
				},
				{
					name: "link",
					type: "text",
					label: "Link (Optional URL)",
				},
			],
		},
	],
};
