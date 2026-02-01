import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../hooks/revalidateGlobal";

export const Header: GlobalConfig = {
	slug: "header",
	label: "Header",
	access: {
		read: () => true,
	},
	hooks: {
		afterChange: [revalidateGlobal("header")],
	},
	fields: [
		{
			name: "navItems",
			label: "Header Navigation links",
			type: "array",
			required: true,
			minRows: 1,
			fields: [
				{
					name: "label",
					type: "text",
					required: true,
				},
				{
					name: "href",
					type: "text",
					required: true,
				},
			],
		},
	],
};
