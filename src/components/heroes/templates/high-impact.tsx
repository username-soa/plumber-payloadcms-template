import Image from "next/image";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import type { Page } from "@/payload-types";
import { CMSLinkItem, type CMSLinkType } from "../components/cms-link-item";

type HeroProps = {
	hero: NonNullable<Page["hero"]>;
	pageTitle?: string;
};

export const HighImpactHero = ({ hero, pageTitle }: HeroProps) => {
	const {
		bgImage,
		description,
		fgImage,
		floatingText,
		links,
		title,
		titleHighlight,
	} = hero;

	const displayTitle = title || pageTitle;

	const bgUrl =
		typeof bgImage === "object"
			? bgImage?.url
			: typeof bgImage === "string"
				? bgImage
				: null;
	const bgAlt =
		(typeof bgImage === "object" ? bgImage?.alt : "Background") || "Background";

	const fgUrl =
		typeof fgImage === "object"
			? fgImage?.url
			: typeof fgImage === "string"
				? fgImage
				: null;
	const fgAlt =
		(typeof fgImage === "object" ? fgImage?.alt : "Foreground") || "Foreground";

	// Highlight logic
	const renderTitle = () => {
		if (!displayTitle) return null;
		if (!titleHighlight) {
			return (
				<TypographyH1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg text-white">
					{displayTitle}
				</TypographyH1>
			);
		}

		const parts = displayTitle.split(new RegExp(`(${titleHighlight})`, "gi"));
		return (
			<TypographyH1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg text-white">
				{parts.map((part, i) =>
					part.toLowerCase() === titleHighlight.toLowerCase() ? (
						<span key={i + part} className="text-primary">
							{part}
						</span>
					) : (
						part
					),
				)}
			</TypographyH1>
		);
	};

	return (
		<section className="relative w-full h-screen min-h-[600px] flex overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 w-full h-full z-0">
				{bgUrl && (
					<Image
						src={bgUrl}
						alt={bgAlt}
						fill
						sizes="100vw"
						className="object-cover"
						priority
					/>
				)}
				<div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />
			</div>

			{/* Main Content */}
			<div className="absolute inset-0 z-10 px-6 md:px-12 md:pb-18 pb-[8vh] md:pt-[28vh] pt-32 max-md:flex max-md:items-end">
				<div className="mx-auto grid md:grid-cols-[2fr_1fr] grid-cols-1 gap-12 md:h-full h-fit container">
					{/* Left Text */}
					<div className="flex flex-col items-start justify-start md:gap-y-8 gap-y-6 max-md:h-fit">
						<div className="hero-content">
							{renderTitle()}
							{description && (
								<TypographyLead className="text-xl text-white/90 leading-relaxed mt-6 max-w-2xl">
									{description}
								</TypographyLead>
							)}
						</div>

						{links && links.length > 0 && (
							<div className="flex flex-wrap gap-4 mt-4">
								{links.map(({ link, id }, i) => (
									<CMSLinkItem key={id || i} link={link as CMSLinkType} />
								))}
							</div>
						)}
					</div>

					{/* Right Content / Inset */}
					{fgUrl && (
						<div className="flex md:flex-col max-md:items-end gap-4 md:max-w-xs w-full md:mt-auto md:ml-auto">
							{floatingText && (
								<p className="text-white md:text-lg text-base font-medium leading-tight max-md:pb-2">
									{floatingText}
								</p>
							)}
							<div className="relative md:aspect-3/2 aspect-square w-full md:rounded-2xl rounded-full overflow-hidden shadow-2xl border border-white/10">
								<Image
									fill
									sizes="(max-width: 768px) 100vw, 400px"
									alt={fgAlt}
									className="object-cover"
									src={fgUrl}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};
