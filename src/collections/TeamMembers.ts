import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
	slug: "team-members",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "role", "updatedAt"],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
					admin: {
						width: "50%",
					},
				},
				{
					name: "role",
					type: "text",
					required: true,
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			name: "bio",
			type: "textarea",
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "certifications",
			type: "array",
			fields: [
				{
					name: "certification",
					type: "text",
					required: true,
				},
			],
		},
	],
};
