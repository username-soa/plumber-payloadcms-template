import type { CollectionAfterReadHook } from "payload";
import type { CompanyInfo, Page } from "@/payload-types";

/**
 * Hook to automatically inject CompanyInfo global data into LegalContact blocks.
 * This avoids redundant manual fetches in the frontend components and ensures
 * data is always synchronized with the global settings.
 */
export const populateLegalContact: CollectionAfterReadHook<Page> = async ({
	doc,
	req,
}) => {
	if (!doc?.layout || !Array.isArray(doc.layout)) return doc;

	// Check if any legalContact blocks exist to avoid unnecessary global fetch
	const hasContactBlock = doc.layout.some(
		(block: { blockType: string }) => block.blockType === "legalContact",
	);

	if (!hasContactBlock) return doc;

	try {
		// Fetch global company info using internal Payload API (automatically cached)
		const companyInfo = (await req.payload.findGlobal({
			slug: "company-info",
			depth: 0,
		})) as unknown as CompanyInfo;

		// Inject global data into relevant blocks (using type assertion for dynamic injection)
		doc.layout = (doc.layout as { blockType: string }[]).map((block) => {
			if (block.blockType === "legalContact") {
				return {
					...block,
					globalData: {
						email: companyInfo.email,
						phone: companyInfo.phone,
						address: companyInfo.address,
						brandName: companyInfo.brand?.name,
					},
				};
			}
			return block;
		}) as Page["layout"];
	} catch (error) {
		console.error(
			"Error populating legalContact blocks with global data:",
			error,
		);
	}

	return doc;
};
