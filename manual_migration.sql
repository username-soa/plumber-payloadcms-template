-- Manual Migration Script
-- Consolidates unapplied migrations.

-- ======================================================================================
-- Migration: 20260204_135744_add_tag_slug_and_applied_to (Base Schema)
-- WARNING: This contains the base schema. If your tables (users, pages, etc.) already exist,
-- that part is likely already applied.
-- ======================================================================================

DO $$ BEGIN
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__blog_posts_v_version_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_case_studies_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__case_studies_v_version_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_tags_applies_to" AS ENUM('blogs', 'case-studies');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_services_hero_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_services_hero_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_services_hero_type" AS ENUM('default', 'highImpact', 'servicesHero', 'minimal', 'none');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_services_hero_badge_variant" AS ENUM('default', 'secondary', 'destructive', 'outline');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_services_hero_badge_size" AS ENUM('sm', 'default', 'lg');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_services_hero_hero_theme" AS ENUM('muted', 'primary-gradient');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_reviews_platform" AS ENUM('google', 'facebook', 'yelp', 'website', 'other');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_faq_cta_cta_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_faq_cta_cta_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_reviews_section_source" AS ENUM('manual', 'collection');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_trust_stats_cols" AS ENUM('3', '4', '6');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_trust_stats_background_color" AS ENUM('transparent', 'muted');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_content_fetcher_content_type" AS ENUM('blogs', 'case-studies', 'services');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_content_fetcher_items_per_row" AS ENUM('1', '2', '3', '4');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_content_fetcher_sort_by" AS ENUM('newest', 'oldest', 'titleAsc', 'titleDesc');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_content_fetcher_pagination_style" AS ENUM('none', 'numbered', 'loadMore', 'infiniteScroll');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_hero_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('default', 'highImpact', 'servicesHero', 'minimal', 'none');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_hero_badge_variant" AS ENUM('default', 'secondary', 'destructive', 'outline');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_hero_badge_size" AS ENUM('sm', 'default', 'lg');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_hero_hero_theme" AS ENUM('muted', 'primary-gradient');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_faq_cta_cta_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_faq_cta_cta_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_reviews_section_source" AS ENUM('manual', 'collection');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_trust_stats_cols" AS ENUM('3', '4', '6');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_trust_stats_background_color" AS ENUM('transparent', 'muted');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_content_fetcher_content_type" AS ENUM('blogs', 'case-studies', 'services');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_content_fetcher_items_per_row" AS ENUM('1', '2', '3', '4');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_content_fetcher_sort_by" AS ENUM('newest', 'oldest', 'titleAsc', 'titleDesc');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_content_fetcher_pagination_style" AS ENUM('none', 'numbered', 'loadMore', 'infiniteScroll');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('default', 'highImpact', 'servicesHero', 'minimal', 'none');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_version_hero_badge_variant" AS ENUM('default', 'secondary', 'destructive', 'outline');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_version_hero_badge_size" AS ENUM('sm', 'default', 'lg');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_version_hero_hero_theme" AS ENUM('muted', 'primary-gradient');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_categories_applies_to" AS ENUM('blogs', 'case-studies');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_header_nav_items_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_footer_cta_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_footer_cta_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_footer_nav_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_footer_nav_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_footer_bottom_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_footer_bottom_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_company_info_socials_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'twitter', 'youtube');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_company_info_seo_service_areas_type" AS ENUM('Suburb', 'City', 'Region');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_company_info_seo_business_type" AS ENUM('Plumber', 'LocalBusiness', 'HomeAndConstructionBusiness');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_company_info_seo_reviews_source" AS ENUM('hardcoded', 'google-api');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users_sessions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone,
	"expires_at" timestamp(3) with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
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

CREATE TABLE IF NOT EXISTS "media" (
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

CREATE TABLE IF NOT EXISTS "authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"bio" varchar,
	"email" varchar,
	"avatar_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "testimonials" (
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

CREATE TABLE IF NOT EXISTS "blog_posts" (
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

CREATE TABLE IF NOT EXISTS "blog_posts_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"tags_id" integer
);

CREATE TABLE IF NOT EXISTS "_blog_posts_v" (
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

CREATE TABLE IF NOT EXISTS "_blog_posts_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"tags_id" integer
);

CREATE TABLE IF NOT EXISTS "case_studies" (
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

CREATE TABLE IF NOT EXISTS "case_studies_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"tags_id" integer
);

CREATE TABLE IF NOT EXISTS "_case_studies_v" (
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

CREATE TABLE IF NOT EXISTS "_case_studies_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"tags_id" integer
);

CREATE TABLE IF NOT EXISTS "tags_applies_to" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_tags_applies_to",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "services_hero_links" (
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
CREATE TABLE IF NOT EXISTS "services_hero_trust_indicators" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" varchar NOT NULL,
	"icon" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "services_process" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "services_faqs" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"question" varchar NOT NULL,
	"answer" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" varchar NOT NULL,
	"hero_type" "enum_services_hero_type" DEFAULT 'default',
	"hero_title" varchar,
	"hero_title_highlight" varchar,
	"hero_description" varchar,
	"hero_floating_text" varchar,
	"hero_badge_content" varchar,
	"hero_badge_variant" "enum_services_hero_badge_variant" DEFAULT 'default',
	"hero_badge_size" "enum_services_hero_badge_size" DEFAULT 'default',
	"hero_badge_icon" varchar,
	"hero_bg_image_id" integer,
	"hero_fg_image_id" integer,
	"hero_hero_theme" "enum_services_hero_hero_theme" DEFAULT 'muted',
	"hero_show_date" boolean,
	"image_id" integer NOT NULL,
	"parent_service_id" integer,
	"meta_title" varchar,
	"meta_description" varchar,
	"meta_image_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "services_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer,
	"services_id" integer
);

CREATE TABLE IF NOT EXISTS "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" varchar NOT NULL,
	"rating" numeric NOT NULL,
	"content" varchar NOT NULL,
	"date" timestamp(3) with time zone NOT NULL,
	"avatar_id" integer,
	"platform" "enum_reviews_platform" DEFAULT 'google',
	"link" varchar,
	"verified" boolean DEFAULT true,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "pages_blocks_legal_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"content" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_legal_contact" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"address" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_back_link" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"url" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_faq" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar,
	"cta_show_cta" boolean DEFAULT true,
	"cta_headline" varchar DEFAULT 'Still Have Questions?',
	"cta_text" varchar DEFAULT 'Can''t find the answer you''re looking for? Our team is here to help!',
	"cta_cta_link_type" "enum_pages_blocks_faq_cta_cta_link_type" DEFAULT 'reference',
	"cta_cta_link_label" varchar,
	"cta_cta_link_url" varchar,
	"cta_cta_link_new_tab" boolean,
	"cta_cta_link_email" varchar,
	"cta_cta_link_phone_number" varchar,
	"cta_cta_link_style" "enum_pages_blocks_faq_cta_cta_link_style" DEFAULT 'primary',
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_reviews_section_manual_reviews" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"author" varchar,
	"rating" numeric DEFAULT 5,
	"content" varchar,
	"date" timestamp(3) with time zone,
	"platform" "enum_reviews_platform" DEFAULT 'google',
	"link" varchar,
	"verified" boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS "pages_blocks_reviews_section" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar,
	"source" "enum_pages_blocks_reviews_section_source" DEFAULT 'collection',
	"limit" numeric DEFAULT 3,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_certifications_certifications" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" varchar,
	"icon" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_certifications" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"subtitle" varchar DEFAULT 'Credentials',
	"title" varchar DEFAULT 'Fully Licensed, ',
	"title_highlight" varchar DEFAULT 'Bonded & Insured',
	"description" varchar DEFAULT 'Your peace of mind is our priority. We meet and exceed all state and local requirements for plumbing contractors.',
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_team" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_trust_stats_stats" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar,
	"label" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_trust_stats" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"title_highlight" varchar,
	"bottom_text" varchar,
	"cols" "enum_pages_blocks_trust_stats_cols" DEFAULT '4',
	"background_color" "enum_pages_blocks_trust_stats_background_color" DEFAULT 'transparent',
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_timeline_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"date" varchar,
	"description" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_timeline" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_content_fetcher" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar DEFAULT 'Latest Posts',
	"title_highlight" varchar,
	"description" varchar,
	"content_type" "enum_pages_blocks_content_fetcher_content_type" DEFAULT 'blogs',
	"limit" numeric DEFAULT 6,
	"items_per_row" "enum_pages_blocks_content_fetcher_items_per_row" DEFAULT '3',
	"sort_by" "enum_pages_blocks_content_fetcher_sort_by" DEFAULT 'newest',
	"featured_only" boolean DEFAULT false,
	"show_filters" boolean DEFAULT false,
	"show_search" boolean DEFAULT false,
	"pagination_style" "enum_pages_blocks_content_fetcher_pagination_style" DEFAULT 'none',
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_hero_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
	"link_label" varchar,
	"link_url" varchar,
	"link_new_tab" boolean,
	"link_email" varchar,
	"link_phone_number" varchar,
	"link_style" "enum_pages_hero_links_link_style" DEFAULT 'primary'
);

