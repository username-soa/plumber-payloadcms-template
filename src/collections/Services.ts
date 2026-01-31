import type { CollectionConfig } from "payload";
import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields";
import {
	cleanupServiceRelations,
	syncServiceRelations,
} from "./hooks/sync-service-relations";

export const Services: CollectionConfig = {
	slug: "services",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "slug", "updatedAt"],
	},
	hooks: {
		afterChange: [syncServiceRelations],
		afterDelete: [cleanupServiceRelations],
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
						},
						{
							name: "description",
							type: "textarea",
							label: "Short Description",
							required: true,
						},
						{
							name: "longDescription",
							type: "richText",
							label: "Long Description",
						},
						{
							name: "icon",
							type: "text",
							required: true,
							admin: {
								components: {
									Field: "@/components/payload/IconPicker#IconPicker",
								},
							},
						},
						{
							name: "image",
							type: "upload",
							relationTo: "media",
							required: true,
						},
						{
							name: "isEmergency",
							type: "checkbox",
							label: "Emergency Service?",
							defaultValue: false,
							admin: {
								position: "sidebar",
							},
						},
						{
							name: "availability",
							type: "text",
							label: 'Availability (e.g., "24/7")',
							admin: {
								position: "sidebar",
							},
						},
						{
							name: "subServices",
							type: "relationship",
							relationTo: "services",
							hasMany: true,
							label: "Sub Services",
							filterOptions: ({ id }) => {
								return {
									id: {
										not_equals: id,
									},
								};
							},
							admin: {
								description:
									"Select services that belong to this category. The selected services will automatically have their 'Parent Service' field updated to point to this service.",
							},
						},
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
								position: "sidebar",
							},
						},
						{
							name: "process",
							type: "array",
							label: "Workflow",
							fields: [
								{
									name: "title",
									type: "text",
									required: true,
								},
								{
									name: "description",
									type: "textarea",
								},
							],
						},
						{
							name: "faqs",
							type: "array",
							label: "FAQs",
							fields: [
								{
									name: "question",
									type: "text",
									required: true,
								},
								{
									name: "answer",
									type: "textarea",
									required: true,
								},
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
