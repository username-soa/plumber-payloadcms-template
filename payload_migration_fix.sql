-- Fix column type casting for marquee blocks by safely mapping old text values to the new numeric ones

-- 1. Drop default values that are strings
ALTER TABLE pages_blocks_marquee ALTER COLUMN separator_size DROP DEFAULT;
ALTER TABLE _pages_v_blocks_marquee ALTER COLUMN separator_size DROP DEFAULT;
ALTER TABLE services_blocks_marquee ALTER COLUMN separator_size DROP DEFAULT;

-- 2. Cast the columns safely
ALTER TABLE pages_blocks_marquee ALTER COLUMN separator_size SET DATA TYPE numeric USING (
  CASE 
    WHEN separator_size = 'small' THEN 16 
    WHEN separator_size = 'medium' THEN 24 
    WHEN separator_size = 'large' THEN 32 
    ELSE 24 
  END
);

ALTER TABLE _pages_v_blocks_marquee ALTER COLUMN separator_size SET DATA TYPE numeric USING (
  CASE 
    WHEN separator_size = 'small' THEN 16 
    WHEN separator_size = 'medium' THEN 24 
    WHEN separator_size = 'large' THEN 32 
    ELSE 24 
  END
);

ALTER TABLE services_blocks_marquee ALTER COLUMN separator_size SET DATA TYPE numeric USING (
  CASE 
    WHEN separator_size = 'small' THEN 16 
    WHEN separator_size = 'medium' THEN 24 
    WHEN separator_size = 'large' THEN 32 
    ELSE 24 
  END
);

-- Uncomment if you use these:
-- ALTER TABLE case_studies_blocks_marquee ALTER COLUMN separator_size DROP DEFAULT;
-- ALTER TABLE case_studies_blocks_marquee ALTER COLUMN separator_size SET DATA TYPE numeric USING (CASE WHEN separator_size = 'small' THEN 16 WHEN separator_size = 'medium' THEN 24 WHEN separator_size = 'large' THEN 32 ELSE 24 END);
-- ALTER TABLE blog_posts_blocks_marquee ALTER COLUMN separator_size DROP DEFAULT;
-- ALTER TABLE blog_posts_blocks_marquee ALTER COLUMN separator_size SET DATA TYPE numeric USING (CASE WHEN separator_size = 'small' THEN 16 WHEN separator_size = 'medium' THEN 24 WHEN separator_size = 'large' THEN 32 ELSE 24 END);
