import Head from 'next/head';
import { trackListNewYear } from '../../public/TrackLists/trackListNewYear';
import PlayerBar from '../../src/components/PlayerBar/PlayerBar';

function Player() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Автор: Звук Бизнес, Категория: Музыкальный плейлист, Цена: Бесплатно, Длительность: 120 минут, Описание: Наслаждайтесь специально подобранным рождественским плейлистом для магазина"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Плейлист для кафе от Звук Бизнес</title>
      </Head>
      <PlayerBar trackList={trackListNewYear} />
    </>
  );
}

export default Player;
