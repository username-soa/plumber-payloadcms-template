import React from "react";
import { CMSLink } from "../payload/CMSLink";
import { cn } from "@/lib/utils";
import type { Page } from "@/payload-types";
import { TypographyH2, TypographyP } from "../ui/typography";
import { SectionWrapper } from "../ui/section-wrapper";
import type { PaddingOption } from "../ui/section-wrapper";

type Props = Extract<Page["layout"][0], { blockType: "titleContent" }> & {
	background?: {
		bg?: "transparent" | "muted" | "primary";
		decoration?: "none" | "dots";
	};
};

export const TitleContentBlock: React.FC<Props> = ({
	tagTitle,
	mainTitle,
	highlightedText,
	description,
	links,
	textAlign,
	buttonsAlign,
	paddingTopOption = "default",
	paddingBottomOption = "default",
	background,
}) => {
	// Function to highlight text
	const renderTitle = () => {
		if (!highlightedText || !mainTitle.includes(highlightedText)) {
			return mainTitle;
		}

		const parts = mainTitle.split(highlightedText);
		return (
			<>
				{parts.map((part, index) => (
					<React.Fragment key={index + part}>
						{part}
						{index < parts.length - 1 && (
							<span className="text-primary">{highlightedText}</span>
						)}
					</React.Fragment>
				))}
			</>
		);
	};

	const alignmentClasses = {
		left: "text-left items-start",
		center: "text-center items-center",
		right: "text-right items-end",
	};

	return (
		<SectionWrapper
			paddingTop={paddingTopOption as PaddingOption}
			paddingBottom={paddingBottomOption as PaddingOption}
			background={background}
		>
			<div
				className={cn(
					"flex flex-col md:gap-6 gap-4 w-full",
					alignmentClasses[textAlign || "left"],
				)}
			>
				{tagTitle && (
					<span className="text-sm font-medium tracking-wider text-primary uppercase">
						{tagTitle}
					</span>
				)}

				<TypographyH2 className="text-3xl max-w-[1000px] md:text-5xl font-bold border-none tracking-tight leading-tight m-0 p-0">
					{renderTitle()}
				</TypographyH2>

				{description && (
					<TypographyP className="text-lg text-muted-foreground leading-relaxed max-w-2xl m-0! p-0 mt-0!">
						{description}
					</TypographyP>
				)}

				{links && links.length > 0 && (
					<div
						className={cn(
							"flex flex-wrap gap-4 mt-4 w-full",
							// Button alignment logic
							buttonsAlign === "center"
								? "justify-center"
								: buttonsAlign === "right"
									? "justify-end"
									: "justify-start",
						)}
					>
						{links.map((link, index) => (
							<CMSLink key={link.id || index} link={link.link} />
						))}
					</div>
				)}
			</div>
		</SectionWrapper>
	);
};