CREATE TABLE IF NOT EXISTS "pages_hero_trust_indicators" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" varchar,
	"title" varchar,
	"description" varchar
);

CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "enum_pages_status" DEFAULT 'draft',
	"hero_type" "enum_pages_hero_type" DEFAULT 'default',
	"hero_title" varchar,
	"hero_title_highlight" varchar,
	"hero_description" varchar,
	"hero_floating_text" varchar,
	"hero_badge_content" varchar,
	"hero_badge_variant" "enum_pages_hero_badge_variant" DEFAULT 'default',
	"hero_badge_size" "enum_pages_hero_badge_size" DEFAULT 'default',
	"hero_badge_icon" varchar,
	"hero_bg_image_id" integer,
	"hero_fg_image_id" integer,
	"hero_hero_theme" "enum_pages_hero_hero_theme" DEFAULT 'muted',
	"hero_show_date" boolean,
	"meta_title" varchar,
	"meta_description" varchar,
	"meta_image_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_pages_status" DEFAULT 'draft'
);

CREATE TABLE IF NOT EXISTS "pages_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"faqs_id" integer,
	"pages_id" integer,
	"services_id" integer,
	"reviews_id" integer,
	"team_members_id" integer
);
CREATE TABLE IF NOT EXISTS "_pages_v_blocks_legal_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"content" jsonb,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_legal_contact" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar DEFAULT 'Contact Us',
	"description" varchar DEFAULT 'For questions about these Terms or to make a complaint:',
	"email" varchar,
	"phone" varchar,
	"address" varchar,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_back_link" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar DEFAULT 'Back to Home',
	"href" varchar DEFAULT '/',
	"centered" boolean DEFAULT true,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar DEFAULT 'Your Questions, Our Answers',
	"title_highlight" varchar,
	"description" varchar DEFAULT 'Have questions about our plumbing services? We''re here to make everything clear. From booking to pricing, find your answers here.',
	"cta_show_cta" boolean DEFAULT true,
	"cta_headline" varchar DEFAULT 'Still Have Questions?',
	"cta_text" varchar DEFAULT 'Can''t find the answer you''re looking for? Our team is here to help!',
	"cta_cta_link_type" "enum__pages_v_blocks_faq_cta_cta_link_type" DEFAULT 'reference',
	"cta_cta_link_label" varchar,
	"cta_cta_link_url" varchar,
	"cta_cta_link_new_tab" boolean,
	"cta_cta_link_email" varchar,
	"cta_cta_link_phone_number" varchar,
	"cta_cta_link_style" "enum__pages_v_blocks_faq_cta_cta_link_style" DEFAULT 'primary',
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_reviews_section_manual_reviews" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"author" varchar,
	"rating" numeric DEFAULT 5,
	"content" varchar,
	"date" timestamp(3) with time zone,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_reviews_section" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar DEFAULT 'Why People Love Us',
	"subtitle" varchar DEFAULT 'Testimonials',
	"source" "enum__pages_v_blocks_reviews_section_source" DEFAULT 'manual',
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_certifications_certifications" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" varchar,
	"icon" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_certifications" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"subtitle" varchar DEFAULT 'Credentials',
	"title" varchar DEFAULT 'Fully Licensed, ',
	"title_highlight" varchar DEFAULT 'Bonded & Insured',
	"description" varchar DEFAULT 'Your peace of mind is our priority. We meet and exceed all state and local requirements for plumbing contractors.',
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_team" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar DEFAULT 'Meet Your Experts',
	"title_highlight" varchar,
	"description" varchar,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_trust_stats_stats" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"value" varchar,
	"label" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_trust_stats" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"title_highlight" varchar,
	"bottom_text" varchar,
	"cols" "enum__pages_v_blocks_trust_stats_cols" DEFAULT '6',
	"background_color" "enum__pages_v_blocks_trust_stats_background_color" DEFAULT 'transparent',
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_timeline_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"date" varchar,
	"description" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_timeline" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_fetcher" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar DEFAULT 'Latest Posts',
	"title_highlight" varchar,
	"description" varchar,
	"content_type" "enum__pages_v_blocks_content_fetcher_content_type" DEFAULT 'blogs',
	"limit" numeric DEFAULT 6,
	"items_per_row" "enum__pages_v_blocks_content_fetcher_items_per_row" DEFAULT '3',
	"sort_by" "enum__pages_v_blocks_content_fetcher_sort_by" DEFAULT 'newest',
	"featured_only" boolean DEFAULT false,
	"show_filters" boolean DEFAULT false,
	"show_search" boolean DEFAULT false,
	"pagination_style" "enum__pages_v_blocks_content_fetcher_pagination_style" DEFAULT 'none',
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
	"link_label" varchar,
	"link_url" varchar,
	"link_new_tab" boolean,
	"link_email" varchar,
	"link_phone_number" varchar,
	"link_style" "enum__pages_v_version_hero_links_link_style" DEFAULT 'primary',
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_trust_indicators" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"icon" varchar,
	"title" varchar,
	"description" varchar,
	"_uuid" varchar
);
CREATE TABLE IF NOT EXISTS "_pages_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar,
	"version_slug" varchar,
	"version_last_updated" timestamp(3) with time zone,
	"version_status" "enum__pages_v_version_status" DEFAULT 'draft',
	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'default',
	"version_hero_title" varchar,
	"version_hero_title_highlight" varchar,
	"version_hero_description" varchar,
	"version_hero_floating_text" varchar,
	"version_hero_badge_content" varchar,
	"version_hero_badge_variant" "enum__pages_v_version_hero_badge_variant" DEFAULT 'default',
	"version_hero_badge_size" "enum__pages_v_version_hero_badge_size" DEFAULT 'default',
	"version_hero_badge_icon" varchar,
	"version_hero_bg_image_id" integer,
	"version_hero_fg_image_id" integer,
	"version_hero_hero_theme" "enum__pages_v_version_hero_hero_theme" DEFAULT 'muted',
	"version_hero_show_date" boolean,
	"version_meta_title" varchar,
	"version_meta_description" varchar,
	"version_meta_image_id" integer,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"faqs_id" integer,
	"pages_id" integer,
	"services_id" integer,
	"reviews_id" integer,
	"team_members_id" integer
);

CREATE TABLE IF NOT EXISTS "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" varchar NOT NULL,
	"answer" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "team_members_certifications" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"certification" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"role" varchar NOT NULL,
	"image_id" integer NOT NULL,
	"bio" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "categories_applies_to" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_categories_applies_to",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_kv" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar NOT NULL,
	"data" jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"global_slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer,
	"media_id" integer,
	"authors_id" integer,
	"testimonials_id" integer,
	"blog_posts_id" integer,
	"case_studies_id" integer,
	"tags_id" integer,
	"services_id" integer,
	"reviews_id" integer,
	"pages_id" integer,
	"faqs_id" integer,
	"team_members_id" integer,
	"categories_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "header_nav_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
	"link_label" varchar NOT NULL,
	"link_url" varchar,
	"link_new_tab" boolean,
	"link_email" varchar,
	"link_phone_number" varchar,
	"link_style" "enum_header_nav_items_link_style" DEFAULT 'primary'
);

CREATE TABLE IF NOT EXISTS "header" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "header_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer,
	"services_id" integer
);

CREATE TABLE IF NOT EXISTS "footer_cta_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_footer_cta_links_link_type" DEFAULT 'reference',
	"link_label" varchar NOT NULL,
	"link_url" varchar,
	"link_new_tab" boolean,
	"link_email" varchar,
	"link_phone_number" varchar,
	"link_style" "enum_footer_cta_links_link_style" DEFAULT 'primary'
);

CREATE TABLE IF NOT EXISTS "footer_nav_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_footer_nav_links_link_type" DEFAULT 'reference',
	"link_label" varchar NOT NULL,
	"link_url" varchar,
	"link_new_tab" boolean,
	"link_email" varchar,
	"link_phone_number" varchar,
	"link_style" "enum_footer_nav_links_link_style" DEFAULT 'primary'
);

