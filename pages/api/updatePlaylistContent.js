import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, data } = req.body;

    try {
      const filePath = path.join(process.cwd(), 'public', 'TrackLists', `${name}.ts`);
      const fileContent = `export const ${name} = ${JSON.stringify(data, null, 2)};`;

      await fs.promises.writeFile(filePath, fileContent);
      res.status(200).json({ message: 'Playlist updated successfully' });
    } catch (error) {
      console.error('Error updating playlist content:', error);
      res.status(500).json({ error: 'Failed to update playlist content' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
