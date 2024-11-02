import { Redis } from '@upstash/redis';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize Redis
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { key, value } = req.body;

      if (!key || !value) {
        return res.status(400).json({ error: 'Key and value are required' });
      }

      // Сохраняем данные в Redis
      await redis.set(key, JSON.stringify(value));

      res.status(200).json({ message: 'Data added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add data to Redis' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
