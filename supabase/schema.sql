-- Create admin_users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON admin_users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create security policies
-- Allow admins to see all users
CREATE POLICY "Admins can view all users"
  ON admin_users
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users WHERE role = 'admin'
    )
  );

-- Allow editors to see only themselves
CREATE POLICY "Editors can view only themselves"
  ON admin_users
  FOR SELECT
  USING (
    auth.uid() = id OR
    auth.uid() IN (
      SELECT id FROM admin_users WHERE role = 'admin'
    )
  );

-- Only admins can insert new users
CREATE POLICY "Only admins can insert users"
  ON admin_users
  FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM admin_users WHERE role = 'admin'
    )
  );

-- Only admins can update users, editors can update only themselves
CREATE POLICY "Admins can update any user, editors only themselves"
  ON admin_users
  FOR UPDATE
  USING (
    auth.uid() = id OR
    auth.uid() IN (
      SELECT id FROM admin_users WHERE role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() = id OR
    auth.uid() IN (
      SELECT id FROM admin_users WHERE role = 'admin'
    )
  );

-- Only admins can delete users, and they cannot delete themselves
CREATE POLICY "Only admins can delete users"
  ON admin_users
  FOR DELETE
  USING (
    auth.uid() != id AND
    auth.uid() IN (
      SELECT id FROM admin_users WHERE role = 'admin'
    )
  );

-- Create watches table
CREATE TABLE watches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand TEXT NOT NULL CHECK (brand IN ('rolex', 'patek_philippe', 'audemars_piguet')),
  model TEXT NOT NULL,
  reference_number TEXT NOT NULL,
  year INTEGER,
  description TEXT,
  price DECIMAL(10, 2),
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id),
  updated_by UUID REFERENCES admin_users(id)
);

-- Create a trigger to update the updated_at column for watches
CREATE TRIGGER update_watches_updated_at
BEFORE UPDATE ON watches
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security for watches
ALTER TABLE watches ENABLE ROW LEVEL SECURITY;

-- Create security policies for watches
-- Anyone can view available watches
CREATE POLICY "Anyone can view available watches"
  ON watches
  FOR SELECT
  USING (is_available = TRUE);

-- Authenticated admin users can view all watches
CREATE POLICY "Authenticated admin users can view all watches"
  ON watches
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users
    )
  );

-- Only authenticated admin users can insert watches
CREATE POLICY "Only authenticated admin users can insert watches"
  ON watches
  FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM admin_users
    )
  );

-- Only authenticated admin users can update watches
CREATE POLICY "Only authenticated admin users can update watches"
  ON watches
  FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM admin_users
    )
  );

-- Only authenticated admin users can delete watches
CREATE POLICY "Only authenticated admin users can delete watches"
  ON watches
  FOR DELETE
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users WHERE role = 'admin'
    )
  );

-- Create a function to handle creating the first admin user
CREATE OR REPLACE FUNCTION create_first_admin_user(admin_email TEXT, admin_password TEXT, admin_name TEXT)
RETURNS UUID AS $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Check if there are any users in the admin_users table
  IF EXISTS (SELECT 1 FROM admin_users) THEN
    RAISE EXCEPTION 'Admin users already exist. Cannot create first admin user.';
  END IF;
  
  -- Create a new user using Supabase's auth.create_user function
  new_user_id := (
    SELECT id FROM auth.create_user(
      email := admin_email,
      password := admin_password,
      email_confirm := true
    )
  );
  
  -- Create the admin user in admin_users
  INSERT INTO admin_users (id, name, email, role)
  VALUES (new_user_id, admin_name, admin_email, 'admin');
  
  RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 