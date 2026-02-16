import { MapPin } from "lucide-react";

import {
	type PaddingOption,
	SectionWrapper,
} from "@/components/ui/section-wrapper";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { getCompanyInfo } from "@/lib/payload/getGlobals";
import { SITE_CONFIG } from "@/lib/site-config";

// Temporary interface until types are regenerated
interface ServiceAreasProps {
	blockType: "serviceAreas";
	title?: string;
	headline?: string;
	highlightedHeadlineText?: string;
	description?: string;
	useGlobalServiceAreas?: boolean;
	customServiceAreas?: {
		name: string;
		id?: string;
	}[];
	bottomText?: string;
	paddingTopOption?: "none" | "small" | "default" | "big";
	paddingBottomOption?: "none" | "small" | "default" | "big";
	background?: {
		bg?: "transparent" | "muted" | "primary";
		decoration?: "none" | "dots";
	};
}

export async function ServiceAreasBlockComponent(props: ServiceAreasProps) {
	const {
		title = "Service Areas",
		headline = "Proudly Serving Water City & Surrounding Communities",
		highlightedHeadlineText,
		description,
		useGlobalServiceAreas = true,
		customServiceAreas,
		bottomText,
		paddingTopOption = "default",
		paddingBottomOption = "default",
		background,
	} = props;

	let serviceAreas: string[] = [];

	if (useGlobalServiceAreas) {
		const companyInfo = await getCompanyInfo();
		if (
			companyInfo?.seo?.serviceAreas &&
			companyInfo.seo.serviceAreas.length > 0
		) {
			serviceAreas = companyInfo.seo.serviceAreas.map((area) => area.name);
		} else {
			// Fallback to site config if global info is empty/missing
			serviceAreas = SITE_CONFIG.aboutUs.serviceAreas;
		}
	} else if (customServiceAreas && customServiceAreas.length > 0) {
		serviceAreas = customServiceAreas.map((area) => area.name);
	}

	// Helper to highlight text
	const renderHeadline = () => {
		if (
			!highlightedHeadlineText ||
			!headline.includes(highlightedHeadlineText)
		) {
			return headline;
		}
		const parts = headline.split(highlightedHeadlineText);
		return (
			<>
				{parts[0]}
				<span className="text-primary">{highlightedHeadlineText}</span>
				{parts[1]}
			</>
		);
	};

	return (
		<SectionWrapper
			paddingTop={paddingTopOption as PaddingOption}
			paddingBottom={paddingBottomOption as PaddingOption}
			// className="bg-muted/30" // Removed to allow background prop to control
			background={background}
		>
			<div className="text-center max-w-2xl mx-auto mb-12">
				{title && (
					<div className="flex items-center justify-center gap-2 text-primary font-medium mb-4">
						<MapPin className="w-4 h-4" />
						<span className="uppercase tracking-wider text-sm">{title}</span>
					</div>
				)}
				{headline && (
					<TypographyH2 className="text-3xl md:text-4xl font-bold border-none tracking-tight leading-tight mb-4">
						{renderHeadline()}
					</TypographyH2>
				)}
				{description && (
					<TypographyMuted className="text-base">{description}</TypographyMuted>
				)}
			</div>

			{/* Service Areas Grid */}
			{serviceAreas.length > 0 && (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
					{serviceAreas.map((area) => (
						<div
							key={area}
							className="bg-background rounded-xl p-4 text-center border hover:border-primary/50 hover:shadow-md transition-all"
						>
							<div className="flex items-center justify-center gap-2">
								<MapPin className="w-4 h-4 text-primary shrink-0" />
								<span className="font-medium text-sm">{area}</span>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Local SEO Text */}
			{bottomText && (
				<div className="mt-12 text-center">
					<TypographyMuted className="text-sm max-w-3xl mx-auto">
						{bottomText}
					</TypographyMuted>
				</div>
			)}
		</SectionWrapper>
	);
}
