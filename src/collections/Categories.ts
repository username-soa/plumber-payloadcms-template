import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
	slug: "categories",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "slug", "appliesTo"],
		group: "Content",
		description: "Manage categories for Blog Posts and Case Studies",
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
						description: "Display name for the category",
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
			defaultValue: ["blogs"],
			admin: {
				description:
					"Select which content types this category applies to. A category can apply to multiple content types.",
			},
		},
		{
			name: "description",
			type: "textarea",
			admin: {
				description: "Optional description for this category",
			},
		},
	],
};
