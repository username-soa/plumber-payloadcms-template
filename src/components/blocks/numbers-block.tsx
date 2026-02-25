import React, { Fragment } from "react";
import { cn } from "@/lib/utils";
import type { Page } from "@/payload-types";
import { SectionWrapper } from "../ui/section-wrapper";
import type { PaddingOption } from "../ui/section-wrapper";

type Props = Extract<Page["layout"][0], { blockType: "numbers" }> & {
	background?: {
		bg?: "transparent" | "muted";
		decoration?: "none" | "dots";
	};
};

export const NumbersBlock: React.FC<Props> = ({
	textAlign = "left",
	textColor = "regular",
	paddingTopOption = "default",
	paddingBottomOption = "default",
	columns = 3,
	showSeparators = true,
	numberItems,
	background,
}) => {
	const alignmentClasses = {
		left: "text-left items-start",
		center: "text-center items-center",
		right: "text-right items-end",
	};

	const gridCols = {
		1: "grid-cols-1",
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
		4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
		5: "grid-cols-1 md:grid-cols-2 xl:grid-cols-5",
		6: "grid-cols-1 md:grid-cols-2 xl:grid-cols-6",
	};

	return (
		<SectionWrapper
			paddingTop={paddingTopOption as PaddingOption}
			paddingBottom={paddingBottomOption as PaddingOption}
			background={background}
		>
			<div className="container mx-auto">
				{/* Items Grid */}
				{numberItems && numberItems.length > 0 && (
					<div
						className={cn(
							"grid lg:gap-4 gap-3",
							gridCols[(Number(columns) as keyof typeof gridCols) || 3],
						)}
					>
						{numberItems.map((item, index) => {
							const colCount = Number(columns) || 3;
							const colCountMD = colCount === 1 ? 1 : 2;
							const colCountXL = colCount;

							const isLastInRowMD = (index + 1) % colCountMD === 0;
							const isLastInRowXL = (index + 1) % colCountXL === 0;

							const isLastRowMD =
								Math.ceil((index + 1) / colCountMD) ===
								Math.ceil(numberItems.length / colCountMD);
							const isLastRowXL =
								Math.ceil((index + 1) / colCountXL) ===
								Math.ceil(numberItems.length / colCountXL);

							return (
								<Fragment key={item.id || index}>
									<div
										className={cn(
											"flex flex-col gap-3 lg:px-4 md:px-2.5 py-4 relative",
											alignmentClasses[textAlign || "left"],
										)}
									>
										<div
											className={cn(
												"text-4xl md:text-5xl font-bold",
												textColor === "primary"
													? "text-primary"
													: "text-foreground",
											)}
										>
											{item.title}
										</div>
										{item.subTitle && (
											<div className="text-xl font-bold text-foreground mt-1">
												{item.subTitle}
											</div>
										)}
										{item.description && (
											<div className="text-muted-foreground leading-relaxed mt-2">
												{item.description}
											</div>
										)}
										{/* Right Separator (Vertical) - Hidden on last item in row */}
										{index < numberItems.length - 1 && showSeparators && (
											<div
												className={cn(
													"md:w-px w-0 md:h-[80%] h-0 bg-border absolute lg:-right-2 md:-right-[5px] right-0",
													"md:top-1/2 md:-translate-y-1/2",
													// MD/LG: Hide if last in row (2 cols)
													isLastInRowMD ? "md:hidden" : "md:block",
													// XL: Restore if not last in row (user cols), hide if last in row
													!isLastInRowXL && "xl:block",
													isLastInRowXL && "xl:hidden",
												)}
											/>
										)}

										{/* Bottom Separator (Horizontal) - Hidden on last row */}
										{showSeparators && (
											<div
												className={cn(
													"h-px w-[80%] absolute bottom-0 left-1/2 -translate-x-1/2 bg-border",
													// Mobile: Hide on last item (always last row in 1 col)
													index === numberItems.length - 1 ? "hidden" : "block",
													// MD/LG: Hide on last row (2 cols)
													isLastRowMD ? "md:hidden" : "md:block",
													// XL: Restore if not last row, hide if last row
													!isLastRowXL ? "xl:block" : "xl:hidden",
												)}
											/>
										)}
									</div>
								</Fragment>
							);
						})}
					</div>
				)}
			</div>
		</SectionWrapper>
	);
};
