import type { Block } from "payload";

export const TimelineBlock: Block = {
	slug: "timeline",
	labels: {
		singular: "Timeline",
		plural: "Timelines",
	},
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "TimelineLabel",
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
						"Display a chronological sequence of events or milestones with dates and descriptions in a visual timeline format.",
				},
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
					name: "paddingTop",
					type: "checkbox",
					label: "Add Top Padding",
					admin: {
						description: "Adds vertical spacing above the timeline",
						width: "50%",
					},
					defaultValue: true,
				},
				{
					name: "paddingBottom",
					type: "checkbox",
					label: "Add Bottom Padding",
					admin: {
						description: "Adds vertical spacing below the timeline",
						width: "50%",
					},
					defaultValue: true,
				},
			],
		},
	],
};
