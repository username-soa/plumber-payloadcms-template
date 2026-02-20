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

export async function getSubServices(parentId: number): Promise<Service[]> {
	const payload = await getPayload({ config });

	try {
		const result = await payload.find({
			collection: "services",
			where: {
				parentService: {
					equals: parentId,
				},
			},
			limit: 50,
			sort: "title",
		});

		return result.docs;
	} catch (error) {
		console.error(`Error fetching sub-services for parent ${parentId}:`, error);
		return [];
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

export async function getRelatedServices(
	currentSlug: string,
	limit = 3,
): Promise<Service[]> {
	const payload = await getPayload({ config });

	try {
		const result = await payload.find({
			collection: "services",
			where: {
				slug: {
					not_equals: currentSlug,
				},
			},
			limit,
			sort: "-updatedAt", // Get most recently updated services
		});

		return result.docs;
	} catch (error) {
		console.error(
			`Error fetching related services for slug ${currentSlug}:`,
			error,
		);
		return [];
	}
}
