import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const playlistsDir = path.join(process.cwd(), 'public', 'TrackLists');
    const files = await fs.promises.readdir(playlistsDir);

    const playlists = files.filter((file) => file.endsWith('.ts')).map((file) => file.replace('.ts', ''));

    res.status(200).json({ playlists });
  } catch (error) {
    console.error('Error retrieving playlists:', error);
    res.status(500).json({ error: 'Failed to retrieve playlists' });
  }
}
