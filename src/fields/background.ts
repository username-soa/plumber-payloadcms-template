import type { Field } from "payload";

export const background: Field = {
	name: "background",
	type: "group",
	admin: {
		position: "sidebar",
	},
	fields: [
		{
			name: "bg",
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
		},
		{
			name: "decoration",
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
		},
	],
};
