import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_numbers_columns') THEN
        CREATE TYPE "public"."enum_pages_blocks_numbers_columns" AS ENUM('1', '2', '3', '4', '5', '6');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_numbers_columns') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_numbers_columns" AS ENUM('1', '2', '3', '4', '5', '6');
      END IF;
    END $$;

    ALTER TABLE "pages_blocks_numbers" 
    ALTER COLUMN "columns" TYPE "public"."enum_pages_blocks_numbers_columns" 
    USING "columns"::text::"public"."enum_pages_blocks_numbers_columns";

    ALTER TABLE "_pages_v_blocks_numbers" 
    ALTER COLUMN "columns" TYPE "public"."enum__pages_v_blocks_numbers_columns" 
    USING "columns"::text::"public"."enum__pages_v_blocks_numbers_columns";

    ALTER TABLE "pages_blocks_numbers" ALTER COLUMN "columns" SET DEFAULT '3';
    ALTER TABLE "_pages_v_blocks_numbers" ALTER COLUMN "columns" SET DEFAULT '3';
  `);
}

export async function down({
	db,
	payload,
	req,
}: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
    ALTER TABLE "pages_blocks_numbers" 
    ALTER COLUMN "columns" TYPE numeric 
    USING "columns"::text::numeric;

    ALTER TABLE "_pages_v_blocks_numbers" 
    ALTER COLUMN "columns" TYPE numeric 
    USING "columns"::text::numeric;
  `);
}
