import type { Block } from "payload";
import { background } from "@/fields/background";

export const TableBlock: Block = {
	slug: "table",
	labels: {
		singular: "Table",
		plural: "Tables",
	},
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "TableLabel",
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
						"Create a structured data table with customizable headers, rows, and styling options like striped rows and borders.",
				},
			},
		},
		{
			name: "caption",
			type: "text",
			label: "Table Caption",
			admin: {
				description: "Optional caption displayed above the table",
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "striped",
					type: "checkbox",
					label: "Striped Rows",
					admin: {
						description:
							"Alternate row background colors for better readability",
						width: "50%",
					},
					defaultValue: true,
				},
				{
					name: "bordered",
					type: "checkbox",
					label: "Show Borders",
					admin: {
						description: "Display borders around cells",
						width: "50%",
					},
					defaultValue: true,
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
						description: "Adds vertical spacing above the table",
						width: "50%",
					},
					defaultValue: true,
				},
				{
					name: "paddingBottom",
					type: "checkbox",
					label: "Add Bottom Padding",
					admin: {
						description: "Adds vertical spacing below the table",
						width: "50%",
					},
					defaultValue: true,
				},
			],
		},
		{
			name: "headers",
			type: "array",
			label: "Table Headers",
			labels: {
				singular: "Header",
				plural: "Headers",
			},
			admin: {
				description: "Define the column headers for your table",
			},
			fields: [
				{
					name: "label",
					type: "text",
					label: "Header Label",
					required: true,
					admin: {
						placeholder: "e.g. Service, Price, Duration",
					},
				},
			],
			minRows: 1,
		},
		{
			name: "rows",
			type: "array",
			label: "Table Rows",
			labels: {
				singular: "Row",
				plural: "Rows",
			},
			admin: {
				description: "Add data rows to your table",
			},
			fields: [
				{
					name: "cells",
					type: "array",
					label: "Cells",
					labels: {
						singular: "Cell",
						plural: "Cells",
					},
					fields: [
						{
							name: "value",
							type: "text",
							label: "Cell Value",
							required: true,
						},
					],
				},
			],
		},
	],
};
