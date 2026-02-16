"use server";

import config from "@payload-config";
import { getPayload } from "payload";

export type FormState = {
	success: boolean;
	message?: string;
	error?: string;
};

export async function submitForm(
	formId: number,
	data: Record<string, unknown>,
): Promise<FormState> {
	const payload = await getPayload({ config });

	try {
		const submissionData = Object.entries(data).map(([field, value]) => ({
			field,
			value: String(value),
		}));

		await payload.create({
			collection: "form-submissions",
			data: {
				form: formId,
				submissionData,
			},
		});

		return {
			success: true,
			message: "Form submitted successfully.",
		};
	} catch (error: unknown) {
		console.error("Form submission error:", error);
		return {
			success: false,
			message: "Failed to submit form.",
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}
