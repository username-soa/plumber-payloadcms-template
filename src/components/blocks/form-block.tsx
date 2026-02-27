import { FormRenderer } from "@/components/forms/form-renderer";
import type { Form, Page } from "@/payload-types";
import { getServices } from "@/app/(site)/actions/get-services";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { blockConverters } from "@/components/richtext/block-converters";
import { SectionWrapper } from "../ui/section-wrapper";

type Props = Extract<Page["layout"][0], { blockType: "formBlock" }> & {
	className?: string;
};

export const FormBlock = async ({
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
	background,
}: Props) => {
	if (!form || typeof form !== "object") {
		return null;
	}

	const serviceOptions = await getServices();

	return (
		<SectionWrapper
			paddingTop={paddingTopOption}
			paddingBottom={paddingBottomOption}
			className={`form-block ${className || ""}`}
			background={background}
		>
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
						initialServiceOptions={serviceOptions}
					/>
					{enableFooter && footerContent && (
						<div className="prose dark:prose-invert max-w-none mt-6">
							<RichText data={footerContent} converters={blockConverters} />
						</div>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
};
