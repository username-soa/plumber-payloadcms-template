import { revalidateTag } from "next/cache";
import type { GlobalAfterChangeHook } from "payload";

export const revalidateGlobal =
	(slug: string): GlobalAfterChangeHook =>
	({ doc, req: { payload } }) => {
		console.info(`Revalidating global: ${slug}`);
		revalidateTag(slug, "max");
		return doc;
	};
