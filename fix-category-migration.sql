-- Fix migration: Drop old enum-based category columns so Payload can create fresh integer columns

-- Drop columns from main tables
ALTER TABLE "blog_posts" DROP COLUMN IF EXISTS "category_id";
ALTER TABLE "blog_posts" DROP COLUMN IF EXISTS "category";
ALTER TABLE "case_studies" DROP COLUMN IF EXISTS "category_id";
ALTER TABLE "case_studies" DROP COLUMN IF EXISTS "category";

-- Drop columns from version tables
ALTER TABLE "_blog_posts_v" DROP COLUMN IF EXISTS "version_category_id";
ALTER TABLE "_blog_posts_v" DROP COLUMN IF EXISTS "version_category";
ALTER TABLE "_case_studies_v" DROP COLUMN IF EXISTS "version_category_id";
ALTER TABLE "_case_studies_v" DROP COLUMN IF EXISTS "version_category";

-- Drop the old enum types if they exist
DROP TYPE IF EXISTS "enum_blog_posts_category";
DROP TYPE IF EXISTS "enum_case_studies_category";
DROP TYPE IF EXISTS "enum__blog_posts_v_version_category";
DROP TYPE IF EXISTS "enum__case_studies_v_version_category";
