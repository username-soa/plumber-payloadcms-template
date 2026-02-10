import { getPayload } from "payload";
import config from "./payload.config";
import { sql } from "@payloadcms/db-postgres";

import fs from "fs";

const checkDb = async () => {
	const payload = await getPayload({ config });
	let output = "";

	try {
		output += "--- Tables with 'numbers' in name ---\n";
		const tablesRes = await payload.db.drizzle.execute(sql`
      SELECT tablename 
      FROM pg_tables 
      WHERE tablename LIKE '%numbers%'
    `);
		for (const r of tablesRes.rows) {
			output += `${r.tablename}\n`;
		}

		output += "\n--- Columns in 'pages_blocks_numbers' ---\n";
		const columnsRes = await payload.db.drizzle.execute(sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'pages_blocks_numbers'
    `);
		for (const r of columnsRes.rows) {
			output += `${r.column_name}: ${r.data_type}\n`;
		}

		output += "\n--- Columns in '_pages_v_blocks_numbers' ---\n";
		const vColumnsRes = await payload.db.drizzle.execute(sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = '_pages_v_blocks_numbers'
    `);
		for (const r of vColumnsRes.rows) {
			output += `${r.column_name}: ${r.data_type}\n`;
		}

		output += "\n--- Columns in '_pages_v_blocks_numbers_number_items' ---\n";
		const vItemsColumnsRes = await payload.db.drizzle.execute(sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = '_pages_v_blocks_numbers_number_items'
    `);
		for (const r of vItemsColumnsRes.rows) {
			output += `${r.column_name}: ${r.data_type}\n`;
		}

		fs.writeFileSync("db_inspection.txt", output);
		console.log("Output written to db_inspection.txt");
	} catch (e) {
		console.error(e);
		fs.writeFileSync("db_inspection.txt", `Error: ${e.message}`);
	}
	process.exit(0);
};

checkDb();
