import {EmailMessage} from "cloudflare:email";
import {createMimeMessage} from 'mimetext';

interface ContactFormData {
	name: string;
	subject: string;
	email: string;
	message: string;
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

			// The HTML Template with placeholders
			// Apply data to template
			// We use 'as any' for the key to satisfy TS during the loop
			let body = `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>New Message from {{name}}</h2>
          <p><strong>Reply-To:</strong> {{email}}</p>
          <p><strong>Subject:</strong> {{subject}}</p>
          <div style="border-left: 4px solid #ccc; padding-left: 10px; margin-top: 20px;">
            {{message}}
          </div>
        </div>
      `;
			for (const key in formData) {
				const value = formData[key as keyof ContactFormData];
				const placeholder = new RegExp(`{{${key}}}`, 'g');
				body = body.replace(placeholder, value || "");
			}

			const msg = createMimeMessage();
			msg.setSender({ name: 'Contact Form', addr: env.EMAIL_SENDER });
			msg.setRecipient(env.EMAIL_RECIPIENT);

			// Now TS knows formData.subject exists!
			msg.setSubject(`[Website Form] ${formData.subject}`);

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

		} catch (error) {
			return Response.json({ success: false, error: "Invalid Data" }, { status: 400 });
		}
	}
};
