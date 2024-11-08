import type { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';
// актуальный api
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const checkValidityName = (playlistName) => {
  try {
  } catch (error) {}
};

async function getAllKeysHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let cursor = '0';
    const keys: string[] = [];

    do {
      const [newCursor, foundKeys] = await redis.scan(cursor);
      cursor = newCursor;

      keys.push(...foundKeys);
    } while (cursor !== '0');
    console.log(keys);

    res.status(200).json({ keys });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching keys', details: error.message });
  }
}

export default getAllKeysHandler;
