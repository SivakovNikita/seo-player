import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, data } = req.body;

    try {
      let rawPlaylist = await redis.get(name);
      console.log('current: ', rawPlaylist);

      // Check if it's a valid JSON string (if it can be parsed)
      let playlist;
      if (typeof rawPlaylist === 'string') {
        playlist = JSON.parse(rawPlaylist);
      } else {
        playlist = rawPlaylist;
      }

      playlist.tracks = data;

      await redis.set(name, JSON.stringify(playlist));
      console.log('updated ', rawPlaylist);

      res.status(200).json({ message: 'Playlist updated successfully' });
    } catch (error) {
      console.error('Error updating playlist content:', error);
      res.status(500).json({ error: 'Failed to update playlist content' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
