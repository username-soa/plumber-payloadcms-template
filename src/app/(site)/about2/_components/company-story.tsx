import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { Timeline } from "./timeline";

export function CompanyStory() {
	const { companyStory } = SITE_CONFIG.aboutUs;

	return (
		<section className="py-20 bg-background">
			<div className="container mx-auto px-6">
				{/* Text Left + Image Right Layout */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
					{/* Left - Story Content */}
					<div className="space-y-6">
						<div className="flex items-center gap-2 text-primary font-medium">
							<span className="uppercase tracking-wider text-sm">
								Our Story
							</span>
						</div>
						<TypographyH2 className="text-3xl md:text-4xl font-bold border-none tracking-tight leading-tight">
							Building Trust, One{" "}
							<span className="text-primary">Repair at a Time</span>
						</TypographyH2>
						<div className="space-y-4">
							{companyStory.story.split("\n\n").map((paragraph) => (
								<TypographyMuted
									key={paragraph.slice(0, 30)}
									className="text-base leading-relaxed"
								>
									{paragraph}
								</TypographyMuted>
							))}
						</div>
					</div>

					{/* Right - Image */}
					<div className="relative aspect-4/3 rounded-2xl overflow-hidden">
						<Image
							src="/images/about/about-trust.png"
							alt={`${SITE_CONFIG.brand.name} team serving Water City community`}
							fill
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
					</div>
				</div>

				{/* Centered Timeline Section */}
				<Timeline />
			</div>
		</section>
	);
}
