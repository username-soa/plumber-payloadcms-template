-- ==========================================
-- ADVANCED DIAGNOSTIC SCRIPT
-- ==========================================
-- Purpose: Find where the "NumbersBlock" data is hiding.
-- Run this in the Supabase SQL Editor.

-- 1. Search for ANY table containing "numbers" in its name
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name ILIKE '%numbers%';

-- 2. Search for ANY table containing "sub_title" column
-- "subTitle" is a unique field in your NumbersBlock. 
-- Payload converts camelCase to snake_case in Postgres (subTitle -> sub_title).
-- Finding the table with this column will reveal the actual table name.
SELECT table_name, column_name 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND column_name ILIKE '%sub_title%';

-- 3. Search for ANY table containing "items" in its name (legacy check)
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name ILIKE '%items%';

-- 4. List all Page Block tables to see the naming pattern
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'pages_blocks_%';
