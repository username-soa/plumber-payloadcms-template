import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	TypographyH2,
	TypographyH3,
	TypographyMuted,
	TypographySmall,
} from "@/components/ui/typography";
import { SITE_CONFIG } from "@/lib/site-config";
import type { CompanyInfo } from "@/payload-types";

interface LocationSectionProps {
	companyInfo?: CompanyInfo;
}

export function LocationSection({ companyInfo }: LocationSectionProps) {
	// CMS Data or Config Data
	const contact = companyInfo
		? {
				phone: companyInfo.phone,
				email: companyInfo.email,
				address: companyInfo.address,
			}
		: SITE_CONFIG.contact;
	const workingHours = companyInfo?.workingHours || SITE_CONFIG.workingHours;
	const googleProfile =
		companyInfo?.seo?.reviews || SITE_CONFIG.seo.googleBusinessProfile;

	const mapsUrl = googleProfile?.mapsUrl || "https://www.google.com/maps";

	return (
		<section className="w-full py-24 bg-muted/20">
			<div className="container mx-auto px-6 md:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Left Content */}
					<div className="flex flex-col gap-8">
						<div>
							<div className="flex items-center gap-2 text-primary font-medium mb-4">
								<span className="uppercase tracking-wider text-sm">
									Location
								</span>
							</div>
							<TypographyH2 className="text-4xl md:text-5xl font-bold border-none tracking-tight mb-6">
								Find Us
							</TypographyH2>
							<TypographyMuted className="text-lg  max-w-lg">
								Visit us at our conveniently located office, easily accessible
								from all major routes. Whether you&apos;re coming from downtown
								or nearby neighborhoods, you&apos;ll find us right in the heart
								of the city.
							</TypographyMuted>
						</div>

						<div className="space-y-6">
							<div>
								<TypographyH3 className="text-lg font-bold mb-2">
									Address
								</TypographyH3>
								<div className="flex items-center gap-3 text-muted-foreground">
									<MapPin className="w-5 h-5 text-primary" />
									<span>{contact.address}</span>
								</div>
								<Separator className="mt-6" />
							</div>

							<div>
								<TypographyH3 className="text-lg font-bold mb-2">
									Opening Hours
								</TypographyH3>
								<div className="flex items-start gap-3 text-muted-foreground">
									<Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
									<div className="grid gap-1.5">
										{workingHours?.map((item) => (
											<div
												key={item.day}
												className="flex items-center justify-between gap-8 text-sm"
											>
												<span className="font-medium">{item.day}</span>
												<span>{item.time}</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4">
							<Button
								size="lg"
								className="px-8 h-14 text-base font-bold shadow-md"
								asChild
							>
								<Link href="/contact">BOOK APPOINTMENT</Link>
							</Button>
							<div className="flex flex-col">
								<TypographySmall className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider mb-1">
									24/7 Emergency Services
								</TypographySmall>
								<a
									href={`tel:${contact.phone}`}
									className="text-xl font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2"
								>
									{contact.phone}
								</a>
							</div>
						</div>
					</div>

					{/* Right Map Image */}
					<div className="relative w-full h-full max-md:aspect-2/3 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer hover:shadow-3xl transition-all duration-500">
						<a
							href={mapsUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="block w-full h-full"
						>
							<Image
								src="/images/map/map-styled.png"
								alt="Office Location Map"
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover group-hover:scale-105 transition-transform duration-700"
							/>
							<div className="absolute bottom-6 right-6 bg-white/30 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-md shadow-sm text-foreground">
								Click to Navigate
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
