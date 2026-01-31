"use client";

import type { TextFieldClientComponent } from "payload";
import { useField, FieldLabel } from "@payloadcms/ui";
import { useState, useMemo, useEffect, useRef } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import * as LucideIcons from "lucide-react";

// Helper to convert PascalCase to kebab-case
// Helper to convert PascalCase to kebab-case
const pascalToKebab = (str: string) =>
	str
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/([a-z])([0-9])/g, "$1-$2")
		.toLowerCase();

// Helper to convert kebab-case to PascalCase
const kebabToPascal = (str: string) =>
	str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("");

const getLucideIcon = (name: string) => {
	if (!name) return null;
	// Check if name is kebab-case (contains hyphens or is lowercase), if so convert to Pascal.
	// Actually Lucide keys are always PascalCase.
	// If we store kebab-case in 'value', we must convert to Pascal to find the component.
	const pascalName = kebabToPascal(name);
	const Icon = (LucideIcons as any)[pascalName];
	return Icon || null;
};

// Filter out non-icon exports and legacy alias "Icon" suffixes
const iconList = Object.keys(LucideIcons).filter(
	(key) =>
		key !== "createLucideIcon" &&
		key !== "icons" &&
		isNaN(Number(key)) &&
		!key.endsWith("Icon"),
);

