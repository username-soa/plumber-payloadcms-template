import type { Block } from "payload";
import { background } from "@/fields/background";

export const TestimonialBlock: Block = {
	slug: "testimonial",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "TestimonialLabel",
			},
		},
	},
	fields: [
		{
			name: "blockDescription",
			type: "ui",
			admin: {
				components: {
					Field: {
						path: "@/components/payload/BlockDescription",
					},
				},
				custom: {
					description:
						"Feature a customer quote or review with author details and optional photo to build trust and credibility.",
				},
			},
		},
		background,
		{
			type: "row",
			fields: [
				{
					name: "paddingTop",
					type: "checkbox",
					label: "Add Top Padding",
					defaultValue: true,
					admin: {
						description: "Adds spacing above the block",
						width: "50%",
					},
				},
				{
					name: "paddingBottom",
					type: "checkbox",
					label: "Add Bottom Padding",
					defaultValue: true,
					admin: {
						description: "Adds spacing below the block",
						width: "50%",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "author",
					type: "text",
					required: true,
					label: "Author Name",
					admin: {
						description: "The name of the person providing the testimonial",
						width: "50%",
					},
				},
				{
					name: "role",
					type: "text",
					label: "Author Role",
					admin: {
						description:
							"The role or title of the author (e.g. Homeowner, CEO)",
						width: "50%",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "quote",
					type: "textarea",
					required: true,
					label: "Testimonial Quote",
					admin: {
						description: "The main text of the testimonial",
						width: "50%",
					},
				},
				{
					name: "avatar",
					type: "upload",
					relationTo: "media",
					label: "Author Image",
					admin: {
						description: "Optional photo of the author",
						width: "50%",
					},
				},
			],
		},
	],
};