CREATE TABLE IF NOT EXISTS "footer_bottom_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_footer_bottom_links_link_type" DEFAULT 'reference',
	"link_label" varchar NOT NULL,
	"link_url" varchar,
	"link_new_tab" boolean,
	"link_email" varchar,
	"link_phone_number" varchar,
	"link_style" "enum_footer_bottom_links_link_style" DEFAULT 'primary'
);

CREATE TABLE IF NOT EXISTS "footer" (
	"id" serial PRIMARY KEY NOT NULL,
	"cta_headline" varchar NOT NULL,
	"cta_subheadline" varchar NOT NULL,
	"copyright_text" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "footer_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer,
	"services_id" integer
);

CREATE TABLE IF NOT EXISTS "company_info_socials" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"platform" "enum_company_info_socials_platform" NOT NULL,
	"label" varchar NOT NULL,
	"href" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "company_info_working_hours" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"day" varchar NOT NULL,
	"time" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "company_info_seo_service_areas" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"type" "enum_company_info_seo_service_areas_type" DEFAULT 'Suburb' NOT NULL
);

CREATE TABLE IF NOT EXISTS "company_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"brand_name" varchar DEFAULT 'FlowMasters' NOT NULL,
	"brand_description" varchar NOT NULL,
	"brand_logo_id" integer NOT NULL,
	"phone" varchar NOT NULL,
	"email" varchar NOT NULL,
	"address" varchar NOT NULL,
	"seo_business_type" "enum_company_info_seo_business_type" DEFAULT 'Plumber' NOT NULL,
	"seo_founding_date" timestamp(3) with time zone,
	"seo_phone_display" varchar NOT NULL,
	"seo_location_street_address" varchar NOT NULL,
	"seo_location_city" varchar NOT NULL,
	"seo_location_state" varchar NOT NULL,
	"seo_location_state_code" varchar NOT NULL,
	"seo_location_postal_code" varchar NOT NULL,
	"seo_location_country" varchar NOT NULL,
	"seo_location_country_code" varchar NOT NULL,
	"seo_location_latitude" varchar NOT NULL,
	"seo_location_longitude" varchar NOT NULL,
	"seo_emergency_service_id" integer,
	"seo_reviews_source" "enum_company_info_seo_reviews_source" DEFAULT 'hardcoded' NOT NULL,
	"seo_reviews_rating_value" numeric DEFAULT 5 NOT NULL,
	"seo_reviews_review_count" numeric DEFAULT 0 NOT NULL,
	"seo_reviews_best_rating" numeric DEFAULT 5,
	"seo_reviews_worst_rating" numeric DEFAULT 1,
	"seo_reviews_maps_url" varchar,
	"seo_reviews_place_id" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "company_info_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"services_id" integer,
	"reviews_id" integer
);
DO $$ BEGIN
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "authors" ADD CONSTRAINT "authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_related_service_id_services_id_fk" FOREIGN KEY ("related_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_parent_id_case_studies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_related_service_id_services_id_fk" FOREIGN KEY ("version_related_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_testimonial_id_testimonials_id_fk" FOREIGN KEY ("version_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "tags_applies_to" ADD CONSTRAINT "tags_applies_to_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "services_hero_links" ADD CONSTRAINT "services_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "services_hero_trust_indicators" ADD CONSTRAINT "services_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "services_process" ADD CONSTRAINT "services_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "services_faqs" ADD CONSTRAINT "services_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_bg_image_id_media_id_fk" FOREIGN KEY ("hero_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_fg_image_id_media_id_fk" FOREIGN KEY ("hero_fg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "services" ADD CONSTRAINT "services_parent_service_id_services_id_fk" FOREIGN KEY ("parent_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_legal_content" ADD CONSTRAINT "pages_blocks_legal_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_legal_contact" ADD CONSTRAINT "pages_blocks_legal_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_back_link" ADD CONSTRAINT "pages_blocks_back_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_reviews_section_manual_reviews" ADD CONSTRAINT "pages_blocks_reviews_section_manual_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reviews_section"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_reviews_section" ADD CONSTRAINT "pages_blocks_reviews_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_certifications_certifications" ADD CONSTRAINT "pages_blocks_certifications_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_certifications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_certifications" ADD CONSTRAINT "pages_blocks_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_trust_stats_stats" ADD CONSTRAINT "pages_blocks_trust_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_stats"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_trust_stats" ADD CONSTRAINT "pages_blocks_trust_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_timeline_items" ADD CONSTRAINT "pages_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_content_fetcher" ADD CONSTRAINT "pages_blocks_content_fetcher_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_hero_trust_indicators" ADD CONSTRAINT "pages_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_bg_image_id_media_id_fk" FOREIGN KEY ("hero_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_fg_image_id_media_id_fk" FOREIGN KEY ("hero_fg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_legal_content" ADD CONSTRAINT "_pages_v_blocks_legal_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_legal_contact" ADD CONSTRAINT "_pages_v_blocks_legal_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_back_link" ADD CONSTRAINT "_pages_v_blocks_back_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_reviews_section_manual_reviews" ADD CONSTRAINT "_pages_v_blocks_reviews_section_manual_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reviews_section"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_reviews_section" ADD CONSTRAINT "_pages_v_blocks_reviews_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_certifications_certifications" ADD CONSTRAINT "_pages_v_blocks_certifications_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_certifications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_certifications" ADD CONSTRAINT "_pages_v_blocks_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_trust_stats_stats" ADD CONSTRAINT "_pages_v_blocks_trust_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_stats"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_trust_stats" ADD CONSTRAINT "_pages_v_blocks_trust_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_timeline_items" ADD CONSTRAINT "_pages_v_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_content_fetcher" ADD CONSTRAINT "_pages_v_blocks_content_fetcher_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_version_hero_trust_indicators" ADD CONSTRAINT "_pages_v_version_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_bg_image_id_media_id_fk" FOREIGN KEY ("version_hero_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_fg_image_id_media_id_fk" FOREIGN KEY ("version_hero_fg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "team_members_certifications" ADD CONSTRAINT "team_members_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "categories_applies_to" ADD CONSTRAINT "categories_applies_to_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "footer_cta_links" ADD CONSTRAINT "footer_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "footer_nav_links" ADD CONSTRAINT "footer_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "company_info_socials" ADD CONSTRAINT "company_info_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "company_info_working_hours" ADD CONSTRAINT "company_info_working_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "company_info_seo_service_areas" ADD CONSTRAINT "company_info_seo_service_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "company_info" ADD CONSTRAINT "company_info_brand_logo_id_media_id_fk" FOREIGN KEY ("brand_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "company_info" ADD CONSTRAINT "company_info_seo_emergency_service_id_services_id_fk" FOREIGN KEY ("seo_emergency_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "company_info_rels" ADD CONSTRAINT "company_info_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "company_info_rels" ADD CONSTRAINT "company_info_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "company_info_rels" ADD CONSTRAINT "company_info_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
CREATE INDEX IF NOT EXISTS "authors_avatar_idx" ON "authors" USING btree ("avatar_id");
CREATE INDEX IF NOT EXISTS "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "authors_created_at_idx" ON "authors" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
CREATE INDEX IF NOT EXISTS "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "blog_posts_category_idx" ON "blog_posts" USING btree ("category_id");
CREATE INDEX IF NOT EXISTS "blog_posts_featured_image_idx" ON "blog_posts" USING btree ("featured_image_id");
CREATE INDEX IF NOT EXISTS "blog_posts_author_idx" ON "blog_posts" USING btree ("author_id");
CREATE INDEX IF NOT EXISTS "blog_posts_meta_meta_image_idx" ON "blog_posts" USING btree ("meta_image_id");
CREATE INDEX IF NOT EXISTS "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "blog_posts__status_idx" ON "blog_posts" USING btree ("_status");
CREATE INDEX IF NOT EXISTS "blog_posts_rels_order_idx" ON "blog_posts_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "blog_posts_rels_parent_idx" ON "blog_posts_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_rels_path_idx" ON "blog_posts_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "blog_posts_rels_tags_id_idx" ON "blog_posts_rels" USING btree ("tags_id");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_parent_idx" ON "_blog_posts_v" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version_category_idx" ON "_blog_posts_v" USING btree ("version_category_id");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version_featured_image_idx" ON "_blog_posts_v" USING btree ("version_featured_image_id");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version_author_idx" ON "_blog_posts_v" USING btree ("version_author_id");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_meta_version_meta_image_idx" ON "_blog_posts_v" USING btree ("version_meta_image_id");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version_updated_at_idx" ON "_blog_posts_v" USING btree ("version_updated_at");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version_created_at_idx" ON "_blog_posts_v" USING btree ("version_created_at");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version__status_idx" ON "_blog_posts_v" USING btree ("version__status");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_created_at_idx" ON "_blog_posts_v" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_updated_at_idx" ON "_blog_posts_v" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_latest_idx" ON "_blog_posts_v" USING btree ("latest");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_order_idx" ON "_blog_posts_v_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_parent_idx" ON "_blog_posts_v_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_path_idx" ON "_blog_posts_v_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_tags_id_idx" ON "_blog_posts_v_rels" USING btree ("tags_id");
CREATE INDEX IF NOT EXISTS "case_studies_category_idx" ON "case_studies" USING btree ("category_id");
CREATE INDEX IF NOT EXISTS "case_studies_related_service_idx" ON "case_studies" USING btree ("related_service_id");
CREATE INDEX IF NOT EXISTS "case_studies_featured_image_idx" ON "case_studies" USING btree ("featured_image_id");
CREATE INDEX IF NOT EXISTS "case_studies_testimonial_idx" ON "case_studies" USING btree ("testimonial_id");
CREATE INDEX IF NOT EXISTS "case_studies_meta_meta_image_idx" ON "case_studies" USING btree ("meta_image_id");
CREATE INDEX IF NOT EXISTS "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "case_studies__status_idx" ON "case_studies" USING btree ("_status");
CREATE INDEX IF NOT EXISTS "case_studies_rels_order_idx" ON "case_studies_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "case_studies_rels_parent_idx" ON "case_studies_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "case_studies_rels_path_idx" ON "case_studies_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "case_studies_rels_tags_id_idx" ON "case_studies_rels" USING btree ("tags_id");
CREATE INDEX IF NOT EXISTS "_case_studies_v_parent_idx" ON "_case_studies_v" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_category_idx" ON "_case_studies_v" USING btree ("version_category_id");
CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_related_service_idx" ON "_case_studies_v" USING btree ("version_related_service_id");
CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_featured_image_idx" ON "_case_studies_v" USING btree ("version_featured_image_id");
CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_testimonial_idx" ON "_case_studies_v" USING btree ("version_testimonial_id");
CREATE INDEX IF NOT EXISTS "_case_studies_v_version_meta_version_meta_image_idx" ON "_case_studies_v" USING btree ("version_meta_image_id");
CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_updated_at_idx" ON "_case_studies_v" USING btree ("version_updated_at");
CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_created_at_idx" ON "_case_studies_v" USING btree ("version_created_at");
CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version__status_idx" ON "_case_studies_v" USING btree ("version__status");
CREATE INDEX IF NOT EXISTS "_case_studies_v_created_at_idx" ON "_case_studies_v" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "_case_studies_v_updated_at_idx" ON "_case_studies_v" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "_case_studies_v_latest_idx" ON "_case_studies_v" USING btree ("latest");
CREATE INDEX IF NOT EXISTS "_case_studies_v_rels_order_idx" ON "_case_studies_v_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "_case_studies_v_rels_parent_idx" ON "_case_studies_v_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "_case_studies_v_rels_path_idx" ON "_case_studies_v_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "_case_studies_v_rels_tags_id_idx" ON "_case_studies_v_rels" USING btree ("tags_id");
CREATE INDEX IF NOT EXISTS "tags_applies_to_order_idx" ON "tags_applies_to" USING btree ("order");
CREATE INDEX IF NOT EXISTS "tags_applies_to_parent_idx" ON "tags_applies_to" USING btree ("parent_id");
CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "tags_created_at_idx" ON "tags" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "services_hero_links_order_idx" ON "services_hero_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "services_hero_links_parent_id_idx" ON "services_hero_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "services_hero_trust_indicators_order_idx" ON "services_hero_trust_indicators" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "services_hero_trust_indicators_parent_id_idx" ON "services_hero_trust_indicators" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "services_process_order_idx" ON "services_process" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "services_process_parent_id_idx" ON "services_process" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "services_faqs_order_idx" ON "services_faqs" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "services_faqs_parent_id_idx" ON "services_faqs" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "services_hero_hero_bg_image_idx" ON "services" USING btree ("hero_bg_image_id");
CREATE INDEX IF NOT EXISTS "services_hero_hero_fg_image_idx" ON "services" USING btree ("hero_fg_image_id");
CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "services_image_idx" ON "services" USING btree ("image_id");
CREATE INDEX IF NOT EXISTS "services_parent_service_idx" ON "services" USING btree ("parent_service_id");
CREATE INDEX IF NOT EXISTS "services_meta_meta_image_idx" ON "services" USING btree ("meta_image_id");
CREATE INDEX IF NOT EXISTS "services_updated_at_idx" ON "services" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "services_created_at_idx" ON "services" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "services_rels_order_idx" ON "services_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "services_rels_path_idx" ON "services_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "services_rels_pages_id_idx" ON "services_rels" USING btree ("pages_id");
CREATE INDEX IF NOT EXISTS "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
CREATE INDEX IF NOT EXISTS "reviews_avatar_idx" ON "reviews" USING btree ("avatar_id");
CREATE INDEX IF NOT EXISTS "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "pages_blocks_legal_content_order_idx" ON "pages_blocks_legal_content" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_legal_content_parent_id_idx" ON "pages_blocks_legal_content" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_legal_content_path_idx" ON "pages_blocks_legal_content" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_legal_contact_order_idx" ON "pages_blocks_legal_contact" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_legal_contact_parent_id_idx" ON "pages_blocks_legal_contact" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_legal_contact_path_idx" ON "pages_blocks_legal_contact" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_back_link_order_idx" ON "pages_blocks_back_link" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_back_link_parent_id_idx" ON "pages_blocks_back_link" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_back_link_path_idx" ON "pages_blocks_back_link" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_reviews_section_manual_reviews_order_idx" ON "pages_blocks_reviews_section_manual_reviews" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_reviews_section_manual_reviews_parent_id_idx" ON "pages_blocks_reviews_section_manual_reviews" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_reviews_section_order_idx" ON "pages_blocks_reviews_section" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_reviews_section_parent_id_idx" ON "pages_blocks_reviews_section" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_reviews_section_path_idx" ON "pages_blocks_reviews_section" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_certifications_certifications_order_idx" ON "pages_blocks_certifications_certifications" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_certifications_certifications_parent_id_idx" ON "pages_blocks_certifications_certifications" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_certifications_order_idx" ON "pages_blocks_certifications" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_certifications_parent_id_idx" ON "pages_blocks_certifications" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_certifications_path_idx" ON "pages_blocks_certifications" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_trust_stats_stats_order_idx" ON "pages_blocks_trust_stats_stats" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_trust_stats_stats_parent_id_idx" ON "pages_blocks_trust_stats_stats" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_trust_stats_order_idx" ON "pages_blocks_trust_stats" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_trust_stats_parent_id_idx" ON "pages_blocks_trust_stats" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_trust_stats_path_idx" ON "pages_blocks_trust_stats" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_timeline_items_order_idx" ON "pages_blocks_timeline_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_timeline_items_parent_id_idx" ON "pages_blocks_timeline_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_content_fetcher_order_idx" ON "pages_blocks_content_fetcher" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_content_fetcher_parent_id_idx" ON "pages_blocks_content_fetcher" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_content_fetcher_path_idx" ON "pages_blocks_content_fetcher" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_hero_trust_indicators_order_idx" ON "pages_hero_trust_indicators" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_hero_trust_indicators_parent_id_idx" ON "pages_hero_trust_indicators" USING btree ("_parent_id");
CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "pages_hero_hero_bg_image_idx" ON "pages" USING btree ("hero_bg_image_id");
CREATE INDEX IF NOT EXISTS "pages_hero_hero_fg_image_idx" ON "pages" USING btree ("hero_fg_image_id");
CREATE INDEX IF NOT EXISTS "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
CREATE INDEX IF NOT EXISTS "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
CREATE INDEX IF NOT EXISTS "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
CREATE INDEX IF NOT EXISTS "pages_rels_reviews_id_idx" ON "pages_rels" USING btree ("reviews_id");
CREATE INDEX IF NOT EXISTS "pages_rels_team_members_id_idx" ON "pages_rels" USING btree ("team_members_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_legal_content_order_idx" ON "_pages_v_blocks_legal_content" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_legal_content_parent_id_idx" ON "_pages_v_blocks_legal_content" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_legal_content_path_idx" ON "_pages_v_blocks_legal_content" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_legal_contact_order_idx" ON "_pages_v_blocks_legal_contact" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_legal_contact_parent_id_idx" ON "_pages_v_blocks_legal_contact" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_legal_contact_path_idx" ON "_pages_v_blocks_legal_contact" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_back_link_order_idx" ON "_pages_v_blocks_back_link" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_back_link_parent_id_idx" ON "_pages_v_blocks_back_link" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_back_link_path_idx" ON "_pages_v_blocks_back_link" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reviews_section_manual_reviews_order_idx" ON "_pages_v_blocks_reviews_section_manual_reviews" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reviews_section_manual_reviews_parent_id_idx" ON "_pages_v_blocks_reviews_section_manual_reviews" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reviews_section_order_idx" ON "_pages_v_blocks_reviews_section" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reviews_section_parent_id_idx" ON "_pages_v_blocks_reviews_section" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reviews_section_path_idx" ON "_pages_v_blocks_reviews_section" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certifications_certifications_order_idx" ON "_pages_v_blocks_certifications_certifications" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certifications_certifications_parent_id_idx" ON "_pages_v_blocks_certifications_certifications" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certifications_order_idx" ON "_pages_v_blocks_certifications" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certifications_parent_id_idx" ON "_pages_v_blocks_certifications" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certifications_path_idx" ON "_pages_v_blocks_certifications" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_trust_stats_stats_order_idx" ON "_pages_v_blocks_trust_stats_stats" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_trust_stats_stats_parent_id_idx" ON "_pages_v_blocks_trust_stats_stats" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_trust_stats_order_idx" ON "_pages_v_blocks_trust_stats" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_trust_stats_parent_id_idx" ON "_pages_v_blocks_trust_stats" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_trust_stats_path_idx" ON "_pages_v_blocks_trust_stats" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_timeline_items_order_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_timeline_items_parent_id_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_fetcher_order_idx" ON "_pages_v_blocks_content_fetcher" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_fetcher_parent_id_idx" ON "_pages_v_blocks_content_fetcher" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_fetcher_path_idx" ON "_pages_v_blocks_content_fetcher" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_trust_indicators_order_idx" ON "_pages_v_version_hero_trust_indicators" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_trust_indicators_parent_id_idx" ON "_pages_v_version_hero_trust_indicators" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_bg_image_idx" ON "_pages_v" USING btree ("version_hero_bg_image_id");
CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_fg_image_idx" ON "_pages_v" USING btree ("version_hero_fg_image_id");
CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_reviews_id_idx" ON "_pages_v_rels" USING btree ("reviews_id");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_team_members_id_idx" ON "_pages_v_rels" USING btree ("team_members_id");
CREATE INDEX IF NOT EXISTS "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "team_members_certifications_order_idx" ON "team_members_certifications" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "team_members_certifications_parent_id_idx" ON "team_members_certifications" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "team_members_image_idx" ON "team_members" USING btree ("image_id");
CREATE INDEX IF NOT EXISTS "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "categories_applies_to_order_idx" ON "categories_applies_to" USING btree ("order");
CREATE INDEX IF NOT EXISTS "categories_applies_to_parent_idx" ON "categories_applies_to" USING btree ("parent_id");
CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" USING btree ("created_at");
CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "header_rels_order_idx" ON "header_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "header_rels_path_idx" ON "header_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
CREATE INDEX IF NOT EXISTS "header_rels_services_id_idx" ON "header_rels" USING btree ("services_id");
CREATE INDEX IF NOT EXISTS "footer_cta_links_order_idx" ON "footer_cta_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "footer_cta_links_parent_id_idx" ON "footer_cta_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "footer_nav_links_order_idx" ON "footer_nav_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "footer_nav_links_parent_id_idx" ON "footer_nav_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "footer_bottom_links_order_idx" ON "footer_bottom_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "footer_bottom_links_parent_id_idx" ON "footer_bottom_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
CREATE INDEX IF NOT EXISTS "footer_rels_services_id_idx" ON "footer_rels" USING btree ("services_id");
CREATE INDEX IF NOT EXISTS "company_info_socials_order_idx" ON "company_info_socials" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "company_info_socials_parent_id_idx" ON "company_info_socials" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "company_info_working_hours_order_idx" ON "company_info_working_hours" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "company_info_working_hours_parent_id_idx" ON "company_info_working_hours" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "company_info_seo_service_areas_order_idx" ON "company_info_seo_service_areas" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "company_info_seo_service_areas_parent_id_idx" ON "company_info_seo_service_areas" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "company_info_brand_brand_logo_idx" ON "company_info" USING btree ("brand_logo_id");
CREATE INDEX IF NOT EXISTS "company_info_seo_seo_emergency_service_idx" ON "company_info" USING btree ("seo_emergency_service_id");
CREATE INDEX IF NOT EXISTS "company_info_rels_order_idx" ON "company_info_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "company_info_rels_parent_idx" ON "company_info_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "company_info_rels_path_idx" ON "company_info_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "company_info_rels_services_id_idx" ON "company_info_rels" USING btree ("services_id");
CREATE INDEX IF NOT EXISTS "company_info_rels_reviews_id_idx" ON "company_info_rels" USING btree ("reviews_id");
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_numbers_columns') THEN
    CREATE TYPE "public"."enum_pages_blocks_numbers_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_numbers_columns') THEN
    CREATE TYPE "public"."enum__pages_v_blocks_numbers_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  END IF;
END $$;

ALTER TABLE "pages_blocks_numbers" 
ALTER COLUMN "columns" TYPE "public"."enum_pages_blocks_numbers_columns" 
USING "columns"::text::"public"."enum_pages_blocks_numbers_columns";

ALTER TABLE "_pages_v_blocks_numbers" 
ALTER COLUMN "columns" TYPE "public"."enum__pages_v_blocks_numbers_columns" 
USING "columns"::text::"public"."enum__pages_v_blocks_numbers_columns";

ALTER TABLE "pages_blocks_numbers" ALTER COLUMN "columns" SET DEFAULT '3';
ALTER TABLE "_pages_v_blocks_numbers" ALTER COLUMN "columns" SET DEFAULT '3';
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_title_content_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_title_content_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing', 'primary-gradient-dots');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_title_content_text_align" AS ENUM('left', 'center', 'right');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_title_content_buttons_align" AS ENUM('left', 'center', 'right');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_title_content_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_title_content_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_images_grid_text_align" AS ENUM('left', 'center', 'right');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_images_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_images_grid_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_images_grid_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_cards_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_cards_grid_card_layout" AS ENUM('stacked', 'sideBySide');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_cards_grid_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_cards_grid_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_service_areas_block_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_service_areas_block_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_highlighted_services_layout" AS ENUM('grid', 'carousel');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_highlighted_services_cta_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_highlighted_services_cta_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing', 'primary-gradient-dots');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_highlighted_services_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_highlighted_services_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_numbers_text_align" AS ENUM('left', 'center', 'right');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_numbers_text_color" AS ENUM('regular', 'primary');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_numbers_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_numbers_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_numbers_columns" AS ENUM('1', '2', '3', '4', '5', '6');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_dual_column_columns_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_dual_column_columns_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing', 'primary-gradient-dots');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_dual_column_columns_type" AS ENUM('content', 'image');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_dual_column_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_dual_column_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_title_content_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_title_content_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing', 'primary-gradient-dots');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_title_content_text_align" AS ENUM('left', 'center', 'right');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_title_content_buttons_align" AS ENUM('left', 'center', 'right');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_title_content_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_title_content_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_images_grid_text_align" AS ENUM('left', 'center', 'right');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_images_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_images_grid_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_images_grid_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_cards_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_cards_grid_card_layout" AS ENUM('stacked', 'sideBySide');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_cards_grid_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_cards_grid_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_service_areas_block_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_service_areas_block_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_highlighted_services_layout" AS ENUM('grid', 'carousel');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_highlighted_services_cta_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_highlighted_services_cta_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing', 'primary-gradient-dots');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_highlighted_services_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_highlighted_services_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_numbers_text_align" AS ENUM('left', 'center', 'right');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_numbers_text_color" AS ENUM('regular', 'primary');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_numbers_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_numbers_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_numbers_columns" AS ENUM('1', '2', '3', '4', '5', '6');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_dual_column_columns_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_dual_column_columns_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing', 'primary-gradient-dots');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_dual_column_columns_type" AS ENUM('content', 'image');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_dual_column_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_dual_column_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TYPE "public"."enum_services_hero_links_link_style" ADD VALUE 'primary-gradient-dots';
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TYPE "public"."enum_pages_blocks_faq_cta_cta_link_style" ADD VALUE 'primary-gradient-dots';
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TYPE "public"."enum_pages_hero_links_link_style" ADD VALUE 'primary-gradient-dots';
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TYPE "public"."enum__pages_v_blocks_faq_cta_cta_link_style" ADD VALUE 'primary-gradient-dots';
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TYPE "public"."enum__pages_v_version_hero_links_link_style" ADD VALUE 'primary-gradient-dots';
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TYPE "public"."enum_header_nav_items_link_style" ADD VALUE 'primary-gradient-dots';
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TYPE "public"."enum_footer_cta_links_link_style" ADD VALUE 'primary-gradient-dots';
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TYPE "public"."enum_footer_nav_links_link_style" ADD VALUE 'primary-gradient-dots';
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TYPE "public"."enum_footer_bottom_links_link_style" ADD VALUE 'primary-gradient-dots';
EXCEPTION WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "pages_blocks_title_content_links" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_pages_blocks_title_content_links_link_type" DEFAULT 'reference',
	"link_label" varchar,
	"link_url" varchar,
	"link_new_tab" boolean,
	"link_email" varchar,
	"link_phone_number" varchar,
	"link_style" "enum_pages_blocks_title_content_links_link_style" DEFAULT 'primary'
);

CREATE TABLE IF NOT EXISTS "pages_blocks_title_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"tag_title" varchar,
	"main_title" varchar,
	"highlighted_text" varchar,
	"description" varchar,
	"text_align" "enum_pages_blocks_title_content_text_align" DEFAULT 'left',
	"buttons_align" "enum_pages_blocks_title_content_buttons_align" DEFAULT 'left',
	"padding_top_option" "enum_pages_blocks_title_content_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum_pages_blocks_title_content_padding_bottom_option" DEFAULT 'default',
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_images_grid_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"image_id" integer,
	"title" varchar,
	"link" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_images_grid" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text_align" "enum_pages_blocks_images_grid_text_align" DEFAULT 'left',
	"columns" "enum_pages_blocks_images_grid_columns" DEFAULT '3',
	"padding_top_option" "enum_pages_blocks_images_grid_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum_pages_blocks_images_grid_padding_bottom_option" DEFAULT 'default',
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_cards_grid_cards" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" varchar,
	"title" varchar,
	"description" varchar,
	"link" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_cards_grid" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"columns" "enum_pages_blocks_cards_grid_columns" DEFAULT '3',
	"card_layout" "enum_pages_blocks_cards_grid_card_layout" DEFAULT 'stacked',
	"enable_highlight" boolean DEFAULT true,
	"padding_top_option" "enum_pages_blocks_cards_grid_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum_pages_blocks_cards_grid_padding_bottom_option" DEFAULT 'default',
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_service_areas_block_custom_service_areas" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_service_areas_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar DEFAULT 'Service Areas',
	"headline" varchar DEFAULT 'Proudly Serving Your Community',
	"highlighted_headline_text" varchar,
	"description" varchar,
	"use_global_service_areas" boolean DEFAULT true,
	"padding_top_option" "enum_pages_blocks_service_areas_block_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum_pages_blocks_service_areas_block_padding_bottom_option" DEFAULT 'default',
	"bottom_text" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_highlighted_services" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"tag" varchar,
	"title" varchar,
	"highlighted_text" varchar,
	"description" varchar,
	"emergency_service_id" integer,
	"layout" "enum_pages_blocks_highlighted_services_layout" DEFAULT 'grid',
	"cta_type" "enum_pages_blocks_highlighted_services_cta_type" DEFAULT 'reference',
	"cta_label" varchar,
	"cta_url" varchar,
	"cta_new_tab" boolean,
	"cta_email" varchar,
	"cta_phone_number" varchar,
	"cta_style" "enum_pages_blocks_highlighted_services_cta_style" DEFAULT 'primary',
	"link_to_all_services" boolean DEFAULT false,
	"padding_top_option" "enum_pages_blocks_highlighted_services_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum_pages_blocks_highlighted_services_padding_bottom_option" DEFAULT 'default',
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_numbers_number_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar,
	"description" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_numbers" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text_align" "enum_pages_blocks_numbers_text_align" DEFAULT 'left',
	"text_color" "enum_pages_blocks_numbers_text_color" DEFAULT 'regular',
	"padding_top_option" "enum_pages_blocks_numbers_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum_pages_blocks_numbers_padding_bottom_option" DEFAULT 'default',
	"columns" "enum_pages_blocks_numbers_columns" DEFAULT '3',
	"show_separators" boolean DEFAULT true,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_dual_column_columns_links" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_pages_blocks_dual_column_columns_links_link_type" DEFAULT 'reference',
	"link_label" varchar,
	"link_url" varchar,
	"link_new_tab" boolean,
	"link_email" varchar,
	"link_phone_number" varchar,
	"link_style" "enum_pages_blocks_dual_column_columns_links_link_style" DEFAULT 'primary'
);

CREATE TABLE IF NOT EXISTS "pages_blocks_dual_column_columns" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_pages_blocks_dual_column_columns_type" DEFAULT 'content',
	"image_id" integer,
	"rich_text" jsonb
);

CREATE TABLE IF NOT EXISTS "pages_blocks_dual_column" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"padding_top_option" "enum_pages_blocks_dual_column_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum_pages_blocks_dual_column_padding_bottom_option" DEFAULT 'default',
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_form_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"form_id" integer,
	"enable_intro" boolean DEFAULT false,
	"intro_content" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_title_content_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"link_type" "enum__pages_v_blocks_title_content_links_link_type" DEFAULT 'reference',
	"link_label" varchar,
	"link_url" varchar,
	"link_new_tab" boolean,
	"link_email" varchar,
	"link_phone_number" varchar,
	"link_style" "enum__pages_v_blocks_title_content_links_link_style" DEFAULT 'primary',
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_title_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"tag_title" varchar,
	"main_title" varchar,
	"highlighted_text" varchar,
	"description" varchar,
	"text_align" "enum__pages_v_blocks_title_content_text_align" DEFAULT 'left',
	"buttons_align" "enum__pages_v_blocks_title_content_buttons_align" DEFAULT 'left',
	"padding_top_option" "enum__pages_v_blocks_title_content_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum__pages_v_blocks_title_content_padding_bottom_option" DEFAULT 'default',
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_images_grid_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer,
	"title" varchar,
	"link" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_images_grid" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"text_align" "enum__pages_v_blocks_images_grid_text_align" DEFAULT 'left',
	"columns" "enum__pages_v_blocks_images_grid_columns" DEFAULT '3',
	"padding_top_option" "enum__pages_v_blocks_images_grid_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum__pages_v_blocks_images_grid_padding_bottom_option" DEFAULT 'default',
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cards_grid_cards" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"icon" varchar,
	"title" varchar,
	"description" varchar,
	"link" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cards_grid" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"columns" "enum__pages_v_blocks_cards_grid_columns" DEFAULT '3',
	"card_layout" "enum__pages_v_blocks_cards_grid_card_layout" DEFAULT 'stacked',
	"enable_highlight" boolean DEFAULT true,
	"padding_top_option" "enum__pages_v_blocks_cards_grid_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum__pages_v_blocks_cards_grid_padding_bottom_option" DEFAULT 'default',
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_service_areas_block_custom_service_areas" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_service_areas_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar DEFAULT 'Service Areas',
	"headline" varchar DEFAULT 'Proudly Serving Your Community',
	"highlighted_headline_text" varchar,
	"description" varchar,
	"use_global_service_areas" boolean DEFAULT true,
	"padding_top_option" "enum__pages_v_blocks_service_areas_block_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum__pages_v_blocks_service_areas_block_padding_bottom_option" DEFAULT 'default',
	"bottom_text" varchar,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_highlighted_services" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"tag" varchar,
	"title" varchar,
	"highlighted_text" varchar,
	"description" varchar,
	"emergency_service_id" integer,
	"layout" "enum__pages_v_blocks_highlighted_services_layout" DEFAULT 'grid',
	"cta_type" "enum__pages_v_blocks_highlighted_services_cta_type" DEFAULT 'reference',
	"cta_label" varchar,
	"cta_url" varchar,
	"cta_new_tab" boolean,
	"cta_email" varchar,
	"cta_phone_number" varchar,
	"cta_style" "enum__pages_v_blocks_highlighted_services_cta_style" DEFAULT 'primary',
	"link_to_all_services" boolean DEFAULT false,
	"padding_top_option" "enum__pages_v_blocks_highlighted_services_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum__pages_v_blocks_highlighted_services_padding_bottom_option" DEFAULT 'default',
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_numbers_number_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar,
	"description" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_numbers" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"text_align" "enum__pages_v_blocks_numbers_text_align" DEFAULT 'left',
	"text_color" "enum__pages_v_blocks_numbers_text_color" DEFAULT 'regular',
	"padding_top_option" "enum__pages_v_blocks_numbers_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum__pages_v_blocks_numbers_padding_bottom_option" DEFAULT 'default',
	"columns" "enum__pages_v_blocks_numbers_columns" DEFAULT '3',
	"show_separators" boolean DEFAULT true,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_dual_column_columns_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"link_type" "enum__pages_v_blocks_dual_column_columns_links_link_type" DEFAULT 'reference',
	"link_label" varchar,
	"link_url" varchar,
	"link_new_tab" boolean,
	"link_email" varchar,
	"link_phone_number" varchar,
	"link_style" "enum__pages_v_blocks_dual_column_columns_links_link_style" DEFAULT 'primary',
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_dual_column_columns" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"type" "enum__pages_v_blocks_dual_column_columns_type" DEFAULT 'content',
	"image_id" integer,
	"rich_text" jsonb,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_dual_column" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"padding_top_option" "enum__pages_v_blocks_dual_column_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum__pages_v_blocks_dual_column_padding_bottom_option" DEFAULT 'default',
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"form_id" integer,
	"enable_intro" boolean DEFAULT false,
	"intro_content" jsonb,
	"_uuid" varchar,
	"block_name" varchar
);
CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"required" boolean,
	"default_value" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_blocks_country" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"required" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_blocks_email" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"required" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_blocks_message" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"message" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_blocks_number" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" numeric,
	"required" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_blocks_select_options" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "forms_blocks_select" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" varchar,
	"placeholder" varchar,
	"required" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_blocks_state" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"required" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" varchar,
	"required" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_blocks_textarea" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" varchar,
	"required" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_emails" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"email_to" varchar,
	"cc" varchar,
	"bcc" varchar,
	"reply_to" varchar,
	"email_from" varchar,
	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
	"message" jsonb
);

CREATE TABLE IF NOT EXISTS "forms" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"submit_button_label" varchar,
	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
	"confirmation_message" jsonb,
	"redirect_url" varchar,
	"intro_content" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "form_submissions_submission_data" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"field" varchar NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "form_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"form_id" integer NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "services_process" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "services_faqs" DISABLE ROW LEVEL SECURITY;
-- [SAFEGUARD] DROP TABLE "testimonials" CASCADE;
-- [SAFEGUARD] DROP TABLE "services_process" CASCADE;
-- [SAFEGUARD] DROP TABLE "services_faqs" CASCADE;
ALTER TABLE "case_studies" DROP CONSTRAINT "case_studies_testimonial_id_testimonials_id_fk";

ALTER TABLE "_case_studies_v" DROP CONSTRAINT "_case_studies_v_version_testimonial_id_testimonials_id_fk";

ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";

-- [SAFEGUARD] DROP INDEX "case_studies_testimonial_idx";
-- [SAFEGUARD] DROP INDEX "_case_studies_v_version_version_testimonial_idx";
-- [SAFEGUARD] DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
ALTER TABLE "case_studies" ADD COLUMN "review_id" integer;
ALTER TABLE "_case_studies_v" ADD COLUMN "version_review_id" integer;
ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "forms_id" integer;
ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "form_submissions_id" integer;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_title_content_links" ADD CONSTRAINT "pages_blocks_title_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_title_content"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_title_content" ADD CONSTRAINT "pages_blocks_title_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_images_grid_items" ADD CONSTRAINT "pages_blocks_images_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_images_grid_items" ADD CONSTRAINT "pages_blocks_images_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_images_grid"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_images_grid" ADD CONSTRAINT "pages_blocks_images_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_cards_grid_cards" ADD CONSTRAINT "pages_blocks_cards_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards_grid"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_cards_grid" ADD CONSTRAINT "pages_blocks_cards_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_service_areas_block_custom_service_areas" ADD CONSTRAINT "pages_blocks_service_areas_block_custom_service_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_areas_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_service_areas_block" ADD CONSTRAINT "pages_blocks_service_areas_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_highlighted_services" ADD CONSTRAINT "pages_blocks_highlighted_services_emergency_service_id_services_id_fk" FOREIGN KEY ("emergency_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_highlighted_services" ADD CONSTRAINT "pages_blocks_highlighted_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_numbers_number_items" ADD CONSTRAINT "pages_blocks_numbers_number_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_numbers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_numbers" ADD CONSTRAINT "pages_blocks_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_dual_column_columns_links" ADD CONSTRAINT "pages_blocks_dual_column_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dual_column_columns"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_dual_column_columns" ADD CONSTRAINT "pages_blocks_dual_column_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_dual_column_columns" ADD CONSTRAINT "pages_blocks_dual_column_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dual_column"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_dual_column" ADD CONSTRAINT "pages_blocks_dual_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_title_content_links" ADD CONSTRAINT "_pages_v_blocks_title_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_title_content"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_title_content" ADD CONSTRAINT "_pages_v_blocks_title_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_images_grid_items" ADD CONSTRAINT "_pages_v_blocks_images_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_images_grid_items" ADD CONSTRAINT "_pages_v_blocks_images_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_images_grid"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_images_grid" ADD CONSTRAINT "_pages_v_blocks_images_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_cards_grid_cards" ADD CONSTRAINT "_pages_v_blocks_cards_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards_grid"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_cards_grid" ADD CONSTRAINT "_pages_v_blocks_cards_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_service_areas_block_custom_service_areas" ADD CONSTRAINT "_pages_v_blocks_service_areas_block_custom_service_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_areas_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_service_areas_block" ADD CONSTRAINT "_pages_v_blocks_service_areas_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_highlighted_services" ADD CONSTRAINT "_pages_v_blocks_highlighted_services_emergency_service_id_services_id_fk" FOREIGN KEY ("emergency_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_highlighted_services" ADD CONSTRAINT "_pages_v_blocks_highlighted_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_numbers_number_items" ADD CONSTRAINT "_pages_v_blocks_numbers_number_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_numbers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_numbers" ADD CONSTRAINT "_pages_v_blocks_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_dual_column_columns_links" ADD CONSTRAINT "_pages_v_blocks_dual_column_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_dual_column_columns"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_dual_column_columns" ADD CONSTRAINT "_pages_v_blocks_dual_column_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_dual_column_columns" ADD CONSTRAINT "_pages_v_blocks_dual_column_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_dual_column"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_dual_column" ADD CONSTRAINT "_pages_v_blocks_dual_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
CREATE INDEX IF NOT EXISTS "pages_blocks_title_content_links_order_idx" ON "pages_blocks_title_content_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_title_content_links_parent_id_idx" ON "pages_blocks_title_content_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_title_content_order_idx" ON "pages_blocks_title_content" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_title_content_parent_id_idx" ON "pages_blocks_title_content" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_title_content_path_idx" ON "pages_blocks_title_content" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_images_grid_items_order_idx" ON "pages_blocks_images_grid_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_images_grid_items_parent_id_idx" ON "pages_blocks_images_grid_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_images_grid_items_image_idx" ON "pages_blocks_images_grid_items" USING btree ("image_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_images_grid_order_idx" ON "pages_blocks_images_grid" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_images_grid_parent_id_idx" ON "pages_blocks_images_grid" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_images_grid_path_idx" ON "pages_blocks_images_grid" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_cards_grid_cards_order_idx" ON "pages_blocks_cards_grid_cards" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_cards_grid_cards_parent_id_idx" ON "pages_blocks_cards_grid_cards" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_cards_grid_order_idx" ON "pages_blocks_cards_grid" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_cards_grid_parent_id_idx" ON "pages_blocks_cards_grid" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_cards_grid_path_idx" ON "pages_blocks_cards_grid" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_service_areas_block_custom_service_areas_order_idx" ON "pages_blocks_service_areas_block_custom_service_areas" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_service_areas_block_custom_service_areas_parent_id_idx" ON "pages_blocks_service_areas_block_custom_service_areas" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_service_areas_block_order_idx" ON "pages_blocks_service_areas_block" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_service_areas_block_parent_id_idx" ON "pages_blocks_service_areas_block" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_service_areas_block_path_idx" ON "pages_blocks_service_areas_block" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_highlighted_services_order_idx" ON "pages_blocks_highlighted_services" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_highlighted_services_parent_id_idx" ON "pages_blocks_highlighted_services" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_highlighted_services_path_idx" ON "pages_blocks_highlighted_services" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_highlighted_services_emergency_service_idx" ON "pages_blocks_highlighted_services" USING btree ("emergency_service_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_numbers_number_items_order_idx" ON "pages_blocks_numbers_number_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_numbers_number_items_parent_id_idx" ON "pages_blocks_numbers_number_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_numbers_order_idx" ON "pages_blocks_numbers" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_numbers_parent_id_idx" ON "pages_blocks_numbers" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_numbers_path_idx" ON "pages_blocks_numbers" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_dual_column_columns_links_order_idx" ON "pages_blocks_dual_column_columns_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_dual_column_columns_links_parent_id_idx" ON "pages_blocks_dual_column_columns_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_dual_column_columns_order_idx" ON "pages_blocks_dual_column_columns" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_dual_column_columns_parent_id_idx" ON "pages_blocks_dual_column_columns" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_dual_column_columns_image_idx" ON "pages_blocks_dual_column_columns" USING btree ("image_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_dual_column_order_idx" ON "pages_blocks_dual_column" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_dual_column_parent_id_idx" ON "pages_blocks_dual_column" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_dual_column_path_idx" ON "pages_blocks_dual_column" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_title_content_links_order_idx" ON "_pages_v_blocks_title_content_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_title_content_links_parent_id_idx" ON "_pages_v_blocks_title_content_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_title_content_order_idx" ON "_pages_v_blocks_title_content" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_title_content_parent_id_idx" ON "_pages_v_blocks_title_content" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_title_content_path_idx" ON "_pages_v_blocks_title_content" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_images_grid_items_order_idx" ON "_pages_v_blocks_images_grid_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_images_grid_items_parent_id_idx" ON "_pages_v_blocks_images_grid_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_images_grid_items_image_idx" ON "_pages_v_blocks_images_grid_items" USING btree ("image_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_images_grid_order_idx" ON "_pages_v_blocks_images_grid" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_images_grid_parent_id_idx" ON "_pages_v_blocks_images_grid" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_images_grid_path_idx" ON "_pages_v_blocks_images_grid" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cards_grid_cards_order_idx" ON "_pages_v_blocks_cards_grid_cards" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cards_grid_cards_parent_id_idx" ON "_pages_v_blocks_cards_grid_cards" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cards_grid_order_idx" ON "_pages_v_blocks_cards_grid" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cards_grid_parent_id_idx" ON "_pages_v_blocks_cards_grid" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cards_grid_path_idx" ON "_pages_v_blocks_cards_grid" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_areas_block_custom_service_areas_order_idx" ON "_pages_v_blocks_service_areas_block_custom_service_areas" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_areas_block_custom_service_areas_parent_id_idx" ON "_pages_v_blocks_service_areas_block_custom_service_areas" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_areas_block_order_idx" ON "_pages_v_blocks_service_areas_block" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_areas_block_parent_id_idx" ON "_pages_v_blocks_service_areas_block" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_areas_block_path_idx" ON "_pages_v_blocks_service_areas_block" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlighted_services_order_idx" ON "_pages_v_blocks_highlighted_services" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlighted_services_parent_id_idx" ON "_pages_v_blocks_highlighted_services" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlighted_services_path_idx" ON "_pages_v_blocks_highlighted_services" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlighted_services_emergency_service_idx" ON "_pages_v_blocks_highlighted_services" USING btree ("emergency_service_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_numbers_number_items_order_idx" ON "_pages_v_blocks_numbers_number_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_numbers_number_items_parent_id_idx" ON "_pages_v_blocks_numbers_number_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_numbers_order_idx" ON "_pages_v_blocks_numbers" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_numbers_parent_id_idx" ON "_pages_v_blocks_numbers" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_numbers_path_idx" ON "_pages_v_blocks_numbers" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_dual_column_columns_links_order_idx" ON "_pages_v_blocks_dual_column_columns_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_dual_column_columns_links_parent_id_idx" ON "_pages_v_blocks_dual_column_columns_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_dual_column_columns_order_idx" ON "_pages_v_blocks_dual_column_columns" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_dual_column_columns_parent_id_idx" ON "_pages_v_blocks_dual_column_columns" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_dual_column_columns_image_idx" ON "_pages_v_blocks_dual_column_columns" USING btree ("image_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_dual_column_order_idx" ON "_pages_v_blocks_dual_column" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_dual_column_parent_id_idx" ON "_pages_v_blocks_dual_column" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_dual_column_path_idx" ON "_pages_v_blocks_dual_column" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "forms_created_at_idx" ON "forms" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
CREATE INDEX IF NOT EXISTS "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
DO $$ BEGIN
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_review_id_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_review_id_reviews_id_fk" FOREIGN KEY ("version_review_id") REFERENCES "public"."reviews"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
CREATE INDEX IF NOT EXISTS "case_studies_review_idx" ON "case_studies" USING btree ("review_id");
CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_review_idx" ON "_case_studies_v" USING btree ("version_review_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
-- [SAFEGUARD] ALTER TABLE "case_studies" DROP COLUMN "testimonial_id";
-- [SAFEGUARD] ALTER TABLE "_case_studies_v" DROP COLUMN "version_testimonial_id";
-- [SAFEGUARD] ALTER TABLE "pages_blocks_content_fetcher" DROP COLUMN "title";
-- [SAFEGUARD] ALTER TABLE "pages_blocks_content_fetcher" DROP COLUMN "title_highlight";
-- [SAFEGUARD] ALTER TABLE "pages_blocks_content_fetcher" DROP COLUMN "description";
-- [SAFEGUARD] ALTER TABLE "_pages_v_blocks_content_fetcher" DROP COLUMN "title";
-- [SAFEGUARD] ALTER TABLE "_pages_v_blocks_content_fetcher" DROP COLUMN "title_highlight";
-- [SAFEGUARD] ALTER TABLE "_pages_v_blocks_content_fetcher" DROP COLUMN "description";
-- [SAFEGUARD] ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"global_slug" varchar,
	"user_id" integer NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer,
	"media_id" integer,
	"authors_id" integer,
	"blog_posts_id" integer,
	"case_studies_id" integer,
	"tags_id" integer,
	"services_id" integer,
	"reviews_id" integer,
	"pages_id" integer,
	"faqs_id" integer,
	"team_members_id" integer,
	"categories_id" integer
);

DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "forms_id" integer;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "form_submissions_id" integer;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
 DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_id_forms_id_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_id_form_submissions_id_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
DO $$ BEGIN
    CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('default', 'highImpact', 'servicesHero', 'minimal', 'none');
  EXCEPTION WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'default';
ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_title" varchar;
ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_description" varchar;
ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_command_k_description" varchar;
ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_primary_action_label" varchar;
ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_primary_action_url" varchar;
ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_secondary_action_label" varchar;
ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_secondary_action_url" varchar;
ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_logo_id" integer;
ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_rating" numeric;
ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_reviews" varchar;
ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_meta_title" varchar;
ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_meta_description" varchar;
ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_meta_image_id" integer;

DO $$ BEGIN
 DO $$ BEGIN
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_logo_id_media_id_fk" FOREIGN KEY ("version_hero_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 DO $$ BEGIN
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_logo_idx" ON "_pages_v" USING btree ("version_hero_logo_id");
CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");

CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
	"link_label" varchar,
	"link_url" varchar,
	"link_new_tab" boolean,
	"link_email" varchar,
	"link_phone_number" varchar,
	"link_style" "enum__pages_v_version_hero_links_link_style" DEFAULT 'primary',
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_trust_indicators" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar,
	"icon_id" integer,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"form_id" integer,
	"enable_intro" boolean DEFAULT false,
	"intro_content" jsonb,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
DO $$ BEGIN
 DO $$ BEGIN
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_trust_indicators_order_idx" ON "_pages_v_version_hero_trust_indicators" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_trust_indicators_parent_id_idx" ON "_pages_v_version_hero_trust_indicators" USING btree ("_parent_id");
DO $$ BEGIN
 DO $$ BEGIN
  ALTER TABLE "_pages_v_version_hero_trust_indicators" ADD CONSTRAINT "_pages_v_version_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");

DO $$ BEGIN
 DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "pages_blocks_form_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"form_id" integer,
	"enable_intro" boolean DEFAULT false,
	"intro_content" jsonb,
	"block_name" varchar
);

CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");

DO $$ BEGIN
 DO $$ BEGIN
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 DO $$ BEGIN
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Mark migrations as applied
INSERT INTO "payload_migrations" ("name", "batch", "created_at", "updated_at") VALUES ('20260204_135744_add_tag_slug_and_applied_to', 1, now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "payload_migrations" ("name", "batch", "created_at", "updated_at") VALUES ('20260207_200000_fix_numbers_columns', 1, now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "payload_migrations" ("name", "batch", "created_at", "updated_at") VALUES ('20260212_094850_add_form_block', 1, now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "payload_migrations" ("name", "batch", "created_at", "updated_at") VALUES ('20260212_120000_add_locked_documents', 1, now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "payload_migrations" ("name", "batch", "created_at", "updated_at") VALUES ('20260212_130000_fix_pages_ver', 1, now(), now()) ON CONFLICT DO NOTHING;
