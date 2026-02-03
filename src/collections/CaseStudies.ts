import type { CollectionConfig } from "payload";

import { customLexical } from "@/lib/lexical-config";


export const CaseStudies: CollectionConfig = {
	slug: "case-studies",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "client", "completedAt"],
	},
	versions: {
		drafts: true,
	},
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
					fields: [
						// Title - full width at top
						{
							name: "title",
							type: "text",
							required: true,
						},
						// Summary - full width
						{
							name: "summary",
							type: "textarea",
							admin: {
								description: "Brief summary for case study listing pages",
							},
						},
						// Row: Client + Location
						{
							type: "row",
							fields: [
								{
									name: "client",
									type: "text",
									admin: {
										width: "50%",
									},
								},
								{
									name: "location",
									type: "text",
									admin: {
										width: "50%",
									},
								},
							],
						},
						// Row: Category + Service Type + Related Service
						{
							type: "row",
							fields: [
								{
									name: "category",
									type: "select",
									options: [
										{ label: "Residential", value: "residential" },
										{ label: "Commercial", value: "commercial" },
										{ label: "Emergency", value: "emergency" },
									],
									admin: {
										width: "33%",
									},
								},
								{
									name: "relatedService",
									type: "relationship",
									relationTo: "services",
									hasMany: false,
									label: "Related Service",
									admin: {
										width: "67%",
										description:
											"Select the primary service related to this case study",
									},
								},
							],
						},
						// Row: Budget + Duration + Completed At
						{
							type: "row",
							fields: [
								{
									name: "budget",
									type: "text",
									admin: {
										width: "33%",
										description: "e.g. '$950'",
									},
								},
								{
									name: "duration",
									type: "text",
									admin: {
										width: "33%",
										description: "e.g. '2 Hours'",
									},
								},
								{
									name: "completedAt",
									type: "date",
									admin: {
										width: "34%",
									},
								},
							],
						},
						// Row: Featured checkbox + Featured Image + Testimonial
						{
							type: "row",
							fields: [
								{
									name: "featured",
									type: "checkbox",
									defaultValue: false,
									admin: {
										width: "15%",
										style: {
											paddingTop: "24px",
										},
									},
								},
								{
									name: "featuredImage",
									type: "upload",
									relationTo: "media",
									admin: {
										width: "45%",
									},
								},
								{
									name: "testimonial",
									type: "relationship",
									relationTo: "testimonials",
									admin: {
										width: "40%",
									},
								},
							],
						},
						// Content - full width
						{
							name: "content",
							type: "richText",
							editor: customLexical,
						},
						// Sidebar fields
						{
							name: "slug",
							type: "text",
							admin: {
								position: "sidebar",
								components: {
									Field: "@/components/payload/SlugField#SlugField",
								},
							},
							hooks: {
								beforeValidate: [
									async ({ value, data }) => {
										// Auto-generate slug if empty (fallback)
										if (value || !data?.title) return value;
										return data.title
											.toLowerCase()
											.replace(/ /g, "-")
											.replace(/[^\w-]+/g, "");
									},
								],
							},
						},
					],
				},
			],
		},
	],
};
