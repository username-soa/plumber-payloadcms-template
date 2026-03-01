import type { Media } from "@/payload-types";
import { cn } from "@/lib/utils";
import DynamicIcon from "@/components/ui/dynamic-icon";
import Link from "next/link";
import { getCMSLinkHref, type CMSLinkType } from "@/lib/cms-link";

export interface FeatureGridItemType {
	id?: string;
	size?: "small" | "medium" | "big" | null;
	iconType?: "none" | "icon" | "number" | "custom" | null;
	icon?: Media | string | null;
	customIcon?: string | null;
	number?: string | null;
	title?: string | null;
	titleSize?: "small" | "normal" | "big" | null;
	description?: string | null;
	descriptionSize?: "small" | "normal" | "big" | null;
	link?: CMSLinkType | null;
}

export interface FeatureGridProps {
	layout?: "row" | "column" | null;
	items?: FeatureGridItemType[] | null;
	size?: "small" | "medium" | "big" | null;
	titleSize?: "small" | "normal" | "big" | null;
	descriptionSize?: "small" | "normal" | "big" | null;
	showBorder?: boolean | null;
	showShadow?: boolean | null;
	showIconBackground?: boolean | null;
	enableCustomIconColor?: boolean | null;
	customIconColor?: string | null;
}

export function FeatureGrid({
	layout = "column",
	items = [],
	size = "medium",
	titleSize = "normal",
	descriptionSize = "normal",
	showBorder = true,
	showShadow = false,
	showIconBackground = true,
	enableCustomIconColor = false,
	customIconColor,
}: FeatureGridProps) {
	if (!items || items.length === 0) return null;

	const isRow = layout === "row";

	return (
		<div className={cn("w-full my-8")}>
			<div
				className={cn(
					"flex gap-x-6 gap-y-4 w-full",
					isRow ? "flex-row flex-wrap" : "flex-col max-w-3xl mx-auto",
				)}
			>
				{items.map((item, index) => {
					// Title styles
					const titleSizes = {
						small: "text-xs",
						normal: "text-[15px]",
						big: "text-lg",
					};
					const titleClass =
						titleSizes[titleSize || item.titleSize || "normal"];

					// Description styles
					const descSizes = {
						small: "text-[11px]",
						normal: "text-sm",
						big: "text-base",
					};
					const descClass =
						descSizes[descriptionSize || item.descriptionSize || "normal"];

					// Size resolution
					const currentSize = size || item.size || "medium";

					// Icon/Number wrapper sizing
					const wrapperSizes = {
						small: "size-6 text-base",
						medium: "size-9 text-[16px]",
						big: "size-12 text-xl",
					};
					const wrapperClass = wrapperSizes[currentSize];

					// Render Icon or Number
					let IconComponent = null;

					// Inline styles for custom color
					const hasCustomColor =
						customIconColor && customIconColor !== "transparent";
					const iconStyle = hasCustomColor ? { color: customIconColor } : {};
					const iconBgStyle =
						showIconBackground && hasCustomColor
							? {
									backgroundColor: `${customIconColor}1a`, // 10% opacity hex
									borderColor: `${customIconColor}33`, // 20% opacity hex
								}
							: {};

					// Combined styles for the wrapper
					const wrapperStyle = { ...iconStyle, ...iconBgStyle };

					if (item.iconType === "number") {
						IconComponent = showIconBackground ? (
							<div
								className={cn(
									"shrink-0 flex items-center justify-center rounded-full font-bold bg-primary/10 text-primary",
									wrapperClass,
								)}
								style={wrapperStyle}
							>
								{item.number || index + 1}
							</div>
						) : (
							<span
								className={cn(
									"shrink-0 font-bold text-primary leading-none",
									currentSize === "small"
										? "text-base"
										: currentSize === "medium"
											? "text-lg"
											: "text-xl",
								)}
								style={iconStyle}
							>
								{item.number || index + 1}
							</span>
						);
					} else if (item.iconType === "icon" && item.customIcon) {
						IconComponent = showIconBackground ? (
							<div
								className={cn(
									"shrink-0 flex items-center justify-center rounded-full bg-primary/10 text-primary ",
									wrapperClass,
								)}
								style={wrapperStyle}
							>
								<DynamicIcon
									name={item.customIcon}
									className={cn("w-1/2 h-1/2")}
									strokeWidth={2}
								/>
							</div>
						) : (
							<DynamicIcon
								name={item.customIcon}
								className={cn(
									"shrink-0 text-primary mt-0.5",
									currentSize === "small"
										? "size-4"
										: currentSize === "medium"
											? "size-5"
											: "size-6 md:size-8",
								)}
								style={iconStyle}
								strokeWidth={2}
							/>
						);
					}

					const itemContent = (
						<>
							{IconComponent}

							<div className="flex flex-col gap-1.5">
								{item.title && (
									<h3
										className={cn(
											"font-semibold text-foreground tracking-tight",
											titleClass,
										)}
									>
										{item.title}
									</h3>
								)}
								{item.description && (
									<p
										className={cn(
											"text-muted-foreground leading-relaxed",
											descClass,
										)}
									>
										{item.description}
									</p>
								)}
							</div>
						</>
					);

					const paddingClasses = {
						small: "px-2 py-1",
						medium: "px-3 py-2",
						big: "px-4 py-3",
					};

					const hasOnlyOneText =
						(!!item.title && !item.description) ||
						(!item.title && !!item.description);

					const classNames = cn(
						// gap-4 md:gap-6
						"flex flex-row rounded-2xl transition-all",
						hasOnlyOneText ? "items-center" : "items-start",
						showBorder && "border",
						showBorder && showShadow && "shadow-sm hover:shadow-md",
						showBorder && (isRow ? "bg-card" : "bg-card/50"),
						showBorder && paddingClasses[currentSize],
						currentSize === "small"
							? "gap-2"
							: currentSize === "medium"
								? "gap-4"
								: "gap-6",
					);

					// Determine if we should wrap in a Link
					let href = "#";
					if (item.link) {
						href = getCMSLinkHref({
							...item.link,
							label: item.link.label || "",
						} as CMSLinkType);
					}

					if (item.link && href !== "#") {
						return (
							<Link
								key={item.id || index}
								href={href}
								target={item.link.newTab ? "_blank" : undefined}
								className={cn(classNames, "hover:bg-accent/50 cursor-pointer")}
							>
								{itemContent}
							</Link>
						);
					}

					return (
						<div key={item.id || index} className={classNames}>
							{itemContent}
						</div>
					);
				})}
			</div>
		</div>
	);
}
