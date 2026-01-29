import { SITE_CONFIG } from "@/lib/site-config";
import {
	TypographyH2,
	TypographyH3,
	TypographyP,
} from "@/components/ui/typography";

export function ContactSEOSection() {
	const { brand, seo } = SITE_CONFIG;
	const foundingYear = seo.foundingDate.split("-")[0];
	const yearsInBusiness = new Date().getFullYear() - parseInt(foundingYear, 10);

	const serviceAreasString = seo.serviceAreas
		.map((area) => area.name)
		.join(" • ");

	return (
		<div className="space-y-8">
			<div className="space-y-4">
				<span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider">
					Your Trusted Local Plumbers
				</span>
				<TypographyH2 className="text-3xl md:text-4xl font-bold leading-tight border-none">
					Professional Plumbing Services in {seo.location.city} & Surrounding
					Areas
				</TypographyH2>
				<TypographyP className="text-lg text-muted-foreground leading-relaxed mt-4">
					Looking for a reliable plumber near you? {brand.name} has been proudly
					serving {seo.location.city} and the greater {seo.location.state} area
					for over {yearsInBusiness} years. Our licensed and insured plumbers
					are available 24/7 for all your residential and commercial plumbing
					needs.
				</TypographyP>
			</div>

			{/* Service Areas */}
			<div className="space-y-3">
				<TypographyH3 className="text-lg font-semibold">
					Service Areas We Cover
				</TypographyH3>
				<TypographyP className="text-muted-foreground mt-0">
					{serviceAreasString}
				</TypographyP>
			</div>

			{/* Trust Signals */}
			<div className="grid grid-cols-2 gap-4">
				{[
					{
						value: `${yearsInBusiness}+`,
						label: "Years of Experience",
					},
					{
						value: `${seo.reviews.aggregate.reviewCount.toLocaleString()}+`,
						label: "Happy Customers",
					},
					{ value: "24/7", label: "Emergency Service" },
					{ value: "100%", label: "Satisfaction Guaranteed" },
				].map((stat) => (
					<div
						key={stat.label}
						className="bg-background rounded-xl p-4 text-center border"
					>
						<div className="text-2xl font-bold text-primary">{stat.value}</div>
						<div className="text-sm text-muted-foreground">{stat.label}</div>
					</div>
				))}
			</div>

			{/* Why Choose Us */}
			<div className="space-y-4">
				<TypographyH3 className="text-lg font-semibold">
					Why {seo.location.city} Residents Choose {brand.name}
				</TypographyH3>
				<ul className="space-y-3">
					{[
						"Licensed, bonded & insured plumbing professionals",
						"Upfront pricing with no hidden fees or surprises",
						"Same-day service for urgent plumbing issues",
						"Fully stocked trucks for faster repairs",
						"Background-checked, uniformed technicians",
						"Workmanship warranty on all repairs",
					].map((item) => (
						<li key={item} className="flex items-start gap-3">
							<svg
								className="w-5 h-5 text-primary mt-0.5 shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="text-muted-foreground">{item}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
