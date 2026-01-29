import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Authors } from "./collections/Authors";
import { Testimonials } from "./collections/Testimonials";
import { BlogPosts } from "./collections/BlogPosts";
import { CaseStudies } from "./collections/CaseStudies";
import { Tags } from "./collections/Tags";

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
		Testimonials,
		BlogPosts,
		CaseStudies,
		Tags,
	],

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
	editor: lexicalEditor({}),

	// Database adapter - SQLite for development, PostgreSQL for production
	db:
		process.env.NODE_ENV === "production"
			? postgresAdapter({
					pool: {
						connectionString: process.env.DATABASE_URL,
					},
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
});
