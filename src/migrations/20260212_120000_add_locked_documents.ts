import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	// 1. Create the main table if it doesn't exist (you said it does, but this is safe)
	await db.execute(sql`
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
  
  -- 2. ADD THE MISSING COLUMNS FOR FORMS
  -- This is likely the part that is actually missing and causing the error
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

  -- 3. Add constraints for the new columns
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_id_forms_id_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_id_form_submissions_id_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  -- 4. Create indexes for performance
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  `);
}

export async function down({
	db,
	payload,
	req,
}: MigrateDownArgs): Promise<void> {
	// We generally don't remove columns in down migrations to prevent data loss,
	// but if you wanted to revert strictly:
	/*
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "forms_id";
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "form_submissions_id";
  `)
  */
}
