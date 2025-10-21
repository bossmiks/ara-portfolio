import express from 'express';
import { ContactMessage, ContactResponse } from '../types';
import emailService from '../services/emailService';

const router = express.Router();

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create contact message
    const contactData: ContactMessage = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      subject,
      message,
      user_id: null,
      created_at: new Date().toISOString(),
      is_read: false
    };

    // Send notification email to admin
    const notificationSent = await emailService.sendContactNotification(contactData);
    
    // Send confirmation email to user
    const confirmationSent = await emailService.sendContactConfirmation(contactData);

    const response: ContactResponse = {
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      data: contactData
    };

    res.status(201).json(response);

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.'
    });
  }
});

export default router;
