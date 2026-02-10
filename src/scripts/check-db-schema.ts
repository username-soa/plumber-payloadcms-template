import { Client } from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env parser since we might not have dotenv/next loaded
function loadEnv() {
	try {
		const envPath = path.resolve(__dirname, "../../.env.local");
		if (fs.existsSync(envPath)) {
			const content = fs.readFileSync(envPath, "utf-8");
			content.split("\n").forEach((line) => {
				const [key, ...valueParts] = line.split("=");
				if (key && valueParts.length > 0) {
					const value = valueParts
						.join("=")
						.trim()
						.replace(/^["']|["']$/g, "");
					if (!process.env[key.trim()]) {
						process.env[key.trim()] = value;
					}
				}
			});
			console.log("Loaded .env.local");
		} else {
			console.log(".env.local not found at", envPath);
		}
	} catch (e) {
		console.error("Error loading .env.local", e);
	}
}

loadEnv();

async function checkSchema() {
	if (!process.env.DATABASE_URL) {
		console.error("DATABASE_URL not found in environment or .env.local");
		return;
	}

	const client = new Client({
		connectionString: process.env.DATABASE_URL,
	});

	try {
		await client.connect();
		console.log("Connected to database.");

		const res = await client.query(`
            SELECT column_name, data_type, udt_name 
            FROM information_schema.columns 
            WHERE table_name = 'pages_blocks_numbers' AND column_name = 'columns';
        `);

		if (res.rows.length === 0) {
			console.log(
				"Column 'columns' not found in table 'pages_blocks_numbers'. Table might not exist.",
			);
		} else {
			console.log("Column Schema:", res.rows[0]);
		}

		const enumRes = await client.query(`
            SELECT typname FROM pg_type WHERE typname = 'enum_pages_blocks_numbers_columns';
        `);
		console.log("Enum Type Exists:", enumRes.rows.length > 0);
	} catch (err) {
		console.error("Database error:", err);
	} finally {
		await client.end();
	}
}

checkSchema();
