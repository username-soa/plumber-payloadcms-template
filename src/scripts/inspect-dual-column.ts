import config from "@payload-config";
import { getPayload } from "payload";
import fs from "fs";
import path from "path";

async function inspectDualColumn() {
	const payload = await getPayload({ config });

	const pages = await payload.find({
		collection: "pages",
		limit: 100,
	});

	for (const page of pages.docs) {
		if (page.layout) {
			for (const block of page.layout) {
				if (block.blockType === "dualColumn") {
					const columns = block.columns;
					if (columns) {
						for (const col of columns) {
							if (col.richText) {
								console.log(`Found DualColumnBlock in page: ${page.title}`);
								console.log(JSON.stringify(col.richText, null, 2));
								return; // Found one, exit
							}
						}
					}
				}
			}
		}
	}
	console.log("No DualColumnBlock with richText found.");
}

inspectDualColumn();
