DO $$
BEGIN
    -- Add columns to _pages_v_blocks_form_block if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = '_pages_v_blocks_form_block' AND column_name = 'padding_top_option') THEN
        ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "padding_top_option" VARCHAR;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = '_pages_v_blocks_form_block' AND column_name = 'padding_bottom_option') THEN
        ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "padding_bottom_option" VARCHAR;
    END IF;

    -- Add columns to pages_blocks_form_block if they don't exist (for non-versioned data)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages_blocks_form_block' AND column_name = 'padding_top_option') THEN
        ALTER TABLE "pages_blocks_form_block" ADD COLUMN "padding_top_option" VARCHAR;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages_blocks_form_block' AND column_name = 'padding_bottom_option') THEN
        ALTER TABLE "pages_blocks_form_block" ADD COLUMN "padding_bottom_option" VARCHAR;
    END IF;
END $$;
