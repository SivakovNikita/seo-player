import type { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';
// актуальный api
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

async function getAllKeysHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let cursor = '0';
    const keys: string[] = [];

    do {
      const [newCursor, foundKeys] = await redis.scan(cursor);
      cursor = newCursor;
      keys.push(...foundKeys);
    } while (cursor !== '0');

    res.status(200).json({ keys });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching keys', details: error.message });
  }
}

export default getAllKeysHandler;
