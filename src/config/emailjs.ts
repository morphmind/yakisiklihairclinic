export const emailjsConfig = {
  serviceId: 'service_yakisikli',
  templateId: 'template_yakisikli',
  publicKey: '92IzeFfrl3n6wKFNk',
  template: {
    subject: "Yeni Saç Analizi Talebi - {{date}}",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e3a8a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
            .section { margin-bottom: 20px; }
            .section-title { color: #1e3a8a; font-weight: bold; margin-bottom: 10px; }
            .field { margin-bottom: 8px; }
            .label { font-weight: bold; color: #64748b; }
            .value { color: #334155; }
            .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin:0">Yeni Saç Analizi Talebi</h1>
              <p style="margin:10px 0 0">{{date}}</p>
            </div>
            
            <div class="content">
              <div class="section">
                <h2 class="section-title">👤 Kişisel Bilgiler</h2>
                <div class="field">
                  <span class="label">Cinsiyet:</span>
                  <span class="value">{{gender}}</span>
                </div>
                <div class="field">
                  <span class="label">Yaş Aralığı:</span>
                  <span class="value">{{ageRange}}</span>
                </div>
              </div>

              <div class="section">
                <h2 class="section-title">🔎 Saç Dökülmesi Detayları</h2>
                <div class="field">
                  <span class="label">Saç Dökülme Tipi:</span>
                  <span class="value">{{hairLossType}}</span>
                </div>
                <div class="field">
                  <span class="label">Dökülme Süresi:</span>
                  <span class="value">{{hairLossDuration}}</span>
                </div>
              </div>

              <div class="section">
                <h2 class="section-title">💉 Önceki Saç Ekimi</h2>
                <div class="field">
                  <span class="label">Önceki Saç Ekimi:</span>
                  <span class="value">{{previousTransplants}}</span>
                </div>
                {{#if previousTransplantDetails}}
                <div class="field">
                  <span class="label">Detaylar:</span>
                  <span class="value">{{previousTransplantDetails}}</span>
                </div>
                {{/if}}
              </div>

              <div class="section">
                <h2 class="section-title">🏥 Tıbbi Geçmiş</h2>
                {{#if medicalConditions}}
                <div class="field">
                  <span class="label">Tıbbi Durumlar:</span>
                  <span class="value">{{medicalConditions}}</span>
                </div>
                {{/if}}
                {{#if medications}}
                <div class="field">
                  <span class="label">İlaçlar:</span>
                  <span class="value">{{medications}}</span>
                </div>
                {{/if}}
                {{#if allergies}}
                <div class="field">
                  <span class="label">Alerjiler:</span>
                  <span class="value">{{allergies}}</span>
                </div>
                {{/if}}
              </div>

              <div class="section">
                <h2 class="section-title">📸 Fotoğraflar</h2>
                <div class="field">
                  <span class="label">Yüklenen Fotoğraf Sayısı:</span>
                  <span class="value">{{photoCount}}</span>
                </div>
              </div>
            </div>

            <div class="footer">
              <p>Bu e-posta Yakışıklı Hair Clinic saç analizi formu üzerinden otomatik olarak gönderilmiştir.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }
};