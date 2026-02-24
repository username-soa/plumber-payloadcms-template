import type { Block } from "payload";
import { background } from "@/fields/background";

export const BeforeAfterBlock: Block = {
	slug: "beforeAfter",
	labels: {
		singular: "Before & After",
		plural: "Before & After Blocks",
	},
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "BeforeAfterLabel",
			},
		},
	},
	fields: [
		{
			name: "blockDescription",
			type: "ui",
			admin: {
				components: {
					Field: {
						path: "@/components/payload/BlockDescription",
					},
				},
				custom: {
					description:
						"Showcase transformation results with an interactive before/after image slider comparison.",
				},
			},
		},
		background,
		{
			type: "row",
			fields: [
				{
					name: "paddingTop",
					type: "checkbox",
					label: "Add Top Padding",
					defaultValue: true,
					admin: {
						description: "Add spacing above this block",
						width: "50%",
					},
				},
				{
					name: "paddingBottom",
					type: "checkbox",
					label: "Add Bottom Padding",
					defaultValue: true,
					admin: {
						description: "Add spacing below this block",
						width: "50%",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "beforeImage",
					type: "upload",
					relationTo: "media",
					required: true,
					label: "Before Image",
					admin: {
						description: "Upload the 'before' image showing the initial state",
						width: "50%",
					},
				},
				{
					name: "afterImage",
					type: "upload",
					relationTo: "media",
					required: true,
					label: "After Image",
					admin: {
						description: "Upload the 'after' image showing the completed work",
						width: "50%",
					},
				},
			],
		},
		{
			name: "description",
			type: "textarea",
			label: "Description",
			admin: {
				description:
					"Optional description to display with the before/after comparison",
			},
		},
	],
};
