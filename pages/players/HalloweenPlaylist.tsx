import Head from 'next/head';
import { trackListHalloween } from '../../public/TrackLists/trackListHalloween';
import PlayerBar from '../../src/components/PlayerBar/PlayerBar';

function Player() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Автор: Звук Бизнес, Категория: Музыкальный плейлист, Цена: Бесплатно, Длительность: 120 минут, Описание: Наслаждайтесь специально подобранным плейлистом с музыкой для хэллоуина"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Плейлист для хэллоуина от Звук Бизнес</title>
      </Head>
      <PlayerBar trackList={trackListHalloween} />
    </>
  );
}

export default Player;
