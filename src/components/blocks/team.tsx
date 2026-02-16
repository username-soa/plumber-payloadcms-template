import Image from "next/image";
import {
	TypographyH2,
	TypographyH3,
	TypographyMuted,
} from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Media } from "@/payload-types";
import {
	SectionWrapper,
	type PaddingOption,
} from "@/components/ui/section-wrapper";

// Helper type since we don't have the full deeply inferred type here easily
// and we want to keep it simple. Adjust as needed based on generated types.
type TeamMember = {
	name: string;
	role: string;
	image: Media | string; // Handle expanded or ID
	bio?: string | null;
	certifications?:
		| {
				certification: string;
				id?: string | null;
		  }[]
		| null;
};

type Props = {
	title?: string | null;
	titleHighlight?: string | null;
	description?: string | null;
	selectedMembers?: (TeamMember | string)[] | null; // Relationship can be ID or object
	paddingTopOption?: string | null;
	paddingBottomOption?: string | null;
	background?: {
		bg?: "transparent" | "muted" | "primary";
		decoration?: "none" | "dots";
	};
};

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
			// className="bg-muted/30" // Removed strict override to allow background prop to work
			paddingTop={paddingTopOption as PaddingOption}
			paddingBottom={paddingBottomOption as PaddingOption}
			background={background}
		>
			<div className="text-center max-w-2xl mx-auto mb-12">
				<div className="flex items-center justify-center gap-2 text-primary font-medium mb-4">
					<span className="uppercase tracking-wider text-sm">Our Team</span>
				</div>
				<TypographyH2 className="text-3xl md:text-4xl font-bold border-none tracking-tight leading-tight mb-4">
					{titleHighlight && title ? (
						<>
							{title.split(titleHighlight)[0]}
							<span className="text-primary">{titleHighlight}</span>
							{title.split(titleHighlight)[1]}
						</>
					) : (
						title
					)}
				</TypographyH2>
				{description && (
					<TypographyMuted className="text-base">{description}</TypographyMuted>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{selectedMembers.map((member, index) => {
					// Handle potential simple ID if not populated (though typically it is in blocks)
					if (typeof member === "string") return null;

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
