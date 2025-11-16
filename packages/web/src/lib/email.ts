import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.EMAIL_FROM || 'x@x.x';

interface EmailParams {
  to: string;
  subject: string;
  body: string;
}

export const sendEmail = async ({ to, subject, body }: EmailParams) => {
  try {
    await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html: `<p>${body}</p>`, 
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
};