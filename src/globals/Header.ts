import type { GlobalConfig } from "payload";

import { link } from "../fields/link";
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
			fields: [link()],
		},
	],
};
