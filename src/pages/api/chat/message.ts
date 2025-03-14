import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const RESPONSES = {
  greeting: [
    "Hello! I'm Aryawn, your legal assistant. How can I help you today?",
    "Hi there! I'm here to assist you with any legal questions you might have.",
    "Welcome! I'm Aryawn, and I'm here to help you with legal matters."
  ],
  legal_services: [
    "We offer a wide range of legal services including corporate law, litigation, and regulatory compliance. What specific area are you interested in?",
    "Our firm specializes in various legal areas. Could you tell me more about what you're looking for?",
    "I can help you understand our legal services. What type of legal assistance do you need?"
  ],
  contact: [
    "You can reach us through our contact form or call us directly. Would you like me to provide our contact information?",
    "I can help you get in touch with our team. Would you like our office locations or contact details?",
    "We have multiple ways to contact us. What's the most convenient method for you?"
  ],
  default: [
    "I understand you're interested in legal assistance. Could you please provide more details about your needs?",
    "I'm here to help with legal matters. Could you elaborate on what you're looking for?",
    "Let me know more about your legal requirements, and I'll guide you to the right resources."
  ]
};

function getResponseType(message: string): keyof typeof RESPONSES {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.match(/hi|hello|hey|greetings/)) {
    return 'greeting';
  }
  
  if (lowerMessage.match(/legal|lawyer|attorney|service|help/)) {
    return 'legal_services';
  }
  
  if (lowerMessage.match(/contact|reach|phone|email|address/)) {
    return 'contact';
  }
  
  return 'default';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { content, chatSessionId } = req.body;

      if (!content || !chatSessionId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Create user message
      const userMessage = await prisma.message.create({
        data: {
          content,
          isBot: false,
          chatSessionId,
        },
      });

      // Generate bot response
      const responseType = getResponseType(content);
      const responses = RESPONSES[responseType];
      const botResponse = responses[Math.floor(Math.random() * responses.length)];

      // Create bot message
      const botMessage = await prisma.message.create({
        data: {
          content: botResponse,
          isBot: true,
          chatSessionId,
        },
      });

      res.status(200).json({ userMessage, botMessage });
    } catch (error) {
      console.error('Error handling message:', error);
      res.status(500).json({ error: 'Failed to process message' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 