import type { Block } from "payload";
import { background } from "@/fields/background";

export const SimpleStatsBlock: Block = {
	slug: "simpleStats",
	labels: {
		singular: "Simple Stats Grid",
		plural: "Simple Stats Grids",
	},
	fields: [
		background,
		{
			name: "stats",
			type: "array",
			label: "Stats",
			minRows: 1,
			maxRows: 4,
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "value",
							type: "text",
							label: "Value (e.g. 21+)",
							required: true,
							admin: {
								width: "50%",
							},
						},
						{
							name: "label",
							type: "text",
							label: "Label",
							required: true,
							admin: {
								width: "50%",
							},
						},
					],
				},
			],
		},
	],
};
