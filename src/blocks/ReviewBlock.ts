import type { Block } from "payload";
import { background } from "@/fields/background";

export const ReviewBlock: Block = {
	slug: "reviewsSection",
	interfaceName: "ReviewBlock",
	fields: [
		background,
		{
			type: "row",
			fields: [
				{
					name: "title",
					type: "text",
					defaultValue: "Why People Love Us",
					admin: {
						width: "50%",
					},
				},
				{
					name: "subtitle",
					type: "text",
					defaultValue: "Testimonials",
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			name: "source",
			type: "select",
			defaultValue: "manual",
			options: [
				{ label: "Manual Custom Reviews", value: "manual" },
				{ label: "From Reviews Collection", value: "collection" },
			],
			admin: {
				description:
					"Choose 'Manual' to add one-off reviews for this page only, or 'From Collection' to select shared reviews from the main Reviews list.",
			},
		},
		{
			name: "manualReviews",
			type: "array",
			label: "Manual Reviews",
			admin: {
				condition: (_, siblingData) => siblingData.source === "manual",
			},
			fields: [
				{
					name: "author",
					type: "text",
					required: true,
				},
				{
					name: "rating",
					type: "number",
					min: 1,
					max: 5,
					defaultValue: 5,
				},
				{
					name: "content",
					type: "textarea",
					required: true,
				},
				{
					name: "date",
					type: "date",
				},
			],
		},
		{
			name: "selectedReviews",
			type: "relationship",
			relationTo: "reviews",
			hasMany: true,
			admin: {
				condition: (_, siblingData) => siblingData.source === "collection",
			},
		},
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
	],
};
