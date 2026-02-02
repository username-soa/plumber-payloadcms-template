import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import DynamicIcon from "@/components/ui/dynamic-icon";
import {
	TypographyH1,
	TypographyLead,
	TypographyMuted,
} from "@/components/ui/typography";
import type { Page } from "@/payload-types";

type HeroProps = {
	hero: NonNullable<Page["hero"]>;
	updatedAt: string;
	pageTitle?: string;
};

export const MinimalHero = ({ hero, updatedAt, pageTitle }: HeroProps) => {
	const {
		title,
		description,
		badge,
		// @ts-ignore
		badgeVariant,
		// @ts-ignore
		badgeSize,
		icon,
		showDate,
		// @ts-ignore
		titleHighlight,
		// @ts-ignore
		heroTheme,
	} = hero;

	const displayTitle = title || pageTitle;

	const displayDate = updatedAt
		? format(new Date(updatedAt), "MMMM d, yyyy")
		: null;

	const renderTitle = () => {
		if (!displayTitle) return null;
		if (!titleHighlight) {
			return (
				<TypographyH1 className="text-4xl md:text-5xl font-bold mb-4">
					{displayTitle}
				</TypographyH1>
			);
		}

		const parts = displayTitle.split(new RegExp(`(${titleHighlight})`, "gi"));
		return (
			<TypographyH1 className="text-4xl md:text-5xl font-bold mb-4">
				{parts.map((part, i) => {
					if (part.toLowerCase() === titleHighlight.toLowerCase()) {
						return (
							<span key={i} className="text-primary relative inline-block">
								{part}
								<svg
									className="absolute -bottom-2 left-0 w-full"
									viewBox="0 0 200 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										d="M2 8 C 50 2, 150 2, 198 8"
										stroke="currentColor"
										strokeWidth="3"
										strokeLinecap="round"
										className="text-primary/30"
									/>
								</svg>
							</span>
						);
					}
					return <span key={i}>{part}</span>;
				})}
			</TypographyH1>
		);
	};

	const isPrimaryGradient = heroTheme === "primary-gradient";

	return (
		<section
			className={cn(
				"relative border-b overflow-hidden",
				isPrimaryGradient ? "bg-background" : "bg-muted/50",
			)}
		>
			{isPrimaryGradient && (
				<>
					{/* Background gradient */}
					<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/10" />

					{/* Floating shapes */}
					<div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
				</>
			)}

			<div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
				<div className="max-w-3xl mx-auto text-center mt-14">
					{badge && (
						<Badge
							variant={badgeVariant || "outline"}
							size={badgeSize || "default"}
							className="mb-4 gap-2"
						>
							{icon && <DynamicIcon name={icon} className="w-4 h-4" />}
							{badge}
						</Badge>
					)}

					<div className="hero-content">
						{renderTitle()}
						{description && (
							<TypographyLead className="text-lg text-muted-foreground mt-0">
								{description}
							</TypographyLead>
						)}
					</div>

					{showDate && displayDate && (
						<TypographyMuted className="text-sm text-muted-foreground mt-4">
							Last updated: {displayDate}
						</TypographyMuted>
					)}
				</div>
			</div>
		</section>
	);
};
