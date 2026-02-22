import type { CollectionConfig } from "payload";

import { customLexical } from "@/lib/lexical-config";
import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields";
export const BlogPosts: CollectionConfig = {
	slug: "blog-posts",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "slug", "status", "publishedAt"],
	},
	versions: {
		drafts: true,
	},
	access: {
		read: ({ req: { user } }) => {
			if (user) return true;
			return {
				status: {
					equals: "published",
				},
			};
		},
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
		// Row 2: Status + Published At
		{
			type: "row",
			fields: [
				{
					name: "status",
					type: "select",
					options: [
						{ label: "Draft", value: "draft" },
						{ label: "Published", value: "published" },
					],
					defaultValue: "draft",
					required: true,
					admin: {
						width: "50%",
					},
				},
				{
					name: "publishedAt",
					type: "date",
					admin: {
						width: "50%",
					},
				},
			],
		},
		// Row 3: Author + Category
		{
			type: "row",
			fields: [
				{
					name: "author",
					type: "relationship",
					relationTo: "authors",
					admin: {
						width: "50%",
					},
				},
				{
					name: "category",
					type: "relationship",
					relationTo: "categories",
					required: true,
					filterOptions: {
						appliesTo: { contains: "blogs" },
					},
					admin: {
						width: "50%",
					},
				},
			],
		},
		// Row 4: Tags + Is Featured
		{
			type: "row",
			fields: [
				{
					name: "tags",
					type: "relationship",
					relationTo: "tags",
					hasMany: true,
					filterOptions: {
						appliesTo: { contains: "blogs" },
					},
					admin: {
						description:
							"Select tags or start typing to search/create new ones",
						width: "50%",
					},
				},
				{
					name: "featured",
					label: "Is Featured",
					type: "checkbox",
					defaultValue: false,
					admin: {
						width: "50%",
						description:
							"Enable to display this post prominently on the homepage or featured sections",
						style: {
							paddingTop: "24px",
						},
					},
				},
			],
		},
		// Row 5: Featured Image
		{
			name: "featuredImage",
			type: "upload",
			relationTo: "media",
			admin: {
				width: "100%",
			},
		},
		// Row 6: Summary
		{
			name: "summary",
			type: "textarea",
			admin: {
				description: "Brief summary for blog listing pages",
			},
		},
		// Content Tab
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
