import type { Block } from "payload";
import { background } from "@/fields/background";

export const TimelineBlock: Block = {
	slug: "timeline",
	interfaceName: "TimelineBlock",
	labels: {
		singular: "Timeline",
		plural: "Timelines",
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
						"Display a chronological sequence of events or milestones with dates and descriptions in a visual timeline format.",
				},
			},
		},
		{
			name: "title",
			type: "text",
			label: "Section Title",
			required: true,
			admin: {
				description: "The main heading for the timeline section",
			},
		},
		{
			name: "items",
			type: "array",
			label: "Timeline Items",
			labels: {
				singular: "Item",
				plural: "Items",
			},
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "title",
							type: "text",
							label: "Title",
							admin: {
								description: "The main heading for this timeline entry",
								width: "50%",
							},
							required: true,
						},
						{
							name: "date",
							label: "Time / Date",
							type: "text",
							admin: {
								placeholder: "e.g. 2024, Jan 15, or 2:30 PM",
								description: "When this event occurred",
								width: "50%",
							},
							required: true,
						},
					],
				},
				{
					name: "description",
					type: "textarea",
					label: "Description",
					admin: {
						description: "Detailed information about this timeline entry",
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
