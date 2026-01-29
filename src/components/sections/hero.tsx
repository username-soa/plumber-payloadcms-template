import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { SITE_CONFIG } from "@/lib/site-config";
import { Phone } from "lucide-react";

export function HeroSection() {
	return (
		<section className="relative w-full h-screen min-h-[600px] flex overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 w-full h-full z-0">
				<Image
					src="/images/hero/hero1.jpeg"
					alt="Professional Plumbing"
					fill
					sizes="100vw"
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />
			</div>

			{/* Main Content */}
			<div className="absolute inset-0 z-10 px-6 md:px-12 md:pb-18 pb-[8vh] md:pt-[28vh] pt-32 max-md:flex max-md:items-end">
				<div className="mx-auto grid md:grid-cols-[2fr_1fr] grid-cols-1 gap-12 md:h-full h-fit">
					{/* content-start */}

					{/* Left Text */}
					<div className="flex flex-col items-start justify-start md:gap-y-10 gap-y-8 max-md:h-fit">
						<TypographyH1 className="xl:text-[4vw] md:text-[5.5vw] text-[8.5vw] font-semibold text-white md:leading-[1.1] leading-[1.2] drop-shadow-lg max-w-[900px]">
							Reliable <span className="text-primary">Plumbing Solutions</span>{" "}
							in Water City
						</TypographyH1>

						<Button
							size="lg"
							variant="outline"
							className="rounded-full md:px-8 md:py-6 text-lg border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all group"
						>
							<span className="md:inline hidden">Schedule Your Visit</span>
							<span className="md:hidden flex items-center gap-2">
								<Phone className="w-5 h-5 fill-current ring-animation" />
								{SITE_CONFIG.contact.phone}
							</span>
						</Button>
					</div>

					{/* Right Content / Inset */}
					{/* Inset Card Floating at bottom right */}
					<div className="flex md:flex-col max-md:items-end gap-4 md:max-w-xs w-full md:mt-auto md:ml-auto">
						<p className="text-white md:text-lg text-base font-medium leading-tight max-md:pb-2">
							Fast affordable plumbing service expertly completed with care
							every time you ask for
						</p>
						<div className="relative md:aspect-3/2 aspect-square w-full md:rounded-2xl rounded-full overflow-hidden shadow-2xl">
							<Image
								fill
								sizes="(max-width: 768px) 100vw, 200px"
								alt="Smiling Plumber"
								className="object-cover"
								src="/images/hero/hero-portrait.jpeg"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
