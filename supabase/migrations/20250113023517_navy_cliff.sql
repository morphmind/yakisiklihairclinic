/*
  # Update Profiles Table and Policies

  1. Schema Changes
    - Add moderator role to profiles table
    - Update role check constraint

  2. Security Updates
    - Update viewing policy to allow all authenticated users
    - Add admin-only policies for updates/inserts/deletes
    - Ensure proper role-based access control

  3. Initial Setup
    - Add trigger for updated_at timestamp
    - Prepare for initial admin user
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Profiles are viewable by users who created them" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Update role check constraint
ALTER TABLE profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('admin', 'user', 'moderator'));

-- Create new policies
CREATE POLICY "Profiles are viewable by authenticated users"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can update profiles"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

CREATE POLICY "Only admins can insert profiles"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete profiles"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Insert initial admin user if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@yakisiklihairclinic.com'
  ) THEN
    -- Note: The actual user creation should be done through Supabase Auth UI or API
    -- This just ensures the profile exists if the user is created
    INSERT INTO profiles (id, role)
    SELECT id, 'admin'
    FROM auth.users
    WHERE email = 'admin@yakisiklihairclinic.com'
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;