import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
	slug: "testimonials",
	admin: {
		useAsTitle: "author",
	},
	fields: [
		{
			name: "quote",
			type: "textarea",
			required: true,
		},
		{
			name: "author",
			type: "text",
			required: true,
		},
		{
			name: "role",
			type: "text",
		},
		{
			name: "company",
			type: "text",
		},
		{
			name: "rating",
			type: "number",
			min: 1,
			max: 5,
			required: true,
			defaultValue: 5,
		},
		{
			name: "avatar",
			type: "upload",
			relationTo: "media",
		},
	],
};
