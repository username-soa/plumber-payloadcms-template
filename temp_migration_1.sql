-- Manual Migration Script
-- Consolidates unapplied migrations.

-- ======================================================================================
-- Migration: 20260204_135744_add_tag_slug_and_applied_to (Base Schema)
-- WARNING: This contains the base schema. If your tables (users, pages, etc.) already exist,
-- that part is likely already applied.
-- ======================================================================================

CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published');
CREATE TYPE "public"."enum__blog_posts_v_version_status" AS ENUM('draft', 'published');
CREATE TYPE "public"."enum_case_studies_status" AS ENUM('draft', 'published');
CREATE TYPE "public"."enum__case_studies_v_version_status" AS ENUM('draft', 'published');
CREATE TYPE "public"."enum_tags_applies_to" AS ENUM('blogs', 'case-studies');
CREATE TYPE "public"."enum_services_hero_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum_services_hero_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
CREATE TYPE "public"."enum_services_hero_type" AS ENUM('default', 'highImpact', 'servicesHero', 'minimal', 'none');
CREATE TYPE "public"."enum_services_hero_badge_variant" AS ENUM('default', 'secondary', 'destructive', 'outline');
CREATE TYPE "public"."enum_services_hero_badge_size" AS ENUM('sm', 'default', 'lg');
CREATE TYPE "public"."enum_services_hero_hero_theme" AS ENUM('muted', 'primary-gradient');
CREATE TYPE "public"."enum_reviews_platform" AS ENUM('google', 'facebook', 'yelp', 'website', 'other');
CREATE TYPE "public"."enum_pages_blocks_faq_cta_cta_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum_pages_blocks_faq_cta_cta_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
CREATE TYPE "public"."enum_pages_blocks_reviews_section_source" AS ENUM('manual', 'collection');
CREATE TYPE "public"."enum_pages_blocks_trust_stats_cols" AS ENUM('3', '4', '6');
CREATE TYPE "public"."enum_pages_blocks_trust_stats_background_color" AS ENUM('transparent', 'muted');
CREATE TYPE "public"."enum_pages_blocks_content_fetcher_content_type" AS ENUM('blogs', 'case-studies', 'services');
CREATE TYPE "public"."enum_pages_blocks_content_fetcher_items_per_row" AS ENUM('1', '2', '3', '4');
CREATE TYPE "public"."enum_pages_blocks_content_fetcher_sort_by" AS ENUM('newest', 'oldest', 'titleAsc', 'titleDesc');
CREATE TYPE "public"."enum_pages_blocks_content_fetcher_pagination_style" AS ENUM('none', 'numbered', 'loadMore', 'infiniteScroll');
CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum_pages_hero_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('default', 'highImpact', 'servicesHero', 'minimal', 'none');
CREATE TYPE "public"."enum_pages_hero_badge_variant" AS ENUM('default', 'secondary', 'destructive', 'outline');
CREATE TYPE "public"."enum_pages_hero_badge_size" AS ENUM('sm', 'default', 'lg');
CREATE TYPE "public"."enum_pages_hero_hero_theme" AS ENUM('muted', 'primary-gradient');
CREATE TYPE "public"."enum__pages_v_blocks_faq_cta_cta_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum__pages_v_blocks_faq_cta_cta_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
CREATE TYPE "public"."enum__pages_v_blocks_reviews_section_source" AS ENUM('manual', 'collection');
CREATE TYPE "public"."enum__pages_v_blocks_trust_stats_cols" AS ENUM('3', '4', '6');
CREATE TYPE "public"."enum__pages_v_blocks_trust_stats_background_color" AS ENUM('transparent', 'muted');
CREATE TYPE "public"."enum__pages_v_blocks_content_fetcher_content_type" AS ENUM('blogs', 'case-studies', 'services');
CREATE TYPE "public"."enum__pages_v_blocks_content_fetcher_items_per_row" AS ENUM('1', '2', '3', '4');
CREATE TYPE "public"."enum__pages_v_blocks_content_fetcher_sort_by" AS ENUM('newest', 'oldest', 'titleAsc', 'titleDesc');
CREATE TYPE "public"."enum__pages_v_blocks_content_fetcher_pagination_style" AS ENUM('none', 'numbered', 'loadMore', 'infiniteScroll');
CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum__pages_v_version_hero_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('default', 'highImpact', 'servicesHero', 'minimal', 'none');
CREATE TYPE "public"."enum__pages_v_version_hero_badge_variant" AS ENUM('default', 'secondary', 'destructive', 'outline');
CREATE TYPE "public"."enum__pages_v_version_hero_badge_size" AS ENUM('sm', 'default', 'lg');
CREATE TYPE "public"."enum__pages_v_version_hero_hero_theme" AS ENUM('muted', 'primary-gradient');
CREATE TYPE "public"."enum_categories_applies_to" AS ENUM('blogs', 'case-studies');
CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum_header_nav_items_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
CREATE TYPE "public"."enum_footer_cta_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum_footer_cta_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
CREATE TYPE "public"."enum_footer_nav_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum_footer_nav_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
CREATE TYPE "public"."enum_footer_bottom_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum_footer_bottom_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
CREATE TYPE "public"."enum_company_info_socials_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'twitter', 'youtube');
CREATE TYPE "public"."enum_company_info_seo_service_areas_type" AS ENUM('Suburb', 'City', 'Region');
CREATE TYPE "public"."enum_company_info_seo_business_type" AS ENUM('Plumber', 'LocalBusiness', 'HomeAndConstructionBusiness');
CREATE TYPE "public"."enum_company_info_seo_reviews_source" AS ENUM('hardcoded', 'google-api');

