import { LocaleConfig } from '@/types';

interface SEOConfig {
  title: string;
  description: string;
  image: string;
  url: string;
}

const defaultSEO: SEOConfig = {
  title: 'Hair Transplant Turkey - Fethiye | Dr. Mustafa Yakışıklı',
  description: 'Hair transplant Turkey meets excellence at Hair Clinic Fethiye: Yakışıklı Hair Clinic. Achieve natural results with Micro Sapphire DHI technology.',
  image: 'https://glokalizm.com/yakisikli/img/og-image.jpg',
  url: 'https://yakisiklihairclinic.com'
};

export function getLocalizedSEO(locale: LocaleConfig): SEOConfig {
  const localizedTitles = {
    tr: 'Saç Ekimi Türkiye - Fethiye | Dr. Mustafa Yakışıklı',
    de: 'Haartransplantation Türkei - Fethiye | Dr. Mustafa Yakışıklı',
    ru: 'Пересадка волос в Турции - Фетхие | Др. Мустафа Якышыклы',
    ar: 'زراعة الشعر في تركيا - فتحية | د. مصطفى ياكيشيكلي',
    es: 'Trasplante de Cabello Turquía - Fethiye | Dr. Mustafa Yakisikli',
    fr: 'Greffe de Cheveux Turquie - Fethiye | Dr. Mustafa Yakisikli'
  };

  const localizedDescriptions = {
    tr: 'Türkiye\'de saç ekimi mükemmellikle buluşuyor: Yakışıklı Hair Clinic Fethiye. Mikro Safir DHI teknolojisi ile doğal sonuçlar elde edin.',
    de: 'Haartransplantation in der Türkei trifft auf Exzellenz in der Hair Clinic Fethiye: Yakışıklı Hair Clinic. Erzielen Sie natürliche Ergebnisse mit Mikro-Saphir-DHI-Technologie.',
    ru: 'Пересадка волос в Турции встречается с совершенством в клинике Fethiye: Yakışıklı Hair Clinic. Достигайте естественных результатов с технологией Micro Sapphire DHI.',
    ar: 'زراعة الشعر في تركيا تلتقي بالتميز في عيادة فتحية: عيادة ياكيشيكلي للشعر. احصل على نتائج طبيعية مع تقنية مايكرو سافاير DHI.',
    es: 'El trasplante de cabello en Turquía encuentra la excelencia en la Clínica Capilar Fethiye: Yakışıklı Hair Clinic. Logre resultados naturales con la tecnología Micro Sapphire DHI.',
    fr: 'La greffe de cheveux en Turquie rencontre l\'excellence à la Clinique Capillaire Fethiye : Yakışıklı Hair Clinic. Obtenez des résultats naturels avec la technologie Micro Sapphire DHI.'
  };

  return {
    ...defaultSEO,
    title: localizedTitles[locale.code as keyof typeof localizedTitles] || defaultSEO.title,
    description: localizedDescriptions[locale.code as keyof typeof localizedDescriptions] || defaultSEO.description,
    url: `${defaultSEO.url}/${locale.code}`
  };
}

export function updateMetaTags(config: SEOConfig) {
  // Update basic meta tags
  document.title = config.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', config.description);

  // Update Open Graph tags
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', config.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', config.description);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', config.url);

  // Update Twitter tags
  document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', config.title);
  document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', config.description);
  document.querySelector('meta[property="twitter:url"]')?.setAttribute('content', config.url);
}