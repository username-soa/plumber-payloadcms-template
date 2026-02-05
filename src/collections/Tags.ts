import type { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
	slug: "tags",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "slug", "appliesTo", "createdAt"],
		group: "Content",
		description: "Manage tags for Blog Posts and Case Studies",
	},
	access: {
		read: () => true, // Tags are public
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
						description:
							"The display name of the tag (e.g., 'Water Heater', 'DIY')",
					},
				},
				{
					name: "slug",
					type: "text",
					required: true,
					unique: true,
					admin: {
						width: "50%",
						description:
							"URL-friendly identifier (auto-generated from name if left empty)",
						components: {
							Field: "@/components/payload/SlugField#SlugField",
						},
						custom: {
							generateFrom: "name",
						},
					},
					hooks: {
						beforeValidate: [
							async ({ value, data }) => {
								if (value || !data?.name) return value;
								return data.name
									.toLowerCase()
									.replace(/ /g, "-")
									.replace(/[^\w-]+/g, "");
							},
						],
					},
				},
			],
		},
		{
			name: "appliesTo",
			type: "select",
			required: true,
			hasMany: true,
			options: [
				{ label: "Blog Posts", value: "blogs" },
				{ label: "Case Studies", value: "case-studies" },
			],
			defaultValue: ["blogs", "case-studies"],
			admin: {
				description:
					"Select which content types this tag applies to. A tag can apply to multiple content types.",
			},
		},
		{
			name: "description",
			type: "textarea",
			admin: {
				description: "Optional description for this tag",
			},
		},
	],
};