export const IconPicker: TextFieldClientComponent = ({ path, field }) => {
	const { value, setValue } = useField<string>({ path }); // value should be kebab-case now
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [limit, setLimit] = useState(100);
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Focus input when dropdown opens
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

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

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const filteredIcons = useMemo(() => {
		if (!searchTerm) return iconList.slice(0, limit);
		const lowerTerm = searchTerm.toLowerCase();
		return iconList
			.filter((name) => name.toLowerCase().includes(lowerTerm))
			.slice(0, limit);
	}, [searchTerm, limit]);

	const totalIcons = searchTerm
		? iconList.filter((name) =>
				name.toLowerCase().includes(searchTerm.toLowerCase()),
			).length
		: iconList.length;

	// Get the selected icon component dynamically
	const SelectedIcon = useMemo(() => {
		return value ? getLucideIcon(value) : null;
	}, [value]);

	return (
		<div className="field-type text" ref={containerRef}>
			<FieldLabel label={field.label} path={path} required={field.required} />

			<div
				style={{
					marginBottom: "10px",
					fontSize: "12px",
					color: "var(--theme-elevation-500)",
					lineHeight: "1.5",
				}}
			>
				Search for an icon by name (e.g., "Home", "User", "Wrench"). The
				selected icon will be displayed next to the text on the website.
			</div>

			<div className="relative">
				{SelectedIcon ? (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							background: "#09090b", // zinc-950
							border: "1px solid #27272a", // zinc-800
							borderRadius: "12px",
							padding: "12px 16px",
							color: "white",
							width: "100%",
							marginBottom: "8px",
						}}
					>
						<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
							<div
								style={{
									width: "48px",
									height: "48px",
									background: "#18181b", // zinc-900
									borderRadius: "8px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									border: "1px solid #27272a", // zinc-800
								}}
							>
								<SelectedIcon size={24} color="white" />
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "baseline",
									paddingTop: "12px",
									gap: "8px",
								}}
							>
								<span
									style={{
										fontSize: "15px",
										fontWeight: 500,
										color: "#e4e4e7",
									}}
								>
									{value}
								</span>
								<span style={{ fontSize: "13px", color: "#71717a" }}>
									.svg | 24KB
								</span>
							</div>
						</div>

						<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
							<button
								type="button"
								onClick={() => setIsOpen(true)}
								style={{
									background: "#27272a",
									border: "1px solid #3f3f46",
									color: "#e4e4e7",
									padding: "8px 16px",
									borderRadius: "6px",
									fontSize: "13px",
									cursor: "pointer",
									transition: "all 0.2s",
									fontWeight: 500,
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = "#3f3f46";
									e.currentTarget.style.borderColor = "#52525b";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = "#27272a";
									e.currentTarget.style.borderColor = "#3f3f46";
								}}
							>
								Browse Files
							</button>
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									setValue("");
								}}
								style={{
									background: "transparent",
									border: "none",
									color: "#71717a",
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									padding: "4px",
									transition: "color 0.2s",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.color = "#ffffff";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.color = "#71717a";
								}}
								aria-label="Clear icon"
							>
								<X size={20} />
							</button>
						</div>
					</div>
				) : (
					<button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						style={{
							border: "1px solid var(--theme-elevation-200)",
							background: "var(--theme-elevation-50)",
							borderRadius: "4px",
							minHeight: "40px",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							color: "var(--theme-elevation-800)",
							padding: "8px 12px",
							cursor: "pointer",
							width: "100%",
							textAlign: "left",
						}}
					>
						<span
							style={{
								color: "var(--theme-elevation-400)",
								fontSize: "14px",
							}}
						>
							Select an icon...
						</span>
						<ChevronDown
							size={14}
							style={{
								color: "var(--theme-elevation-400)",
							}}
						/>
					</button>
				)}

				{isOpen && (
					<div
						style={{
							position: "absolute",
							top: "100%",
							left: 0,
							right: 0,
							zIndex: 50,
							marginTop: "8px",
							background: "var(--theme-elevation-50)",
							border: "1px solid var(--theme-elevation-200)",
							borderRadius: "4px",
							boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
							color: "var(--theme-elevation-800)",
						}}
					>
						<div
							style={{
								padding: "12px",
								borderBottom: "1px solid var(--theme-elevation-150)",
							}}
						>
							<div style={{ position: "relative" }}>
								<Search
									size={14}
									style={{
										position: "absolute",
										left: "12px",
										top: "50%",
										transform: "translateY(-50%)",
										color: "var(--theme-elevation-400)",
									}}
								/>
								<input
									type="text"
									placeholder="Search icons..."
									value={searchTerm}
									onChange={(e) => {
										setSearchTerm(e.target.value);
										setLimit(100);
									}}
									ref={inputRef}
									style={{
										width: "100%",
										padding: "8px 12px 8px 36px",
										background: "var(--theme-elevation-100)",
										border: "none",
										borderRadius: "4px",
										color: "var(--theme-elevation-800)",
										fontSize: "14px",
										outline: "none",
									}}
								/>
							</div>
						</div>

						<div
							style={{
								maxHeight: "300px",
								overflowY: "auto",
								padding: "12px",
								display: "grid",
								gridTemplateColumns: "repeat(6, 1fr)",
								gap: "8px",
							}}
						>
							{filteredIcons.map((iconName) => {
								const pascalName = iconName; // List already has PascalCase
								const kebabName = pascalToKebab(pascalName);
								const Icon = getLucideIcon(pascalName);
								const isSelected = value === kebabName; // Compare against kebab value

								if (!Icon) return null;

								return (
									<button
										key={iconName}
										type="button"
										onClick={() => {
											setValue(kebabName); // Set value to kebab
											setIsOpen(false);
										}}
										title={pascalName}
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
											padding: "8px",
											border: isSelected
												? "1px solid var(--theme-primary-500)"
												: "1px solid transparent",
											background: isSelected
												? "var(--theme-primary-100)"
												: "transparent",
											borderRadius: "4px",
											cursor: "pointer",
											color: isSelected
												? "var(--theme-primary-700)"
												: "var(--theme-elevation-800)",
											fontSize: "10px",
											gap: "4px",
											transition: "all 0.1s",
										}}
										onMouseEnter={(e) => {
											if (!isSelected) {
												e.currentTarget.style.background =
													"var(--theme-elevation-100)";
											}
										}}
										onMouseLeave={(e) => {
											if (!isSelected) {
												e.currentTarget.style.background = "transparent";
											}
										}}
									>
										<Icon size={20} />
									</button>
								);
							})}
						</div>

						<div
							style={{
								padding: "8px",
								borderTop: "1px solid var(--theme-elevation-150)",
								display: "flex",
								flexDirection: "column",
								gap: "8px",
								alignItems: "center",
							}}
						>
							<div
								style={{
									fontSize: "11px",
									color: "var(--theme-elevation-400)",
								}}
							>
								Showing {filteredIcons.length} of {totalIcons} icons
							</div>

							{filteredIcons.length < totalIcons && (
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setLimit((prev) => prev + 100);
									}}
									style={{
										fontSize: "12px",
										color: "var(--theme-primary-500)",
										background: "transparent",
										border: "none",
										cursor: "pointer",
										fontWeight: 500,
									}}
								>
									Load More
								</button>
							)}
						</div>
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
