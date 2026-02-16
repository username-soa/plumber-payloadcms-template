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

async function checkSchema() {
	try {
		await client.connect();
		const res = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = '_pages_v_blocks_form_block';
    `);
		console.log("Columns in _pages_v_blocks_form_block:", res.rows);
	} catch (err) {
		console.error("Error executing query", err);
	} finally {
		await client.end();
	}
}

checkSchema();
