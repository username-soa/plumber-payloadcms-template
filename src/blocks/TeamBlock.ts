import type { Block } from "payload";
import { background } from "@/fields/background";

export const TeamBlock: Block = {
	slug: "team",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "TeamLabel",
			},
		},
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
					defaultValue: "Meet Your Experts",
					label: "Title",
					admin: {
						width: "50%",
					},
				},
				{
					name: "titleHighlight",
					type: "text",
					label: "Title Highlight",
					admin: {
						width: "50%",
						description:
							"Text to highlight in the title (e.g. 'Water City Plumbing Experts')",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "description",
					type: "textarea",
					label: "Description",
					admin: {
						width: "50%",
					},
				},
				{
					name: "selectedMembers",
					type: "relationship",
					relationTo: "team-members",
					hasMany: true,
					required: true,
					label: "Select Team Members",
					admin: {
						width: "50%",
					},
				},
			],
		},
	],
};