CREATE TABLE "users_sessions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone,
	"expires_at" timestamp(3) with time zone NOT NULL
);

CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric DEFAULT 0,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar NOT NULL,
	"caption" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_card_url" varchar,
	"sizes_card_width" numeric,
	"sizes_card_height" numeric,
	"sizes_card_mime_type" varchar,
	"sizes_card_filesize" numeric,
	"sizes_card_filename" varchar,
	"sizes_tablet_url" varchar,
	"sizes_tablet_width" numeric,
	"sizes_tablet_height" numeric,
	"sizes_tablet_mime_type" varchar,
	"sizes_tablet_filesize" numeric,
	"sizes_tablet_filename" varchar
);

CREATE TABLE "authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"bio" varchar,
	"email" varchar,
	"avatar_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"quote" varchar NOT NULL,
	"author" varchar NOT NULL,
	"role" varchar,
	"company" varchar,
	"rating" numeric DEFAULT 5 NOT NULL,
	"avatar_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"category_id" integer,
	"featured_image_id" integer,
	"featured" boolean DEFAULT false,
	"summary" varchar,
	"content" jsonb,
	"slug" varchar,
	"status" "enum_blog_posts_status" DEFAULT 'draft',
	"published_at" timestamp(3) with time zone,
	"author_id" integer,
	"meta_title" varchar,
	"meta_description" varchar,
	"meta_image_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_blog_posts_status" DEFAULT 'draft'
);

CREATE TABLE "blog_posts_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"tags_id" integer
);

CREATE TABLE "_blog_posts_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar,
	"version_category_id" integer,
	"version_featured_image_id" integer,
	"version_featured" boolean DEFAULT false,
	"version_summary" varchar,
	"version_content" jsonb,
	"version_slug" varchar,
	"version_status" "enum__blog_posts_v_version_status" DEFAULT 'draft',
	"version_published_at" timestamp(3) with time zone,
	"version_author_id" integer,
	"version_meta_title" varchar,
	"version_meta_description" varchar,
	"version_meta_image_id" integer,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__blog_posts_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE "_blog_posts_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"tags_id" integer
);

CREATE TABLE "case_studies" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"summary" varchar,
	"client" varchar,
	"location" varchar,
	"category_id" integer,
	"related_service_id" integer,
	"budget" varchar,
	"duration" varchar,
	"completed_at" timestamp(3) with time zone,
	"featured" boolean DEFAULT false,
	"featured_image_id" integer,
	"testimonial_id" integer,
	"content" jsonb,
	"slug" varchar,
	"meta_title" varchar,
	"meta_description" varchar,
	"meta_image_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_case_studies_status" DEFAULT 'draft'
);

CREATE TABLE "case_studies_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"tags_id" integer
);

CREATE TABLE "_case_studies_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar,
	"version_summary" varchar,
	"version_client" varchar,
	"version_location" varchar,
	"version_category_id" integer,
	"version_related_service_id" integer,
	"version_budget" varchar,
	"version_duration" varchar,
	"version_completed_at" timestamp(3) with time zone,
	"version_featured" boolean DEFAULT false,
	"version_featured_image_id" integer,
	"version_testimonial_id" integer,
	"version_content" jsonb,
	"version_slug" varchar,
	"version_meta_title" varchar,
	"version_meta_description" varchar,
	"version_meta_image_id" integer,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__case_studies_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE "_case_studies_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"tags_id" integer
);

CREATE TABLE "tags_applies_to" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_tags_applies_to",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "services_hero_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_services_hero_links_link_type" DEFAULT 'reference',
	"link_label" varchar,
	"link_url" varchar,
	"link_new_tab" boolean,
	"link_email" varchar,
	"link_phone_number" varchar,
	"link_style" "enum_services_hero_links_link_style" DEFAULT 'primary'
);
