import nodemailer from 'nodemailer';
import { EmailData } from '../types';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      const info = await this.transporter.sendMail({
        from: `"Michael Ara Portfolio" <${process.env.EMAIL_USER}>`,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
      });

      console.log('Email sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  async sendContactNotification(contactData: any): Promise<boolean> {
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Subject:</strong> ${contactData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message}</p>
      <hr>
      <p><em>Sent from Michael Ara's Portfolio Contact Form</em></p>
    `;

    return this.sendEmail({
      to: process.env.ADMIN_EMAIL || 'aramichae19@gmail.com',
      subject: `New Contact: ${contactData.subject}`,
      html,
      text: `New contact from ${contactData.name} (${contactData.email}): ${contactData.message}`
    });
  }

  async sendContactConfirmation(contactData: any): Promise<boolean> {
    const html = `
      <h2>Thank you for contacting Michael Ara!</h2>
      <p>Hi ${contactData.name},</p>
      <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
      <p><strong>Your message:</strong></p>
      <p><em>"${contactData.message}"</em></p>
      <hr>
      <p>Best regards,<br>Michael Ara</p>
      <p><em>This is an automated response from Michael Ara's Portfolio</em></p>
    `;

    return this.sendEmail({
      to: contactData.email,
      subject: 'Thank you for contacting Michael Ara',
      html,
      text: `Thank you for contacting Michael Ara! I'll get back to you soon. Your message: ${contactData.message}`
    });
  }
}

export default new EmailService();
