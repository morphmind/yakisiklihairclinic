-- Add new columns with safe checks
DO $$ BEGIN
  -- Add status column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'success_stories' AND column_name = 'status') THEN
    ALTER TABLE success_stories ADD COLUMN status text NOT NULL DEFAULT 'published';
    ALTER TABLE success_stories ADD CONSTRAINT success_stories_status_check CHECK (status IN ('draft', 'published'));
  END IF;

  -- Add slug column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'success_stories' AND column_name = 'slug') THEN
    ALTER TABLE success_stories ADD COLUMN slug text;
    ALTER TABLE success_stories ADD CONSTRAINT success_stories_slug_unique UNIQUE (slug);
  END IF;

  -- Add metadata column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'success_stories' AND column_name = 'metadata') THEN
    ALTER TABLE success_stories ADD COLUMN metadata jsonb DEFAULT '{}'::jsonb;
  END IF;

  -- Add language column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'success_stories' AND column_name = 'language') THEN
    ALTER TABLE success_stories ADD COLUMN language text NOT NULL DEFAULT 'en';
    ALTER TABLE success_stories ADD CONSTRAINT success_stories_language_check CHECK (language IN ('en', 'tr', 'de', 'ru', 'ar', 'es', 'fr'));
  END IF;
END $$;

-- Add validation constraints with safe checks
DO $$ BEGIN
  -- Add grafts check if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE table_name = 'success_stories' AND constraint_name = 'success_stories_grafts_check'
  ) THEN
    ALTER TABLE success_stories ADD CONSTRAINT success_stories_grafts_check CHECK (grafts >= 0 AND grafts <= 10000);
  END IF;

  -- Add age check if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE table_name = 'success_stories' AND constraint_name = 'success_stories_age_check'
  ) THEN
    ALTER TABLE success_stories ADD CONSTRAINT success_stories_age_check CHECK (age >= 18 AND age <= 100);
  END IF;
END $$;

-- Add indexes with safe checks
DO $$ BEGIN
  -- Create type index if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE tablename = 'success_stories' AND indexname = 'idx_success_stories_type'
  ) THEN
    CREATE INDEX idx_success_stories_type ON success_stories (type);
  END IF;

  -- Create status index if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE tablename = 'success_stories' AND indexname = 'idx_success_stories_status'
  ) THEN
    CREATE INDEX idx_success_stories_status ON success_stories (status);
  END IF;

  -- Create language index if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE tablename = 'success_stories' AND indexname = 'idx_success_stories_language'
  ) THEN
    CREATE INDEX idx_success_stories_language ON success_stories (language);
  END IF;

  -- Create created_at index if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE tablename = 'success_stories' AND indexname = 'idx_success_stories_created_at'
  ) THEN
    CREATE INDEX idx_success_stories_created_at ON success_stories (created_at DESC);
  END IF;
END $$;

-- Function to generate slug from patient name
CREATE OR REPLACE FUNCTION generate_story_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL THEN
    NEW.slug := LOWER(
      REGEXP_REPLACE(
        REGEXP_REPLACE(
          NEW.patient_name,
          '[^a-zA-Z0-9\s]',
          '',
          'g'
        ),
        '\s+',
        '-',
        'g'
      )
    ) || '-' || EXTRACT(EPOCH FROM NOW())::text;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically generate slug
DROP TRIGGER IF EXISTS set_story_slug ON success_stories;
CREATE TRIGGER set_story_slug
  BEFORE INSERT ON success_stories
  FOR EACH ROW
  EXECUTE FUNCTION generate_story_slug();

-- Update existing rows to have slugs
UPDATE success_stories
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      patient_name,
      '[^a-zA-Z0-9\s]',
      '',
      'g'
    ),
    '\s+',
    '-',
    'g'
  )
) || '-' || EXTRACT(EPOCH FROM created_at)::text
WHERE slug IS NULL;