import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { SITE_CONFIG } from "@/lib/site-config";
import { TRUST_FACTORS } from "./trust-indicators";

export function ServicesHeroMain() {
	return (
		<section className="relative w-full min-h-screen flex py-20 overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/images/hero/services-hero.jpg"
					alt="Professional Plumber Explaining Service"
					fill
					className="object-cover"
					priority
					sizes="100vw"
				/>
				<div className="absolute inset-0 bg-black/60" />
			</div>
			<div className="flex flex-col max-md:justify-end gap-8 container mx-auto z-10 md:pt-[25vh] px-6">
				<div className="max-w-3xl">
					<TypographyH1 className="mb-6 text-white">
						Professional Plumbing Services You Can Trust
					</TypographyH1>
					<TypographyLead className="mb-8 text-white/90">
						From routine maintenance to complex installations and emergency
						repairs, our licensed team delivers quality workmanship with every
						service call.
					</TypographyLead>
					<div className="flex flex-wrap gap-4">
						<Button size="lg" asChild className="rounded-full">
							<Link href="/contact">Schedule Service</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							asChild
							className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
						>
							<a href={`tel:${SITE_CONFIG.contact.phone}`}>
								Call {SITE_CONFIG.contact.phone}
							</a>
						</Button>
					</div>
				</div>
				{/* Trust Indicators Integrated into Hero */}
				<div className="grid grid-cols-2 md:grid-cols-4 md:gap-x-6 gap-x-2 gap-y-4 pt-4 border-t self-end border-white/20 w-full md:mt-auto">
					{TRUST_FACTORS.map((factor) => (
						<div key={factor.title} className="flex md:gap-3 gap-2 items-start">
							<div className="md:size-10 size-6 md:rounded-lg rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
								<factor.icon className="md:size-5 size-3" />
							</div>
							<div>
								<p className="font-bold text-sm mb-1 text-white">
									{factor.title}
								</p>
								<p className="text-xs text-white/70 line-clamp-2">
									{factor.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
