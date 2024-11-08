import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Playlist name is required' });
    }

    try {
      const isAvailable = await redis.exists(name);

      res.status(200).json({ isAvailable: isAvailable === 0 });
    } catch (error) {
      console.error('Error checking playlist name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
