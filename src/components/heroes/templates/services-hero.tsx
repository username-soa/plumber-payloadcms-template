import Image from "next/image";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import type { Page } from "@/payload-types";
import { CMSLinkItem, type CMSLinkType } from "../components/cms-link-item";
import DynamicIcon from "@/components/ui/dynamic-icon";

type ServicesHeroProps = {
	hero: Page["hero"];
};

export function ServicesHero({ hero }: ServicesHeroProps) {
	if (!hero) return null;

	const { title, description, links, trustIndicators, bgImage } = hero;

	const bgUrl =
		typeof bgImage === "object"
			? bgImage?.url
			: typeof bgImage === "string"
				? bgImage
				: null;
	const bgAlt =
		(typeof bgImage === "object" ? bgImage?.alt : "Background") || "Background";

	return (
		<section className="relative w-full min-h-screen flex py-20 overflow-hidden">
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
			<div className="flex flex-col max-md:justify-end gap-8 container mx-auto z-10 md:pt-[25vh] px-6">
				<div className="max-w-3xl">
					{title && (
						<TypographyH1 className="mb-6 text-white">{title}</TypographyH1>
					)}
					{description && (
						<TypographyLead className="mb-8 text-white/90">
							{description}
						</TypographyLead>
					)}
					{links && links.length > 0 && (
						<div className="flex flex-wrap gap-4">
							{links.map((linkGroup, index) => (
								<CMSLinkItem
									key={linkGroup.id || index}
									link={linkGroup.link as CMSLinkType}
								/>
							))}
						</div>
					)}
				</div>
				{/* Trust Indicators Integrated into Hero */}
				{trustIndicators && trustIndicators.length > 0 && (
					<div className="grid grid-cols-2 md:grid-cols-4 md:gap-x-6 gap-x-2 gap-y-4 pt-4 border-t self-end border-white/20 w-full md:mt-auto">
						{trustIndicators.map((indicator, index) => {
							return (
								<div
									key={indicator.id || index}
									className="flex md:gap-3 gap-2 items-start"
								>
									{indicator.icon && (
										<div className="md:size-10 size-6 md:rounded-lg rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
											<DynamicIcon
												name={indicator.icon}
												className="md:size-5 size-3"
											/>
										</div>
									)}
									<div>
										<p className="font-bold text-sm mb-1 text-white">
											{indicator.title}
										</p>
										<p className="text-xs text-white/70 line-clamp-2">
											{indicator.description}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
}
