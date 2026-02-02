import type { Page } from "@/payload-types";
import { DefaultHero } from "./templates/default";
import { HighImpactHero } from "./templates/high-impact";
import { ServiceHero } from "./templates/service";
import { MinimalHero } from "./templates/minimal";

type HeroProps = {
	page: Page;
};

export function Hero({ page }: HeroProps) {
	const hero = page.hero;

	if (!hero || hero.type === "none") return null;

	// Pass page title as fallback
	const pageTitle = page.title;

	switch (hero.type) {
		case "highImpact":
			return <HighImpactHero hero={hero} pageTitle={pageTitle} />;
		case "service":
			return <ServiceHero hero={hero} pageTitle={pageTitle} />;
		case "minimal":
			return (
				<MinimalHero
					hero={hero}
					updatedAt={page.updatedAt}
					pageTitle={pageTitle}
				/>
			);
		case "default":
		default:
			return <DefaultHero hero={hero} pageTitle={pageTitle} />;
	}
}
