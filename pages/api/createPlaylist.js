import fs from 'fs';
import path from 'path';

const toPascalCase = (str) => {
  return str.replace(/\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).replace(/\s+/g, '');
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, tracks } = req.body;

      const pascalCaseName = toPascalCase(name);

      const playlistFilePath = path.join(process.cwd(), 'public', 'tracklists', `trackList${pascalCaseName}.ts`);
      const playersDir = path.join(process.cwd(), 'pages', 'players');
      const tracklistsDir = path.join(process.cwd(), 'public', 'tracklists');

      await fs.promises.mkdir(tracklistsDir, { recursive: true });
      console.log('TrackLists directory ensured:', tracklistsDir);

      await fs.promises.mkdir(playersDir, { recursive: true });
      console.log('Players directory ensured:', playersDir);

      const componentFilePath = path.join(playersDir, `${pascalCaseName}Playlist.tsx`);

      const playlistContent = `export const trackList${pascalCaseName} = ${JSON.stringify(tracks, null, 2)};`;

      await fs.promises.writeFile(playlistFilePath, playlistContent);
      console.log('Playlist file created:', playlistFilePath);

      const componentContent = `
        import Head from 'next/head';
        import { trackList${pascalCaseName} } from '../../public/tracklists/trackList${pascalCaseName}';
        import PlayerBar from '../../src/components/Player/PlayerBar/PlayerBar';

        function Player() {
          return (
            <>
              <Head>
                <meta
                  name="description"
                  content="Плейлист ${name} от Звук Бизнес. Наслаждайтесь музыкой."
                />
                <title>${name} Плейлист</title>
              </Head>
              <PlayerBar trackList={trackList${pascalCaseName}} />
            </>
          );
        }

        export default Player;
      `;

      await fs.promises.writeFile(componentFilePath, componentContent);
      console.log('Component file created:', componentFilePath);

      res.status(200).json({ message: 'Playlist page created successfully!' });
    } catch (error) {
      console.error('Error in createPlaylist API:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
