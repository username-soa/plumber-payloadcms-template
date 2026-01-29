"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import type { CaseStudy } from "@/payload-types";

export async function getCaseStudies(limit = 100): Promise<CaseStudy[]> {
	const payload = await getPayload({ config });
	try {
		const result = await payload.find({
			collection: "case-studies",
			limit,
			sort: "-featured",
			where: {
				_status: { equals: "published" },
			},
		});
		return result.docs;
	} catch (error) {
		console.error("Error fetching case studies:", error);
		return [];
	}
}

export async function getCaseStudyBySlug(
	slug: string,
): Promise<CaseStudy | null> {
	const payload = await getPayload({ config });
	try {
		const result = await payload.find({
			collection: "case-studies",
			where: {
				slug: { equals: slug },
				_status: { equals: "published" },
			},
			limit: 1,
			depth: 2,
		});
		return result.docs[0] || null;
	} catch (error) {
		console.error(`Error fetching case study with slug ${slug}:`, error);
		return null;
	}
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
	const payload = await getPayload({ config });
	try {
		const result = await payload.find({
			collection: "case-studies",
			where: {
				_status: { equals: "published" },
			},
			limit: 1000,
		});
		return result.docs
			.map((doc) => doc.slug)
			.filter((slug): slug is string => !!slug);
	} catch (error) {
		console.error("Error fetching case study slugs:", error);
		return [];
	}
}
