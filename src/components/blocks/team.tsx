import Image from "next/image";
import {
	TypographyH2,
	TypographyH3,
	TypographyMuted,
} from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import type { Page } from "@/payload-types";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { HighlightedTitle } from "@/components/ui/highlighted-title";

type Props = Extract<Page["layout"][0], { blockType: "team" }>;

export function Team({
	title,
	titleHighlight,
	description,
	selectedMembers,
	paddingTopOption,
	paddingBottomOption,
	background,
}: Props) {
	if (!selectedMembers || selectedMembers.length === 0) return null;

	return (
		<SectionWrapper
			paddingTop={paddingTopOption}
			paddingBottom={paddingBottomOption}
			background={background}
		>
			<div className="text-center max-w-2xl mx-auto mb-12">
				{title && (
					<div className="flex items-center justify-center gap-2 text-primary font-medium mb-4">
						<span className="uppercase tracking-wider text-sm">{title}</span>
					</div>
				)}
				<TypographyH2 className="text-3xl md:text-4xl font-bold border-none tracking-tight leading-tight mb-4">
					{title && (
						<HighlightedTitle title={title} highlight={titleHighlight} />
					)}
				</TypographyH2>
				{description && (
					<TypographyMuted className="text-base">{description}</TypographyMuted>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{selectedMembers.map((member, index) => {
					// Skip un-populated IDs (relationship not depth-populated)
					if (typeof member === "number") return null;

					const imageUrl =
						typeof member.image === "object" && member.image?.url
							? member.image.url
							: null;
					const altText =
						typeof member.image === "object" && member.image?.alt
							? member.image.alt
							: member.name;

					return (
						<div
							key={member.name || index}
							className="bg-background rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow"
						>
							{/* Image */}
							<div className="relative aspect-square">
								{imageUrl && (
									<Image
										src={imageUrl}
										alt={altText}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
									/>
								)}
							</div>

							{/* Content */}
							<div className="p-6 space-y-4">
								<div>
									<TypographyH3 className="text-xl font-bold">
										{member.name}
									</TypographyH3>
									<p className="text-primary font-medium">{member.role}</p>
								</div>

								{member.bio && (
									<TypographyMuted className="text-sm">
										{member.bio}
									</TypographyMuted>
								)}

								{/* Certifications */}
								{member.certifications && member.certifications.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{member.certifications.map((certItem) => (
											<Badge
												key={certItem.id || certItem.certification}
												variant="secondary"
												className="text-xs"
											>
												{certItem.certification}
											</Badge>
										))}
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</SectionWrapper>
	);
}
