import * as React from "react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "../ui/section-wrapper";
import type { PaddingOption } from "../ui/section-wrapper";
import { TypographyH3, TypographyP } from "../ui/typography";

// Helper to convert kebab-case to PascalCase for icon lookup
const kebabToPascal = (str: string) =>
	str
		?.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("");

const getLucideIcon = (name: string) => {
	if (!name) return null;
	const pascalName = kebabToPascal(name);
	const Icon = (LucideIcons as any)[pascalName];
	return Icon || null;
};

type Props = {
	columns?: "1" | "2" | "3" | "4" | "5" | "6";
	cardLayout?: "stacked" | "sideBySide";
	paddingTopOption?: "none" | "small" | "default" | "big";
	paddingBottomOption?: "none" | "small" | "default" | "big";
	enableHighlight?: boolean;
	cards: {
		id?: string | null;
		icon?: string;
		title: string;
		description?: string;
		link?: string;
	}[];
};

export const CardsGridBlock: React.FC<Props> = ({
	columns = "3",
	cardLayout = "stacked",
	paddingTopOption = "default",
	paddingBottomOption = "default",
	enableHighlight = true,
	cards,
}) => {
	const gridColsClass = {
		"1": "grid-cols-1",
		"2": "grid-cols-1 md:grid-cols-2",
		"3": "grid-cols-1 md:grid-cols-3",
		"4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
		"5": "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
		"6": "grid-cols-1 md:grid-cols-3 lg:grid-cols-6",
	}[columns];

	return (
		<SectionWrapper
			paddingTop={paddingTopOption as PaddingOption}
			paddingBottom={paddingBottomOption as PaddingOption}
		>
			<div className={cn("grid gap-6", gridColsClass)}>
				{cards?.map((card, index) => {
					const IconComponent = getLucideIcon(card.icon || "");

					return (
						<div
							key={card.id || index}
							className={cn(
								"group relative bg-muted/30 p-6 rounded-2xl border text-card-foreground transition-all duration-300",
								enableHighlight && "hover:border-primary/50",
								cardLayout === "sideBySide"
									? "flex items-start gap-4"
									: "flex flex-col items-start gap-4",
							)}
						>
							{IconComponent && (
								<div
									className={cn(
										"flex items-center justify-center rounded-xl transition-colors duration-300",
										"bg-secondary text-primary",
										enableHighlight &&
											"group-hover:bg-primary group-hover:text-primary-foreground",
										cardLayout === "sideBySide" ? "p-3 shrink-0" : "p-4 mb-2",
									)}
								>
									<IconComponent
										size={cardLayout === "sideBySide" ? 24 : 32}
										strokeWidth={1.5}
									/>
								</div>
							)}

							<div className="flex flex-col gap-2">
								<TypographyH3 className="text-xl font-semibold leading-tight tracking-tight">
									{card.title}
								</TypographyH3>
								{card.description && (
									<TypographyP className="m-0! text-muted-foreground">
										{card.description}
									</TypographyP>
								)}
								{card.link && (
									<Link
										href={card.link}
										className="mt-2 text-sm font-medium text-primary hover:underline underline-offset-4"
									>
										Learn more
									</Link>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</SectionWrapper>
	);
};
