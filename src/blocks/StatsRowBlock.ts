import type { Block } from "payload";
import { background } from "@/fields/background";

export const StatsRowBlock: Block = {
	slug: "statsRow",
	labels: {
		singular: "Stats Row",
		plural: "Stats Rows",
	},
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "StatsRowLabel",
			},
		},
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
						"Display key statistics or metrics in a horizontal row layout. Perfect for showcasing achievements and numbers.",
				},
			},
		},
		{
			name: "stats",
			type: "array",
			label: "Statistics",
			labels: {
				singular: "Stat",
				plural: "Stats",
			},
			admin: {
				description:
					"Add statistics to display in a row. Each stat has a value and a label.",
			},
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "value",
							type: "text",
							required: true,
							label: "Value",
							admin: {
								description: "The statistic value (e.g., 500+, 98%)",
								width: "50%",
							},
						},
						{
							name: "label",
							type: "text",
							required: true,
							label: "Label",
							admin: {
								description:
									"The label describing the stat (e.g., Projects Completed)",
								width: "50%",
							},
						},
					],
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
					defaultValue: true,
					admin: {
						description: "Add spacing above the stats row",
						width: "50%",
					},
				},
				{
					name: "paddingBottom",
					type: "checkbox",
					label: "Add Bottom Padding",
					defaultValue: true,
					admin: {
						description: "Add spacing below the stats row",
						width: "50%",
					},
				},
			],
		},
	],
};
