-- Drop the tables related to NumbersBlock
DROP TABLE IF EXISTS "pages_blocks_numbers_number_items" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_numbers_number_items" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_numbers" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_numbers" CASCADE;

-- Drop the enums used by NumbersBlock
-- Note: Check if these enums are used by other blocks or collections before running.
-- If they are generic (like 'enum_pages_blocks_numbers_columns'), they might be specific to this block instance
-- due to Payload's naming convention for block fields.

-- Enum for text alignment
DROP TYPE IF EXISTS "enum_pages_blocks_numbers_text_align";
DROP TYPE IF EXISTS "enum__pages_v_blocks_numbers_text_align";

-- Enum for padding options
DROP TYPE IF EXISTS "enum_pages_blocks_numbers_padding_top_option";
DROP TYPE IF EXISTS "enum__pages_v_blocks_numbers_padding_top_option";
DROP TYPE IF EXISTS "enum_pages_blocks_numbers_padding_bottom_option";
DROP TYPE IF EXISTS "enum__pages_v_blocks_numbers_padding_bottom_option";

-- Enum for columns
DROP TYPE IF EXISTS "enum_pages_blocks_numbers_columns";
DROP TYPE IF EXISTS "enum__pages_v_blocks_numbers_columns";
