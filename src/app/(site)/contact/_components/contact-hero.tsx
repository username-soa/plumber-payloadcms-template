import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { SITE_CONFIG } from "@/lib/site-config";

export function ContactHero() {
	return (
		<section className="relative w-full min-h-[60vh] flex py-20 overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/images/hero/contact-hero.jpeg"
					alt="Professional Plumber Ready to Help"
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
						Get in Touch
					</Badge>
					<TypographyH1 className="mb-6 text-white">
						We're Here to Help with Your Plumbing Needs
					</TypographyH1>
					<TypographyLead className="mb-8 text-white/90">
						Whether it's an emergency repair or a scheduled maintenance, our
						expert team is ready to assist you 24/7.
					</TypographyLead>

					{/* Emergency CTA */}
					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
						<Button
							size="lg"
							variant="outline"
							asChild
							className="rounded-full bg-red-500/20 backdrop-blur-sm border-red-400/50 text-white hover:bg-red-500/30 hover:text-white"
						>
							<a
								href={`tel:${SITE_CONFIG.contact.phone}`}
								className="flex items-center gap-2"
							>
								<Phone className="w-5 h-5" />
								<span>Emergency? Call {SITE_CONFIG.contact.phone}</span>
							</a>
						</Button>
						<Badge
							variant="outline"
							className="px-4 py-2 text-sm font-semibold bg-green-300/20 backdrop-blur-sm border-green-400/50 text-green-600"
						>
							<span className="relative flex h-2.5 w-2.5 mr-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
								<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
							</span>
							Available 24/7 for emergencies
						</Badge>
					</div>
				</div>
			</div>
		</section>
	);
}
