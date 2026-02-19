"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import type { Service } from "@/payload-types";

export async function getServiceBySlug(
	slug: string,
	draft = false,
): Promise<Service | null> {
	const payload = await getPayload({ config });

	try {
		const result = await payload.find({
			collection: "services",
			where: {
				slug: {
					equals: slug,
				},
			},
			draft,
			limit: 1,
			depth: 2, // Ensure we get related media/data if needed
		});

		return result.docs[0] || null;
	} catch (error) {
		console.error(`Error fetching service with slug ${slug}:`, error);
		return null;
	}
}

export async function getServices(): Promise<Service[]> {
	const payload = await getPayload({ config });

	try {
		const result = await payload.find({
			collection: "services",
			limit: 100, // Reasonable limit for services
			sort: "title",
		});

		return result.docs;
	} catch (error) {
		console.error("Error fetching services:", error);
		return [];
	}
}
