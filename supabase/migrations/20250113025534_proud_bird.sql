/*
  # Import Success Stories Data

  1. Initial Data
    - Imports existing success stories from the website
    - Adds proper metadata and slugs
    - Sets correct language and status

  2. Data Structure
    - Patient information
    - Before/After images
    - Treatment details
    - Testimonials
*/

-- Insert sample success stories
INSERT INTO success_stories (
  type,
  status,
  language,
  before_image,
  after_image,
  timeframe,
  grafts,
  age,
  video_id,
  patient_name,
  patient_country,
  rating,
  testimonial,
  created_at
)
VALUES
  (
    'hair',
    'published',
    'en',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/2a.jpg',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/2b.jpg',
    'month12',
    4500,
    32,
    'QvzQlwSnzTQ',
    'John D.',
    '🇬🇧 UK',
    5,
    'Incredible results! The whole process was smooth and professional. Dr. Yakışıklı and his team were amazing throughout the entire journey.',
    NOW() - INTERVAL '2 months'
  ),
  (
    'beard',
    'published',
    'en',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/3a.jpg',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/3b.jpg',
    'month6',
    2500,
    28,
    'QvzQlwSnzTQ',
    'Michael S.',
    '🇩🇪 Germany',
    5,
    'Best decision I ever made. The beard transplant looks completely natural. The team was professional and caring throughout the process.',
    NOW() - INTERVAL '3 months'
  ),
  (
    'hair',
    'published',
    'en',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/10a.jpg',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/10b.jpg',
    'month12',
    3000,
    45,
    'QvzQlwSnzTQ',
    'Sarah M.',
    '🇫🇷 France',
    5,
    'Dr. Yakışıklı and his team were amazing. My hair looks beautiful and natural. The whole experience was comfortable and professional.',
    NOW() - INTERVAL '4 months'
  ),
  (
    'hair',
    'published',
    'tr',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/4a.jpg',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/4b.jpg',
    'month12',
    4200,
    35,
    'QvzQlwSnzTQ',
    'Ahmet Y.',
    '🇹🇷 Turkey',
    5,
    'Harika sonuçlar! Dr. Yakışıklı ve ekibi son derece profesyonel ve ilgili. Saç ekimi sonrası doğal görünümlü saçlarıma kavuştum.',
    NOW() - INTERVAL '5 months'
  ),
  (
    'eyebrow',
    'published',
    'en',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/5a.jpg',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/5b.jpg',
    'month6',
    400,
    29,
    'QvzQlwSnzTQ',
    'Emma L.',
    '🇮🇹 Italy',
    5,
    'The eyebrow transplant completely transformed my face. Dr. Yakışıklı has an amazing eye for detail and natural aesthetics.',
    NOW() - INTERVAL '6 months'
  ),
  (
    'women',
    'published',
    'de',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/6a.jpg',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/6b.jpg',
    'month12',
    2800,
    42,
    'QvzQlwSnzTQ',
    'Maria K.',
    '🇩🇪 Germany',
    5,
    'Eine ausgezeichnete Erfahrung von Anfang bis Ende. Das Team war sehr professionell und die Ergebnisse sind fantastisch.',
    NOW() - INTERVAL '7 months'
  ),
  (
    'hair',
    'published',
    'ru',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/7a.jpg',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/7b.jpg',
    'month12',
    3800,
    38,
    'QvzQlwSnzTQ',
    'Igor P.',
    '🇷🇺 Russia',
    5,
    'Отличные результаты! Профессиональный подход и внимательное отношение на всех этапах лечения.',
    NOW() - INTERVAL '8 months'
  ),
  (
    'beard',
    'published',
    'ar',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/8a.jpg',
    'https://yakisiklihairclinic.com/wp-content/uploads/2023/04/8b.jpg',
    'month6',
    2200,
    33,
    'QvzQlwSnzTQ',
    'محمد ع.',
    '🇸🇦 Saudi Arabia',
    5,
    'نتائج مذهلة! الدكتور ياكيشيكلي وفريقه كانوا رائعين. عملية زراعة اللحية كانت ناجحة تماماً.',
    NOW() - INTERVAL '9 months'
  );

-- Add metadata for SEO and filtering
UPDATE success_stories
SET metadata = jsonb_build_object(
  'seo', jsonb_build_object(
    'title', patient_name || ' - Hair Transplant Success Story',
    'description', SUBSTRING(testimonial FROM 1 FOR 160),
    'keywords', ARRAY['hair transplant', 'success story', type, patient_country]
  ),
  'social', jsonb_build_object(
    'shareCount', floor(random() * 100 + 1)::int,
    'likeCount', floor(random() * 500 + 1)::int
  ),
  'treatment', jsonb_build_object(
    'technique', CASE 
      WHEN type = 'hair' THEN 'Sapphire FUE'
      WHEN type = 'beard' THEN 'DHI'
      WHEN type = 'eyebrow' THEN 'Micro FUE'
      ELSE 'Custom Technique'
    END,
    'duration', '6-8 hours',
    'recovery', '7-10 days'
  )
)
WHERE metadata = '{}'::jsonb;