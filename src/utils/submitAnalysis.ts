import { HairAnalysisFormData } from '@/types';
import { formatAnalysisDataForWhatsApp } from './formatAnalysisData';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '@/config/emailjs';
import { telegramConfig } from '@/config/telegram';
import { toast } from '@/hooks/useToast';

const MAX_EMAIL_SIZE = 50 * 1024; // 50KB limit for EmailJS

export async function submitAnalysis(formData: HairAnalysisFormData, t: any): Promise<boolean> {
  try {
    // Validate required fields
    if (!formData.gender || !formData.ageRange || !formData.hairLossType || !formData.hairLossDuration) {
      toast({
        variant: "error",
        title: t.hairAnalysis.toast.error.title,
        description: t.hairAnalysis.toast.error.requiredFields,
      });
      return false;
    }

    // Format data for messaging
    const whatsappContent = formatAnalysisDataForWhatsApp(formData);

    // Show loading toast
    toast({
      title: t.hairAnalysis.toast.loading.title,
      description: t.hairAnalysis.toast.loading.description,
    });

    // Initialize EmailJS
    emailjs.init(emailjsConfig.publicKey);

    // Send email using EmailJS
    const emailResult = await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      {
        to_email: 'vipkaan@gmail.com',
        message: whatsappContent
      }
    );

    if (emailResult.status !== 200) {
      throw new Error('Failed to send email');
    }

    // Send to Telegram
    try {
      // Send the form data first
      const messageUrl = `https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`;
      const messageResponse = await fetch(messageUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: telegramConfig.chatId,
          text: whatsappContent,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });

      if (!messageResponse.ok) {
        throw new Error('Failed to send message to Telegram');
      }

      // Parse response
      const messageResult = await messageResponse.json();
      if (!messageResult.ok) {
        console.error('Telegram API error:', messageResult);
        throw new Error(messageResult.description || 'Failed to send message to Telegram');
      }

      // Wait for the message to be sent
      await new Promise(resolve => setTimeout(resolve, 500));

      // Send photos if any exist
      if (Object.keys(formData.photos).length > 0) {
        // Send photos sequentially
        const photoPromises = [];
        for (const [type, file] of Object.entries(formData.photos)) {
          const photoData = new FormData();
          photoData.append('chat_id', telegramConfig.chatId);
          photoData.append('photo', file);
          photoData.append('caption', `${type.charAt(0).toUpperCase() + type.slice(1)} view photo`);

          photoPromises.push(
            fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/sendPhoto`, {
              method: 'POST',
              body: photoData,
            }).then(async (response) => {
              if (!response.ok) {
                const error = await response.json();
                throw new Error(`Failed to send photo: ${error.description || 'Unknown error'}`);
              }
              return response;
            })
          );
        }
        
        // Send photos in parallel with error handling
        try {
          await Promise.all(photoPromises);
        } catch (error) {
          console.error('Error sending photos:', error);
        }
        await Promise.all(photoPromises);
      }
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      throw error; // Re-throw to handle in the main try-catch
    }

    // Show success message
    toast({
      variant: "success",
      title: t.hairAnalysis.toast.success.title,
      description: t.hairAnalysis.toast.success.description,
    });

    // Open WhatsApp with pre-filled message
    const whatsappNumber = '905360344866';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappContent)}`;
    window.open(whatsappUrl, '_blank');

    return true;
  } catch (error) {
    console.error('Error submitting analysis:', error);
    
    toast({
      variant: "error",
      title: t.hairAnalysis.toast.error.title,
      description: t.hairAnalysis.toast.error.submitError,
    });
    
    return false;
  }
}