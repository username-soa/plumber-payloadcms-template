import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
   -- 1. Ensure Enums exist
   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('default', 'highImpact', 'servicesHero', 'minimal', 'none');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_version_hero_badge_variant" AS ENUM('default', 'secondary', 'destructive', 'outline');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_version_hero_badge_size" AS ENUM('sm', 'default', 'lg');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_version_hero_hero_theme" AS ENUM('muted', 'primary-gradient');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom', 'email', 'phone', 'badge');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_version_hero_links_link_style" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'destructive', 'badge', 'badge-pulsing');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;


   -- 2. Add columns to _pages_v if they don't exist
   ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'default';
   ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_title" varchar;
   ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_title_highlight" varchar;
   ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_description" varchar;
   ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_floating_text" varchar;
   ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_badge_content" varchar;
   ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_badge_variant" "enum__pages_v_version_hero_badge_variant" DEFAULT 'default';
   ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_badge_size" "enum__pages_v_version_hero_badge_size" DEFAULT 'default';
   ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_badge_icon" varchar;
   ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_bg_image_id" integer;
   ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_fg_image_id" integer;
   ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_hero_theme" "enum__pages_v_version_hero_hero_theme" DEFAULT 'muted';
   ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_show_date" boolean;

   -- 3. Ensure foreign keys for images
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
   
   -- 4. Create missing tables for array fields (Hero Links & Trust Indicators)
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

   -- 5. Indexes and FKs for new tables
   -- Hero Links
   CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
   DO $$ BEGIN
    ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;

   -- Hero Trust Indicators
   CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_trust_indicators_order_idx" ON "_pages_v_version_hero_trust_indicators" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_trust_indicators_parent_id_idx" ON "_pages_v_version_hero_trust_indicators" USING btree ("_parent_id");
   DO $$ BEGIN
    ALTER TABLE "_pages_v_version_hero_trust_indicators" ADD CONSTRAINT "_pages_v_version_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;

   -- Form Block (Missing from previous migration)
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

   -- Ensure main Pages Form Block table exists (Found missing in runtime)
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

  `);
}

export async function down({
	db,
	payload,
	req,
}: MigrateDownArgs): Promise<void> {
	// Down migration is tricky with "safe" ups. We generally don't want to blindly drop columns if we aren't sure we created them.
	// But for a fix migration, usually we just assume manual rollback if needed.
	// We can leave this empty or attempt to drop if existing.
	await db.execute(sql`
    -- Optional: Drop columns if you want to revert this specific fix
    -- ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_type";
    -- ...
  `);
}
