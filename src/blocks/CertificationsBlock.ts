import type { Block } from "payload";
import { background } from "@/fields/background";

export const CertificationsBlock: Block = {
	slug: "certifications",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "CertificationsLabel",
			},
		},
	},
	labels: {
		singular: "Certification",
		plural: "Certifications",
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
					name: "subtitle",
					type: "text",
					defaultValue: "Credentials",
					admin: {
						width: "50%",
					},
				},
				{
					name: "title",
					type: "text",
					defaultValue: "Fully Licensed, ",
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			name: "titleHighlight",
			type: "text",
			label: "Title Highlight",
			defaultValue: "Bonded & Insured",
			admin: {
				description: "Text to highlight in primary color",
			},
		},
		{
			name: "description",
			type: "textarea",
			defaultValue:
				"Your peace of mind is our priority. We meet and exceed all state and local requirements for plumbing contractors.",
		},
		{
			name: "certifications",
			type: "array",
			minRows: 1,
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
				},
				{
					name: "description",
					type: "textarea",
				},
				{
					name: "icon",
					type: "text",
					label: "Icon",
					admin: {
						components: {
							Field: "@/components/payload/IconPicker#IconPicker",
						},
					},
				},
			],
		},
	],
};
