/*
  # Schema update for success stories and hair analysis

  1. Drop existing policies
  2. Recreate policies with correct syntax
  3. Ensure proper RLS setup
*/

-- Drop existing policies if they exist
DO $$ BEGIN
  -- Drop success_stories policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'success_stories' AND policyname = 'Anyone can view success stories'
  ) THEN
    DROP POLICY "Anyone can view success stories" ON success_stories;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'success_stories' AND policyname = 'Only authenticated users can insert success stories'
  ) THEN
    DROP POLICY "Only authenticated users can insert success stories" ON success_stories;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'success_stories' AND policyname = 'Only authenticated users can update success stories'
  ) THEN
    DROP POLICY "Only authenticated users can update success stories" ON success_stories;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'success_stories' AND policyname = 'Only authenticated users can delete success stories'
  ) THEN
    DROP POLICY "Only authenticated users can delete success stories" ON success_stories;
  END IF;

  -- Drop hair_analysis_submissions policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'hair_analysis_submissions' AND policyname = 'Only authenticated users can view submissions'
  ) THEN
    DROP POLICY "Only authenticated users can view submissions" ON hair_analysis_submissions;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'hair_analysis_submissions' AND policyname = 'Anyone can insert submissions'
  ) THEN
    DROP POLICY "Anyone can insert submissions" ON hair_analysis_submissions;
  END IF;
END $$;

-- Recreate policies for success_stories
CREATE POLICY "Anyone can view success stories"
  ON success_stories
  FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can insert success stories"
  ON success_stories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update success stories"
  ON success_stories
  FOR UPDATE
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete success stories"
  ON success_stories
  FOR DELETE
  TO authenticated
  USING (true);

-- Recreate policies for hair_analysis_submissions
CREATE POLICY "Only authenticated users can view submissions"
  ON hair_analysis_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can insert submissions"
  ON hair_analysis_submissions
  FOR INSERT
  WITH CHECK (true);