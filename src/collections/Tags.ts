import type { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
	slug: "tags",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "createdAt"],
		group: "Content",
	},
	access: {
		read: () => true, // Tags are public
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			unique: true,
			admin: {
				description:
					"The display name of the tag (e.g., 'Water Heater', 'DIY')",
			},
		},
	],
};
