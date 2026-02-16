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
ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
