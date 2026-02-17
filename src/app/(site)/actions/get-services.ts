"use server";

import config from "@payload-config";
import { getPayload } from "payload";

export async function getServices() {
	const payload = await getPayload({ config });

	try {
		const services = await payload.find({
			collection: "services",
			limit: 100,
			sort: "title",
		});

		return services.docs.map((service) => ({
			label: service.title,
			value: service.title,
		}));
	} catch (error) {
		console.error("Error fetching services:", error);
		return [];
	}
}
