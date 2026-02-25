import Link from "next/link";
import {
	Facebook,
	Instagram,
	Linkedin,
	Mail,
	MapPin,
	Phone,
	Twitter,
	Youtube,
	type LucideIcon,
} from "lucide-react";

import { CMSLinkItem } from "@/components/heroes/components/cms-link-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	TypographyH2,
	TypographyH3,
	TypographyMuted,
	TypographySmall,
} from "@/components/ui/typography";
import { type CMSLinkType, getCMSLinkHref } from "@/lib/cms-link";
import { cn } from "@/lib/utils";
import type {
	CompanyInfo as CompanyInfoType,
	Footer as FooterType,
} from "@/payload-types";

// Define overrides for the new link structure if generated types are stale
type FooterLinkItem = {
	id?: string | null;
	link: CMSLinkType;
};

type ModifiedFooterType = Omit<
	FooterType,
	"bottomLinks" | "cta" | "navLinks"
> & {
	bottomLinks?: FooterLinkItem[] | null;
	cta?: {
		headline: string;
		subheadline: string;
		links?: { link: CMSLinkType }[] | null;
	};
	navLinks?: FooterLinkItem[] | null;
};

const SOCIAL_ICONS: Record<string, LucideIcon> = {
	facebook: Facebook,
	instagram: Instagram,
	linkedin: Linkedin,
	twitter: Twitter,
	youtube: Youtube,
};

interface FooterProps {
	companyInfo: CompanyInfoType;
	footerData: ModifiedFooterType;
}

/**
 * Helper to generate a stable key for CMS links.
 */
function getLinkKey(item: FooterLinkItem, index: number): string {
	if (item.id) return item.id;

	const { link } = item;
	if (link?.url) return link.url;

	// Handle case where reference's value is expanded object (slug) or simple string
	if (
		typeof link?.reference?.value === "object" &&
		link.reference.value !== null &&
		"slug" in link.reference.value
	) {
		return link.reference.value.slug as string;
	}
	if (typeof link?.reference?.value === "string") {
		return link.reference.value;
	}

	return String(index);
}

