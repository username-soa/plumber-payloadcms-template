import type { Block } from "payload";
import { background } from "@/fields/background";

export const NumbersBlock: Block = {
	slug: "numbers",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "NumbersLabel",
			},
		},
	},
	labels: {
		singular: "Numbers Block",
		plural: "Numbers Blocks",
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
					name: "textColor",
					type: "select",
					label: "Text Color",
					defaultValue: "regular",
					options: [
						{ label: "Regular", value: "regular" },
						{ label: "Primary", value: "primary" },
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
			type: "row",
			fields: [
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
				{
					name: "showSeparators",
					type: "checkbox",
					label: "Show Separators",
					defaultValue: true,
					admin: {
						width: "50%",
						style: {
							alignSelf: "flex-end",
						},
						description:
							"Show vertical and horizontal separators between items.",
					},
				},
			],
		},
		{
			name: "numberItems",
			type: "array",
			label: "Items",
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "title",
							type: "text",
							label: "Title (e.g., 10+)",
							required: true,
							admin: { width: "50%" },
						},
						{
							name: "subTitle",
							type: "text",
							label: "Sub Title (e.g., Years of Experience)",
							admin: { width: "50%" },
						},
					],
				},

				{
					name: "description",
					type: "textarea",
					label: "Description",
				},
			],
		},
	],
};
