import { getPayload } from "payload";
import config from "../payload.config"; // Ensure this path is correct
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

async function fixEnum() {
	try {
		console.log("Initializing Payload...");
		const payload = await getPayload({ config });

		console.log("Payload initialized.");

		// Read the SQL file
		const sqlPath = path.resolve(dirname, "../../fix-bentogrid-enum.sql");
		if (!fs.existsSync(sqlPath)) {
			console.error(`SQL file not found at: ${sqlPath}`);
			process.exit(1);
		}
		const sql = fs.readFileSync(sqlPath, "utf-8");

		console.log("Executing SQL fix...");
		// Access the raw database client from Payload's db adapter
		// Note: verify the adapter exposes 'drizzle' or 'pool' depending on use.
		// For postgresAdapter with payload 3.x, valid access might be payload.db.drizzle or payload.db.pool

		// Using raw SQL execution if available or specific method.
		// Payload's postgres adapter exposes the Drizzle instance or Node-Postgres pool.

		if (payload.db.drizzle) {
			// @ts-ignore - bypassing strict type checks for raw compatibility
			await payload.db.drizzle.execute(sql);
			console.log("SQL executed via Drizzle.");
		} else if (payload.db.pool) {
			// @ts-ignore
			await payload.db.pool.query(sql);
			console.log("SQL executed via Pool.");
		} else {
			// Fallback or error if neither is easily accessible
			console.warn(
				"Could not find direct db access (drizzle/pool). Attempting payload.db.execute if available (rare).",
			);
			// @ts-ignore
			if (typeof payload.db.execute === "function") {
				// @ts-ignore
				await payload.db.execute(sql);
			} else {
				throw new Error("Cannot access raw DB client to execute SQL.");
			}
		}

		console.log(
			"Database update complete. 'bentogrid' values should be replaced with 'grid'.",
		);
		process.exit(0);
	} catch (error) {
		console.error("Error executing fix:", error);
		process.exit(1);
	}
}

fixEnum();
