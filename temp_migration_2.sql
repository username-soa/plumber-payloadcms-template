CREATE TABLE "services_hero_trust_indicators" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" varchar NOT NULL,
	"icon" varchar NOT NULL
);

CREATE TABLE "services_process" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL
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
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"address" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE "pages_blocks_back_link" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"url" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE "pages_blocks_faq" (
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

CREATE TABLE "pages_blocks_reviews_section_manual_reviews" (
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

CREATE TABLE "pages_blocks_reviews_section" (
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

CREATE TABLE "pages_blocks_certifications_certifications" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
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
	"title" varchar,
	"description" varchar,
	"block_name" varchar
);

CREATE TABLE "pages_blocks_trust_stats_stats" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
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
	"cols" "enum_pages_blocks_trust_stats_cols" DEFAULT '4',
	"background_color" "enum_pages_blocks_trust_stats_background_color" DEFAULT 'transparent',
	"block_name" varchar
);

CREATE TABLE "pages_blocks_timeline_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
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
