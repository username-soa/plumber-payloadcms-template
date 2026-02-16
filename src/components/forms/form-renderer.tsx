"use client";

import { useState, useTransition, useMemo } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Form } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { submitForm } from "@/app/(site)/actions/form-submission";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { blockConverters } from "@/components/richtext/block-converters";
import { generateFormSchema } from "@/lib/forms/schema";

// Field Components
import { TextField } from "./fields/text-field";
import { TextareaField } from "./fields/textarea-field";
import { SelectField } from "./fields/select-field";
import { CheckboxField } from "./fields/checkbox-field";
import { MessageField } from "./fields/message-field";
import { UrgencyField } from "./fields/urgency-field";
import { PropertyTypeField } from "./fields/property-type-field";
import { FileField } from "./fields/file-field";
import { CheckboxGroupField } from "./fields/checkbox-group-field";
import { uploadMedia } from "@/app/(site)/actions/media-actions";

type FormRendererProps = {
	form: Form;
	customRenderers?: Record<string, React.ComponentType<any>>;
};

export function FormRenderer({ form, customRenderers }: FormRendererProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [serverError, setServerError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<any>(null);

	// Generate schema based on form fields
	const schema = useMemo(() => generateFormSchema(form.fields), [form.fields]);

	const methods = useForm<Record<string, any>>({
		resolver: zodResolver(schema as any),
	});

	const onSubmit = (data: Record<string, unknown>) => {
		setServerError(null);
		setSuccessMessage(null);

		startTransition(async () => {
			try {
				// Handle file uploads first
				const processedData = { ...data };
				for (const [key, value] of Object.entries(data)) {
					if (value instanceof FileList) {
						if (value.length > 0) {
							const file = value[0];
							const formData = new FormData();
							formData.append("file", file);
							const uploadResult = await uploadMedia(formData);

							if (!uploadResult.success || !uploadResult.doc) {
								throw new Error(uploadResult.error || "File upload failed");
							}
							// Construct full URL for the file
							const serverUrl =
								process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
							const docUrl = uploadResult.doc.url || "";
							const fileUrl = docUrl.startsWith("http")
								? docUrl
								: `${serverUrl}${docUrl}`;
							processedData[key] = fileUrl;
						} else {
							// No file selected, remove key or set to null?
							// If required, validation would have caught it.
							delete processedData[key];
						}
					}
				}

				const result = await submitForm(form.id, processedData);

				if (result.success) {
					methods.reset();
					if (form.confirmationType === "redirect" && form.redirect?.url) {
						router.push(form.redirect.url);
					} else {
						const message =
							form.confirmationMessage || "Thank you for your submission.";

						setSuccessMessage(message as any);
						toast.success("Success", {
							description:
								typeof message === "string"
									? message
									: "Form submitted successfully",
						});
					}
				} else {
					setServerError(result.error || "Something went wrong");
					toast.error("Error", {
						description: result.error || "Failed to submit form",
					});
				}
			} catch (error) {
				console.error(error);
				setServerError("An unexpected error occurred");
				toast.error("Error", { description: "An unexpected error occurred" });
			}
		});
	};

	if (!form.fields || form.fields.length === 0) {
		return null;
	}

	if (successMessage) {
		return (
			<div className="bg-green-50 text-green-900 p-4 rounded-md mb-6 border border-green-200">
				{typeof successMessage === "object" &&
				successMessage !== null &&
				"root" in successMessage ? (
					<div className="prose prose-green max-w-none">
						<RichText
							data={successMessage as any}
							converters={blockConverters}
						/>
					</div>
				) : (
					<>
						<h3 className="font-semibold text-lg mb-1">Success!</h3>
						<p>{successMessage as string}</p>
					</>
				)}
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className="grid grid-cols-1 md:grid-cols-2 gap-6"
				>
					{form.fields.map((field, index) => {
						const fieldName = "name" in field ? field.name : `field_${index}`;
						const width = "width" in field ? field.width : 100;
						const colSpanClass =
							width && width < 100 ? "col-span-1" : "col-span-1 md:col-span-2";

						// Handle Custom Renderers
						const CustomRenderer = customRenderers?.[fieldName];
						if (CustomRenderer) {
							return (
								<div key={fieldName} className={colSpanClass}>
									<Controller
										control={methods.control}
										name={fieldName}
										render={({ field: { onChange, value } }) => (
											<CustomRenderer
												value={value}
												onChange={onChange}
												field={field}
											/>
										)}
									/>
								</div>
							);
						}

						return (
							<div key={fieldName} className={colSpanClass}>
								{field.blockType === "text" && (
									<TextField
										name={field.name}
										label={field.label || ""}
										placeholder={field.placeholder || ""}
										required={Boolean(field.required)}
									/>
								)}
								{field.blockType === "email" && (
									<TextField
										name={field.name}
										label={field.label || ""}
										placeholder={field.placeholder || ""}
										required={Boolean(field.required)}
										type="email"
									/>
								)}
								{field.blockType === "number" && (
									<TextField
										name={field.name}
										label={field.label || ""}
										placeholder={field.placeholder || ""}
										required={Boolean(field.required)}
										type="number"
									/>
								)}
								{field.blockType === "textarea" && (
									<TextareaField
										name={field.name}
										label={field.label || ""}
										placeholder={field.placeholder || ""}
										required={Boolean(field.required)}
									/>
								)}
								{field.blockType === "select" && (
									<SelectField
										name={field.name}
										label={field.label || ""}
										placeholder={field.placeholder || ""}
										required={Boolean(field.required)}
										options={field.options || []}
									/>
								)}
								{field.blockType === "checkbox" && (
									<CheckboxField
										name={field.name}
										label={field.label || ""}
										required={Boolean(field.required)}
									/>
								)}
								{field.blockType === "message" && (
									<MessageField message={field.message} />
								)}
								{field.blockType === "urgency" && (
									<UrgencyField
										name={field.name}
										label={field.label || ""}
										required={Boolean(field.required)}
									/>
								)}
								{field.blockType === "propertyType" && (
									<PropertyTypeField
										name={field.name}
										label={field.label || ""}
										required={Boolean(field.required)}
									/>
								)}
								{field.blockType === "file" && (
									<FileField
										name={field.name}
										label={field.label || ""}
										required={Boolean(field.required)}
										allowedFileTypes={field.allowedFileTypes || undefined}
									/>
								)}
								{field.blockType === "checkboxGroup" && (
									<CheckboxGroupField
										name={field.name}
										label={field.label || ""}
										required={Boolean(field.required)}
										options={field.options || []}
									/>
								)}
							</div>
						);
					})}

					<div className="col-span-1 md:col-span-2 space-y-4">
						{serverError && (
							<p className="text-sm text-red-500">{serverError}</p>
						)}

						<Button
							type="submit"
							size={"lg"}
							className="w-full"
							disabled={isPending}
						>
							{isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
							{form.submitButtonLabel || "Submit"}
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
}
