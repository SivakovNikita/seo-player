import fs from 'fs';
import path from 'path';

// Функция для преобразования строки в PascalCase
const toPascalCase = (str) => {
  return str.replace(/\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).replace(/\s+/g, '');
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, tracks } = req.body;

      // Преобразуем имя в PascalCase
      const pascalCaseName = toPascalCase(name);

      // Логирование входящих данных
      console.log('Request received:', req.body);

      // Путь к файлам
      const playlistFilePath = path.join(process.cwd(), 'public', 'tracklists', `trackList${pascalCaseName}.ts`);
      const playersDir = path.join(process.cwd(), 'pages', 'players');
      const tracklistsDir = path.join(process.cwd(), 'public', 'tracklists');

      // Проверяем существование директории tracklists, если её нет - создаем
      await fs.promises.mkdir(tracklistsDir, { recursive: true });
      console.log('TrackLists directory ensured:', tracklistsDir);

      // Проверяем существование папки players, если её нет - создаем
      await fs.promises.mkdir(playersDir, { recursive: true });
      console.log('Players directory ensured:', playersDir);

      const componentFilePath = path.join(playersDir, `${pascalCaseName}Playlist.tsx`); // Измененный путь для компонента

      // Формирование содержимого для файла плейлиста
      const playlistContent = `export const trackList${pascalCaseName} = ${JSON.stringify(tracks, null, 2)};`;

      // Запись файла плейлиста
      await fs.promises.writeFile(playlistFilePath, playlistContent);
      console.log('Playlist file created:', playlistFilePath);

      // Формирование содержимого для компонента
      const componentContent = `
        import Head from 'next/head';
        import { trackList${pascalCaseName} } from '../../public/tracklists/trackList${pascalCaseName}';
        import PlayerBar from '../../src/components/PlayerBar/PlayerBar';

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

      // Логирование содержимого компонента перед записью
      console.log('Component Content:', componentContent);

      // Запись файла компонента
      await fs.promises.writeFile(componentFilePath, componentContent);
      console.log('Component file created:', componentFilePath);

      // Возврат успешного ответа
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
