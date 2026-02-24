import type { Field } from "payload";

export const background: Field = {
	name: "background",
	type: "group",
	admin: {
		position: "sidebar",
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "bg",
					label: "Background Color",
					type: "select",
					defaultValue: "transparent",
					options: [
						{
							label: "Transparent",
							value: "transparent",
						},
						{
							label: "Muted",
							value: "muted",
						},
						{
							label: "Primary",
							value: "primary",
						},
					],
					admin: {
						width: "50%",
					},
				},
				{
					name: "decoration",
					label: "Decoration Type",
					type: "select",
					defaultValue: "none",
					options: [
						{
							label: "None",
							value: "none",
						},
						{
							label: "Dots",
							value: "dots",
						},
					],
					admin: {
						width: "50%",
					},
				},
			],
		},
	],
};
