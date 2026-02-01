import { getPayload } from "payload";
import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";
import type {
	Header as HeaderType,
	Footer as FooterType,
	CompanyInfo as CompanyInfoType,
} from "@/payload-types";

// Cached fetch for Header
export const getHeader = unstable_cache(
	async (): Promise<HeaderType> => {
		const payload = await getPayload({ config: configPromise });
		const header = await payload.findGlobal({
			slug: "header",
		});
		return header;
	},
	["payload-header"],
	{ tags: ["header"] },
);

// Cached fetch for Footer
export const getFooter = unstable_cache(
	async (): Promise<FooterType> => {
		const payload = await getPayload({ config: configPromise });
		const footer = await payload.findGlobal({
			slug: "footer",
		});
		return footer;
	},
	["payload-footer"],
	{ tags: ["footer"] },
);

// Cached fetch for Company Info
export const getCompanyInfo = unstable_cache(
	async (): Promise<CompanyInfoType> => {
		const payload = await getPayload({ config: configPromise });
		const companyInfo = await payload.findGlobal({
			slug: "company-info",
			depth: 2,
		});
		return companyInfo;
	},
	["payload-company-info"],
	{ tags: ["company-info"] },
);

// Cached fetch for all Common Globals (Parallel Execution)
export const getCommonGlobals = async (): Promise<
	[HeaderType, FooterType, CompanyInfoType]
> => {
	const [header, footer, companyInfo] = await Promise.all([
		getHeader(),
		getFooter(),
		getCompanyInfo(),
	]);

	return [header, footer, companyInfo];
};
