import type { CollectionConfig } from "payload";

import { customLexical } from "@/lib/lexical-config";


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
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
					fields: [
						// Row 1: Title + Category
						{
							type: "row",
							fields: [
								{
									name: "title",
									type: "text",
									required: true,
									admin: {
										width: "60%",
									},
								},
								{
									name: "category",
									type: "select",
									options: [
										{ label: "Plumbing", value: "plumbing" },
										{ label: "Tips", value: "tips" },
										{ label: "News", value: "news" },
									],
									required: true,
									admin: {
										width: "40%",
									},
								},
							],
						},
						// Row 2: Featured Image + Is Featured checkbox
						{
							type: "row",
							fields: [
								{
									name: "featuredImage",
									type: "upload",
									relationTo: "media",
									admin: {
										width: "60%",
									},
								},
								{
									name: "featured",
									label: "Is Featured",
									type: "checkbox",
									defaultValue: false,
									admin: {
										width: "40%",
										description:
											"Enable to display this post prominently on the homepage or featured sections",
										style: {
											paddingTop: "24px",
										},
									},
								},
							],
						},
						// Row 3: Summary
						{
							name: "summary",
							type: "textarea",
							admin: {
								description: "Brief summary for blog listing pages",
							},
						},
						// Tags - relationship to Tags collection for better UX
						{
							name: "tags",
							type: "relationship",
							relationTo: "tags",
							hasMany: true,
							admin: {
								description:
									"Select tags or start typing to search/create new ones",
							},
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
								position: "sidebar",
							},
						},
						{
							name: "publishedAt",
							type: "date",
							admin: {
								position: "sidebar",
							},
						},
						{
							name: "author",
							type: "relationship",
							relationTo: "authors",
							admin: {
								position: "sidebar",
							},
						},
					],
				},
			],
		},
	],
};
