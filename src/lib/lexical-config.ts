import {
	BlocksFeature,
	FixedToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { CalloutBlock } from "@/blocks/CalloutBlock";
import { StepTimelineBlock } from "@/blocks/StepTimelineBlock";
import { StatsRowBlock } from "@/blocks/StatsRowBlock";
import { ImageGalleryBlock } from "@/blocks/ImageGalleryBlock";
import { BeforeAfterBlock } from "@/blocks/BeforeAfterBlock";
import { VideoPlayerBlock } from "@/blocks/VideoPlayerBlock";
import { YouTubeEmbedBlock } from "@/blocks/YouTubeEmbedBlock";
import { TableBlock } from "@/blocks/TableBlock";

import { ServiceLinkBlock } from "@/blocks/ServiceLinkBlock";
import { TestimonialBlock } from "@/blocks/TestimonialBlock";
import { CTABlock } from "@/blocks/CTABlock";
import { SpacingBlock } from "@/blocks/SpacingBlock";
import { MarqueeBlock } from "@/blocks/MarqueeBlock";

export const customLexical = lexicalEditor({
	features: ({ defaultFeatures }) => [
		...defaultFeatures,
		FixedToolbarFeature(),
		BlocksFeature({
			blocks: [
				CalloutBlock,
				StepTimelineBlock,
				StatsRowBlock,
				ImageGalleryBlock,
				BeforeAfterBlock,
				VideoPlayerBlock,
				YouTubeEmbedBlock,
				TableBlock,

				ServiceLinkBlock,
				TestimonialBlock,
				CTABlock,
				SpacingBlock,
				MarqueeBlock,
			],
		}),
	],
});
