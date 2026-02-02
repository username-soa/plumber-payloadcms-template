import type { Block } from "payload";

export const LegalContactBlock: Block = {
	slug: "legalContact",
	labels: {
		singular: "Legal Contact Card",
		plural: "Legal Contact Cards",
	},
	fields: [
		{
			name: "title",
			type: "text",
			label: "Title",
			defaultValue: "Contact Us",
		},
		{
			name: "description",
			type: "textarea",
			label: "Description",
			defaultValue: "For questions about these Terms or to make a complaint:",
		},
		{
			name: "email",
			type: "text",
			label: "Contact Email",
			admin: {
				description: "Leave blank to use email from Company Info global",
			},
		},
		{
			name: "phone",
			type: "text",
			label: "Contact Phone",
			admin: {
				description: "Leave blank to use phone from Company Info global",
			},
		},
		{
			name: "address",
			type: "textarea",
			label: "Contact Address",
			admin: {
				description: "Leave blank to use address from Company Info global",
			},
		},
	],
};
