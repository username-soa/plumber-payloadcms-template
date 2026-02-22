"use client";

import type { TextFieldClientProps } from "payload";
import { useField, FieldLabel } from "@payloadcms/ui";
import { useState, useRef, useEffect } from "react";
import { Sketch } from "@uiw/react-color";
import type { ColorResult } from "@uiw/color-convert";

type ColorPickerProps = TextFieldClientProps & {
	className?: string;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
	path,
	field,
	className,
}) => {
	const { value = "", setValue } = useField<string>({ path });
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Close on click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

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
				label={field.label || field.name}
				path={path}
				required={field.required}
			/>

			<div className="relative" ref={containerRef}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
					}}
				>
					<button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						style={{
							width: "40px",
							height: "40px",
							borderRadius: "3px",
							backgroundColor: value || "#ffffff",
							border: "1px solid var(--theme-elevation-200)",
							cursor: "pointer",
							boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
						}}
						title="Click to select color"
					/>
					<input
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="#000000"
						style={{
							flex: 1,
							padding: "8px 12px",
							background: "var(--theme-elevation-50)",
							border: "1px solid var(--theme-elevation-200)",
							borderRadius: "4px",
							color: "var(--theme-elevation-800)",
							fontSize: "14px",
							outline: "none",
						}}
					/>
				</div>

				{isOpen && (
					<div
						style={{
							position: "absolute",
							top: "100%",
							left: 0,
							zIndex: 50,
							marginTop: "8px",
							boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
						}}
					>
						<Sketch
							color={value || "#ffffff"}
							onChange={(color: ColorResult) => {
								setValue(color.hex);
							}}
							presetColors={[
								"#ea580c",
								"#c2410c",
								"#0d9488",
								"#1e3a5f",
								"#2563eb",
								"#ffffff",
								"#000000",
								"transparent",
							]}
							style={{
								boxShadow: "none",
								border: "1px solid var(--theme-elevation-200)",
								borderRadius: "4px",
							}}
						/>
					</div>
				)}
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
