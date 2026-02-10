import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { s3Storage } from "@payloadcms/storage-s3";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Authors } from "./collections/Authors";

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
	},

	// Rich text editor configuration
	editor: lexicalEditor({
		features: ({ defaultFeatures }) => {
			console.log("Registering Lexical features...");
			const features = [
				...defaultFeatures,
				CustomColorFeature(),
			];
			console.log("Feature keys:", features.map(f => f.key));
			return features;
		},
	}),

	// Database adapter - SQLite for development, PostgreSQL for production
	db: process.env.DATABASE_URL
		? postgresAdapter({
				pool: {
					connectionString: process.env.DATABASE_URL,
				},
				push: false,
			})
		: sqliteAdapter({
				client: {
					url: "file:" + path.resolve(dirname, "../payload.db"),
				},
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
	],
});
