import Head from 'next/head';
import { trackListChillPop } from '../../public/TrackLists/trackListChillPop';
import PlayerBar from '../../src/components/PlayerBar/PlayerBar';

function Player() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Автор: Звук Бизнес, Категория: Музыкальный плейлист, Цена: Бесплатно, Длительность: 120 минут, Описание: Наслаждайтесь специально подобранным плейлистом с pop музыкой для магазинов"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Плейлист для магазинов от Звук Бизнес</title>
      </Head>
      <PlayerBar trackList={trackListChillPop} />
    </>
  );
}

export default Player;
