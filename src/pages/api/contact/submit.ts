import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Received request body:', req.body);
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields:', { name, email, subject, message });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create contact message
    console.log('Attempting to create contact message...');
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
      },
    });
    console.log('Successfully created contact message:', contactMessage);

    // Here you could add additional logic like:
    // - Sending notification emails
    // - Creating tasks in a CRM system
    // - Triggering webhooks

    res.status(200).json({ success: true, data: contactMessage });
  } catch (error) {
    console.error('Detailed error in contact form submission:', error);
    res.status(500).json({ 
      error: 'Failed to submit contact form',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 