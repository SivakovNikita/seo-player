import Head from 'next/head';
import { trackListGeorgianToasts } from '../../public/TrackLists/trackListGeorgianToasts';
import PlayerBar from '../../src/components/PlayerBar/PlayerBar';

function Player() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Автор: Звук Бизнес, Категория: Музыкальный плейлист, Цена: Бесплатно, Длительность: 12 минут, Описание: Наслаждайтесь специально подобранным грузинскими тостами"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Плейлист с грузинскими тостами от Звук Бизнес</title>
      </Head>
      <PlayerBar trackList={trackListGeorgianToasts} />
    </>
  );
}

export default Player;
