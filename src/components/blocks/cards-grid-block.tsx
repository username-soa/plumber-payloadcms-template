import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "../ui/section-wrapper";
import { TypographyH3, TypographyP } from "../ui/typography";
import { getCMSLinkHref } from "@/lib/cms-link";
import { getLucideIcon } from "@/lib/icons";
import type { Page } from "@/payload-types";

type Props = Extract<Page["layout"][0], { blockType: "cardsGrid" }>;

export const CardsGridBlock: React.FC<Props> = ({
	columns = "3",
	cardLayout = "stacked",
	paddingTopOption = "default",
	paddingBottomOption = "default",
	enableHighlight = true,
	cards,
	background,
}) => {
	const gridColsClass = {
		"1": "grid-cols-1",
		"2": "grid-cols-1 md:grid-cols-2",
		"3": "grid-cols-1 md:grid-cols-3",
		"4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
		"5": "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
		"6": "grid-cols-1 md:grid-cols-3 lg:grid-cols-6",
	}[columns ?? "3"];

	return (
		<SectionWrapper
			paddingTop={paddingTopOption}
			paddingBottom={paddingBottomOption}
			background={background}
		>
			<div className={cn("grid gap-6", gridColsClass)}>
				{cards?.map((card, index) => {
					const IconComponent = getLucideIcon(card.icon ?? "");
					const href = getCMSLinkHref(
						card.link
							? { ...card.link, label: card.link.label ?? "" }
							: undefined,
					);
					const hasLink = !!href && href !== "#";

					const iconEl = IconComponent ? (
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
					) : null;

					const inner = (
						<>
							{iconEl}
							<div className="flex flex-col gap-2">
								{card.tag && <TypographyP>{card.tag}</TypographyP>}
								<TypographyH3 className="text-xl font-semibold leading-tight tracking-tight">
									{card.title}
								</TypographyH3>
								{card.description && (
									<TypographyP className="m-0! text-muted-foreground">
										{card.description}
									</TypographyP>
								)}
							</div>
						</>
					);

					if (hasLink && href) {
						return (
							<Link
								key={card.id ?? index}
								href={href}
								target={card.link?.newTab ? "_blank" : undefined}
								className={cn(
									"group relative bg-muted/30 p-6 rounded-2xl border text-card-foreground transition-all duration-300 block h-full",
									enableHighlight && "hover:border-primary/50 hover:shadow-lg",
									cardLayout === "sideBySide"
										? "flex items-start gap-4"
										: "flex flex-col items-start gap-4",
								)}
							>
								{inner}
							</Link>
						);
					}

					return (
						<div
							key={card.id ?? index}
							className={cn(
								"group relative bg-muted/30 p-6 rounded-2xl border text-card-foreground transition-all duration-300 h-full",
								enableHighlight && "hover:border-primary/50",
								cardLayout === "sideBySide"
									? "flex items-start gap-4"
									: "flex flex-col items-start gap-4",
							)}
						>
							{inner}
						</div>
					);
				})}
			</div>
		</SectionWrapper>
	);
};
