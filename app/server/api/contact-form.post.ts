import { contactTemplate } from '../templates/contact';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  currentYear: string;
}

export default defineEventHandler(async (event) => {
  const cloudflareEnv = (event.context as any).cloudflare?.env;
  const body = await readBody<Omit<ContactFormData, 'currentYear'>>(event);

  try {
    const formData: ContactFormData = {
      ...body,
      currentYear: new Date().getFullYear().toString(),
    };

    let emailBody = contactTemplate;

    for (const key in formData) {
      const value = formData[key as keyof ContactFormData];
      const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      emailBody = emailBody.replace(placeholder, value || '');
    }

    if (!cloudflareEnv) {
      console.warn('[contact-form] Cloudflare runtime not available; skipping email send in local dev.');
      return { success: true, local: true };
    }

    const { EmailMessage } = await import('cloudflare:email');
    const { createMimeMessage, Mailbox } = await import('mimetext');

    const msg = createMimeMessage();
    msg.setSender({ name: 'Contact Form', addr: cloudflareEnv.EMAIL_SENDER });
    msg.setRecipient(cloudflareEnv.EMAIL_RECIPIENT);
    msg.setSubject(`[Inquiry] ${formData.subject}`);

    if (formData.email) {
      const replyTo = new Mailbox({
        name: formData.name.trim(),
        addr: formData.email.trim(),
      });
      msg.setHeader('Reply-To', replyTo);
    }

    msg.addMessage({
      contentType: 'text/html',
      data: emailBody,
    });

    const emailMessage = new EmailMessage(
      cloudflareEnv.EMAIL_SENDER,
      cloudflareEnv.EMAIL_RECIPIENT,
      msg.asRaw()
    );

    await cloudflareEnv.EMAIL.send(emailMessage);

    return { success: true };
  } catch (error: any) {
    console.log(error);
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
      data: { success: false },
    });
  }
});
