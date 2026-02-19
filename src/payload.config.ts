import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { s3Storage } from "@payloadcms/storage-s3";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { searchPlugin } from "@payloadcms/plugin-search";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { Users } from "./collections/Users";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { Media } from "./collections/Media";
import { Authors } from "./collections/Authors";
import { FormBlock } from "./blocks/FormBlock";
import { FeatureListBlock } from "./blocks/FeatureListBlock";
import { UrgencyBlock } from "./blocks/UrgencyBlock";
import { PropertyTypeBlock } from "./blocks/PropertyTypeBlock";
import { FileBlock } from "./blocks/FileBlock";
import { CheckboxGroupBlock } from "./blocks/CheckboxGroupBlock";

import { ServiceSelectBlock } from "./blocks/ServiceSelectBlock";

import { BlogPosts } from "./collections/BlogPosts";
import { CaseStudies } from "./collections/CaseStudies";
import { Tags } from "./collections/Tags";
import { Services } from "./collections/Services";
import { Reviews } from "./collections/Reviews";
import { Pages } from "./collections/Pages";
import { Faqs } from "./collections/Faqs";
import { TeamMembers } from "./collections/TeamMembers";
import { Categories } from "./collections/Categories";

import { Header } from "./globals/Header";
import { Footer } from "./globals/Footer";
import { CompanyInfo } from "./globals/CompanyInfo";
import { CustomColorFeature } from "./components/richtext/features/custom-color/CustomColorFeature";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	// Basic configuration
	secret: process.env.PAYLOAD_SECRET || "your-secret-key-here",
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",

	// All content collections
	collections: [
		Users,
		Media,
		Authors,

		BlogPosts,
		CaseStudies,
		Tags,
		Services,
		Reviews,
		Pages,
		Faqs,
		TeamMembers,
		Categories,
	],

	globals: [Header, Footer, CompanyInfo],

	// Admin panel configuration
	admin: {
		meta: {
			titleSuffix: "- FlowMasters CMS",
		},
		importMap: {
			baseDir: path.resolve(dirname),
		},
		livePreview: {
			url: ({ data, collectionConfig }) => {
				const baseUrl =
					process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
				const slug = data?.slug || "";
				switch (collectionConfig?.slug) {
					case "pages":
						return `${baseUrl}/${slug}`;
					case "blog-posts":
						return `${baseUrl}/blog/${slug}`;
					case "case-studies":
						return `${baseUrl}/case-studies/${slug}`;
					case "services":
						return `${baseUrl}/services/${slug}`;
					default:
						return baseUrl;
				}
			},
			collections: ["pages", "blog-posts", "case-studies", "services"],
			breakpoints: [
				{ label: "Mobile", name: "mobile", width: 375, height: 667 },
				{ label: "Tablet", name: "tablet", width: 768, height: 1024 },
				{ label: "Desktop", name: "desktop", width: 1440, height: 900 },
			],
		},
	},

	email: nodemailerAdapter({
		defaultFromAddress: process.env.SMTP_USER || "info@flowmasters.com",
		defaultFromName: "FlowMasters Website",
		transportOptions: {
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT) || 587,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		},
	}),

	// Rich text editor configuration
	editor: lexicalEditor({
		features: ({ defaultFeatures }) => {
			return [
				...defaultFeatures,
				CustomColorFeature(),
				BlocksFeature({
					blocks: [FormBlock, FeatureListBlock],
				}),
			];
		},
	}),

	// Database adapter - SQLite for development, PostgreSQL for production
	db: process.env.DATABASE_URL
		? postgresAdapter({
				pool: {
					connectionString: process.env.DATABASE_URL,
				},
				push: true,
			})
		: sqliteAdapter({
				client: {
					url: process.env.DATABASE_URI || "file:payload.db",
				},
				push: true,
			}),

	// TypeScript type generation
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},

	// Sharp for image processing
	sharp,

	plugins: [
		s3Storage({
			collections: {
				media: true,
			},
			bucket: process.env.S3_BUCKET || "",
			config: {
				endpoint: process.env.S3_ENDPOINT,
				region: process.env.S3_REGION,
				forcePathStyle: true,
				credentials: {
					accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
					secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
				},
			},
		}),
		seoPlugin({
			collections: [],
			uploadsCollection: "media",
			generateTitle: ({ doc }) => `FlowMasters | ${doc.title}`,
			generateDescription: ({ doc }) => doc.description || doc.excerpt,
			tabbedUI: false,
		}),
		redirectsPlugin({
			collections: ["pages", "blog-posts", "case-studies", "services"],
			overrides: {
				admin: {
					group: "SEO & Content",
				},
			},
		}),
		searchPlugin({
			collections: ["blog-posts", "case-studies", "services", "faqs"],
			beforeSync: ({ originalDoc, searchDoc }) => {
				const collectionSlug = searchDoc.doc?.relationTo;
				// FAQs use 'question' as their title field
				if (collectionSlug === "faqs") {
					return {
						...searchDoc,
						title: originalDoc.question || searchDoc.title,
						excerpt: originalDoc.answer || "",
						slug: originalDoc.slug || "",
					};
				}
				// For blog-posts and case-studies, use the summary field as excerpt
				if (
					collectionSlug === "blog-posts" ||
					collectionSlug === "case-studies"
				) {
					return {
						...searchDoc,
						excerpt: originalDoc.summary || "",
						slug: originalDoc.slug || "",
					};
				}
				// For services, use the description field as excerpt
				if (collectionSlug === "services") {
					return {
						...searchDoc,
						excerpt: originalDoc.description || "",
						slug: originalDoc.slug || "",
					};
				}
				// Fallback: copy slug for any other collection
				return { ...searchDoc, slug: originalDoc.slug || "" };
			},
			searchOverrides: {
				admin: {
					group: "SEO & Content",
				},
				fields: ({ defaultFields }) => [
					...defaultFields,
					{
						name: "slug",
						type: "text" as const,
						label: "Slug",
						admin: {
							readOnly: true,
							description: "Auto-populated from the source document slug",
						},
					},
					{
						name: "excerpt",
						type: "textarea" as const,
						label: "Excerpt",
						admin: {
							readOnly: true,
							description: "Auto-populated from the source document",
						},
					},
				],
			},
		}),
		formBuilderPlugin({
			fields: {
				payment: false,
				state: false,
				country: false,
			},
			formOverrides: {
				fields: ({ defaultFields }) => {
					return defaultFields.map((field) => {
						if ("blocks" in field && field.name === "fields") {
							return {
								...field,
								blocks: [
									...(field.blocks || []).map((block) => {
										if (
											block.slug === "text" ||
											block.slug === "textarea" ||
											block.slug === "email" ||
											block.slug === "number"
										) {
											return {
												...block,
												fields: [
													...block.fields,
													{
														name: "placeholder",
														type: "text" as const,
														label: "Placeholder",
													},
												],
											};
										}
										return block;
									}),
									UrgencyBlock,
									PropertyTypeBlock,
									FileBlock,
									CheckboxGroupBlock,
									ServiceSelectBlock,
								],
							};
						}
						return field;
					});
				},
			},
		}),
		nestedDocsPlugin({
			collections: ["services"],
			parentFieldSlug: "parentService",
			breadcrumbsFieldSlug: "breadcrumbs",
			generateLabel: (_, doc) => doc.title as string,
			generateURL: (docs) =>
				docs.reduce((url, doc) => `${url}/${doc.slug}`, "/services"),
		}),
	],
});
