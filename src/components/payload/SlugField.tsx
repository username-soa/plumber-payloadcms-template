"use client";
import { useField, useFormFields, TextInput, FieldLabel } from "@payloadcms/ui";
import type { TextFieldClientProps } from "payload";
import { useCallback } from "react";

/**
 * Converts a string to a URL-friendly slug
 */
function formatSlug(value: string): string {
	return value
		.toLowerCase()
		.replace(/ /g, "-")
		.replace(/[^\w-]+/g, "");
}

type SlugFieldProps = TextFieldClientProps & {
	className?: string;
};

export const SlugField: React.FC<SlugFieldProps> = ({
	field,
	path,
	className,
}) => {
	const { value, setValue } = useField<string>({ path });

	// Get the target field to generate from (default to 'title' for backward compatibility)
	const generateFrom = field.admin?.custom?.generateFrom || "title";

	// Get the source field - only re-renders when source field changes
	const sourceField = useFormFields(([fields]) => fields[generateFrom]);
	const sourceValue = sourceField?.value as string | undefined;

	const handleGenerate = useCallback(() => {
		if (sourceValue) {
			setValue(formatSlug(sourceValue));
		}
	}, [sourceValue, setValue]);

	return (
		<div
			className={[className, "field-type text"].filter(Boolean).join(" ")}
			style={
				{
					"--field-width": field.admin?.width || "100%",
				} as React.CSSProperties
			}
		>
			<FieldLabel
				label={field.label || "Slug"}
				path={path}
				required={field.required}
			/>
			<div
				style={{
					display: "flex",
					alignItems: "stretch", // Stretch to match input height
					gap: "10px",
				}}
			>
				<div style={{ flexGrow: 1, position: "relative" }}>
					<TextInput
						path={path}
						value={value || ""}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setValue(e.target.value)
						}
					/>
				</div>
				<button
					type="button"
					onClick={handleGenerate}
					disabled={!sourceValue}
					style={{
						padding: "0 25px", // Horizontal padding only, let height be determined by container
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "13px",
						borderRadius: "4px",
						border: "1px solid var(--theme-elevation-400)",
						background: "var(--theme-elevation-100)",
						color: "var(--theme-text)",
						cursor: sourceValue ? "pointer" : "not-allowed",
						opacity: sourceValue ? 1 : 0.5,
						transition: "all 0.15s ease",
						whiteSpace: "nowrap",
					}}
					onMouseEnter={(e) => {
						if (sourceValue) {
							e.currentTarget.style.background = "var(--theme-elevation-200)";
						}
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.background = "var(--theme-elevation-100)";
					}}
				>
					Generate
				</button>
			</div>

			{field.admin?.description && (
				<div
					className="field-description"
					style={{
						marginTop: "0.25rem",
						fontSize: "12px",
						color: "var(--theme-elevation-600)",
					}}
				>
					{typeof field.admin.description === "string"
						? field.admin.description
						: null}
				</div>
			)}
		</div>
	);
};

export default SlugField;
