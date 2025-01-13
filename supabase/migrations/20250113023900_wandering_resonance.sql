/*
  # Create Admin User Migration
  
  This migration creates an admin user with the specified email and password,
  and assigns the admin role to their profile.
  
  1. Creates the user in auth.users
  2. Creates a corresponding profile with admin role
*/

-- First, create the user in auth schema
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'kaan@yildizkan.com',
  crypt('123546987', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'kaan@yildizkan.com'
)
RETURNING id;

-- Then create the admin profile
INSERT INTO profiles (id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'kaan@yildizkan.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';