-- Add meta_keywords column to the blogs table if it doesn't exist
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_keywords TEXT;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'blogs'
ORDER BY ordinal_position; 