import type { CollectionConfig } from "payload";
import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields";

import { LegalContentBlock } from "@/blocks/LegalContentBlock";
import { LegalContactBlock } from "@/blocks/LegalContactBlock";
import { BackLinkBlock } from "@/blocks/BackLinkBlock";
import { FAQBlock } from "@/blocks/FAQBlock";
import { ReviewBlock } from "@/blocks/ReviewBlock";
import { TeamBlock } from "@/blocks/TeamBlock";
import { TimelineBlock } from "@/blocks/TimelineBlock";
import { ContentFetcherBlock } from "@/blocks/ContentFetcherBlock";
import { TitleContentBlock } from "@/blocks/TitleContentBlock";

import { ImagesGridBlock } from "@/blocks/ImagesGridBlock";
import { CardsGridBlock } from "@/blocks/CardsGridBlock";
import { ServiceAreasBlock } from "@/blocks/ServiceAreasBlock";
import { HighlightedServicesBlock } from "@/blocks/HighlightedServicesBlock";
import { NumbersBlock } from "@/blocks/NumbersBlock";
import { DualColumnBlock } from "@/blocks/DualColumnBlock";
import { FormBlock } from "@/blocks/FormBlock";
import { MarqueeBlock } from "@/blocks/MarqueeBlock";
import { populateLegalContact } from "@/hooks/populateLegalContact";
import { hero } from "../fields/hero";

export const Pages: CollectionConfig = {
	slug: "pages",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "slug", "updatedAt", "status"],
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
					required: true,
					unique: true,
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
		{
			type: "row",
			fields: [
				{
					name: "lastUpdated",
					type: "date",
					admin: {
						width: "50%",
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
						width: "50%",
					},
				},
			],
		},
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
					fields: [
						{
							name: "layout",
							type: "blocks",
							required: true,
							blocks: [
								LegalContentBlock,
								LegalContactBlock,
								BackLinkBlock,
								FAQBlock,
								ReviewBlock,
								TeamBlock,
								TimelineBlock,
								ContentFetcherBlock,
								TitleContentBlock,

								ImagesGridBlock,
								CardsGridBlock,
								ServiceAreasBlock,
								HighlightedServicesBlock,
								NumbersBlock,
								DualColumnBlock,
								FormBlock,
								MarqueeBlock,
							],
						},
					],
				},
				{
					label: "Hero",
					fields: [hero],
				},
				{
					label: "SEO",
					fields: [
						{
							name: "pageType",
							type: "select",
							label: "Page Schema Type",
							defaultValue: "default",
							admin: {
								description:
									"Controls the JSON-LD structured data type injected for SEO. Most pages should use 'Default (WebPage)'.",
							},
							options: [
								{ label: "Default (WebPage)", value: "default" },
								{ label: "About Page", value: "about" },
								{ label: "Contact Page", value: "contact" },
								{ label: "Services Listing", value: "servicesListing" },
							],
						},
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
