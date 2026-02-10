// Block converters for Payload CMS Lexical rich text

import type {
	DefaultNodeTypes,
	SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { Media } from "@/payload-types";
import { cn } from "@/lib/utils";
import { RICH_TEXT_COLORS, type RichTextColor } from "@/lib/rich-text-colors";
import { BeforeAfter } from "@/components/blocks/before-after";
import { Callout } from "@/components/blocks/callout";
import { CTA } from "@/components/blocks/cta";
import { ImageGallery } from "@/components/blocks/image-gallery";

import { FeatureListBlock } from "@/components/blocks/feature-list-block";
import { WorkflowStepBlock } from "@/components/blocks/workflow-step-block";
import { SimpleStatsBlock } from "@/components/blocks/simple-stats-block";

import { ServiceLink } from "@/components/blocks/service-link";
import { StatsRow } from "@/components/blocks/stats-row";
import { Testimonial } from "@/components/blocks/testimonial";
import { StepTimeline } from "@/components/richtext/step-timeline";
import { YouTubeEmbed } from "@/components/blocks/youtube-embed";
import { VideoPlayer } from "@/components/blocks/video-player";
import { Spacing } from "@/components/blocks/spacing";
import { Table } from "@/components/blocks/table";
import {
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyH4,
	TypographyP,
	TypographyBlockquote,
	TypographyList,
} from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

// Block field types based on your block definitions
interface CalloutBlock {
	blockType: "callout";
	paddingTop?: boolean;
	paddingBottom?: boolean;
	type?: "info" | "warning" | "tip";
	title?: string;
	content?: string;
}

interface StepTimelineItem {
	label?: string | null;
	heading: string;
	content?: string | null;
	id?: string | null;
}

interface StepTimelineBlock {
	blockType: "stepTimeline";
	paddingTop?: boolean;
	paddingBottom?: boolean;
	items?: StepTimelineItem[];
}

interface StatItem {
	value: string;
	label: string;
}

interface StatsRowBlock {
	blockType: "statsRow";
	paddingTop?: boolean;
	paddingBottom?: boolean;
	stats?: StatItem[];
}

interface BeforeAfterBlock {
	blockType: "beforeAfter";
	paddingTop?: boolean;
	paddingBottom?: boolean;
	beforeImage: Media | string;
	afterImage: Media | string;
	description?: string;
}

interface YouTubeEmbedBlock {
	blockType: "youtubeEmbed";
	paddingTop?: boolean;
	paddingBottom?: boolean;
	videoUrl: string;
	title?: string;
}

interface VideoPlayerBlock {
	blockType: "videoPlayer";
	paddingTop?: boolean;
	paddingBottom?: boolean;
	videoUrl: string;
	poster?: Media | string;
}

/**
 * Extracts the YouTube video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube-nocookie.com/embed/VIDEO_ID
 * - Just the video ID itself (backwards compatibility)
 */

interface TestimonialBlock {
	blockType: "testimonial";
	paddingTop?: boolean;
	paddingBottom?: boolean;
	quote: string;
	author: string;
	role?: string;
	avatar?: Media | string;
}

interface ServiceLinkBlock {
	blockType: "serviceLink";
	paddingTop?: boolean;
	paddingBottom?: boolean;
	serviceSlug: string;
	customText?: string;
}

interface CTABlock {
	blockType: "cta";
	paddingTop?: boolean;
	paddingBottom?: boolean;
	heading: string;
	description?: string;
	buttonText: string;
	buttonLink: string;
}

interface ImageGalleryItem {
	id?: string;
	image: Media | string;
	caption?: string;
}

interface ImageGalleryBlock {
	blockType: "imageGallery";
	paddingTop?: boolean;
	paddingBottom?: boolean;
	style?: "grid" | "carousel";
	images: ImageGalleryItem[];
}

interface SpacingBlock {
	blockType: "spacing";
	size: "small" | "medium" | "large";
}

interface TableHeader {
	label: string;
}

interface TableCell {
	value: string;
}

interface TableRow {
	cells?: TableCell[];
}

interface TableBlock {
	blockType: "table";
	paddingTop?: boolean;
	paddingBottom?: boolean;
	caption?: string;
	headers?: TableHeader[];
	rows?: TableRow[];
	striped?: boolean;
	bordered?: boolean;
}

interface FeatureListBlockType {
	blockType: "featureList";
	features: { icon?: string; text: string }[];
}

interface WorkflowStepBlockType {
	blockType: "workflowStep";
	stepNumber: number;
	title: string;
	description?: string;
}

interface SimpleStatsBlockType {
	blockType: "simpleStats";
	stats: { value: string; label: string }[];
}

type CustomBlocks =
	| CalloutBlock
	| StepTimelineBlock
	| StatsRowBlock
	| BeforeAfterBlock
	| YouTubeEmbedBlock
	| VideoPlayerBlock
	| TestimonialBlock
	| ServiceLinkBlock
	| CTABlock
	| ImageGalleryBlock
	| SpacingBlock
	| SpacingBlock
	| TableBlock
	| FeatureListBlockType
	| WorkflowStepBlockType
	| SimpleStatsBlockType;

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<CustomBlocks>;

// Callout Component
function CalloutRenderer({
	node,
}: {
	node: SerializedBlockNode<CalloutBlock>;
}) {
	const {
		type = "info",
		title,
		content,
		paddingTop,
		paddingBottom,
	} = node.fields;

	// Map Payload types to Callout component types
	// Payload: 'info' | 'warning' | 'tip'
	// Component: 'default' | 'info' | 'warning' | 'danger' | 'success' | 'tip'
	return (
		<div
			className={cn(
				paddingTop && "pt-10 md:pt-20",
				paddingBottom && "pb-10 md:pb-20",
			)}
		>
			<Callout type={type} title={title}>
				{content}
			</Callout>
		</div>
	);
}

// StepTimeline Component for richtext content
function StepTimelineRenderer({
	node,
}: {
	node: SerializedBlockNode<StepTimelineBlock>;
}) {
	const { items = [], paddingTop, paddingBottom } = node.fields;

	return (
		<StepTimeline
			items={items}
			paddingTop={paddingTop}
			paddingBottom={paddingBottom}
		/>
	);
}

// Stats Row Component
function StatsRowRenderer({
	node,
}: {
	node: SerializedBlockNode<StatsRowBlock>;
}) {
	const { stats = [], paddingTop, paddingBottom } = node.fields;
	return (
		<div
			className={cn(
				paddingTop && "pt-10 md:pt-20",
				paddingBottom && "pb-10 md:pb-20",
			)}
		>
			<StatsRow stats={stats} />
		</div>
	);
}

// Before/After Component
function BeforeAfterRenderer({
	node,
}: {
	node: SerializedBlockNode<BeforeAfterBlock>;
}) {
	const { beforeImage, afterImage, paddingTop, paddingBottom } = node.fields;

	const beforeUrl =
		typeof beforeImage === "string" ? beforeImage : beforeImage?.url;
	const afterUrl =
		typeof afterImage === "string" ? afterImage : afterImage?.url;

	if (!beforeUrl || !afterUrl) return null;

	return (
		<div
			className={cn(
				paddingTop && "pt-10 md:pt-20",
				paddingBottom && "pb-10 md:pb-20",
			)}
		>
			<BeforeAfter before={beforeUrl} after={afterUrl} />
		</div>
	);
}

// YouTube Embed Component
function YouTubeEmbedRenderer({
	node,
}: {
	node: SerializedBlockNode<YouTubeEmbedBlock>;
}) {
	const { videoUrl, title, paddingTop, paddingBottom } = node.fields;

	if (!videoUrl) return null;

	return (
		<div
			className={cn(
				paddingTop && "pt-10 md:pt-20",
				paddingBottom && "pb-10 md:pb-20",
			)}
		>
			<YouTubeEmbed id={videoUrl} title={title} />
		</div>
	);
}

// Video Player Component
function VideoPlayerRenderer({
	node,
}: {
	node: SerializedBlockNode<VideoPlayerBlock>;
}) {
	const { videoUrl, poster, paddingTop, paddingBottom } = node.fields;

	const posterUrl =
		typeof poster === "string" ? poster : poster?.url || undefined;

	if (!videoUrl) return null;

	return (
		<div
			className={cn(
				paddingTop && "pt-10 md:pt-20",
				paddingBottom && "pb-10 md:pb-20",
			)}
		>
			<VideoPlayer src={videoUrl} poster={posterUrl} />
		</div>
	);
}

// Testimonial Component
function TestimonialRenderer({
	node,
}: {
	node: SerializedBlockNode<TestimonialBlock>;
}) {
	const { quote, author, role, avatar, paddingTop, paddingBottom } =
		node.fields;
	const avatarUrl =
		(typeof avatar === "string" ? avatar : avatar?.url) || undefined;

	return (
		<div
			className={cn(
				paddingTop && "pt-10 md:pt-20",
				paddingBottom && "pb-10 md:pb-20",
			)}
		>
			<Testimonial
				quote={quote}
				author={author}
				role={role}
				avatar={avatarUrl}
			/>
		</div>
	);
}

// Service Link Component
function ServiceLinkRenderer({
	node,
}: {
	node: SerializedBlockNode<ServiceLinkBlock>;
}) {
	const { serviceSlug, customText, paddingTop, paddingBottom } = node.fields;

	return (
		<div
			className={cn(
				paddingTop && "pt-10 md:pt-20",
				paddingBottom && "pb-10 md:pb-20",
			)}
		>
			<ServiceLink slug={serviceSlug} label={customText} />
		</div>
	);
}

// CTA Component
function CTARenderer({ node }: { node: SerializedBlockNode<CTABlock> }) {
	const {
		heading,
		description,
		buttonText,
		buttonLink,
		paddingTop,
		paddingBottom,
	} = node.fields;

	return (
		<div
			className={cn(
				paddingTop && "pt-10 md:pt-20",
				paddingBottom && "pb-10 md:pb-20",
			)}
		>
			<CTA
				title={heading}
				description={description}
				buttonText={buttonText}
				href={buttonLink}
			/>
		</div>
	);
}
// Image Gallery Component
function ImageGalleryRenderer({
	node,
}: {
	node: SerializedBlockNode<ImageGalleryBlock>;
}) {
	const {
		images = [],
		style = "grid",
		paddingTop,
		paddingBottom,
	} = node.fields;

	if (!images.length) return null;

	const galleryImages = images
		.map((item, index) => {
			const imageUrl =
				typeof item.image === "string" ? item.image : item.image?.url;
			const altText =
				(typeof item.image !== "string" && item.image?.alt) ||
				item.caption ||
				`Gallery Image ${index + 1}`;

			if (!imageUrl) return null;

			return {
				src: imageUrl,
				alt: altText,
				caption: item.caption,
			};
		})
		.filter((img) => !!img) as {
		src: string;
		alt: string;
		caption?: string;
	}[];

	if (!galleryImages.length) return null;

	return (
		<div
			className={cn(
				paddingTop && "pt-12 md:pt-16",
				paddingBottom && "pb-12 md:pb-16",
			)}
		>
			<ImageGallery images={galleryImages} layout={style} />
		</div>
	);
}

// Spacing Component
function SpacingRenderer({
	node,
}: {
	node: SerializedBlockNode<SpacingBlock>;
}) {
	const { size } = node.fields;
	return <Spacing size={size} />;
}

// Table Component
function TableRenderer({ node }: { node: SerializedBlockNode<TableBlock> }) {
	const {
		caption,
		headers = [],
		rows = [],
		striped = true,
		bordered = true,
		paddingTop,
		paddingBottom,
	} = node.fields;

	const headerLabels = headers.map((h) => h.label);
	const rowData = rows.map((row) =>
		(row.cells || []).map((cell) => cell.value),
	);

	if (!headerLabels.length) return null;

	return (
		<div
			className={cn(
				paddingTop && "pt-10 md:pt-20",
				paddingBottom && "pb-10 md:pb-20",
			)}
		>
			<Table
				caption={caption}
				headers={headerLabels}
				rows={rowData}
				striped={striped}
				bordered={bordered}
			/>
		</div>
	);
}

const formatStyle = (style: string): React.CSSProperties => {
	if (!style) return {};
	return style.split(";").reduce((acc, rule) => {
		const [key, value] = rule.split(":");
		if (key && value) {
			const camelKey = key
				.trim()
				.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(acc as any)[camelKey] = value.trim();
		}
		return acc;
	}, {});
};

// Export the converters function
export const blockConverters: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters,
}) => ({
	...defaultConverters,
	text: ({ node }) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const anyNode = node as any;
		const style = anyNode.style;
		const metadata = anyNode.$;

		let combinedStyle: React.CSSProperties = {};

		if (style) {
			combinedStyle = { ...combinedStyle, ...formatStyle(style) };
		}

		if (metadata && metadata.color) {
			const colorKey = metadata.color as RichTextColor;
			if (RICH_TEXT_COLORS[colorKey]) {
				combinedStyle = {
					...combinedStyle,
					...RICH_TEXT_COLORS[colorKey].css, // { color: "#..." }
				};
			}
		}

		if (Object.keys(combinedStyle).length > 0) {
			return <span style={combinedStyle}>{node.text}</span>;
		}
		return <>{node.text}</>;
	},
	heading: ({ node, nodesToJSX }) => {
		const tag = node.tag;
		const children = nodesToJSX({ nodes: node.children });
		if (tag === "h1")
			return <TypographyH1 className="mt-12 mb-6">{children}</TypographyH1>;
		if (tag === "h2")
			return <TypographyH2 className="mt-10 mb-4">{children}</TypographyH2>;
		if (tag === "h3")
			return <TypographyH3 className="mt-8 mb-4">{children}</TypographyH3>;
		if (tag === "h4")
			return <TypographyH4 className="mt-6 mb-4">{children}</TypographyH4>;
		if (tag === "h5")
			return <h5 className="text-lg font-semibold mt-4 mb-2">{children}</h5>;
		return <h6 className="text-base font-semibold mt-4 mb-2">{children}</h6>;
	},
	paragraph: ({ node, nodesToJSX }) => {
		return <TypographyP>{nodesToJSX({ nodes: node.children })}</TypographyP>;
	},
	quote: ({ node, nodesToJSX }) => {
		return (
			<TypographyBlockquote>
				{nodesToJSX({ nodes: node.children })}
			</TypographyBlockquote>
		);
	},
	list: ({ node, nodesToJSX }) => {
		const children = nodesToJSX({ nodes: node.children });
		const listType = node.listType;
		if (listType === "number") {
			return <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>;
		}
		if (listType === "check") {
			return <ul className="my-6 ml-0 list-none [&>li]:mt-2">{children}</ul>;
		}
		return <TypographyList>{children}</TypographyList>;
	},
	listitem: ({ node, nodesToJSX }) => {
		const children = nodesToJSX({ nodes: node.children });
		const checked = node.checked;
		const value = node.value;

		if (typeof checked === "boolean") {
			return (
				<li value={value} className="flex items-start space-x-2 my-2 list-none">
					<Checkbox defaultChecked={checked} className="mt-1" />
					<span className="text-foreground">{children}</span>
				</li>
			);
		}

		return <li value={value}>{children}</li>;
	},
	horizontalrule: () => {
		return <Separator className="my-8" />;
	},
	link: ({ node, nodesToJSX }) => {
		const children = nodesToJSX({ nodes: node.children });
		const { fields } = node;
		return (
			<a
				href={fields?.url || "#"}
				target={fields?.newTab ? "_blank" : undefined}
				rel={fields?.newTab ? "noopener noreferrer" : undefined}
				className="font-medium text-primary underline underline-offset-4"
			>
				{children}
			</a>
		);
	},
	autolink: ({ node, nodesToJSX }) => {
		const children = nodesToJSX({ nodes: node.children });
		const { fields } = node;
		return (
			<a
				href={fields?.url || "#"}
				target={fields?.newTab ? "_blank" : undefined}
				rel={fields?.newTab ? "noopener noreferrer" : undefined}
				className="font-medium text-primary underline underline-offset-4"
			>
				{children}
			</a>
		);
	},
	blocks: {
		callout: ({ node }) => (
			<CalloutRenderer node={node as SerializedBlockNode<CalloutBlock>} />
		),
		stepTimeline: ({ node }) => (
			<StepTimelineRenderer
				node={node as SerializedBlockNode<StepTimelineBlock>}
			/>
		),
		statsRow: ({ node }) => (
			<StatsRowRenderer node={node as SerializedBlockNode<StatsRowBlock>} />
		),

		beforeAfter: ({ node }) => (
			<BeforeAfterRenderer
				node={node as SerializedBlockNode<BeforeAfterBlock>}
			/>
		),
		videoPlayer: ({ node }) => (
			<VideoPlayerRenderer
				node={node as SerializedBlockNode<VideoPlayerBlock>}
			/>
		),
		youtubeEmbed: ({ node }) => (
			<YouTubeEmbedRenderer
				node={node as SerializedBlockNode<YouTubeEmbedBlock>}
			/>
		),
		testimonial: ({ node }) => (
			<TestimonialRenderer
				node={node as SerializedBlockNode<TestimonialBlock>}
			/>
		),
		serviceLink: ({ node }) => (
			<ServiceLinkRenderer
				node={node as SerializedBlockNode<ServiceLinkBlock>}
			/>
		),
		cta: ({ node }) => (
			<CTARenderer node={node as SerializedBlockNode<CTABlock>} />
		),
		imageGallery: ({ node }) => (
			<ImageGalleryRenderer
				node={node as SerializedBlockNode<ImageGalleryBlock>}
			/>
		),
		spacing: ({ node }) => (
			<SpacingRenderer node={node as SerializedBlockNode<SpacingBlock>} />
		),
		table: ({ node }) => (
			<TableRenderer node={node as SerializedBlockNode<TableBlock>} />
		),
		featureList: ({ node }) => (
			<FeatureListBlock features={(node.fields as any).features} />
		),
		workflowStep: ({ node }) => <WorkflowStepBlock {...(node.fields as any)} />,
		simpleStats: ({ node }) => (
			<SimpleStatsBlock stats={(node.fields as any).stats} />
		),
	},
});
