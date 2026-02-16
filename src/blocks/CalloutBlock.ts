import type { Block } from "payload";
import { background } from "@/fields/background";

export const CalloutBlock: Block = {
	slug: "callout",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "CalloutLabel",
			},
		},
	},
	labels: {
		singular: "Callout",
		plural: "Callouts",
	},
	fields: [
		background,
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
						"Display a highlighted message box to draw attention to important information, tips, or warnings.",
				},
			},
		},
		// Row 1: Title and Type side by side
		{
			type: "row",
			fields: [
				{
					name: "title",
					type: "text",
					label: "Callout Title",
					admin: {
						description: "Optional title displayed at the top of the callout",
						width: "50%",
					},
				},
				{
					name: "type",
					type: "select",
					label: "Callout Type",
					options: [
						{ label: "Info", value: "info" },
						{ label: "Warning", value: "warning" },
						{ label: "Tip", value: "tip" },
					],
					defaultValue: "info",
					admin: {
						description: "Select the style and icon for this callout",
						width: "50%",
					},
				},
			],
		},
		// Row 2: Content
		{
			name: "content",
			type: "textarea",
			label: "Callout Content",
			admin: {
				description:
					"The main message or content to display inside the callout",
			},
		},
		// Row 3: Padding options side by side
		{
			type: "row",
			fields: [
				{
					name: "paddingTop",
					type: "checkbox",
					label: "Add Top Padding",
					defaultValue: true,
					admin: {
						description: "Adds extra spacing above the callout",
						width: "50%",
					},
				},
				{
					name: "paddingBottom",
					type: "checkbox",
					label: "Add Bottom Padding",
					defaultValue: true,
					admin: {
						description: "Adds extra spacing below the callout",
						width: "50%",
					},
				},
			],
		},
	],
};
