import type { Page } from "@/payload-types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
	SectionWrapper,
	type PaddingOption,
} from "@/components/ui/section-wrapper";

type BackLinkProps = NonNullable<Page["layout"]>[number] & {
	blockType: "backLink";
	background?: {
		bg?: "transparent" | "muted" | "primary";
		decoration?: "none" | "dots";
	};
};

export function BackLink({
	label,
	href,
	centered,
	paddingTopOption,
	paddingBottomOption,
	background,
}: BackLinkProps) {
	return (
		<SectionWrapper
			paddingTop={paddingTopOption as PaddingOption}
			paddingBottom={paddingBottomOption as PaddingOption}
			background={background}
		>
			<div
				className={cn(
					"max-w-3xl mx-auto",
					centered ? "text-center" : "text-left",
				)}
			>
				<Link
					href={href || "/"}
					className="text-primary hover:underline text-sm"
				>
					← {label || "Back to Home"}
				</Link>
			</div>
		</SectionWrapper>
	);
}
