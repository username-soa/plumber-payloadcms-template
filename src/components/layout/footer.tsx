import type { LucideIcon } from "lucide-react";
import {
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
	Phone,
	MapPin,
	Mail,
	Youtube,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	TypographyH3,
	TypographyMuted,
	TypographySmall,
	TypographyH2,
} from "@/components/ui/typography";
import type {
	Footer as FooterType,
	CompanyInfo as CompanyInfoType,
} from "@/payload-types";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
	facebook: Facebook,
	instagram: Instagram,
	linkedin: Linkedin,
	twitter: Twitter,
	youtube: Youtube,
};

interface FooterProps {
	footerData: FooterType;
	companyInfo: CompanyInfoType;
}

export function Footer({ footerData, companyInfo }: FooterProps) {
	const { cta, navLinks, copyrightText, bottomLinks } = footerData;
	const { brand, socials, workingHours, phone, email, address } = companyInfo;
	const contact = { phone, email, address };

	return (
		<footer className="w-full bg-muted/30 pt-16 pb-8 border-t border-border relative overflow-hidden">
			<div className="container mx-auto px-6 md:px-12 relative z-10">
				{/* Integrated CTA Section */}
				{cta && (
					<div className="flex flex-col items-center justify-between gap-8 text-center md:text-left mb-16">
						<TypographyH2 className="text-4xl md:text-5xl font-bold border-none tracking-tight text-center">
							{cta.headline}
						</TypographyH2>
						<p className="text-muted-foreground text-lg md:text-xl font-light text-center">
							{cta.subheadline}
						</p>

						<div className="shrink-0 flex flex-col sm:flex-row gap-4">
							<Button
								size="lg"
								className="font-bold text-lg px-6 h-12 hover:shadow-md transition-all hover:scale-105 rounded-full"
								asChild
							>
								<Link href={cta.primaryButtonLink || "/contact"}>
									{cta.primaryButtonText}
								</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="font-bold text-lg px-6 h-12 hover:shadow-md transition-all hover:scale-105 rounded-full bg-transparent"
								asChild
							>
								<a href={`tel:${contact.phone}`}>
									{cta.secondaryButtonText} {contact.phone}
								</a>
							</Button>
						</div>
					</div>
				)}

				<Separator className="mb-10" />

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 mb-10">
					{/* Column 1: Brand & Socials */}
					<div className="flex flex-col gap-4">
						<Link href="/" className="flex items-center gap-2 w-fit">
							<span className="text-xl font-bold tracking-tight text-primary">
								{brand.name}
							</span>
						</Link>
						<TypographyMuted className="text-base">
							{brand.description}
						</TypographyMuted>
						<div className="flex gap-2">
							{socials?.map((social) => {
								const Icon = SOCIAL_ICONS[social.platform];
								if (!Icon) return null;
								return (
									<SocialButton
										key={social.platform}
										icon={Icon}
										label={social.label}
										href={social.href}
									/>
								);
							})}
						</div>
					</div>

					{/* Column 2: Top Links */}
					<div className="lg:pl-8">
						<TypographyH3 className="mb-4 text-foreground font-semibold">
							Top Links
						</TypographyH3>
						<div className="flex flex-col items-start gap-1.5">
							{navLinks?.map((link) => (
								<FooterLink key={link.label} href={link.href}>
									{link.label}
								</FooterLink>
							))}
						</div>
					</div>

					{/* Column 3: Contact Us */}
					<div>
						<TypographyH3 className="mb-5 text-foreground font-semibold">
							Contact Us
						</TypographyH3>
						<ul className="space-y-3 mb-3">
							<ContactItem
								icon={Phone}
								text={contact.phone}
								href={`tel:${contact.phone}`}
							/>
							<ContactItem
								icon={Mail}
								text={contact.email}
								href={`mailto:${contact.email}`}
							/>
							<ContactItem icon={MapPin} text={contact.address} />
						</ul>
					</div>

					{/* Column 4: Working Hours */}
					<div>
						<TypographyH3 className="mb-5 text-foreground font-semibold">
							Working Hours
						</TypographyH3>
						<div className="space-y-3">
							{workingHours?.map((schedule) => (
								<ScheduleRow
									key={schedule.day}
									day={schedule.day}
									time={schedule.time}
								/>
							))}
						</div>
					</div>
				</div>

				{companyInfo.seo?.serviceAreas &&
					companyInfo.seo.serviceAreas.length > 0 && (
						<div className="mb-10">
							<div className="flex items-center gap-4 mb-4">
								<Separator className="flex-1" />
								<TypographyH3 className="text-foreground font-semibold shrink-0">
									Proudly Serving
								</TypographyH3>
								<Separator className="flex-1" />
							</div>
							<p className="text-center text-muted-foreground text-sm max-w-4xl mx-auto leading-relaxed">
								{companyInfo.seo.serviceAreas.map((area, index) => (
									<span key={area.name || index}>
										{area.name}
										{index <
											(companyInfo.seo?.serviceAreas?.length || 0) - 1 && (
											<span className="mx-2 opacity-30">•</span>
										)}
									</span>
								))}
							</p>
						</div>
					)}
				<Separator className="mb-3" />

				{/* Bottom Section: Copyright */}
				<div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
					<TypographyMuted>
						{copyrightText
							?.replace("{year}", new Date().getFullYear().toString())
							.replace("{brand}", brand.name) ||
							`© Copyright ${new Date().getFullYear()} ${brand.name}. All Rights Reserved.`}
					</TypographyMuted>
					<div className="flex gap-4 mt-4 md:mt-0">
						{bottomLinks?.map((link) => (
							<Button
								key={link.id}
								variant="link"
								className="text-muted-foreground hover:text-primary h-auto p-0 font-normal"
								asChild
							>
								<Link
									href={link.href}
									target={link.newTab ? "_blank" : undefined}
									rel={link.newTab ? "noopener noreferrer" : undefined}
								>
									{link.label}
								</Link>
							</Button>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}

function SocialButton({
	icon: Icon,
	label,
	href,
}: {
	icon: LucideIcon;
	label: string;
	href: string;
}) {
	return (
		<Button
			variant="ghost"
			size="icon"
			className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
			asChild
		>
			<a
				href={href}
				aria-label={label}
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon className="w-5 h-5" />
			</a>
		</Button>
	);
}

function ScheduleRow({ day, time }: { day: string; time: string }) {
	return (
		<div className="flex justify-between items-center text-muted-foreground md:max-w-xs border-b pb-3">
			<TypographySmall className="font-medium">{day}</TypographySmall>
			<TypographySmall className={"font-normal"}>{time}</TypographySmall>
		</div>
	);
}

function FooterLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Button
			variant="link"
			className="h-auto p-0 text-muted-foreground hover:text-primary justify-start font-normal transition-colors text-base"
			asChild
		>
			<Link href={href}>{children}</Link>
		</Button>
	);
}

function ContactItem({
	icon: Icon,
	text,
	href,
}: {
	icon: LucideIcon;
	text: string;
	href?: string;
}) {
	const content = (
		<>
			<div className="p-2 rounded-full bg-primary/10 text-primary mt-[-4px] shrink-0">
				<Icon className="w-3 h-3" />
			</div>
			<span className="text-muted-foreground group-hover:text-primary transition-colors">
				{text}
			</span>
		</>
	);

	return (
		<li>
			{href ? (
				<a
					href={href}
					className="flex items-start gap-3 group"
					target={href.startsWith("http") ? "_blank" : undefined}
					rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
				>
					{content}
				</a>
			) : (
				<div className="flex items-start gap-3 group">{content}</div>
			)}
		</li>
	);
}
