import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  
  CREATE TABLE "forms_blocks_checkbox" (
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
  
  CREATE TABLE "forms_blocks_country" (
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
  
  CREATE TABLE "forms_blocks_email" (
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
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
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
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
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
  
  CREATE TABLE "forms_blocks_state" (
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
  
  CREATE TABLE "forms_blocks_text" (
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
  
  CREATE TABLE "forms_blocks_textarea" (
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
  
  CREATE TABLE "forms_emails" (
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
  
  CREATE TABLE "forms" (
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
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_faqs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "services_process" CASCADE;
  DROP TABLE "services_faqs" CASCADE;
  ALTER TABLE "case_studies" DROP CONSTRAINT "case_studies_testimonial_id_testimonials_id_fk";
  
  ALTER TABLE "_case_studies_v" DROP CONSTRAINT "_case_studies_v_version_testimonial_id_testimonials_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  DROP INDEX "case_studies_testimonial_idx";
  DROP INDEX "_case_studies_v_version_version_testimonial_idx";
  DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
  ALTER TABLE "case_studies" ADD COLUMN "review_id" integer;
  ALTER TABLE "_case_studies_v" ADD COLUMN "version_review_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "forms_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "form_submissions_id" integer;
  ALTER TABLE "pages_blocks_title_content_links" ADD CONSTRAINT "pages_blocks_title_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_title_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_title_content" ADD CONSTRAINT "pages_blocks_title_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_images_grid_items" ADD CONSTRAINT "pages_blocks_images_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_images_grid_items" ADD CONSTRAINT "pages_blocks_images_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_images_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_images_grid" ADD CONSTRAINT "pages_blocks_images_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_grid_cards" ADD CONSTRAINT "pages_blocks_cards_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_grid" ADD CONSTRAINT "pages_blocks_cards_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_areas_block_custom_service_areas" ADD CONSTRAINT "pages_blocks_service_areas_block_custom_service_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_areas_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_areas_block" ADD CONSTRAINT "pages_blocks_service_areas_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_highlighted_services" ADD CONSTRAINT "pages_blocks_highlighted_services_emergency_service_id_services_id_fk" FOREIGN KEY ("emergency_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_highlighted_services" ADD CONSTRAINT "pages_blocks_highlighted_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbers_number_items" ADD CONSTRAINT "pages_blocks_numbers_number_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_numbers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbers" ADD CONSTRAINT "pages_blocks_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dual_column_columns_links" ADD CONSTRAINT "pages_blocks_dual_column_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dual_column_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dual_column_columns" ADD CONSTRAINT "pages_blocks_dual_column_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_dual_column_columns" ADD CONSTRAINT "pages_blocks_dual_column_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dual_column"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dual_column" ADD CONSTRAINT "pages_blocks_dual_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_title_content_links" ADD CONSTRAINT "_pages_v_blocks_title_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_title_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_title_content" ADD CONSTRAINT "_pages_v_blocks_title_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_images_grid_items" ADD CONSTRAINT "_pages_v_blocks_images_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_images_grid_items" ADD CONSTRAINT "_pages_v_blocks_images_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_images_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_images_grid" ADD CONSTRAINT "_pages_v_blocks_images_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_grid_cards" ADD CONSTRAINT "_pages_v_blocks_cards_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_grid" ADD CONSTRAINT "_pages_v_blocks_cards_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_areas_block_custom_service_areas" ADD CONSTRAINT "_pages_v_blocks_service_areas_block_custom_service_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_areas_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_areas_block" ADD CONSTRAINT "_pages_v_blocks_service_areas_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_highlighted_services" ADD CONSTRAINT "_pages_v_blocks_highlighted_services_emergency_service_id_services_id_fk" FOREIGN KEY ("emergency_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_highlighted_services" ADD CONSTRAINT "_pages_v_blocks_highlighted_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_numbers_number_items" ADD CONSTRAINT "_pages_v_blocks_numbers_number_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_numbers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_numbers" ADD CONSTRAINT "_pages_v_blocks_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dual_column_columns_links" ADD CONSTRAINT "_pages_v_blocks_dual_column_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_dual_column_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dual_column_columns" ADD CONSTRAINT "_pages_v_blocks_dual_column_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dual_column_columns" ADD CONSTRAINT "_pages_v_blocks_dual_column_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_dual_column"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dual_column" ADD CONSTRAINT "_pages_v_blocks_dual_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_title_content_links_order_idx" ON "pages_blocks_title_content_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_title_content_links_parent_id_idx" ON "pages_blocks_title_content_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_title_content_order_idx" ON "pages_blocks_title_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_title_content_parent_id_idx" ON "pages_blocks_title_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_title_content_path_idx" ON "pages_blocks_title_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_images_grid_items_order_idx" ON "pages_blocks_images_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_images_grid_items_parent_id_idx" ON "pages_blocks_images_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_images_grid_items_image_idx" ON "pages_blocks_images_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_images_grid_order_idx" ON "pages_blocks_images_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_images_grid_parent_id_idx" ON "pages_blocks_images_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_images_grid_path_idx" ON "pages_blocks_images_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_cards_grid_cards_order_idx" ON "pages_blocks_cards_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_grid_cards_parent_id_idx" ON "pages_blocks_cards_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_grid_order_idx" ON "pages_blocks_cards_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_grid_parent_id_idx" ON "pages_blocks_cards_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_grid_path_idx" ON "pages_blocks_cards_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_areas_block_custom_service_areas_order_idx" ON "pages_blocks_service_areas_block_custom_service_areas" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_areas_block_custom_service_areas_parent_id_idx" ON "pages_blocks_service_areas_block_custom_service_areas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_areas_block_order_idx" ON "pages_blocks_service_areas_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_areas_block_parent_id_idx" ON "pages_blocks_service_areas_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_areas_block_path_idx" ON "pages_blocks_service_areas_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_highlighted_services_order_idx" ON "pages_blocks_highlighted_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_highlighted_services_parent_id_idx" ON "pages_blocks_highlighted_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_highlighted_services_path_idx" ON "pages_blocks_highlighted_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_highlighted_services_emergency_service_idx" ON "pages_blocks_highlighted_services" USING btree ("emergency_service_id");
  CREATE INDEX "pages_blocks_numbers_number_items_order_idx" ON "pages_blocks_numbers_number_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbers_number_items_parent_id_idx" ON "pages_blocks_numbers_number_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbers_order_idx" ON "pages_blocks_numbers" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbers_parent_id_idx" ON "pages_blocks_numbers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbers_path_idx" ON "pages_blocks_numbers" USING btree ("_path");
  CREATE INDEX "pages_blocks_dual_column_columns_links_order_idx" ON "pages_blocks_dual_column_columns_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_dual_column_columns_links_parent_id_idx" ON "pages_blocks_dual_column_columns_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dual_column_columns_order_idx" ON "pages_blocks_dual_column_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_dual_column_columns_parent_id_idx" ON "pages_blocks_dual_column_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dual_column_columns_image_idx" ON "pages_blocks_dual_column_columns" USING btree ("image_id");
  CREATE INDEX "pages_blocks_dual_column_order_idx" ON "pages_blocks_dual_column" USING btree ("_order");
  CREATE INDEX "pages_blocks_dual_column_parent_id_idx" ON "pages_blocks_dual_column" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dual_column_path_idx" ON "pages_blocks_dual_column" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_title_content_links_order_idx" ON "_pages_v_blocks_title_content_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_title_content_links_parent_id_idx" ON "_pages_v_blocks_title_content_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_title_content_order_idx" ON "_pages_v_blocks_title_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_title_content_parent_id_idx" ON "_pages_v_blocks_title_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_title_content_path_idx" ON "_pages_v_blocks_title_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_images_grid_items_order_idx" ON "_pages_v_blocks_images_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_images_grid_items_parent_id_idx" ON "_pages_v_blocks_images_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_images_grid_items_image_idx" ON "_pages_v_blocks_images_grid_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_images_grid_order_idx" ON "_pages_v_blocks_images_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_images_grid_parent_id_idx" ON "_pages_v_blocks_images_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_images_grid_path_idx" ON "_pages_v_blocks_images_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cards_grid_cards_order_idx" ON "_pages_v_blocks_cards_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_grid_cards_parent_id_idx" ON "_pages_v_blocks_cards_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_grid_order_idx" ON "_pages_v_blocks_cards_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_grid_parent_id_idx" ON "_pages_v_blocks_cards_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_grid_path_idx" ON "_pages_v_blocks_cards_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_areas_block_custom_service_areas_order_idx" ON "_pages_v_blocks_service_areas_block_custom_service_areas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_areas_block_custom_service_areas_parent_id_idx" ON "_pages_v_blocks_service_areas_block_custom_service_areas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_areas_block_order_idx" ON "_pages_v_blocks_service_areas_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_areas_block_parent_id_idx" ON "_pages_v_blocks_service_areas_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_areas_block_path_idx" ON "_pages_v_blocks_service_areas_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_highlighted_services_order_idx" ON "_pages_v_blocks_highlighted_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_highlighted_services_parent_id_idx" ON "_pages_v_blocks_highlighted_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_highlighted_services_path_idx" ON "_pages_v_blocks_highlighted_services" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_highlighted_services_emergency_service_idx" ON "_pages_v_blocks_highlighted_services" USING btree ("emergency_service_id");
  CREATE INDEX "_pages_v_blocks_numbers_number_items_order_idx" ON "_pages_v_blocks_numbers_number_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_numbers_number_items_parent_id_idx" ON "_pages_v_blocks_numbers_number_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_numbers_order_idx" ON "_pages_v_blocks_numbers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_numbers_parent_id_idx" ON "_pages_v_blocks_numbers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_numbers_path_idx" ON "_pages_v_blocks_numbers" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_dual_column_columns_links_order_idx" ON "_pages_v_blocks_dual_column_columns_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_dual_column_columns_links_parent_id_idx" ON "_pages_v_blocks_dual_column_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_dual_column_columns_order_idx" ON "_pages_v_blocks_dual_column_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_dual_column_columns_parent_id_idx" ON "_pages_v_blocks_dual_column_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_dual_column_columns_image_idx" ON "_pages_v_blocks_dual_column_columns" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_dual_column_order_idx" ON "_pages_v_blocks_dual_column" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_dual_column_parent_id_idx" ON "_pages_v_blocks_dual_column" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_dual_column_path_idx" ON "_pages_v_blocks_dual_column" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_review_id_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_review_id_reviews_id_fk" FOREIGN KEY ("version_review_id") REFERENCES "public"."reviews"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "case_studies_review_idx" ON "case_studies" USING btree ("review_id");
  CREATE INDEX "_case_studies_v_version_version_review_idx" ON "_case_studies_v" USING btree ("version_review_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  ALTER TABLE "case_studies" DROP COLUMN "testimonial_id";
  ALTER TABLE "_case_studies_v" DROP COLUMN "version_testimonial_id";
  ALTER TABLE "pages_blocks_content_fetcher" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_content_fetcher" DROP COLUMN "title_highlight";
  ALTER TABLE "pages_blocks_content_fetcher" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_content_fetcher" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_content_fetcher" DROP COLUMN "title_highlight";
  ALTER TABLE "_pages_v_blocks_content_fetcher" DROP COLUMN "description";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  
  ALTER TABLE "pages_blocks_title_content_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_title_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_images_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_images_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cards_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cards_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_service_areas_block_custom_service_areas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_service_areas_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_highlighted_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_numbers_number_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_numbers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_dual_column_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_dual_column_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_dual_column" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_title_content_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_title_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_images_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_images_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cards_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cards_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_areas_block_custom_service_areas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_areas_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_highlighted_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_numbers_number_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_numbers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_dual_column_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_dual_column_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_dual_column" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_checkbox" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_country" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_email" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_message" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_number" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_state" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_textarea" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_emails" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_submissions_submission_data" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_submissions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_title_content_links" CASCADE;
  DROP TABLE "pages_blocks_title_content" CASCADE;
  DROP TABLE "pages_blocks_images_grid_items" CASCADE;
  DROP TABLE "pages_blocks_images_grid" CASCADE;
  DROP TABLE "pages_blocks_cards_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_cards_grid" CASCADE;
  DROP TABLE "pages_blocks_service_areas_block_custom_service_areas" CASCADE;
  DROP TABLE "pages_blocks_service_areas_block" CASCADE;
  DROP TABLE "pages_blocks_highlighted_services" CASCADE;
  DROP TABLE "pages_blocks_numbers_number_items" CASCADE;
  DROP TABLE "pages_blocks_numbers" CASCADE;
  DROP TABLE "pages_blocks_dual_column_columns_links" CASCADE;
  DROP TABLE "pages_blocks_dual_column_columns" CASCADE;
  DROP TABLE "pages_blocks_dual_column" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_title_content_links" CASCADE;
  DROP TABLE "_pages_v_blocks_title_content" CASCADE;
  DROP TABLE "_pages_v_blocks_images_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_images_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_service_areas_block_custom_service_areas" CASCADE;
  DROP TABLE "_pages_v_blocks_service_areas_block" CASCADE;
  DROP TABLE "_pages_v_blocks_highlighted_services" CASCADE;
  DROP TABLE "_pages_v_blocks_numbers_number_items" CASCADE;
  DROP TABLE "_pages_v_blocks_numbers" CASCADE;
  DROP TABLE "_pages_v_blocks_dual_column_columns_links" CASCADE;
  DROP TABLE "_pages_v_blocks_dual_column_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_dual_column" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  ALTER TABLE "case_studies" DROP CONSTRAINT "case_studies_review_id_reviews_id_fk";
  
  ALTER TABLE "_case_studies_v" DROP CONSTRAINT "_case_studies_v_version_review_id_reviews_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_forms_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_form_submissions_fk";
  
  ALTER TABLE "services_hero_links" ALTER COLUMN "link_style" SET DATA TYPE text;
  ALTER TABLE "services_hero_links" ALTER COLUMN "link_style" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_services_hero_links_link_style";
  CREATE TYPE "public"."enum_services_hero_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
  ALTER TABLE "services_hero_links" ALTER COLUMN "link_style" SET DEFAULT 'primary'::"public"."enum_services_hero_links_link_style";
  ALTER TABLE "services_hero_links" ALTER COLUMN "link_style" SET DATA TYPE "public"."enum_services_hero_links_link_style" USING "link_style"::"public"."enum_services_hero_links_link_style";
  ALTER TABLE "pages_blocks_faq" ALTER COLUMN "cta_cta_link_style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_faq" ALTER COLUMN "cta_cta_link_style" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_faq_cta_cta_link_style";
  CREATE TYPE "public"."enum_pages_blocks_faq_cta_cta_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
  ALTER TABLE "pages_blocks_faq" ALTER COLUMN "cta_cta_link_style" SET DEFAULT 'primary'::"public"."enum_pages_blocks_faq_cta_cta_link_style";
  ALTER TABLE "pages_blocks_faq" ALTER COLUMN "cta_cta_link_style" SET DATA TYPE "public"."enum_pages_blocks_faq_cta_cta_link_style" USING "cta_cta_link_style"::"public"."enum_pages_blocks_faq_cta_cta_link_style";
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_style" SET DATA TYPE text;
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_style" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_hero_links_link_style";
  CREATE TYPE "public"."enum_pages_hero_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_style" SET DEFAULT 'primary'::"public"."enum_pages_hero_links_link_style";
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_style" SET DATA TYPE "public"."enum_pages_hero_links_link_style" USING "link_style"::"public"."enum_pages_hero_links_link_style";
  ALTER TABLE "_pages_v_blocks_faq" ALTER COLUMN "cta_cta_link_style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_faq" ALTER COLUMN "cta_cta_link_style" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_faq_cta_cta_link_style";
  CREATE TYPE "public"."enum__pages_v_blocks_faq_cta_cta_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
  ALTER TABLE "_pages_v_blocks_faq" ALTER COLUMN "cta_cta_link_style" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_faq_cta_cta_link_style";
  ALTER TABLE "_pages_v_blocks_faq" ALTER COLUMN "cta_cta_link_style" SET DATA TYPE "public"."enum__pages_v_blocks_faq_cta_cta_link_style" USING "cta_cta_link_style"::"public"."enum__pages_v_blocks_faq_cta_cta_link_style";
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_style" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_style";
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_style" SET DEFAULT 'primary'::"public"."enum__pages_v_version_hero_links_link_style";
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_style" SET DATA TYPE "public"."enum__pages_v_version_hero_links_link_style" USING "link_style"::"public"."enum__pages_v_version_hero_links_link_style";
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_style" SET DATA TYPE text;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_style" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_header_nav_items_link_style";
  CREATE TYPE "public"."enum_header_nav_items_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_style" SET DEFAULT 'primary'::"public"."enum_header_nav_items_link_style";
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_style" SET DATA TYPE "public"."enum_header_nav_items_link_style" USING "link_style"::"public"."enum_header_nav_items_link_style";
  ALTER TABLE "footer_cta_links" ALTER COLUMN "link_style" SET DATA TYPE text;
  ALTER TABLE "footer_cta_links" ALTER COLUMN "link_style" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_footer_cta_links_link_style";
  CREATE TYPE "public"."enum_footer_cta_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
  ALTER TABLE "footer_cta_links" ALTER COLUMN "link_style" SET DEFAULT 'primary'::"public"."enum_footer_cta_links_link_style";
  ALTER TABLE "footer_cta_links" ALTER COLUMN "link_style" SET DATA TYPE "public"."enum_footer_cta_links_link_style" USING "link_style"::"public"."enum_footer_cta_links_link_style";
  ALTER TABLE "footer_nav_links" ALTER COLUMN "link_style" SET DATA TYPE text;
  ALTER TABLE "footer_nav_links" ALTER COLUMN "link_style" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_footer_nav_links_link_style";
  CREATE TYPE "public"."enum_footer_nav_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
  ALTER TABLE "footer_nav_links" ALTER COLUMN "link_style" SET DEFAULT 'primary'::"public"."enum_footer_nav_links_link_style";
  ALTER TABLE "footer_nav_links" ALTER COLUMN "link_style" SET DATA TYPE "public"."enum_footer_nav_links_link_style" USING "link_style"::"public"."enum_footer_nav_links_link_style";
  ALTER TABLE "footer_bottom_links" ALTER COLUMN "link_style" SET DATA TYPE text;
  ALTER TABLE "footer_bottom_links" ALTER COLUMN "link_style" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_footer_bottom_links_link_style";
  CREATE TYPE "public"."enum_footer_bottom_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
  ALTER TABLE "footer_bottom_links" ALTER COLUMN "link_style" SET DEFAULT 'primary'::"public"."enum_footer_bottom_links_link_style";
  ALTER TABLE "footer_bottom_links" ALTER COLUMN "link_style" SET DATA TYPE "public"."enum_footer_bottom_links_link_style" USING "link_style"::"public"."enum_footer_bottom_links_link_style";
  DROP INDEX "case_studies_review_idx";
  DROP INDEX "_case_studies_v_version_version_review_idx";
  DROP INDEX "payload_locked_documents_rels_forms_id_idx";
  DROP INDEX "payload_locked_documents_rels_form_submissions_id_idx";
  ALTER TABLE "case_studies" ADD COLUMN "testimonial_id" integer;
  ALTER TABLE "_case_studies_v" ADD COLUMN "version_testimonial_id" integer;
  ALTER TABLE "pages_blocks_content_fetcher" ADD COLUMN "title" varchar DEFAULT 'Latest Posts';
  ALTER TABLE "pages_blocks_content_fetcher" ADD COLUMN "title_highlight" varchar;
  ALTER TABLE "pages_blocks_content_fetcher" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_content_fetcher" ADD COLUMN "title" varchar DEFAULT 'Latest Posts';
  ALTER TABLE "_pages_v_blocks_content_fetcher" ADD COLUMN "title_highlight" varchar;
  ALTER TABLE "_pages_v_blocks_content_fetcher" ADD COLUMN "description" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_process" ADD CONSTRAINT "services_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_faqs" ADD CONSTRAINT "services_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "services_process_order_idx" ON "services_process" USING btree ("_order");
  CREATE INDEX "services_process_parent_id_idx" ON "services_process" USING btree ("_parent_id");
  CREATE INDEX "services_faqs_order_idx" ON "services_faqs" USING btree ("_order");
  CREATE INDEX "services_faqs_parent_id_idx" ON "services_faqs" USING btree ("_parent_id");
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_testimonial_id_testimonials_id_fk" FOREIGN KEY ("version_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "case_studies_testimonial_idx" ON "case_studies" USING btree ("testimonial_id");
  CREATE INDEX "_case_studies_v_version_version_testimonial_idx" ON "_case_studies_v" USING btree ("version_testimonial_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  ALTER TABLE "case_studies" DROP COLUMN "review_id";
  ALTER TABLE "_case_studies_v" DROP COLUMN "version_review_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "forms_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "form_submissions_id";
  DROP TYPE "public"."enum_pages_blocks_title_content_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_title_content_links_link_style";
  DROP TYPE "public"."enum_pages_blocks_title_content_text_align";
  DROP TYPE "public"."enum_pages_blocks_title_content_buttons_align";
  DROP TYPE "public"."enum_pages_blocks_title_content_padding_top_option";
  DROP TYPE "public"."enum_pages_blocks_title_content_padding_bottom_option";
  DROP TYPE "public"."enum_pages_blocks_images_grid_text_align";
  DROP TYPE "public"."enum_pages_blocks_images_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_images_grid_padding_top_option";
  DROP TYPE "public"."enum_pages_blocks_images_grid_padding_bottom_option";
  DROP TYPE "public"."enum_pages_blocks_cards_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_cards_grid_card_layout";
  DROP TYPE "public"."enum_pages_blocks_cards_grid_padding_top_option";
  DROP TYPE "public"."enum_pages_blocks_cards_grid_padding_bottom_option";
  DROP TYPE "public"."enum_pages_blocks_service_areas_block_padding_top_option";
  DROP TYPE "public"."enum_pages_blocks_service_areas_block_padding_bottom_option";
  DROP TYPE "public"."enum_pages_blocks_highlighted_services_layout";
  DROP TYPE "public"."enum_pages_blocks_highlighted_services_cta_type";
  DROP TYPE "public"."enum_pages_blocks_highlighted_services_cta_style";
  DROP TYPE "public"."enum_pages_blocks_highlighted_services_padding_top_option";
  DROP TYPE "public"."enum_pages_blocks_highlighted_services_padding_bottom_option";
  DROP TYPE "public"."enum_pages_blocks_numbers_text_align";
  DROP TYPE "public"."enum_pages_blocks_numbers_text_color";
  DROP TYPE "public"."enum_pages_blocks_numbers_padding_top_option";
  DROP TYPE "public"."enum_pages_blocks_numbers_padding_bottom_option";
  DROP TYPE "public"."enum_pages_blocks_numbers_columns";
  DROP TYPE "public"."enum_pages_blocks_dual_column_columns_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_dual_column_columns_links_link_style";
  DROP TYPE "public"."enum_pages_blocks_dual_column_columns_type";
  DROP TYPE "public"."enum_pages_blocks_dual_column_padding_top_option";
  DROP TYPE "public"."enum_pages_blocks_dual_column_padding_bottom_option";
  DROP TYPE "public"."enum__pages_v_blocks_title_content_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_title_content_links_link_style";
  DROP TYPE "public"."enum__pages_v_blocks_title_content_text_align";
  DROP TYPE "public"."enum__pages_v_blocks_title_content_buttons_align";
  DROP TYPE "public"."enum__pages_v_blocks_title_content_padding_top_option";
  DROP TYPE "public"."enum__pages_v_blocks_title_content_padding_bottom_option";
  DROP TYPE "public"."enum__pages_v_blocks_images_grid_text_align";
  DROP TYPE "public"."enum__pages_v_blocks_images_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_images_grid_padding_top_option";
  DROP TYPE "public"."enum__pages_v_blocks_images_grid_padding_bottom_option";
  DROP TYPE "public"."enum__pages_v_blocks_cards_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_cards_grid_card_layout";
  DROP TYPE "public"."enum__pages_v_blocks_cards_grid_padding_top_option";
  DROP TYPE "public"."enum__pages_v_blocks_cards_grid_padding_bottom_option";
  DROP TYPE "public"."enum__pages_v_blocks_service_areas_block_padding_top_option";
  DROP TYPE "public"."enum__pages_v_blocks_service_areas_block_padding_bottom_option";
  DROP TYPE "public"."enum__pages_v_blocks_highlighted_services_layout";
  DROP TYPE "public"."enum__pages_v_blocks_highlighted_services_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_highlighted_services_cta_style";
  DROP TYPE "public"."enum__pages_v_blocks_highlighted_services_padding_top_option";
  DROP TYPE "public"."enum__pages_v_blocks_highlighted_services_padding_bottom_option";
  DROP TYPE "public"."enum__pages_v_blocks_numbers_text_align";
  DROP TYPE "public"."enum__pages_v_blocks_numbers_text_color";
  DROP TYPE "public"."enum__pages_v_blocks_numbers_padding_top_option";
  DROP TYPE "public"."enum__pages_v_blocks_numbers_padding_bottom_option";
  DROP TYPE "public"."enum__pages_v_blocks_numbers_columns";
  DROP TYPE "public"."enum__pages_v_blocks_dual_column_columns_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_dual_column_columns_links_link_style";
  DROP TYPE "public"."enum__pages_v_blocks_dual_column_columns_type";
  DROP TYPE "public"."enum__pages_v_blocks_dual_column_padding_top_option";
  DROP TYPE "public"."enum__pages_v_blocks_dual_column_padding_bottom_option";
  DROP TYPE "public"."enum_forms_confirmation_type";`)
}