export function Footer({ companyInfo, footerData }: FooterProps) {
	const { bottomLinks, copyrightText, cta, navLinks } = footerData;
	const { address, brand, email, phone, socials, workingHours } = companyInfo;

	const contact = { address, email, phone };
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative w-full overflow-hidden border-t border-border bg-muted/30 pb-8 pt-16">
			<div className="container relative z-10 mx-auto px-6 md:px-12">
				{/* Integrated CTA Section */}
				{cta && (
					<div className="mb-16 flex flex-col items-center justify-between gap-8 text-center md:text-left">
						<TypographyH2 className="border-none text-center text-4xl font-bold tracking-tight md:text-5xl">
							{cta.headline}
						</TypographyH2>
						<TypographyMuted className="text-center text-lg font-light text-muted-foreground md:text-xl">
							{cta.subheadline}
						</TypographyMuted>

						{cta.links && cta.links.length > 0 && (
							<div className="flex shrink-0 flex-col gap-4 sm:flex-row">
								{cta.links.map((item, i) => (
									<CMSLinkItem
										key={i.toString()}
										className={cn(
											"rounded-full px-8 py-6 text-lg",
											item.link.style === "outline" ? "text-inherit" : "",
										)}
										link={item.link}
									/>
								))}
							</div>
						)}
					</div>
				)}

				<Separator className="mb-10" />

				<div className="mb-10 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
					{/* Column 1: Brand & Socials */}
					<div className="flex flex-col gap-4">
						<Link className="flex w-fit items-center gap-2" href="/">
							<span className="text-xl font-bold tracking-tight text-primary">
								{brand.name}
							</span>
						</Link>
						<TypographyMuted className="text-base">
							{brand.description}
						</TypographyMuted>
						{socials && socials.length > 0 && (
							<div className="flex gap-2">
								{socials.map((social) => {
									const Icon = SOCIAL_ICONS[social.platform];
									if (!Icon) return null;
									return (
										<SocialButton
											key={social.platform}
											href={social.href}
											icon={Icon}
											label={social.label}
										/>
									);
								})}
							</div>
						)}
					</div>

					{/* Column 2: Top Links */}
					<div className="lg:pl-8">
						<TypographyH3 className="mb-4 font-semibold text-foreground">
							Top Links
						</TypographyH3>
						<nav aria-label="Footer Navigation">
							<ul className="flex flex-col items-start gap-1.5">
								{navLinks?.map((item, i) => {
									const href = getCMSLinkHref(item.link);
									return (
										<li key={getLinkKey(item, i)}>
											<FooterLink href={href}>
												{item.link?.label || "Link"}
											</FooterLink>
										</li>
									);
								})}
							</ul>
						</nav>
					</div>

					{/* Column 3: Contact Us */}
					<div>
						<TypographyH3 className="mb-5 font-semibold text-foreground">
							Contact Us
						</TypographyH3>
						<address className="not-italic">
							<ul className="mb-3 space-y-3">
								<ContactItem
									href={`tel:${contact.phone}`}
									icon={Phone}
									text={contact.phone}
								/>
								<ContactItem
									href={`mailto:${contact.email}`}
									icon={Mail}
									text={contact.email}
								/>
								<ContactItem icon={MapPin} text={contact.address} />
							</ul>
						</address>
					</div>

					{/* Column 4: Working Hours */}
					<div>
						<TypographyH3 className="mb-5 font-semibold text-foreground">
							Working Hours
						</TypographyH3>
						<ul className="space-y-3">
							{workingHours?.map((schedule) => (
								<ScheduleRow
									key={schedule.day}
									day={schedule.day}
									time={schedule.time}
								/>
							))}
						</ul>
					</div>
				</div>

				{/* Proudly Serving Section */}
				{companyInfo.seo?.serviceAreas &&
					companyInfo.seo.serviceAreas.length > 0 && (
						<div className="mb-10">
							<div className="mb-5 flex items-center gap-4 md:gap-6">
								<Separator className="flex-1" />
								<TypographyH3 className="shrink-0 font-semibold text-foreground">
									Proudly Serving
								</TypographyH3>
								<Separator className="flex-1" />
							</div>
							<div className="mx-auto flex md:gap-y-1 gap-y-0.5 max-w-4xl flex-wrap items-center justify-center text-center text-sm leading-relaxed text-muted-foreground">
								{companyInfo.seo.serviceAreas.map((area, index) => {
									const isLast =
										index === (companyInfo.seo?.serviceAreas?.length || 0) - 1;
									return (
										<span key={area.name || index.toString()}>
											{area.name}
											{!isLast && (
												<span aria-hidden="true" className="mx-2 opacity-30">
													&bull;
												</span>
											)}
										</span>
									);
								})}
							</div>
						</div>
					)}

				<Separator className="mb-3" />

				{/* Bottom Section: Copyright */}
				<div className="flex flex-col items-center justify-between text-sm text-muted-foreground md:flex-row">
					<TypographyMuted>
						{copyrightText
							?.replace("{year}", currentYear.toString())
							.replace("{brand}", brand.name) ||
							`© Copyright ${currentYear} ${brand.name}. All Rights Reserved.`}
					</TypographyMuted>

					{bottomLinks && bottomLinks.length > 0 && (
						<nav
							aria-label="Footer Bottom Links"
							className="mt-4 flex gap-4 md:mt-0"
						>
							{bottomLinks.map((item, i) => {
								const href = getCMSLinkHref(item.link);
								return (
									<Button
										key={getLinkKey(item, i)}
										asChild
										className="h-auto p-0 font-normal text-muted-foreground hover:text-primary"
										variant="link"
									>
										<Link
											href={href}
											rel={
												item.link?.newTab ? "noopener noreferrer" : undefined
											}
											target={item.link?.newTab ? "_blank" : undefined}
										>
											{item.link?.label || "Link"}
										</Link>
									</Button>
								);
							})}
						</nav>
					)}
				</div>
			</div>
		</footer>
	);
}

function SocialButton({
	href,
	icon: Icon,
	label,
}: {
	href: string;
	icon: LucideIcon;
	label: string;
}) {
	return (
		<Button
			asChild
			className="rounded-full transition-colors hover:bg-primary hover:text-primary-foreground"
			size="icon"
			variant="ghost"
		>
			<a
				aria-label={label}
				href={href}
				rel="noopener noreferrer"
				target="_blank"
			>
				<Icon className="h-5 w-5" />
			</a>
		</Button>
	);
}

function ScheduleRow({ day, time }: { day: string; time: string }) {
	return (
		<li className="flex items-center justify-between border-b pb-3 text-muted-foreground md:max-w-xs">
			<TypographySmall className="font-medium">{day}</TypographySmall>
			<TypographySmall className="font-normal">{time}</TypographySmall>
		</li>
	);
}

function FooterLink({
	children,
	href,
}: {
	children: React.ReactNode;
	href: string;
}) {
	return (
		<Button
			asChild
			className="h-auto justify-start p-0 text-base font-normal text-muted-foreground transition-colors hover:text-primary"
			variant="link"
		>
			<Link href={href}>{children}</Link>
		</Button>
	);
}

function ContactItem({
	href,
	icon: Icon,
	text,
}: {
	href?: string;
	icon: LucideIcon;
	text: string;
}) {
	const content = (
		<>
			<div className="mt-[-4px] shrink-0 rounded-full bg-primary/10 p-2 text-primary">
				<Icon className="h-3 w-3" />
			</div>
			<span className="text-muted-foreground transition-colors group-hover:text-primary">
				{text}
			</span>
		</>
	);

	return (
		<li>
			{href ? (
				<a
					className="group flex items-start gap-3"
					href={href}
					rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
					target={href.startsWith("http") ? "_blank" : undefined}
				>
					{content}
				</a>
			) : (
				<div className="group flex items-start gap-3">{content}</div>
			)}
		</li>
	);
}
