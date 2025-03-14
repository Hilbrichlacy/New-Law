import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const GREETINGS = [
  "Hello! I'm Aryawn, your legal assistant. I'm here to help you with any legal questions or concerns you might have. How can I assist you today?",
  "Welcome to Aryawn Legal Services! I'm your AI assistant, and I can help you learn more about our legal services, schedule consultations, or answer general legal questions. What would you like to know?",
  "Hi there! I'm Aryawn, and I'm here to guide you through our legal services. Whether you need information about our practice areas, want to schedule a consultation, or have general legal questions, I'm here to help. What can I do for you?"
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      
      const chatSession = await prisma.chatSession.create({
        data: {
          messages: {
            create: {
              content: greeting,
              isBot: true,
            },
          },
        },
        include: {
          messages: true,
        },
      });

      res.status(200).json(chatSession);
    } catch (error) {
      console.error('Error creating chat session:', error);
      res.status(500).json({ error: 'Failed to create chat session' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 