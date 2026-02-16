import { z } from "zod";
import type { Form } from "@/payload-types";

type Field = NonNullable<Form["fields"]>[number];

export function generateFormSchema(fields: Field[] | undefined | null) {
	if (!fields || fields.length === 0) {
		return z.object({});
	}

	const schemaShape: Record<string, z.ZodTypeAny> = {};

	fields.forEach((field, index) => {
		if (field.blockType === "message") {
			return;
		}

		const name = "name" in field ? field.name : `field_${index}`;
		const required = "required" in field ? Boolean(field.required) : false;

		// Base schema based on blockType
		let fieldSchema: z.ZodTypeAny;

		switch (field.blockType) {
			case "text":
			case "textarea":
				fieldSchema = z.string();
				if (required) {
					fieldSchema = (fieldSchema as z.ZodString).min(
						1,
						"This field is required",
					);
				} else {
					fieldSchema = (fieldSchema as z.ZodString)
						.optional()
						.or(z.literal(""));
				}
				break;

			case "email":
				fieldSchema = z.string();
				if (required) {
					fieldSchema = (fieldSchema as z.ZodString)
						.min(1, "This field is required")
						.email("Invalid email address");
				} else {
					fieldSchema = (fieldSchema as z.ZodString)
						.email("Invalid email address")
						.optional()
						.or(z.literal(""));
				}
				break;

			case "number":
				fieldSchema = z.coerce.number();
				if (required) {
					fieldSchema = fieldSchema as z.ZodNumber; // coerce handles input string -> number
				} else {
					fieldSchema = (fieldSchema as z.ZodNumber).optional();
				}
				break;

			case "select":
				fieldSchema = z.string();
				if (required) {
					fieldSchema = (fieldSchema as z.ZodString).min(
						1,
						"Please select an option",
					);
				} else {
					fieldSchema = (fieldSchema as z.ZodString).optional();
				}
				break;

			case "checkbox":
				fieldSchema = z.boolean();
				if (required) {
					// Checkbox required usually means it must be true (e.g. Terms)
					fieldSchema = (fieldSchema as z.ZodBoolean).refine(
						(val) => val === true,
						"This field is required",
					);
				} else {
					fieldSchema = (fieldSchema as z.ZodBoolean).optional();
				}
				break;

			case "urgency": // Custom block
				fieldSchema = z.string();
				if (required) {
					fieldSchema = (fieldSchema as z.ZodString).min(
						1,
						"Please select an urgency level",
					);
				} else {
					fieldSchema = (fieldSchema as z.ZodString).optional();
				}
				break;

			case "propertyType": // Custom block
				fieldSchema = z.string();
				if (required) {
					fieldSchema = (fieldSchema as z.ZodString).min(
						1,
						"Please select a property type",
					);
				} else {
					fieldSchema = (fieldSchema as z.ZodString).optional();
				}
				break;

			case "file":
				if (typeof window !== "undefined") {
					fieldSchema = z.instanceof(FileList);
					if (required) {
						fieldSchema = (fieldSchema as z.ZodType<FileList>).refine(
							(files) => files?.length > 0,
							"File is required",
						);
					} else {
						fieldSchema = (fieldSchema as z.ZodTypeAny).optional();
					}
				} else {
					fieldSchema = z.any();
				}
				break;

			case "checkboxGroup":
				fieldSchema = z.array(z.string());
				if (required) {
					fieldSchema = (fieldSchema as z.ZodArray<z.ZodString>).min(
						1,
						"Please select at least one option",
					);
				} else {
					fieldSchema = (fieldSchema as z.ZodArray<z.ZodString>).optional();
				}
				break;

			default:
				// Fallback for unknown fields
				fieldSchema = z.any();
				break;
		}

		schemaShape[name] = fieldSchema;
	});

	return z.object(schemaShape);
}
