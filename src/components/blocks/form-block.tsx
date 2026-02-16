import { FormRenderer } from "@/components/forms/form-renderer";
import type { Form } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

import { blockConverters } from "@/components/richtext/block-converters";

import { SectionWrapper } from "../ui/section-wrapper";
import type { PaddingOption } from "../ui/section-wrapper";

type Props = {
	form: Form | number;
	enableIntro?: boolean;
	introContent?: any;
	enableHeader?: boolean;
	headerContent?: any;
	enableFooter?: boolean;
	footerContent?: any;
	enableBorder?: boolean;
	paddingTopOption?: string;
	paddingBottomOption?: string;
	className?: string;
};

const customRenderers = {};

export const FormBlock = ({
	form,
	enableIntro,
	introContent,
	enableHeader,
	headerContent,
	enableFooter,
	footerContent,
	enableBorder = true,
	paddingTopOption = "default",
	paddingBottomOption = "default",
	className,
}: Props) => {
	if (!form || typeof form !== "object") {
		return null;
	}

	return (
		<SectionWrapper
			paddingTop={paddingTopOption as PaddingOption}
			paddingBottom={paddingBottomOption as PaddingOption}
			className={`form-block ${className || ""}`}
		>
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					{/* Left Column: Intro Content */}
					{enableIntro && introContent ? (
						<div className="prose dark:prose-invert max-w-none">
							<RichText data={introContent} converters={blockConverters} />
						</div>
					) : (
						// Empty div to maintain grid structure if no intro
						<div className="hidden lg:block"></div>
					)}

					{/* Right Column: Form */}
					<div
						className={`bg-card rounded-xl p-6 md:p-8 ${enableBorder ? "border border-border shadow-sm" : ""}`}
					>
						{enableHeader && headerContent && (
							<div className="prose dark:prose-invert max-w-none mb-6">
								<RichText data={headerContent} converters={blockConverters} />
							</div>
						)}
						<FormRenderer
							form={form as Form}
							customRenderers={customRenderers}
						/>
						{enableFooter && footerContent && (
							<div className="prose dark:prose-invert max-w-none mt-6">
								<RichText data={footerContent} converters={blockConverters} />
							</div>
						)}
					</div>
				</div>
			</div>
		</SectionWrapper>
	);
};
