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
			type: "row",
			fields: [
				{
					name: "author",
					type: "text",
					required: true,
					label: "Reviewer Name",
					admin: {
						width: "50%",
					},
				},
				{
					name: "rating",
					type: "number",
					required: true,
					min: 1,
					max: 5,
					label: "Rating (1-5)",
					defaultValue: 5,
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
					name: "date",
					type: "date",
					required: true,
					label: "Date of Review",
					defaultValue: () => new Date(),
					admin: {
						width: "50%",
					},
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
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			name: "avatar",
			type: "upload",
			relationTo: "media",
			label: "Reviewer Avatar (Optional)",
		},
		{
			name: "content",
			type: "textarea",
			required: true,
			label: "Review Content",
		},
	],
};
