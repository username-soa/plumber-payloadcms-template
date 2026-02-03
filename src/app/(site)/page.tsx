import { FAQSection } from "@/components/sections/faq";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { ReviewSection } from "@/components/sections/review";
import { LocationSection } from "@/components/sections/location";
import { HeroSection } from "@/components/sections/hero";
import { JsonLd } from "@/components/json-ld";
// import { QuoteFormCTA } from "./services/_components/quote-form";
import {
	generateOrganizationSchema,
	generateWebsiteSchema,
} from "@/lib/json-ld";
import { getCompanyInfo } from "@/lib/payload/getGlobals";

export default async function Home() {
	const companyInfo = await getCompanyInfo();

	// Generate comprehensive homepage JSON-LD schema
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			generateWebsiteSchema(companyInfo),
			generateOrganizationSchema(companyInfo),
		],
	};

	return (
		<>
			<JsonLd data={jsonLd} />
			<HeroSection />
			<AboutSection />
			<ServicesSection />
			<LocationSection companyInfo={companyInfo} />
			{/* <ReviewSection companyInfo={companyInfo} /> */}
			{/* <QuoteFormCTA serviceName="General Plumbing" /> */}
			<FAQSection />
		</>
	);
}
