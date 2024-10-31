import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { name } = req.query;

  try {
    const filePath = path.join(process.cwd(), 'public', 'TrackLists', `${name}.ts`);
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');

    const playlistData = eval(fileContent.replace(/^export\s+const\s+\w+\s+=\s+/, ''));
    res.status(200).json(playlistData);
  } catch (error) {
    console.error('Error retrieving playlist content:', error);
    res.status(500).json({ error: 'Failed to retrieve playlist content' });
  }
}
