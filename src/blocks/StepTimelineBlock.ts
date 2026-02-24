import type { Block } from "payload";
import { background } from "@/fields/background";

export const StepTimelineBlock: Block = {
	slug: "stepTimeline",
	interfaceName: "StepTimelineBlock",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "StepTimelineLabel",
			},
		},
	},
	labels: {
		singular: "Step Timeline",
		plural: "Step Timelines",
	},
	fields: [
		background,
		{
			type: "row",
			admin: {
				position: "sidebar",
			},
			fields: [
				{
					name: "paddingTop",
					type: "checkbox",
					label: "Padding Top",
					defaultValue: true,
					admin: {
						width: "50%",
						description: "Adds padding to the top of the block",
					},
				},
				{
					name: "paddingBottom",
					type: "checkbox",
					label: "Padding Bottom",
					defaultValue: true,
					admin: {
						width: "50%",
						description: "Adds padding to the bottom of the block",
					},
				},
			],
		},
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
						"Display a step-by-step guide or process with custom labels, headings, and descriptions.",
				},
			},
		},
		{
			name: "items",
			type: "array",
			label: "Items",
			labels: {
				singular: "Item",
				plural: "Items",
			},
			fields: [
				{
					name: "label",
					type: "text",
					label: "Label",
					admin: {
						placeholder: "e.g. Step 1, Phase A, Day 1, etc.",
						description: "Small label shown above the heading",
					},
				},
				{
					name: "heading",
					type: "text",
					label: "Heading",
					required: true,
					admin: {
						description: "The main heading for this item",
					},
				},
				{
					name: "content",
					type: "textarea",
					label: "Content",
					admin: {
						description: "Detailed information for this item",
					},
				},
			],
		},
	],
};
