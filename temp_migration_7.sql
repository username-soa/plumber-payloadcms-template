CREATE TYPE "public"."enum_pages_blocks_title_content_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum_pages_blocks_title_content_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing', 'primary-gradient-dots');
CREATE TYPE "public"."enum_pages_blocks_title_content_text_align" AS ENUM('left', 'center', 'right');
CREATE TYPE "public"."enum_pages_blocks_title_content_buttons_align" AS ENUM('left', 'center', 'right');
CREATE TYPE "public"."enum_pages_blocks_title_content_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_pages_blocks_title_content_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_pages_blocks_images_grid_text_align" AS ENUM('left', 'center', 'right');
CREATE TYPE "public"."enum_pages_blocks_images_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
CREATE TYPE "public"."enum_pages_blocks_images_grid_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_pages_blocks_images_grid_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_pages_blocks_cards_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
CREATE TYPE "public"."enum_pages_blocks_cards_grid_card_layout" AS ENUM('stacked', 'sideBySide');
CREATE TYPE "public"."enum_pages_blocks_cards_grid_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_pages_blocks_cards_grid_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_pages_blocks_service_areas_block_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_pages_blocks_service_areas_block_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_pages_blocks_highlighted_services_layout" AS ENUM('grid', 'carousel');
CREATE TYPE "public"."enum_pages_blocks_highlighted_services_cta_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum_pages_blocks_highlighted_services_cta_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing', 'primary-gradient-dots');
CREATE TYPE "public"."enum_pages_blocks_highlighted_services_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_pages_blocks_highlighted_services_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_pages_blocks_numbers_text_align" AS ENUM('left', 'center', 'right');
CREATE TYPE "public"."enum_pages_blocks_numbers_text_color" AS ENUM('regular', 'primary');
CREATE TYPE "public"."enum_pages_blocks_numbers_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_pages_blocks_numbers_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_pages_blocks_numbers_columns" AS ENUM('1', '2', '3', '4', '5', '6');
CREATE TYPE "public"."enum_pages_blocks_dual_column_columns_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum_pages_blocks_dual_column_columns_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing', 'primary-gradient-dots');
CREATE TYPE "public"."enum_pages_blocks_dual_column_columns_type" AS ENUM('content', 'image');
CREATE TYPE "public"."enum_pages_blocks_dual_column_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_pages_blocks_dual_column_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_title_content_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum__pages_v_blocks_title_content_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing', 'primary-gradient-dots');
CREATE TYPE "public"."enum__pages_v_blocks_title_content_text_align" AS ENUM('left', 'center', 'right');
CREATE TYPE "public"."enum__pages_v_blocks_title_content_buttons_align" AS ENUM('left', 'center', 'right');
CREATE TYPE "public"."enum__pages_v_blocks_title_content_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_title_content_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_images_grid_text_align" AS ENUM('left', 'center', 'right');
CREATE TYPE "public"."enum__pages_v_blocks_images_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
CREATE TYPE "public"."enum__pages_v_blocks_images_grid_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_images_grid_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_cards_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
CREATE TYPE "public"."enum__pages_v_blocks_cards_grid_card_layout" AS ENUM('stacked', 'sideBySide');
CREATE TYPE "public"."enum__pages_v_blocks_cards_grid_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_cards_grid_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_service_areas_block_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_service_areas_block_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_highlighted_services_layout" AS ENUM('grid', 'carousel');
CREATE TYPE "public"."enum__pages_v_blocks_highlighted_services_cta_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum__pages_v_blocks_highlighted_services_cta_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing', 'primary-gradient-dots');
CREATE TYPE "public"."enum__pages_v_blocks_highlighted_services_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_highlighted_services_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_numbers_text_align" AS ENUM('left', 'center', 'right');
CREATE TYPE "public"."enum__pages_v_blocks_numbers_text_color" AS ENUM('regular', 'primary');
CREATE TYPE "public"."enum__pages_v_blocks_numbers_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_numbers_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_numbers_columns" AS ENUM('1', '2', '3', '4', '5', '6');
CREATE TYPE "public"."enum__pages_v_blocks_dual_column_columns_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
CREATE TYPE "public"."enum__pages_v_blocks_dual_column_columns_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing', 'primary-gradient-dots');
CREATE TYPE "public"."enum__pages_v_blocks_dual_column_columns_type" AS ENUM('content', 'image');
CREATE TYPE "public"."enum__pages_v_blocks_dual_column_padding_top_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum__pages_v_blocks_dual_column_padding_bottom_option" AS ENUM('none', 'small', 'default', 'big');
CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');

