import { getPayload } from "payload";
import config from "../payload.config";
import { sql } from "@payloadcms/db-postgres";

const run = async () => {
	const payload = await getPayload({ config });

	try {
		console.log("Finding homepage...");
		const result = await payload.find({
			collection: "pages",
			where: {
				slug: {
					equals: "index",
				},
			},
			limit: 1,
		});

		const homepage = result.docs[0];

		if (!homepage) {
			console.error('Homepage (slug: "index") not found.');
			process.exit(1);
		}

		console.log(`Found homepage with ID: ${homepage.id}`);

		// Delete from live pages_blocks_numbers
		console.log("Deleting from pages_blocks_numbers...");
		await payload.db.drizzle.execute(
			sql`DELETE FROM "pages_blocks_numbers" WHERE "_parent_id" = ${homepage.id}`,
		);

		// Delete from versions _pages_v_blocks_numbers
		// The _parent_id in _pages_v_blocks_numbers refers to the VERSION ID (_pages_v.id), not the PAGE ID.
		// So we assume we want to clear it from all history of this page.
		console.log("Deleting from _pages_v_blocks_numbers...");
		await payload.db.drizzle.execute(
			sql`DELETE FROM "_pages_v_blocks_numbers" WHERE "_parent_id" IN (SELECT "id" FROM "_pages_v" WHERE "parent_id" = ${homepage.id})`,
		);

		console.log(
			"Successfully removed NumbersBlocks from homepage and its versions.",
		);
	} catch (error) {
		console.error("Error executing removal:", error);
		process.exit(1);
	}

	process.exit(0);
};

run();
