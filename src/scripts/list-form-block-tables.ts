import { Client } from "pg";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config({ path: path.resolve(dirname, "../../.env.local") });

const client = new Client({
	connectionString: process.env.DATABASE_URL,
});

async function listTables() {
	try {
		await client.connect();
		const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name LIKE '%form_block%';
    `);
		console.log("Tables matching form_block:", res.rows);
	} catch (err) {
		console.error("Error executing query", err);
	} finally {
		await client.end();
	}
}

listTables();
