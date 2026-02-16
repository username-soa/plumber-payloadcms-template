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
