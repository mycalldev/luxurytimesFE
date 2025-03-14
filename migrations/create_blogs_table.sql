-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  author TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  publish_date DATE DEFAULT CURRENT_DATE,
  read_time TEXT,
  featured_image TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  user_id UUID REFERENCES auth.users(id)
);

-- Add RLS policies for blogs table
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Policy for admin users to view all blogs
CREATE POLICY "Admin users can view all blogs" ON blogs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );


-- Create function to update the updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_blog_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function before update
CREATE TRIGGER update_blog_timestamp
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_blog_updated_at(); 