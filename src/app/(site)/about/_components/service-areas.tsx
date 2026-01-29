import { MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";

export function ServiceAreas() {
	const { serviceAreas } = SITE_CONFIG.aboutUs;

	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-12">
					<div className="flex items-center justify-center gap-2 text-primary font-medium mb-4">
						<MapPin className="w-4 h-4" />
						<span className="uppercase tracking-wider text-sm">
							Service Areas
						</span>
					</div>
					<TypographyH2 className="text-3xl md:text-4xl font-bold border-none tracking-tight leading-tight mb-4">
						Proudly Serving <span className="text-primary">Water City</span> &
						Surrounding Communities
					</TypographyH2>
					<TypographyMuted className="text-base">
						Our team of licensed plumbers provides fast, reliable service
						throughout the metropolitan area. No matter where you're located,
						we're just a call away.
					</TypographyMuted>
				</div>

				{/* Service Areas Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
					{serviceAreas.map((area) => (
						<div
							key={area}
							className="bg-background rounded-xl p-4 text-center border hover:border-primary/50 hover:shadow-md transition-all"
						>
							<div className="flex items-center justify-center gap-2">
								<MapPin className="w-4 h-4 text-primary shrink-0" />
								<span className="font-medium text-sm">{area}</span>
							</div>
						</div>
					))}
				</div>

				{/* Local SEO Text */}
				<div className="mt-12 text-center">
					<TypographyMuted className="text-sm max-w-3xl mx-auto">
						Looking for a plumber near you in Water City, Downtown District,
						Riverside Heights, North Valley, or surrounding areas?{" "}
						{SITE_CONFIG.brand.name} offers 24/7 emergency plumbing services,
						same-day appointments, and upfront pricing. Call us today for all
						your residential and commercial plumbing needs.
					</TypographyMuted>
				</div>
			</div>
		</section>
	);
}
