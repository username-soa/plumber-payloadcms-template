import configPromise from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";
import type { Service } from "@/payload-types";

/**
 * Fetches a single service by slug.
 * Wrapped with React.cache() to deduplicate within a render pass
 * (e.g. generateMetadata + ServicePage share one DB hit).
 */
export const getServiceBySlug = cache(
	async (slug: string, draft = false): Promise<Service | null> => {
		const payload = await getPayload({ config: configPromise });

		try {
			const result = await payload.find({
				collection: "services",
				where: { slug: { equals: slug } },
				draft,
				limit: 1,
				depth: 2,
			});

			return result.docs[0] ?? null;
		} catch (error) {
			console.error(`Error fetching service with slug "${slug}":`, error);
			return null;
		}
	},
);

/**
 * Fetches all direct child services of a parent service.
 * Not cached — depends on a specific parent ID resolved at runtime.
 */
export async function getSubServices(parentId: number): Promise<Service[]> {
	const payload = await getPayload({ config: configPromise });

	try {
		const result = await payload.find({
			collection: "services",
			where: { parentService: { equals: parentId } },
			limit: 50,
			sort: "title",
			depth: 1,
		});

		return result.docs;
	} catch (error) {
		console.error(
			`Error fetching sub-services for parent ID ${parentId}:`,
			error,
		);
		return [];
	}
}

/**
 * Returns all published services — used by generateStaticParams.
 * Not cached — runs at build time in a different context.
 */
export async function getServices(): Promise<Service[]> {
	const payload = await getPayload({ config: configPromise });

	try {
		const result = await payload.find({
			collection: "services",
			limit: 100,
			sort: "title",
			depth: 0,
		});

		return result.docs;
	} catch (error) {
		console.error("Error fetching services:", error);
		return [];
	}
}

/**
 * Fetches related services, excluding the current one.
 */
export async function getRelatedServices(
	currentSlug: string,
	limit = 3,
): Promise<Service[]> {
	const payload = await getPayload({ config: configPromise });

	try {
		const result = await payload.find({
			collection: "services",
			where: { slug: { not_equals: currentSlug } },
			limit,
			sort: "-updatedAt",
			depth: 0,
		});

		return result.docs;
	} catch (error) {
		console.error(
			`Error fetching related services for slug "${currentSlug}":`,
			error,
		);
		return [];
	}
}
