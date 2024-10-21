import Head from 'next/head';
import { trackListJazzCafe } from '../../public/TrackLists/trackListJazzCafe';
import PlayerBar from '../../src/components/PlayerBar/PlayerBar';

function Player() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Автор: Звук Бизнес, Категория: Музыкальный плейлист, Цена: Бесплатно, Длительность: 120 минут, Описание: Наслаждайтесь специально подобранным плейлистом с джазом для кафе"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Плейлист для кафе от Звук Бизнес</title>
      </Head>
      <PlayerBar trackList={trackListJazzCafe} />
    </>
  );
}

export default Player;
