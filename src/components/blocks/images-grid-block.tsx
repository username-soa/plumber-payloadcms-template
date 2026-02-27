import { Fragment, type FC } from "react";
import { cn } from "@/lib/utils";
import type { Page, Media } from "@/payload-types";
import { SectionWrapper } from "../ui/section-wrapper";
import Link from "next/link";
import Image from "next/image";

type Props = Extract<Page["layout"][0], { blockType: "imagesGrid" }>;

export const ImagesGridBlock: FC<Props> = ({
	paddingTopOption = "default",
	paddingBottomOption = "default",
	columns = 3,
	items,
	background,
}) => {
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
			paddingTop={paddingTopOption}
			paddingBottom={paddingBottomOption}
			background={background}
		>
			<div className="container mx-auto">
				{items && items.length > 0 && (
					<div
						className={cn(
							"grid lg:gap-8 gap-4",
							gridCols[(Number(columns) as keyof typeof gridCols) || 3],
						)}
					>
						{items.map((item, index) => {
							const image =
								typeof item.image === "object" && item.image !== null
									? (item.image as Media)
									: null;

							const content = (
								<div
									key={item.id || index}
									className={cn(
										"group relative w-full float-left rounded-3xl overflow-hidden cursor-pointer md:h-[400px] max-md:aspect-2/3",
									)}
								>
									<Image
										src={image?.url || ""}
										alt={item.title || ""}
										fill
										sizes="(max-width: 768px) 100vw, 400px"
										className="object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

									<div className="absolute bottom-0 left-0 md:p-6 p-4 w-full">
										<h3 className="text-white text-xl font-bold leading-snug max-w-[80%] group-hover:translate-x-2 transition-transform">
											{item.title}
										</h3>
									</div>
								</div>
							);

							return (
								<Fragment key={item.id || index}>
									{item.link ? (
										<Link href={item.link} className="group block h-full">
											{content}
										</Link>
									) : (
										content
									)}
								</Fragment>
							);
						})}
					</div>
				)}
			</div>
		</SectionWrapper>
	);
};
