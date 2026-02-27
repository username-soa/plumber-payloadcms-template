import type { Page } from "@/payload-types";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { SectionWrapper } from "@/components/ui/section-wrapper";

type LegalContactProps = Extract<
	Page["layout"][0],
	{ blockType: "legalContact" }
> & {
	// globalData is injected by the populateLegalContact hook in Pages.ts
	globalData?: {
		email: string;
		phone: string;
		address: string;
		brandName?: string;
	};
};

export function LegalContact({
	title,
	description,
	email: localEmail,
	phone: localPhone,
	address: localAddress,
	globalData,
	paddingTopOption,
	paddingBottomOption,
	background,
}: LegalContactProps) {
	const { brand } = SITE_CONFIG;

	// Merge logic: Local overrides > Hook-injected Global data > Static Config fallback
	const email = localEmail || globalData?.email;
	const phone = localPhone || globalData?.phone;
	const address = localAddress || globalData?.address;
	const businessName = globalData?.brandName || brand.name;

	return (
		<SectionWrapper
			paddingTop={paddingTopOption}
			paddingBottom={paddingBottomOption}
			background={background}
		>
			<div className="max-w-3xl mx-auto">
				<Card className="bg-primary/5 border-primary/20">
					<CardContent className="pt-6">
						{title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
						{description && (
							<p className="text-muted-foreground mb-6">{description}</p>
						)}
						<div className="grid gap-4 sm:grid-cols-2">
							{email && (
								<div className="flex items-start gap-3">
									<Mail className="w-5 h-5 text-primary mt-0.5" />
									<div>
										<p className="font-medium">Email</p>
										<a
											href={`mailto:${email}`}
											className="text-sm text-primary hover:underline"
										>
											{email}
										</a>
									</div>
								</div>
							)}
							{phone && (
								<div className="flex items-start gap-3">
									<Phone className="w-5 h-5 text-primary mt-0.5" />
									<div>
										<p className="font-medium">Phone</p>
										<a
											href={`tel:${phone}`}
											className="text-sm text-primary hover:underline"
										>
											{phone}
										</a>
									</div>
								</div>
							)}
							{address && (
								<div className="flex items-start gap-3 sm:col-span-2">
									<MapPin className="w-5 h-5 text-primary mt-0.5" />
									<div>
										<p className="font-medium">{businessName}</p>
										<p className="text-sm text-muted-foreground">{address}</p>
									</div>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</SectionWrapper>
	);
}
