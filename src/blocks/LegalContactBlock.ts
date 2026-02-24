import type { Block } from "payload";
import { background } from "@/fields/background";

export const LegalContactBlock: Block = {
	slug: "legalContact",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "LegalContactLabel",
			},
		},
	},
	labels: {
		singular: "Legal Contact",
		plural: "Legal Contacts",
	},
	fields: [
		background,
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

		{
			type: "row",
			fields: [
				{
					name: "title",
					type: "text",
					label: "Title",
					defaultValue: "Contact Us",
					admin: {
						width: "33%",
					},
				},
				{
					name: "description",
					type: "textarea",
					label: "Description",
					defaultValue:
						"For questions about these Terms or to make a complaint:",
					admin: {
						width: "66%",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "email",
					type: "text",
					label: "Contact Email",
					admin: {
						width: "33%",
						description: "Leave blank to use email from Company Info global",
					},
				},
				{
					name: "phone",
					type: "text",
					label: "Contact Phone",
					admin: {
						width: "33%",
						description: "Leave blank to use phone from Company Info global",
					},
				},
				{
					name: "address",
					type: "text",
					label: "Contact Address",
					admin: {
						width: "33%",
						description: "Leave blank to use address from Company Info global",
					},
				},
			],
		},
	],
};
