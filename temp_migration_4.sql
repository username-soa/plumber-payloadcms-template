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
