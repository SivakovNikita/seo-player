import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  console.log('REQ: ', req);

  if (req.method === 'GET') {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Playlist name is required' });
    }

    try {
      const value = await redis.get(name);
      console.log('VALUE: ', value);

      res.status(200).json({ playlistData: value });
    } catch (error) {
      console.error('Error checking playlist name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
