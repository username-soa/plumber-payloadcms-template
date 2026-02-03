import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import DynamicIcon from "@/components/ui/dynamic-icon";
import type { Page } from "@/payload-types";

import { CMSLinkItem, type CMSLinkType } from "../components/cms-link-item";

type HeroProps = {
	hero: NonNullable<Page["hero"]>;
	pageTitle?: string;
};

export const DefaultHero = ({ hero, pageTitle }: HeroProps) => {
	const { title, description, bgImage, badge, links } = hero;

	const displayTitle = title || pageTitle;

	const bgUrl =
		typeof bgImage === "object"
			? bgImage?.url
			: typeof bgImage === "string"
				? bgImage
				: null;
	const bgAlt =
		(typeof bgImage === "object" ? bgImage?.alt : "Background") || "Background";

	return (
		<section className="relative w-full min-h-[60vh] flex py-20 overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				{bgUrl && (
					<Image
						src={bgUrl}
						alt={bgAlt}
						fill
						className="object-cover"
						priority
						sizes="100vw"
					/>
				)}
				<div className="absolute inset-0 bg-black/60" />
			</div>

			<div className="flex flex-col justify-center container mx-auto z-10 px-6">
				<div className="max-w-3xl">
					{badge && badge.content && (
						<Badge
							size={badge.size || "default"}
							variant={badge.variant || "secondary"}
							className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary/20 hover:bg-primary/10 text-primary-foreground backdrop-blur-sm border border-white/10"
						>
							{badge.icon && (
								<DynamicIcon name={badge.icon} className="w-4 h-4 mr-2" />
							)}
							{badge.content}
						</Badge>
					)}

					<div className="hero-content">
						{displayTitle && (
							<h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
								{displayTitle}
							</h1>
						)}
						{description && (
							<p className="text-white/90 text-xl leading-relaxed mb-8">
								{description}
							</p>
						)}
					</div>

					{links && links.length > 0 && (
						<div className="flex flex-wrap items-center gap-4 mt-6">
							{links.map(({ link, id }, i) => (
								<CMSLinkItem key={id || i} link={link as CMSLinkType} />
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};
