import { FAQSection } from "@/components/sections/faq";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { ReviewSection } from "@/components/sections/review";
import { LocationSection } from "@/components/sections/location";
import { HeroSection } from "@/components/sections/hero";
import { JsonLd } from "@/components/json-ld";
import {
	generateOrganizationSchema,
	generateWebsiteSchema,
} from "@/lib/json-ld";

export default function Home() {
	// Generate comprehensive homepage JSON-LD schema
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [generateWebsiteSchema(), generateOrganizationSchema()],
	};

	return (
		<>
			<JsonLd data={jsonLd} />
			<HeroSection />
			<AboutSection />
			<ServicesSection />
			<LocationSection />
			<ReviewSection />
			<FAQSection />
		</>
	);
}
