import type { CollectionConfig } from "payload";
import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields";
import { LegalHeroBlock } from "@/blocks/LegalHeroBlock";
import { LegalContentBlock } from "@/blocks/LegalContentBlock";
import { LegalContactBlock } from "@/blocks/LegalContactBlock";
import { BackLinkBlock } from "@/blocks/BackLinkBlock";
import { populateLegalContact } from "@/hooks/populateLegalContact";

export const Pages: CollectionConfig = {
	slug: "pages",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "slug", "updatedAt"],
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
	hooks: {
		afterRead: [populateLegalContact],
	},
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
					fields: [
						{
							name: "title",
							type: "text",
							required: true,
						},
						{
							name: "slug",
							type: "text",
							required: true,
							unique: true,
							admin: {
								position: "sidebar",
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
						{
							name: "lastUpdated",
							type: "date",
							admin: {
								position: "sidebar",
								description: "The 'Last updated' date shown on the page",
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
							name: "layout",
							type: "blocks",
							required: true,
							blocks: [
								LegalHeroBlock,
								LegalContentBlock,
								LegalContactBlock,
								BackLinkBlock,
							],
						},
					],
				},
				{
					label: "SEO",
					name: "meta",
					fields: [
						OverviewField({
							titlePath: "meta.title",
							descriptionPath: "meta.description",
							imagePath: "meta.image",
						}),
						MetaTitleField({
							hasGenerateFn: true,
						}),
						MetaDescriptionField({}),
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
};
