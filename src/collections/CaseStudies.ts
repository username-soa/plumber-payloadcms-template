import type { CollectionConfig } from "payload";

import { customLexical } from "@/lib/lexical-config";

import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields";

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
		// Row 1: Title + Slug
		{
			type: "row",
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
					admin: {
						width: "50%",
					},
				},
				{
					name: "slug",
					type: "text",
					admin: {
						width: "50%",
						components: {
							Field: "@/components/payload/SlugField#SlugField",
						},
					},
					hooks: {
						beforeValidate: [
							async ({ value, data }) => {
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
		// Row 6: Completed At + Featured
		{
			type: "row",
			fields: [
				{
					name: "completedAt",
					type: "date",
					admin: {
						width: "50%",
					},
				},
				{
					name: "featured",
					type: "checkbox",
					label: "Featured Case Study",
					defaultValue: false,
					admin: {
						width: "50%",
						description:
							"Check this box to highlight this case study on the homepage",
						style: {
							paddingTop: "24px",
						},
					},
				},
			],
		},
		// Row 2: Client + Location
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
		// Row 3: Budget + Duration
		{
			type: "row",
			fields: [
				{
					name: "budget",
					type: "text",
					admin: {
						width: "50%",
						description: "e.g. '$950'",
					},
				},
				{
					name: "duration",
					type: "text",
					admin: {
						width: "50%",
						description: "e.g. '2 Hours'",
					},
				},
			],
		},
		// Row 4: Related Service + Tags
		{
			type: "row",
			fields: [
				{
					name: "relatedService",
					type: "relationship",
					relationTo: "services",
					hasMany: false,
					label: "Related Service",
					admin: {
						width: "50%",
						description:
							"Select the primary service related to this case study",
					},
				},
				{
					name: "tags",
					type: "relationship",
					relationTo: "tags",
					hasMany: true,
					filterOptions: {
						appliesTo: { contains: "case-studies" },
					},
					admin: {
						width: "50%",
						description:
							"Select tags for this case study to help with filtering and organization",
					},
				},
			],
		},
		// Row 5: Review + Category
		{
			type: "row",
			fields: [
				{
					name: "review",
					type: "relationship",
					relationTo: "reviews",
					admin: {
						width: "50%",
					},
				},
				{
					name: "category",
					type: "relationship",
					relationTo: "categories",
					filterOptions: {
						appliesTo: { contains: "case-studies" },
					},
					admin: {
						width: "50%",
					},
				},
			],
		},

		// Row 7: Summary
		{
			name: "summary",
			type: "textarea",
			admin: {
				description: "Brief summary for case study listing pages",
			},
		},
		// Row 8: Featured Image
		{
			type: "row",
			fields: [
				{
					name: "featuredImage",
					type: "upload",
					relationTo: "media",
					admin: {
						width: "100%",
					},
				},
			],
		},
		// Tabs
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
					fields: [
						{
							name: "content",
							type: "richText",
							editor: customLexical,
						},
					],
				},
				{
					label: "SEO",
					fields: [
						{
							name: "meta",
							label: "SEO",
							type: "group",
							fields: [
								OverviewField({
									titlePath: "meta.title",
									descriptionPath: "meta.description",
									imagePath: "meta.image",
								}),
								MetaTitleField({
									hasGenerateFn: true,
								}),
								MetaDescriptionField({
									hasGenerateFn: true,
								}),
								MetaImageField({
									relationTo: "media",
								}),
								PreviewField({
									hasGenerateFn: true,
									titlePath: "meta.title",
									descriptionPath: "meta.description",
								}),
							],
						},
					],
				},
			],
		},
	],
};
