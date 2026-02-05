import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  
  CREATE TABLE "services_hero_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "services_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "services_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_type" "enum_services_hero_type" DEFAULT 'default' NOT NULL,
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
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"long_description" jsonb,
  	"icon" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"is_emergency" boolean DEFAULT false,
  	"availability" varchar,
  	"parent_service_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar NOT NULL,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"content" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"platform" "enum_reviews_platform" DEFAULT 'google' NOT NULL,
  	"avatar_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_legal_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Contact Us',
  	"description" varchar DEFAULT 'For questions about these Terms or to make a complaint:',
  	"email" varchar,
  	"phone" varchar,
  	"address" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_back_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Back to Home',
  	"href" varchar DEFAULT '/',
  	"centered" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Your Questions, Our Answers',
  	"title_highlight" varchar,
  	"description" varchar DEFAULT 'Have questions about our plumbing services? We''re here to make everything clear. From booking to pricing, find your answers here.',
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
  
  CREATE TABLE "pages_blocks_reviews_section_manual_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author" varchar,
  	"rating" numeric DEFAULT 5,
  	"content" varchar,
  	"date" timestamp(3) with time zone
  );
  
  CREATE TABLE "pages_blocks_reviews_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Why People Love Us',
  	"subtitle" varchar DEFAULT 'Testimonials',
  	"source" "enum_pages_blocks_reviews_section_source" DEFAULT 'manual',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_certifications_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_blocks_certifications" (
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
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Meet Your Experts',
  	"title_highlight" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"title_highlight" varchar,
  	"bottom_text" varchar,
  	"cols" "enum_pages_blocks_trust_stats_cols" DEFAULT '6',
  	"background_color" "enum_pages_blocks_trust_stats_background_color" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"date" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_fetcher" (
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
  
  CREATE TABLE "pages_hero_links" (
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
  
  CREATE TABLE "pages_hero_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"last_updated" timestamp(3) with time zone,
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
  
  CREATE TABLE "pages_rels" (
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
  
  CREATE TABLE "_pages_v_blocks_legal_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_contact" (
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
  
  CREATE TABLE "_pages_v_blocks_back_link" (
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
  
  CREATE TABLE "_pages_v_blocks_faq" (
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
  
  CREATE TABLE "_pages_v_blocks_reviews_section_manual_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar,
  	"rating" numeric DEFAULT 5,
  	"content" varchar,
  	"date" timestamp(3) with time zone,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reviews_section" (
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
  
  CREATE TABLE "_pages_v_blocks_certifications_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_certifications" (
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
  
  CREATE TABLE "_pages_v_blocks_team" (
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
  
  CREATE TABLE "_pages_v_blocks_trust_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_stats" (
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
  
  CREATE TABLE "_pages_v_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"date" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_fetcher" (
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
  
  CREATE TABLE "_pages_v_version_hero_links" (
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
  
  CREATE TABLE "_pages_v_version_hero_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
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
  
  CREATE TABLE "_pages_v_rels" (
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
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"certification" varchar NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"bio" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_applies_to" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_categories_applies_to",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
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
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
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
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "footer_cta_links" (
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
  
  CREATE TABLE "footer_nav_links" (
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
  
  CREATE TABLE "footer_bottom_links" (
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
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_headline" varchar NOT NULL,
  	"cta_subheadline" varchar NOT NULL,
  	"copyright_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "company_info_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_company_info_socials_platform" NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "company_info_working_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" varchar NOT NULL,
  	"time" varchar NOT NULL
  );
  
  CREATE TABLE "company_info_seo_service_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"type" "enum_company_info_seo_service_areas_type" DEFAULT 'Suburb' NOT NULL
  );
  
  CREATE TABLE "company_info" (
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
  
  CREATE TABLE "company_info_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"reviews_id" integer
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_related_service_id_services_id_fk" FOREIGN KEY ("related_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_parent_id_case_studies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_related_service_id_services_id_fk" FOREIGN KEY ("version_related_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_testimonial_id_testimonials_id_fk" FOREIGN KEY ("version_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_applies_to" ADD CONSTRAINT "tags_applies_to_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_hero_links" ADD CONSTRAINT "services_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_hero_trust_indicators" ADD CONSTRAINT "services_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_process" ADD CONSTRAINT "services_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_faqs" ADD CONSTRAINT "services_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_bg_image_id_media_id_fk" FOREIGN KEY ("hero_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_fg_image_id_media_id_fk" FOREIGN KEY ("hero_fg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_parent_service_id_services_id_fk" FOREIGN KEY ("parent_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_content" ADD CONSTRAINT "pages_blocks_legal_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_contact" ADD CONSTRAINT "pages_blocks_legal_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_back_link" ADD CONSTRAINT "pages_blocks_back_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reviews_section_manual_reviews" ADD CONSTRAINT "pages_blocks_reviews_section_manual_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reviews_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reviews_section" ADD CONSTRAINT "pages_blocks_reviews_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_certifications_certifications" ADD CONSTRAINT "pages_blocks_certifications_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_certifications" ADD CONSTRAINT "pages_blocks_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_stats_stats" ADD CONSTRAINT "pages_blocks_trust_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_stats" ADD CONSTRAINT "pages_blocks_trust_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_items" ADD CONSTRAINT "pages_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_fetcher" ADD CONSTRAINT "pages_blocks_content_fetcher_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_trust_indicators" ADD CONSTRAINT "pages_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_bg_image_id_media_id_fk" FOREIGN KEY ("hero_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_fg_image_id_media_id_fk" FOREIGN KEY ("hero_fg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_content" ADD CONSTRAINT "_pages_v_blocks_legal_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_contact" ADD CONSTRAINT "_pages_v_blocks_legal_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_back_link" ADD CONSTRAINT "_pages_v_blocks_back_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reviews_section_manual_reviews" ADD CONSTRAINT "_pages_v_blocks_reviews_section_manual_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reviews_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reviews_section" ADD CONSTRAINT "_pages_v_blocks_reviews_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_certifications_certifications" ADD CONSTRAINT "_pages_v_blocks_certifications_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_certifications" ADD CONSTRAINT "_pages_v_blocks_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_stats_stats" ADD CONSTRAINT "_pages_v_blocks_trust_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_stats" ADD CONSTRAINT "_pages_v_blocks_trust_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_items" ADD CONSTRAINT "_pages_v_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_fetcher" ADD CONSTRAINT "_pages_v_blocks_content_fetcher_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_trust_indicators" ADD CONSTRAINT "_pages_v_version_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_bg_image_id_media_id_fk" FOREIGN KEY ("version_hero_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_fg_image_id_media_id_fk" FOREIGN KEY ("version_hero_fg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members_certifications" ADD CONSTRAINT "team_members_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_applies_to" ADD CONSTRAINT "categories_applies_to_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_cta_links" ADD CONSTRAINT "footer_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_links" ADD CONSTRAINT "footer_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_socials" ADD CONSTRAINT "company_info_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_working_hours" ADD CONSTRAINT "company_info_working_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_seo_service_areas" ADD CONSTRAINT "company_info_seo_service_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info" ADD CONSTRAINT "company_info_brand_logo_id_media_id_fk" FOREIGN KEY ("brand_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_info" ADD CONSTRAINT "company_info_seo_emergency_service_id_services_id_fk" FOREIGN KEY ("seo_emergency_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_info_rels" ADD CONSTRAINT "company_info_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_rels" ADD CONSTRAINT "company_info_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_rels" ADD CONSTRAINT "company_info_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE INDEX "authors_avatar_idx" ON "authors" USING btree ("avatar_id");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "blog_posts_category_idx" ON "blog_posts" USING btree ("category_id");
  CREATE INDEX "blog_posts_featured_image_idx" ON "blog_posts" USING btree ("featured_image_id");
  CREATE INDEX "blog_posts_author_idx" ON "blog_posts" USING btree ("author_id");
  CREATE INDEX "blog_posts_meta_meta_image_idx" ON "blog_posts" USING btree ("meta_image_id");
  CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX "blog_posts__status_idx" ON "blog_posts" USING btree ("_status");
  CREATE INDEX "blog_posts_rels_order_idx" ON "blog_posts_rels" USING btree ("order");
  CREATE INDEX "blog_posts_rels_parent_idx" ON "blog_posts_rels" USING btree ("parent_id");
  CREATE INDEX "blog_posts_rels_path_idx" ON "blog_posts_rels" USING btree ("path");
  CREATE INDEX "blog_posts_rels_tags_id_idx" ON "blog_posts_rels" USING btree ("tags_id");
  CREATE INDEX "_blog_posts_v_parent_idx" ON "_blog_posts_v" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_version_version_category_idx" ON "_blog_posts_v" USING btree ("version_category_id");
  CREATE INDEX "_blog_posts_v_version_version_featured_image_idx" ON "_blog_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_blog_posts_v_version_version_author_idx" ON "_blog_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_blog_posts_v_version_meta_version_meta_image_idx" ON "_blog_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_blog_posts_v_version_version_updated_at_idx" ON "_blog_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_posts_v_version_version_created_at_idx" ON "_blog_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_posts_v_version_version__status_idx" ON "_blog_posts_v" USING btree ("version__status");
  CREATE INDEX "_blog_posts_v_created_at_idx" ON "_blog_posts_v" USING btree ("created_at");
  CREATE INDEX "_blog_posts_v_updated_at_idx" ON "_blog_posts_v" USING btree ("updated_at");
  CREATE INDEX "_blog_posts_v_latest_idx" ON "_blog_posts_v" USING btree ("latest");
  CREATE INDEX "_blog_posts_v_rels_order_idx" ON "_blog_posts_v_rels" USING btree ("order");
  CREATE INDEX "_blog_posts_v_rels_parent_idx" ON "_blog_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_rels_path_idx" ON "_blog_posts_v_rels" USING btree ("path");
  CREATE INDEX "_blog_posts_v_rels_tags_id_idx" ON "_blog_posts_v_rels" USING btree ("tags_id");
  CREATE INDEX "case_studies_category_idx" ON "case_studies" USING btree ("category_id");
  CREATE INDEX "case_studies_related_service_idx" ON "case_studies" USING btree ("related_service_id");
  CREATE INDEX "case_studies_featured_image_idx" ON "case_studies" USING btree ("featured_image_id");
  CREATE INDEX "case_studies_testimonial_idx" ON "case_studies" USING btree ("testimonial_id");
  CREATE INDEX "case_studies_meta_meta_image_idx" ON "case_studies" USING btree ("meta_image_id");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "case_studies__status_idx" ON "case_studies" USING btree ("_status");
  CREATE INDEX "case_studies_rels_order_idx" ON "case_studies_rels" USING btree ("order");
  CREATE INDEX "case_studies_rels_parent_idx" ON "case_studies_rels" USING btree ("parent_id");
  CREATE INDEX "case_studies_rels_path_idx" ON "case_studies_rels" USING btree ("path");
  CREATE INDEX "case_studies_rels_tags_id_idx" ON "case_studies_rels" USING btree ("tags_id");
  CREATE INDEX "_case_studies_v_parent_idx" ON "_case_studies_v" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_version_version_category_idx" ON "_case_studies_v" USING btree ("version_category_id");
  CREATE INDEX "_case_studies_v_version_version_related_service_idx" ON "_case_studies_v" USING btree ("version_related_service_id");
  CREATE INDEX "_case_studies_v_version_version_featured_image_idx" ON "_case_studies_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_case_studies_v_version_version_testimonial_idx" ON "_case_studies_v" USING btree ("version_testimonial_id");
  CREATE INDEX "_case_studies_v_version_meta_version_meta_image_idx" ON "_case_studies_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_case_studies_v_version_version_updated_at_idx" ON "_case_studies_v" USING btree ("version_updated_at");
  CREATE INDEX "_case_studies_v_version_version_created_at_idx" ON "_case_studies_v" USING btree ("version_created_at");
  CREATE INDEX "_case_studies_v_version_version__status_idx" ON "_case_studies_v" USING btree ("version__status");
  CREATE INDEX "_case_studies_v_created_at_idx" ON "_case_studies_v" USING btree ("created_at");
  CREATE INDEX "_case_studies_v_updated_at_idx" ON "_case_studies_v" USING btree ("updated_at");
  CREATE INDEX "_case_studies_v_latest_idx" ON "_case_studies_v" USING btree ("latest");
  CREATE INDEX "_case_studies_v_rels_order_idx" ON "_case_studies_v_rels" USING btree ("order");
  CREATE INDEX "_case_studies_v_rels_parent_idx" ON "_case_studies_v_rels" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_rels_path_idx" ON "_case_studies_v_rels" USING btree ("path");
  CREATE INDEX "_case_studies_v_rels_tags_id_idx" ON "_case_studies_v_rels" USING btree ("tags_id");
  CREATE INDEX "tags_applies_to_order_idx" ON "tags_applies_to" USING btree ("order");
  CREATE INDEX "tags_applies_to_parent_idx" ON "tags_applies_to" USING btree ("parent_id");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX "services_hero_links_order_idx" ON "services_hero_links" USING btree ("_order");
  CREATE INDEX "services_hero_links_parent_id_idx" ON "services_hero_links" USING btree ("_parent_id");
  CREATE INDEX "services_hero_trust_indicators_order_idx" ON "services_hero_trust_indicators" USING btree ("_order");
  CREATE INDEX "services_hero_trust_indicators_parent_id_idx" ON "services_hero_trust_indicators" USING btree ("_parent_id");
  CREATE INDEX "services_process_order_idx" ON "services_process" USING btree ("_order");
  CREATE INDEX "services_process_parent_id_idx" ON "services_process" USING btree ("_parent_id");
  CREATE INDEX "services_faqs_order_idx" ON "services_faqs" USING btree ("_order");
  CREATE INDEX "services_faqs_parent_id_idx" ON "services_faqs" USING btree ("_parent_id");
  CREATE INDEX "services_hero_hero_bg_image_idx" ON "services" USING btree ("hero_bg_image_id");
  CREATE INDEX "services_hero_hero_fg_image_idx" ON "services" USING btree ("hero_fg_image_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_parent_service_idx" ON "services" USING btree ("parent_service_id");
  CREATE INDEX "services_meta_meta_image_idx" ON "services" USING btree ("meta_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_pages_id_idx" ON "services_rels" USING btree ("pages_id");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "reviews_avatar_idx" ON "reviews" USING btree ("avatar_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX "pages_blocks_legal_content_order_idx" ON "pages_blocks_legal_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_content_parent_id_idx" ON "pages_blocks_legal_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_content_path_idx" ON "pages_blocks_legal_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_legal_contact_order_idx" ON "pages_blocks_legal_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_contact_parent_id_idx" ON "pages_blocks_legal_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_contact_path_idx" ON "pages_blocks_legal_contact" USING btree ("_path");
  CREATE INDEX "pages_blocks_back_link_order_idx" ON "pages_blocks_back_link" USING btree ("_order");
  CREATE INDEX "pages_blocks_back_link_parent_id_idx" ON "pages_blocks_back_link" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_back_link_path_idx" ON "pages_blocks_back_link" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_reviews_section_manual_reviews_order_idx" ON "pages_blocks_reviews_section_manual_reviews" USING btree ("_order");
  CREATE INDEX "pages_blocks_reviews_section_manual_reviews_parent_id_idx" ON "pages_blocks_reviews_section_manual_reviews" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reviews_section_order_idx" ON "pages_blocks_reviews_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_reviews_section_parent_id_idx" ON "pages_blocks_reviews_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reviews_section_path_idx" ON "pages_blocks_reviews_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_certifications_certifications_order_idx" ON "pages_blocks_certifications_certifications" USING btree ("_order");
  CREATE INDEX "pages_blocks_certifications_certifications_parent_id_idx" ON "pages_blocks_certifications_certifications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_certifications_order_idx" ON "pages_blocks_certifications" USING btree ("_order");
  CREATE INDEX "pages_blocks_certifications_parent_id_idx" ON "pages_blocks_certifications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_certifications_path_idx" ON "pages_blocks_certifications" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_trust_stats_stats_order_idx" ON "pages_blocks_trust_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_stats_stats_parent_id_idx" ON "pages_blocks_trust_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_stats_order_idx" ON "pages_blocks_trust_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_stats_parent_id_idx" ON "pages_blocks_trust_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_stats_path_idx" ON "pages_blocks_trust_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_timeline_items_order_idx" ON "pages_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_items_parent_id_idx" ON "pages_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_fetcher_order_idx" ON "pages_blocks_content_fetcher" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_fetcher_parent_id_idx" ON "pages_blocks_content_fetcher" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_fetcher_path_idx" ON "pages_blocks_content_fetcher" USING btree ("_path");
  CREATE INDEX "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_trust_indicators_order_idx" ON "pages_hero_trust_indicators" USING btree ("_order");
  CREATE INDEX "pages_hero_trust_indicators_parent_id_idx" ON "pages_hero_trust_indicators" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_hero_hero_bg_image_idx" ON "pages" USING btree ("hero_bg_image_id");
  CREATE INDEX "pages_hero_hero_fg_image_idx" ON "pages" USING btree ("hero_fg_image_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_reviews_id_idx" ON "pages_rels" USING btree ("reviews_id");
  CREATE INDEX "pages_rels_team_members_id_idx" ON "pages_rels" USING btree ("team_members_id");
  CREATE INDEX "_pages_v_blocks_legal_content_order_idx" ON "_pages_v_blocks_legal_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_content_parent_id_idx" ON "_pages_v_blocks_legal_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_content_path_idx" ON "_pages_v_blocks_legal_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_legal_contact_order_idx" ON "_pages_v_blocks_legal_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_contact_parent_id_idx" ON "_pages_v_blocks_legal_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_contact_path_idx" ON "_pages_v_blocks_legal_contact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_back_link_order_idx" ON "_pages_v_blocks_back_link" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_back_link_parent_id_idx" ON "_pages_v_blocks_back_link" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_back_link_path_idx" ON "_pages_v_blocks_back_link" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_reviews_section_manual_reviews_order_idx" ON "_pages_v_blocks_reviews_section_manual_reviews" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reviews_section_manual_reviews_parent_id_idx" ON "_pages_v_blocks_reviews_section_manual_reviews" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reviews_section_order_idx" ON "_pages_v_blocks_reviews_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reviews_section_parent_id_idx" ON "_pages_v_blocks_reviews_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reviews_section_path_idx" ON "_pages_v_blocks_reviews_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_certifications_certifications_order_idx" ON "_pages_v_blocks_certifications_certifications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_certifications_certifications_parent_id_idx" ON "_pages_v_blocks_certifications_certifications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_certifications_order_idx" ON "_pages_v_blocks_certifications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_certifications_parent_id_idx" ON "_pages_v_blocks_certifications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_certifications_path_idx" ON "_pages_v_blocks_certifications" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_trust_stats_stats_order_idx" ON "_pages_v_blocks_trust_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_stats_stats_parent_id_idx" ON "_pages_v_blocks_trust_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_stats_order_idx" ON "_pages_v_blocks_trust_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_stats_parent_id_idx" ON "_pages_v_blocks_trust_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_stats_path_idx" ON "_pages_v_blocks_trust_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_timeline_items_order_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_items_parent_id_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_fetcher_order_idx" ON "_pages_v_blocks_content_fetcher" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_fetcher_parent_id_idx" ON "_pages_v_blocks_content_fetcher" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_fetcher_path_idx" ON "_pages_v_blocks_content_fetcher" USING btree ("_path");
  CREATE INDEX "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_trust_indicators_order_idx" ON "_pages_v_version_hero_trust_indicators" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_trust_indicators_parent_id_idx" ON "_pages_v_version_hero_trust_indicators" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_hero_version_hero_bg_image_idx" ON "_pages_v" USING btree ("version_hero_bg_image_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_fg_image_idx" ON "_pages_v" USING btree ("version_hero_fg_image_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_reviews_id_idx" ON "_pages_v_rels" USING btree ("reviews_id");
  CREATE INDEX "_pages_v_rels_team_members_id_idx" ON "_pages_v_rels" USING btree ("team_members_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "team_members_certifications_order_idx" ON "team_members_certifications" USING btree ("_order");
  CREATE INDEX "team_members_certifications_parent_id_idx" ON "team_members_certifications" USING btree ("_parent_id");
  CREATE INDEX "team_members_image_idx" ON "team_members" USING btree ("image_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "categories_applies_to_order_idx" ON "categories_applies_to" USING btree ("order");
  CREATE INDEX "categories_applies_to_parent_idx" ON "categories_applies_to" USING btree ("parent_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_services_id_idx" ON "header_rels" USING btree ("services_id");
  CREATE INDEX "footer_cta_links_order_idx" ON "footer_cta_links" USING btree ("_order");
  CREATE INDEX "footer_cta_links_parent_id_idx" ON "footer_cta_links" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_links_order_idx" ON "footer_nav_links" USING btree ("_order");
  CREATE INDEX "footer_nav_links_parent_id_idx" ON "footer_nav_links" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_links_order_idx" ON "footer_bottom_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_links_parent_id_idx" ON "footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_services_id_idx" ON "footer_rels" USING btree ("services_id");
  CREATE INDEX "company_info_socials_order_idx" ON "company_info_socials" USING btree ("_order");
  CREATE INDEX "company_info_socials_parent_id_idx" ON "company_info_socials" USING btree ("_parent_id");
  CREATE INDEX "company_info_working_hours_order_idx" ON "company_info_working_hours" USING btree ("_order");
  CREATE INDEX "company_info_working_hours_parent_id_idx" ON "company_info_working_hours" USING btree ("_parent_id");
  CREATE INDEX "company_info_seo_service_areas_order_idx" ON "company_info_seo_service_areas" USING btree ("_order");
  CREATE INDEX "company_info_seo_service_areas_parent_id_idx" ON "company_info_seo_service_areas" USING btree ("_parent_id");
  CREATE INDEX "company_info_brand_brand_logo_idx" ON "company_info" USING btree ("brand_logo_id");
  CREATE INDEX "company_info_seo_seo_emergency_service_idx" ON "company_info" USING btree ("seo_emergency_service_id");
  CREATE INDEX "company_info_rels_order_idx" ON "company_info_rels" USING btree ("order");
  CREATE INDEX "company_info_rels_parent_idx" ON "company_info_rels" USING btree ("parent_id");
  CREATE INDEX "company_info_rels_path_idx" ON "company_info_rels" USING btree ("path");
  CREATE INDEX "company_info_rels_services_id_idx" ON "company_info_rels" USING btree ("services_id");
  CREATE INDEX "company_info_rels_reviews_id_idx" ON "company_info_rels" USING btree ("reviews_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "blog_posts" CASCADE;
  DROP TABLE "blog_posts_rels" CASCADE;
  DROP TABLE "_blog_posts_v" CASCADE;
  DROP TABLE "_blog_posts_v_rels" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "case_studies_rels" CASCADE;
  DROP TABLE "_case_studies_v" CASCADE;
  DROP TABLE "_case_studies_v_rels" CASCADE;
  DROP TABLE "tags_applies_to" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "services_hero_links" CASCADE;
  DROP TABLE "services_hero_trust_indicators" CASCADE;
  DROP TABLE "services_process" CASCADE;
  DROP TABLE "services_faqs" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "pages_blocks_legal_content" CASCADE;
  DROP TABLE "pages_blocks_legal_contact" CASCADE;
  DROP TABLE "pages_blocks_back_link" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_reviews_section_manual_reviews" CASCADE;
  DROP TABLE "pages_blocks_reviews_section" CASCADE;
  DROP TABLE "pages_blocks_certifications_certifications" CASCADE;
  DROP TABLE "pages_blocks_certifications" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_trust_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_trust_stats" CASCADE;
  DROP TABLE "pages_blocks_timeline_items" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_content_fetcher" CASCADE;
  DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages_hero_trust_indicators" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_content" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_back_link" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_reviews_section_manual_reviews" CASCADE;
  DROP TABLE "_pages_v_blocks_reviews_section" CASCADE;
  DROP TABLE "_pages_v_blocks_certifications_certifications" CASCADE;
  DROP TABLE "_pages_v_blocks_certifications" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_items" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_content_fetcher" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v_version_hero_trust_indicators" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "team_members_certifications" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "categories_applies_to" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_cta_links" CASCADE;
  DROP TABLE "footer_nav_links" CASCADE;
  DROP TABLE "footer_bottom_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "company_info_socials" CASCADE;
  DROP TABLE "company_info_working_hours" CASCADE;
  DROP TABLE "company_info_seo_service_areas" CASCADE;
  DROP TABLE "company_info" CASCADE;
  DROP TABLE "company_info_rels" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_blog_posts_status";
  DROP TYPE "public"."enum__blog_posts_v_version_status";
  DROP TYPE "public"."enum_case_studies_status";
  DROP TYPE "public"."enum__case_studies_v_version_status";
  DROP TYPE "public"."enum_tags_applies_to";
  DROP TYPE "public"."enum_services_hero_links_link_type";
  DROP TYPE "public"."enum_services_hero_links_link_style";
  DROP TYPE "public"."enum_services_hero_type";
  DROP TYPE "public"."enum_services_hero_badge_variant";
  DROP TYPE "public"."enum_services_hero_badge_size";
  DROP TYPE "public"."enum_services_hero_hero_theme";
  DROP TYPE "public"."enum_reviews_platform";
  DROP TYPE "public"."enum_pages_blocks_faq_cta_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_faq_cta_cta_link_style";
  DROP TYPE "public"."enum_pages_blocks_reviews_section_source";
  DROP TYPE "public"."enum_pages_blocks_trust_stats_cols";
  DROP TYPE "public"."enum_pages_blocks_trust_stats_background_color";
  DROP TYPE "public"."enum_pages_blocks_content_fetcher_content_type";
  DROP TYPE "public"."enum_pages_blocks_content_fetcher_items_per_row";
  DROP TYPE "public"."enum_pages_blocks_content_fetcher_sort_by";
  DROP TYPE "public"."enum_pages_blocks_content_fetcher_pagination_style";
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_style";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum_pages_hero_badge_variant";
  DROP TYPE "public"."enum_pages_hero_badge_size";
  DROP TYPE "public"."enum_pages_hero_hero_theme";
  DROP TYPE "public"."enum__pages_v_blocks_faq_cta_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_cta_cta_link_style";
  DROP TYPE "public"."enum__pages_v_blocks_reviews_section_source";
  DROP TYPE "public"."enum__pages_v_blocks_trust_stats_cols";
  DROP TYPE "public"."enum__pages_v_blocks_trust_stats_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_content_fetcher_content_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_fetcher_items_per_row";
  DROP TYPE "public"."enum__pages_v_blocks_content_fetcher_sort_by";
  DROP TYPE "public"."enum__pages_v_blocks_content_fetcher_pagination_style";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_style";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum__pages_v_version_hero_badge_variant";
  DROP TYPE "public"."enum__pages_v_version_hero_badge_size";
  DROP TYPE "public"."enum__pages_v_version_hero_hero_theme";
  DROP TYPE "public"."enum_categories_applies_to";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_link_style";
  DROP TYPE "public"."enum_footer_cta_links_link_type";
  DROP TYPE "public"."enum_footer_cta_links_link_style";
  DROP TYPE "public"."enum_footer_nav_links_link_type";
  DROP TYPE "public"."enum_footer_nav_links_link_style";
  DROP TYPE "public"."enum_footer_bottom_links_link_type";
  DROP TYPE "public"."enum_footer_bottom_links_link_style";
  DROP TYPE "public"."enum_company_info_socials_platform";
  DROP TYPE "public"."enum_company_info_seo_service_areas_type";
  DROP TYPE "public"."enum_company_info_seo_business_type";
  DROP TYPE "public"."enum_company_info_seo_reviews_source";`)
}
