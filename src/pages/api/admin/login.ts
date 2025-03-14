import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

// In a real application, you would store these securely and use proper password hashing
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123', // In production, use a secure password
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Set a secure HTTP-only cookie
      res.setHeader(
        'Set-Cookie',
        serialize('admin_token', 'authenticated', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24, // 24 hours
          path: '/',
        })
      );

      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 