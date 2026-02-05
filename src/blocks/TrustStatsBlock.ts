import type { Block } from "payload";

export const TrustStatsBlock: Block = {
	slug: "trustStats",
	labels: {
		singular: "Trust Stats",
		plural: "Trust Stats",
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "title",
					type: "text",
					label: "Title",
					required: true,
					admin: {
						description: "The full main heading",
						width: "33%",
					},
				},
				{
					name: "titleHighlight",
					type: "text",
					label: "Highlighted Text",
					admin: {
						description: "Text to highlight (must match exactly)",
						width: "33%",
					},
				},
				{
					name: "bottomText",
					type: "text",
					label: "Bottom Text / Tagline",
					admin: {
						description: "Optional tagline like 'BY THE NUMBERS'",
						width: "33%",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "cols",
					type: "select",
					label: "Columns",
					defaultValue: "6",
					options: [
						{ label: "3 Columns", value: "3" },
						{ label: "4 Columns", value: "4" },
						{ label: "6 Columns", value: "6" },
					],
					admin: {
						width: "50%",
					},
				},
				{
					name: "backgroundColor",
					type: "select",
					label: "Background Color",
					defaultValue: "transparent",
					options: [
						{ label: "Transparent/White", value: "transparent" },
						{ label: "Muted/Gray", value: "muted" },
					],
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			name: "stats",
			type: "array",
			label: "Statistics",
			minRows: 1,
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "value",
							type: "text",
							label: "Value",
							required: true,
							admin: {
								width: "50%",
								description: "e.g., '500+' or '99%'",
							},
						},
						{
							name: "label",
							type: "text",
							label: "Label",
							required: true,
							admin: {
								width: "50%",
								description: "e.g., 'Projects Completed'",
							},
						},
					],
				},
			],
		},
	],
};