ALTER TYPE "public"."enum_services_hero_links_link_style" ADD VALUE 'primary-gradient-dots';
ALTER TYPE "public"."enum_pages_blocks_faq_cta_cta_link_style" ADD VALUE 'primary-gradient-dots';
ALTER TYPE "public"."enum_pages_hero_links_link_style" ADD VALUE 'primary-gradient-dots';
ALTER TYPE "public"."enum__pages_v_blocks_faq_cta_cta_link_style" ADD VALUE 'primary-gradient-dots';
ALTER TYPE "public"."enum__pages_v_version_hero_links_link_style" ADD VALUE 'primary-gradient-dots';
ALTER TYPE "public"."enum_header_nav_items_link_style" ADD VALUE 'primary-gradient-dots';
ALTER TYPE "public"."enum_footer_cta_links_link_style" ADD VALUE 'primary-gradient-dots';
ALTER TYPE "public"."enum_footer_nav_links_link_style" ADD VALUE 'primary-gradient-dots';
ALTER TYPE "public"."enum_footer_bottom_links_link_style" ADD VALUE 'primary-gradient-dots';

CREATE TABLE "pages_blocks_title_content_links" (
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

CREATE TABLE "pages_blocks_title_content" (
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

CREATE TABLE "pages_blocks_images_grid_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"image_id" integer,
	"title" varchar,
	"link" varchar
);

CREATE TABLE "pages_blocks_images_grid" (
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

CREATE TABLE "pages_blocks_cards_grid_cards" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" varchar,
	"title" varchar,
	"description" varchar,
	"link" varchar
);

CREATE TABLE "pages_blocks_cards_grid" (
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

CREATE TABLE "pages_blocks_service_areas_block_custom_service_areas" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar
);

CREATE TABLE "pages_blocks_service_areas_block" (
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

CREATE TABLE "pages_blocks_highlighted_services" (
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

CREATE TABLE "pages_blocks_numbers_number_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar,
	"description" varchar
);

CREATE TABLE "pages_blocks_numbers" (
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

CREATE TABLE "pages_blocks_dual_column_columns_links" (
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

CREATE TABLE "pages_blocks_dual_column_columns" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_pages_blocks_dual_column_columns_type" DEFAULT 'content',
	"image_id" integer,
	"rich_text" jsonb
);

CREATE TABLE "pages_blocks_dual_column" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"padding_top_option" "enum_pages_blocks_dual_column_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum_pages_blocks_dual_column_padding_bottom_option" DEFAULT 'default',
	"block_name" varchar
);

CREATE TABLE "pages_blocks_form_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"form_id" integer,
	"enable_intro" boolean DEFAULT false,
	"intro_content" jsonb,
	"block_name" varchar
);

CREATE TABLE "_pages_v_blocks_title_content_links" (
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

CREATE TABLE "_pages_v_blocks_title_content" (
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

CREATE TABLE "_pages_v_blocks_images_grid_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer,
	"title" varchar,
	"link" varchar,
	"_uuid" varchar
);

CREATE TABLE "_pages_v_blocks_images_grid" (
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

CREATE TABLE "_pages_v_blocks_cards_grid_cards" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"icon" varchar,
	"title" varchar,
	"description" varchar,
	"link" varchar,
	"_uuid" varchar
);

CREATE TABLE "_pages_v_blocks_cards_grid" (
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

CREATE TABLE "_pages_v_blocks_service_areas_block_custom_service_areas" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"_uuid" varchar
);

CREATE TABLE "_pages_v_blocks_service_areas_block" (
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

CREATE TABLE "_pages_v_blocks_highlighted_services" (
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

CREATE TABLE "_pages_v_blocks_numbers_number_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar,
	"description" varchar,
	"_uuid" varchar
);

CREATE TABLE "_pages_v_blocks_numbers" (
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

CREATE TABLE "_pages_v_blocks_dual_column_columns_links" (
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

CREATE TABLE "_pages_v_blocks_dual_column_columns" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"type" "enum__pages_v_blocks_dual_column_columns_type" DEFAULT 'content',
	"image_id" integer,
	"rich_text" jsonb,
	"_uuid" varchar
);

CREATE TABLE "_pages_v_blocks_dual_column" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"padding_top_option" "enum__pages_v_blocks_dual_column_padding_top_option" DEFAULT 'default',
	"padding_bottom_option" "enum__pages_v_blocks_dual_column_padding_bottom_option" DEFAULT 'default',
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE "_pages_v_blocks_form_block" (
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
