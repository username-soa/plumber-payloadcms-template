/**
 * ContentFetcher Component
 * Server component for fetching and displaying content from Payload CMS
 *
 * This is a thin orchestration layer that composes:
 * - Data layer: lib/content (types, fetchers, queries)
 * - UI components: ContentHeader, ContentGrid, FilterSection, Pagination
 */

import { getPayload } from "payload";
import config from "@payload-config";
import type { BlogPost, CaseStudy, Service } from "@/payload-types";
import {
	BlogCard,
	FeaturedBlogCard,
	CaseStudyCard,
	FeaturedCaseStudyCard,
	ServiceCard,
} from "@/components/cards";
import { TypographyMuted } from "@/components/ui/typography";

// Data layer imports
import {
	type ContentType,
	type ContentItem,
	type SortOption,
	type PaginationStyle,
	type GridColumns,
	type SearchParams,
	getFilterOptions,
	fetchContent,
} from "@/lib/content";

// Sub-components

import { ContentGrid } from "./ContentGrid";
import { FilterSection } from "./FilterSection";
import { PaginationNumbered } from "./pagination-numbered";
import { LoadMoreButton } from "./load-more-button";
import { InfiniteScroll } from "./infinite-scroll";
import { cn } from "@/lib/utils";
import {
	SectionWrapper,
	type PaddingOption,
} from "@/components/ui/section-wrapper";

// Re-export for backwards compatibility
export type { CategoryOption, TagOption } from "@/lib/content";

// =============================================================================
// Types
// =============================================================================

interface ContentFetcherProps {
	title?: string | null;
	titleHighlight?: string | null;
	description?: string | null;
	contentType: ContentType;
	itemsPerRow?: GridColumns | null;
	limit?: number | null;
	sortBy?: SortOption | null;
	featuredOnly?: boolean | null;
	showFilters?: boolean | null;
	showSearch?: boolean | null;
	paginationStyle?: PaginationStyle | null;
	searchParams?: SearchParams;
	paddingTopOption?: string | null;
	paddingBottomOption?: string | null;
	background?: {
		bg?: "transparent" | "muted" | "primary";
		decoration?: "none" | "dots";
	};
}

// ... Type Guards and Error Component are unchanged ...

function isBlogPost(item: ContentItem): item is BlogPost {
	return "publishedAt" in item && "status" in item;
}

function isCaseStudy(item: ContentItem): item is CaseStudy {
	return "completedAt" in item && "client" in item;
}

function isService(item: ContentItem): item is Service {
	return "isEmergency" in item || "parentService" in item;
}

// =============================================================================
// Error Component
// =============================================================================

function ContentFetcherError() {
	return (
		<section className="py-16 md:py-24">
			<div className="container mx-auto px-6 text-center">
				<TypographyMuted className="text-lg">
					Unable to load content. Please try again later.
				</TypographyMuted>
			</div>
		</section>
	);
}

// =============================================================================
// Card Renderer Factory
// =============================================================================

function createCardRenderer(contentType: ContentType) {
	return (item: ContentItem, index: number) => {
		const isFeatured =
			(isBlogPost(item) || isCaseStudy(item)) &&
			"featured" in item &&
			item.featured;

		const cardContent = (() => {
			if (isBlogPost(item)) {
				return isFeatured ? (
					<FeaturedBlogCard post={item} priority={index < 3} />
				) : (
					<BlogCard post={item} priority={index < 3} />
				);
			}
			if (isCaseStudy(item)) {
				return isFeatured ? (
					<FeaturedCaseStudyCard study={item} priority={index < 3} />
				) : (
					<CaseStudyCard study={item} priority={index < 3} />
				);
			}
			if (isService(item)) {
				return <ServiceCard service={item} />;
			}
			return null;
		})();

		return (
			<div key={item.id} className={isFeatured ? "col-span-full" : ""}>
				{cardContent}
			</div>
		);
	};
}

// =============================================================================
// Main Component
// =============================================================================

export async function ContentFetcher({
	contentType,
	itemsPerRow = "3",
	limit = 6,
	sortBy = "newest",
	featuredOnly = false,
	showFilters = false,
	showSearch = false,
	paginationStyle = "none",
	searchParams = {},
	paddingTopOption,
	paddingBottomOption,
	background,
}: ContentFetcherProps) {
	try {
		const payload = await getPayload({ config });
		const page = Number.parseInt(searchParams.page || "1", 10);
		const itemsPerPage = limit || 6;

		// Fetch filter options and content in parallel
		const [filterOptions, contentResult] = await Promise.all([
			getFilterOptions(payload, contentType),
			fetchContent(payload, {
				contentType,
				page,
				limit: itemsPerPage,
				sortBy: sortBy || "newest",
				searchParams,
				featuredOnly: featuredOnly || false,
				paginationStyle: paginationStyle || "none",
			}),
		]);

		const { categoryOptions, tagOptions } = filterOptions;
		const { items, totalPages, totalDocs } = contentResult;

		// Sort items to ensure featured content comes first to prevent grid layout issues
		const sortedItems = [...items].sort((a, b) => {
			const aFeatured =
				(isBlogPost(a) || isCaseStudy(a)) && "featured" in a && !!a.featured;
			const bFeatured =
				(isBlogPost(b) || isCaseStudy(b)) && "featured" in b && !!b.featured;

			if (aFeatured && !bFeatured) return -1;
			if (!aFeatured && bFeatured) return 1;
			return 0;
		});

		return (
			<SectionWrapper
				className={cn(contentType !== "services" && "bg-muted/30")}
				paddingTop={paddingTopOption as PaddingOption}
				paddingBottom={paddingBottomOption as PaddingOption}
				background={background}
			>
				<div className="container mx-auto px-6">
					<FilterSection
						categoryOptions={categoryOptions}
						tagOptions={tagOptions}
						showSearch={showSearch || false}
						showFilters={showFilters || false}
					/>

					<ContentGrid
						items={sortedItems}
						contentType={contentType}
						itemsPerRow={itemsPerRow}
						renderCard={createCardRenderer(contentType)}
					/>

					{paginationStyle === "numbered" && (
						<PaginationNumbered totalPages={totalPages} />
					)}
					{paginationStyle === "loadMore" && (
						<LoadMoreButton totalPages={totalPages} totalItems={totalDocs} />
					)}
					{paginationStyle === "infiniteScroll" && (
						<InfiniteScroll totalPages={totalPages} totalItems={totalDocs} />
					)}
				</div>
			</SectionWrapper>
		);
	} catch (error) {
		console.error("ContentFetcher error:", error);
		return <ContentFetcherError />;
	}
}
