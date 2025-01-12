import { HairAnalysisFormData } from '@/types';
import { countries } from '@/config/countries';
import { t } from '@/i18n';

function formatDate(date: Date): string {
  return date.toLocaleString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDuration(duration: string, locale: string): string {
  const durationMap: Record<string, { tr: string; en: string }> = {
    'less-than-1': { tr: '1 yıldan az', en: 'Less than 1 year' },
    '1-to-3': { tr: '1-3 yıl', en: '1-3 years' },
    '3-to-5': { tr: '3-5 yıl', en: '3-5 years' },
    'more-than-5': { tr: '5 yıldan fazla', en: 'More than 5 years' },
  };
  return durationMap[duration]?.[locale as 'tr' | 'en'] || duration;
}

function formatHairLossType(type: string, locale: string): string {
  const typeMap: Record<string, { tr: string; en: string }> = {
    'none': { tr: 'Saç dökülmesi yok', en: 'No hair loss' },
    'light': { tr: 'Hafif saç çizgisi çekilmesi', en: 'Light receding hairline' },
    'slight-crown': { tr: 'Saç çizgisi çekilmesi + hafif tepe açılması', en: 'Receding hairline + slight crown' },
    'strong-crown': { tr: 'Belirgin saç çizgisi çekilmesi + tepe açılması', en: 'Strong receding hairline + crown' },
    'semi-bald': { tr: 'Yarı kel', en: 'Semi bald' },
    'bald': { tr: 'Kel', en: 'Bald' },
  };
  return typeMap[type]?.[locale as 'tr' | 'en'] || type;
}

function formatPreviousTransplantDetails(details: string): string {
  try {
    const parsed = JSON.parse(details);
    return `
• Ne zaman: ${formatDuration(parsed.timeframe, 'tr')}
• Klinik: ${parsed.clinic || 'Belirtilmedi'}
• Greft Sayısı: ${parsed.grafts || 'Belirtilmedi'}
• Kullanılan Teknik: ${parsed.technique || 'Belirtilmedi'}
• Memnuniyet: ${parsed.results || 'Belirtilmedi'}`;
  } catch (e) {
    return details || 'Detay belirtilmedi';
  }
}

function formatPhotos(photos: Record<string, File>): string {
  const photoTypes = {
    front: { tr: 'Ön görünüm', en: 'Front view' },
    top: { tr: 'Üst görünüm', en: 'Top view' },
    sides: { tr: 'Yan görünümler', en: 'Side views' },
    back: { tr: 'Arka görünüm', en: 'Back view' },
  };

  if (Object.keys(photos).length === 0) {
    return 'Fotoğraf yüklenmedi';
  }

  return Object.entries(photos)
    .map(([type, file]) => `• ${photoTypes[type as keyof typeof photoTypes].tr} / ${photoTypes[type as keyof typeof photoTypes].en}: ${file.name}`)
    .join('\n');
}

export function formatAnalysisDataForWhatsApp(data: HairAnalysisFormData): string {
  const submissionDate = formatDate(new Date());
  const country = countries.find(c => c.code === data.country);
  
  return `<b>🔍 Yeni Saç Analizi Talebi</b>
<i>📅 ${submissionDate}</i>

<b>👤 Kişisel Bilgiler</b>
• Ad Soyad: <b>${data.firstName} ${data.lastName}</b>
• E-posta: <code>${data.email}</code>
• Telefon: <code>${country?.phoneCode}${data.phone || 'Belirtilmedi'}</code>
• Ülke: <b>${country?.name || 'Belirtilmedi'}</b>

<b>💇 Saç Analizi</b>
• Cinsiyet: <b>${data.gender === 'male' ? 'Erkek' : 'Kadın'}</b>
• Yaş: <b>${data.ageRange ? `${data.ageRange.min}-${data.ageRange.max || '+'} yaş` : 'Belirtilmedi'}</b>

<b>🔎 Saç Dökülmesi</b>
• Tip: <b>${data.hairLossType ? formatHairLossType(data.hairLossType, 'tr') : 'Belirtilmedi'}</b>
• Süre: <b>${data.hairLossDuration ? formatDuration(data.hairLossDuration, 'tr') : 'Belirtilmedi'}</b>

${data.previousTransplants ? '<b>💉 Önceki Saç Ekimi</b>' + formatPreviousTransplantDetails(data.previousTransplantDetails) : ''}

${data.medicalConditions.length > 0 || data.medications.length > 0 || data.allergies.length > 0 ? '<b>🏥 Tıbbi Bilgiler</b>' : ''}
${data.medicalConditions.length > 0 ? '• Durumlar: ' + data.medicalConditions.join(', ') : ''}
${data.medications.length > 0 ? '• İlaçlar: ' + data.medications.join(', ') : ''}
${data.allergies.length > 0 ? '• Alerjiler: ' + data.allergies.join(', ') : ''}

<b>📸 Fotoğraflar</b>
${formatPhotos(data.photos)}`;
}
