import type { Page, Service } from "@/payload-types";
import { DefaultHero } from "./templates/default";
import { HighImpactHero } from "./templates/high-impact";
import { MinimalHero } from "./templates/minimal";
import { ServicesHero } from "./templates/services-hero";

type HeroProps = {
	page?: Page;
	hero?: Page["hero"] | Service["hero"];
	title?: string;
};

export function Hero({ page, hero: heroProp, title }: HeroProps) {
	const hero = heroProp || page?.hero;
	const pageTitle = title || page?.title;

	if (!hero || hero.type === "none") return null;

	switch (hero.type) {
		case "highImpact":
			return <HighImpactHero hero={hero} pageTitle={pageTitle} />;
		case "servicesHero":
			return <ServicesHero hero={hero} />;
		case "minimal":
			return (
				<MinimalHero
					hero={hero}
					updatedAt={page?.updatedAt || ""}
					pageTitle={pageTitle}
				/>
			);
		case "default":
		default:
			return <DefaultHero hero={hero} pageTitle={pageTitle} />;
	}
}
