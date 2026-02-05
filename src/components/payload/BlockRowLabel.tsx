"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
	AlertCircle,
	BarChart,
	Box,
	FlipHorizontal,
	Image as ImageIcon,
	Info,
	Lightbulb,
	Link as LinkIcon,
	Megaphone,
	MessageSquareQuote,
	MoveVertical,
	PlayCircle,
	Table2,
	Youtube,
} from "lucide-react";

interface MediaObject {
	url?: string;
}

interface BlockData {
	title?: string;
	heading?: string;
	label?: string;
	author?: string;
	caption?: string;
	items?: unknown[];
	images?: { image?: MediaObject }[];
	quote?: string;
	role?: string;
	avatar?: MediaObject;
	poster?: MediaObject;
	videoUrl?: string;
	style?: string;
	type?: string;
	buttonText?: string;
	serviceSlug?: string;
	stats?: unknown[];
	rows?: unknown[];
	striped?: boolean;
	beforeImage?: MediaObject;
	afterImage?: MediaObject;
	size?: string;
	[key: string]: unknown;
}

/**
 * Helper to format long text
 */
const formatLabel = (text: string | null | undefined, maxLength = 40) => {
	if (!text) return "";
	return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

/**
 * Helper to format metadata items into a readable string
 */
const formatMetadata = (
	items: { label: string; value: string | number | boolean | undefined }[],
) => {
	return items
		.filter(
			(item) =>
				item.value !== undefined && item.value !== null && item.value !== "",
		)
		.map((item) => {
			const val =
				typeof item.value === "boolean"
					? item.value
						? "true"
						: "false"
					: item.value;
			return `${item.label}: ${val}`;
		})
		.join(" | ");
};

/**
 * Thumbnail Component
 * Renders an image if available, otherwise renders the provided Icon.
 */
const Thumbnail = ({
	image,
	icon: Icon,
}: {
	image?: MediaObject;
	icon: LucideIcon;
}) => {
	const hasImage = image && typeof image === "object" && image.url;

	return (
		<div className="shrink-0 h-10 w-10 bg-background rounded overflow-hidden flex items-center justify-center border border-border/50">
			{hasImage ? (
				<div className="relative w-full h-full">
					<Image
						src={image.url || ""}
						alt="Thumbnail"
						fill
						className="object-cover"
						sizes="40px"
					/>
				</div>
			) : (
				<Icon className="size-4 text-muted-foreground" />
			)}
		</div>
	);
};

// Generic Row Label Component
export const BlockRowLabel = ({
	data,
	index,
	blockType,
	label: defaultLabel,
	icon = Box,
	image,
	metadata,
}: {
	data: BlockData;
	index?: number;
	blockType?: string;
	label?: string;
	icon?: LucideIcon;
	image?: MediaObject;
	metadata?: string;
}) => {
	const rowNum = (index ?? 0) + 1;
	const items = data?.items || data?.images;

	// Determine Title
	const title =
		data?.title ||
		data?.heading ||
		data?.label ||
		data?.author ||
		data?.caption ||
		(items ? `${items.length} Items` : defaultLabel || `Block ${rowNum}`);

	// Format display title with block type prefix if available
	const displayTitle = blockType
		? `${blockType} - ${formatLabel(title as string)}`
		: formatLabel(title as string);

	return (
		<div className="flex items-center gap-3 py-1">
			<Thumbnail icon={icon} image={image} />
			<div className="flex flex-col min-w-0">
				<span className="font-medium text-sm leading-tight text-primary/90 truncate">
					{displayTitle}
				</span>
				{metadata && (
					<span className="text-xs text-muted-foreground truncate mt-0.5">
						{metadata}
					</span>
				)}
			</div>
		</div>
	);
};

export const CTALabel = ({
	data,
	index,
}: {
	data: BlockData;
	index?: number;
}) => {
	const metadata = formatMetadata([
		{ label: "Button", value: data?.buttonText },
	]);

	return (
		<BlockRowLabel
			data={data}
			index={index}
			blockType="CTA"
			label="Call to Action"
			icon={Megaphone}
			metadata={metadata}
		/>
	);
};

export const CalloutLabel = ({
	data,
	index,
}: {
	data: BlockData;
	index?: number;
}) => {
	const calloutType = data?.type || "info";
	const iconMap: Record<string, LucideIcon> = {
		info: Info,
		warning: AlertCircle,
		tip: Lightbulb,
	};
	const metadata = formatMetadata([{ label: "Type", value: calloutType }]);

	return (
		<BlockRowLabel
			data={data}
			index={index}
			blockType="Callout"
			label="Callout"
			icon={iconMap[calloutType] || Info}
			metadata={metadata}
		/>
	);
};

export const TestimonialLabel = ({
	data,
	index,
}: {
	data: BlockData;
	index?: number;
}) => {
	const metadata = formatMetadata([{ label: "Role", value: data?.role }]);

	return (
		<BlockRowLabel
			data={data}
			index={index}
			blockType="Testimonial"
			label="Testimonial"
			icon={MessageSquareQuote}
			image={data?.avatar}
			metadata={metadata}
		/>
	);
};

export const VideoLabel = ({
	data,
	index,
}: {
	data: BlockData;
	index?: number;
}) => {
	const metadata = formatMetadata([
		{ label: "URL", value: formatLabel(data?.videoUrl, 30) },
	]);

	return (
		<BlockRowLabel
			data={data}
			index={index}
			blockType="Video"
			label="Video"
			icon={PlayCircle}
			image={data?.poster}
			metadata={metadata}
		/>
	);
};

export const GalleryLabel = ({
	data,
	index,
}: {
	data: BlockData;
	index?: number;
}) => {
	const firstImage = data?.images?.[0]?.image;
	const imageCount = data?.images?.length || 0;
	const metadata = formatMetadata([
		{ label: "Style", value: data?.style },
		{ label: "Images", value: imageCount },
	]);

	return (
		<BlockRowLabel
			data={data}
			index={index}
			blockType="Gallery"
			label="Gallery"
			icon={ImageIcon}
			image={firstImage}
			metadata={metadata}
		/>
	);
};

export const BeforeAfterLabel = ({
	data,
	index,
}: {
	data: BlockData;
	index?: number;
}) => {
	const hasImages = data?.beforeImage && data?.afterImage;
	const metadata = formatMetadata([
		{ label: "Images", value: hasImages ? "Both set" : "Incomplete" },
	]);

	return (
		<BlockRowLabel
			data={data}
			index={index}
			blockType="Before & After"
			label="Before & After"
			icon={FlipHorizontal}
			image={data?.beforeImage}
			metadata={metadata}
		/>
	);
};

export const ServiceLinkLabel = ({
	data,
	index,
}: {
	data: BlockData;
	index?: number;
}) => {
	const metadata = formatMetadata([
		{ label: "Slug", value: data?.serviceSlug },
	]);

	return (
		<BlockRowLabel
			data={data}
			index={index}
			blockType="Service Link"
			label="Service Link"
			icon={LinkIcon}
			metadata={metadata}
		/>
	);
};

export const StatsRowLabel = ({
	data,
	index,
}: {
	data: BlockData;
	index?: number;
}) => {
	const statCount = data?.stats?.length || 0;
	const metadata = formatMetadata([{ label: "Stats", value: statCount }]);

	return (
		<BlockRowLabel
			data={data}
			index={index}
			blockType="Stats"
			label="Stats Row"
			icon={BarChart}
			metadata={metadata}
		/>
	);
};

export const TimelineLabel = ({
	data,
	index,
}: {
	data: BlockData;
	index?: number;
}) => {
	const itemCount = data?.items?.length || 0;
	const metadata = formatMetadata([{ label: "Items", value: itemCount }]);

	return (
		<BlockRowLabel
			data={data}
			index={index}
			blockType="Timeline"
			label="Timeline"
			metadata={metadata}
		/>
	);
};

export const SpacingLabel = ({
	data,
	index,
}: {
	data: BlockData;
	index?: number;
}) => {
	const metadata = formatMetadata([
		{ label: "Size", value: data?.size || "medium" },
	]);

	return (
		<BlockRowLabel
			data={data}
			index={index}
			blockType="Spacing"
			label="Spacing"
			icon={MoveVertical}
			metadata={metadata}
		/>
	);
};

export const TableLabel = ({
	data,
	index,
}: {
	data: BlockData;
	index?: number;
}) => {
	const rowCount = data?.rows?.length || 0;
	const metadata = formatMetadata([
		{ label: "Rows", value: rowCount },
		{ label: "Striped", value: data?.striped },
	]);

	return (
		<BlockRowLabel
			data={data}
			index={index}
			blockType="Table"
			label="Table"
			icon={Table2}
			metadata={metadata}
		/>
	);
};

export const YouTubeLabel = ({
	data,
	index,
}: {
	data: BlockData;
	index?: number;
}) => {
	const metadata = formatMetadata([{ label: "Title", value: data?.title }]);

	return (
		<BlockRowLabel
			data={data}
			index={index}
			blockType="YouTube"
			label="YouTube Video"
			icon={Youtube}
			metadata={metadata}
		/>
	);
};
