DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('default', 'highImpact', 'servicesHero', 'minimal', 'none');
EXCEPTION
  WHEN duplicate_object THEN null;
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
 ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_logo_id_media_id_fk" FOREIGN KEY ("version_hero_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
 ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_trust_indicators_order_idx" ON "_pages_v_version_hero_trust_indicators" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_trust_indicators_parent_id_idx" ON "_pages_v_version_hero_trust_indicators" USING btree ("_parent_id");
DO $$ BEGIN
 ALTER TABLE "_pages_v_version_hero_trust_indicators" ADD CONSTRAINT "_pages_v_version_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");

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
 ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
