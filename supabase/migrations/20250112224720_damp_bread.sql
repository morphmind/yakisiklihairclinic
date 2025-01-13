/*
  # Initial Schema Setup

  1. New Tables
    - `success_stories`
      - `id` (uuid, primary key)
      - `type` (text) - hair, beard, eyebrow, women
      - `before_image` (text) - URL
      - `after_image` (text) - URL
      - `timeframe` (text) - month3, month6, month12, final
      - `grafts` (integer)
      - `age` (integer)
      - `video_id` (text) - YouTube video ID
      - `patient_name` (text)
      - `patient_country` (text)
      - `rating` (integer)
      - `testimonial` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `hair_analysis_submissions`
      - `id` (uuid, primary key)
      - `gender` (text)
      - `age_range` (jsonb)
      - `hair_loss_type` (text)
      - `hair_loss_duration` (text)
      - `previous_transplants` (boolean)
      - `previous_transplant_details` (jsonb)
      - `medical_conditions` (text[])
      - `medications` (text[])
      - `allergies` (text[])
      - `photos` (jsonb)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `country` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Success Stories Table
CREATE TABLE IF NOT EXISTS success_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  before_image text NOT NULL,
  after_image text NOT NULL,
  timeframe text NOT NULL,
  grafts integer NOT NULL,
  age integer NOT NULL,
  video_id text,
  patient_name text NOT NULL,
  patient_country text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  testimonial text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Hair Analysis Submissions Table
CREATE TABLE IF NOT EXISTS hair_analysis_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gender text NOT NULL,
  age_range jsonb NOT NULL,
  hair_loss_type text NOT NULL,
  hair_loss_duration text NOT NULL,
  previous_transplants boolean NOT NULL,
  previous_transplant_details jsonb,
  medical_conditions text[],
  medications text[],
  allergies text[],
  photos jsonb,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  country text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE hair_analysis_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for success_stories
CREATE POLICY "Anyone can view success stories"
  ON success_stories
  FOR SELECT
  TO PUBLIC
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
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete success stories"
  ON success_stories
  FOR DELETE
  TO authenticated
  USING (true);

-- Policies for hair_analysis_submissions
CREATE POLICY "Only authenticated users can view submissions"
  ON hair_analysis_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can insert submissions"
  ON hair_analysis_submissions
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_success_stories_updated_at
  BEFORE UPDATE ON success_stories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hair_analysis_submissions_updated_at
  BEFORE UPDATE ON hair_analysis_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();