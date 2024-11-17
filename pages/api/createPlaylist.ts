import type { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';
import toPascalCase from '../../src/utils/toPascalCase';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const setHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let isAvaible = await redis.exists(req.body.name);
    let isValidLength = req.body.name.length;

    if (!isAvaible && isValidLength) {
      let validName = toPascalCase(req.body.name) + 'Playlist';

      const data = await redis.set(validName, req.body.playlistData);
      console.log();

      return res.json({ success: true, message: 'Плейлист успешно создан: ', data });
    }

    return res.json({ success: false, message: 'Такое имя плейлиста уже существует' });
  } catch (error) {
    console.error('Ошибка записи плейлиста: ', error);
    res.status(500).json({ success: false, message: 'Ошибка записи плейлиста: ', error: error.message });
  }
};

export default setHandler;
