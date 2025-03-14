import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get total counts
    const [totalChatSessions, totalMessages, totalContactMessages] = await Promise.all([
      prisma.chatSession.count(),
      prisma.message.count(),
      prisma.contactMessage.count(),
    ]);

    // Get recent messages
    const recentMessages = await prisma.message.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        chatSession: true,
      },
    });

    res.status(200).json({
      totalChatSessions,
      totalMessages,
      totalContactMessages,
      recentMessages,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
} 