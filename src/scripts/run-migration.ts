import { Client } from "pg";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config({ path: path.resolve(dirname, "../../.env.local") });

const client = new Client({
	connectionString: process.env.DATABASE_URL,
});

async function runMigration() {
	try {
		await client.connect();
		const sql = fs.readFileSync(
			path.resolve(dirname, "../../fix_form_block_padding.sql"),
			"utf8",
		);
		await client.query(sql);
		console.log("Migration executed successfully.");
	} catch (err) {
		console.error("Error executing migration", err);
	} finally {
		await client.end();
	}
}

runMigration();
