import { EmailMessage } from "cloudflare:email";
import { createMimeMessage, Mailbox } from 'mimetext';
import contactTemplate from './templates/alba-web-studio-contact.html';

interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
	currentYear: string;
}

export interface Env {
	// These should be defined in your wrangler.toml or Cloudflare Dashboard
	EMAIL_SENDER: string;
	EMAIL_RECIPIENT: string;
	EMAIL: any; // The Email Routing binding
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.method !== "POST") {
			return new Response("Method Not Allowed", { status: 405 });
		}

		try {
			// Cast the JSON to your specific interface
			const formData = await request.json() as ContactFormData;
			formData.currentYear = new Date().getFullYear().toString();

			// Import template
			let body = contactTemplate;

			for (const key in formData) {
				const value = formData[key as keyof ContactFormData];
				const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
				body = body.replace(placeholder, value || "");
			}

			const msg = createMimeMessage();
			msg.setSender({ name: 'Contact Form', addr: env.EMAIL_SENDER });
			msg.setRecipient(env.EMAIL_RECIPIENT);
			msg.setSubject(`[Inquiry] ${formData.subject}`);
			if (formData.email) {
				const replyTo = new Mailbox({
					name: formData.name.trim(),
					addr: formData.email.trim()
				});
				msg.setHeader('Reply-To', replyTo);
			}

			msg.addMessage({
				contentType: 'text/html',
				data: body,
			});

			const emailMessage = new EmailMessage(
				env.EMAIL_SENDER,
				env.EMAIL_RECIPIENT,
				msg.asRaw()
			);

			await env.EMAIL.send(emailMessage);

			return Response.json({ success: true });

		} catch (error: any) {
			console.log(error);
			return Response.json({ success: false, error: error.message }, { status: 400 });
		}
	}
};
