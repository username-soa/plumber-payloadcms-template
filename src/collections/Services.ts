import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields";
import type { CollectionConfig } from "payload";

import { LegalContentBlock } from "@/blocks/LegalContentBlock";
import { LegalContactBlock } from "@/blocks/LegalContactBlock";
import { BackLinkBlock } from "@/blocks/BackLinkBlock";
import { FAQBlock } from "@/blocks/FAQBlock";
import { ReviewBlock } from "@/blocks/ReviewBlock";
import { CertificationsBlock } from "@/blocks/CertificationsBlock";
import { TeamBlock } from "@/blocks/TeamBlock";
import { TrustStatsBlock } from "@/blocks/TrustStatsBlock";
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

export const Services: CollectionConfig = {
	slug: "services",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "slug", "updatedAt"],
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
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "parentService",
					type: "relationship",
					relationTo: "services",
					hasMany: false,
					label: "Parent Service",
					filterOptions: ({ id }) => {
						return {
							id: {
								not_equals: id,
							},
						};
					},
					admin: {
						width: "50%",
					},
				},
				{
					name: "isEmergency",
					type: "checkbox",
					label: "Emergency Service?",
					defaultValue: false,
					admin: {
						width: "50%",
						description:
							"Check this box if this service offers 24/7 emergency availability.",
						style: {
							paddingTop: "24px",
						},
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: true,
					admin: {
						width: "50%",
					},
				},
				{
					name: "icon",
					type: "text",
					required: true,
					admin: {
						width: "50%",
						components: {
							Field: "@/components/payload/IconPicker#IconPicker",
						},
					},
				},
			],
		},
		{
			name: "description",
			type: "textarea",
			label: "Short Description",
			required: true,
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
							blocks: [
								LegalContentBlock,
								LegalContactBlock,
								BackLinkBlock,
								FAQBlock,
								ReviewBlock,
								CertificationsBlock,
								TeamBlock,
								TrustStatsBlock,
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
							// if the `generateUrl` function is configured
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
