import type { Block } from "payload";
import { background } from "@/fields/background";

export const LegalContactBlock: Block = {
	slug: "legalContact",
	labels: {
		singular: "Contact Card",
		plural: "Contact Cards",
	},
	fields: [
		background,
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
		{
			type: "row",
			fields: [
				{
					name: "paddingTopOption",
					type: "select",
					label: "Padding Top",
					defaultValue: "default",
					options: [
						{ label: "None", value: "none" },
						{ label: "Small", value: "small" },
						{ label: "Default", value: "default" },
						{ label: "Big", value: "big" },
					],
					admin: {
						width: "50%",
					},
				},
				{
					name: "paddingBottomOption",
					type: "select",
					label: "Padding Bottom",
					defaultValue: "default",
					options: [
						{ label: "None", value: "none" },
						{ label: "Small", value: "small" },
						{ label: "Default", value: "default" },
						{ label: "Big", value: "big" },
					],
					admin: {
						width: "50%",
					},
				},
			],
		},
	],
};
