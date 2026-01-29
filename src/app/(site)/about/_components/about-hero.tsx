import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { SITE_CONFIG } from "@/lib/site-config";

export function AboutHero() {
	return (
		<section className="relative w-full min-h-[60vh] flex py-20 overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/images/about/about-team.png"
					alt={`${SITE_CONFIG.brand.name} - Professional Plumbing Team in Water City`}
					fill
					className="object-cover"
					priority
					sizes="100vw"
				/>
				<div className="absolute inset-0 bg-black/60" />
			</div>

			<div className="flex flex-col justify-center container mx-auto z-10 px-6">
				<div className="max-w-3xl">
					<Badge
						variant="secondary"
						className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary/20 text-primary-foreground backdrop-blur-sm border border-white/10"
					>
						About {SITE_CONFIG.brand.name}
					</Badge>
					<TypographyH1 className="mb-6 text-white">
						{SITE_CONFIG.aboutUs.companyStory.headline}
					</TypographyH1>
					<TypographyLead className="mb-8 text-white/90">
						{SITE_CONFIG.aboutUs.companyStory.subheadline}
					</TypographyLead>

					{/* Trust Badges */}
					<div className="flex flex-wrap gap-3">
						<Badge
							variant="outline"
							className="px-4 py-2 text-sm font-semibold bg-white/10 backdrop-blur-sm border-white/20 text-white"
						>
							Licensed & Insured
						</Badge>
						<Badge
							variant="outline"
							className="px-4 py-2 text-sm font-semibold bg-white/10 backdrop-blur-sm border-white/20 text-white"
						>
							Family Owned Since {SITE_CONFIG.aboutUs.companyStory.foundedYear}
						</Badge>
						<Badge
							variant="outline"
							className="px-4 py-2 text-sm font-semibold bg-white/10 backdrop-blur-sm border-white/20 text-white"
						>
							Serving Water City & Surrounding Areas
						</Badge>
					</div>
				</div>
			</div>
		</section>
	);
}
