"use client";

import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { FileUploader, type FilePreview } from "@/components/ui/file-uploader";

type FileFieldProps = {
	name: string;
	label: string;
	required?: boolean;
	allowedFileTypes?: string;
};

export function FileField({
	name,
	label,
	required,
	allowedFileTypes,
}: FileFieldProps) {
	const { setValue } = useFormContext();
	const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
	const [fileError, setFileError] = useState<string | null>(null);

	// Convert the "allowedFileTypes" config value to an HTML "accept" string
	// Config values: 'all', 'image/*', 'application/pdf', 'image/*,application/pdf'
	const accept = allowedFileTypes === "all" ? undefined : allowedFileTypes;

	const handleFilesSelected = (files: File[]) => {
		setFileError(null);

		// In a real generic implementation, we might want to support multiple files or just one
		// adhering to the field definition. For now, we'll assume single file for typical usage
		// or multiple if allowed. Let's start with single file replacement for simplicity
		// unless we want to support multiple.
		// Given Payload usually handles single file uploads per field unless it's an array,
		// but FileUploader supports multiple. We'll pass the first file to the form.

		// Limitation: The current FileUploader UI is designed for multiple files.
		// We will update form value with the FileList of the input.

		// For better UX with FileUploader, let's accumulate files like ContactForm does
		// but simplify for the generic field.

		const file = files[0];
		if (!file) return;

		// Size check (Example 10MB)
		if (file.size > 10 * 1024 * 1024) {
			setFileError("File size cannot exceed 10MB.");
			return;
		}

		let type: "image" | "video" | "file" = "file";
		let url: string | null = null;

		// Simple type detection for preview
		if (file.type.startsWith("image/")) {
			type = "image";
			url = URL.createObjectURL(file);
		} else if (file.type.startsWith("video/")) {
			type = "video";
		}

		const preview: FilePreview = {
			url,
			type,
			name: file.name,
			size: file.size,
			file,
		};

		setFilePreviews([preview]); // Replace existing for single field behavior

		// Create a DataTransfer to simulate a FileList
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(file);
		setValue(name, dataTransfer.files, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	const removeFile = (index: number) => {
		const preview = filePreviews[index];
		if (preview?.url) URL.revokeObjectURL(preview.url);
		setFilePreviews([]);
		setValue(name, null, { shouldValidate: true, shouldDirty: true });
		setFileError(null);
	};

	// Cleanup
	useEffect(() => {
		return () => {
			filePreviews.forEach((preview) => {
				if (preview.url) URL.revokeObjectURL(preview.url);
			});
		};
	}, [filePreviews]);

	return (
		<div className="space-y-2">
			<FileUploader
				filePreviews={filePreviews}
				onFilesSelected={handleFilesSelected}
				onRemoveFile={removeFile}
				error={fileError}
				label={label}
				required={required}
				accept={accept}
			/>
		</div>
	);
}
