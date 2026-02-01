import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
	slug: "reviews",
	labels: {
		singular: "Review",
		plural: "Reviews",
	},
	admin: {
		useAsTitle: "author",
		defaultColumns: ["author", "rating", "date", "platform"],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "author",
			type: "text",
			required: true,
			label: "Reviewer Name",
		},
		{
			name: "rating",
			type: "number",
			required: true,
			min: 1,
			max: 5,
			label: "Rating (1-5)",
			defaultValue: 5,
		},
		{
			name: "content",
			type: "textarea",
			required: true,
			label: "Review Content",
		},
		{
			name: "date",
			type: "date",
			required: true,
			label: "Date of Review",
			defaultValue: () => new Date(),
		},
		{
			name: "platform",
			type: "select",
			options: [
				{ label: "Google", value: "google" },
				{ label: "Facebook", value: "facebook" },
				{ label: "Yelp", value: "yelp" },
				{ label: "Direct/Website", value: "website" },
				{ label: "Other", value: "other" },
			],
			defaultValue: "google",
			required: true,
			label: "Platform",
		},
		{
			name: "avatar",
			type: "upload",
			relationTo: "media",
			label: "Reviewer Avatar (Optional)",
		},
	],
};
