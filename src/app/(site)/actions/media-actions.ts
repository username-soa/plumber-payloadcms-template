"use server";

import config from "@payload-config";
import { getPayload } from "payload";

export async function uploadMedia(formData: FormData) {
	const payload = await getPayload({ config });

	try {
		const file = formData.get("file") as File;
		if (!file) {
			return { success: false, error: "No file provided" };
		}

		const media = await payload.create({
			collection: "media",
			data: {
				alt: file.name,
			},
			file: {
				data: Buffer.from(await file.arrayBuffer()),
				name: file.name,
				mimetype: file.type,
				size: file.size,
			},
		});

		return { success: true, doc: media };
	} catch (error: unknown) {
		console.error("Media upload error:", error);
		const message =
			error instanceof Error ? error.message : "An unknown error occurred";
		return { success: false, error: message };
	}
}
