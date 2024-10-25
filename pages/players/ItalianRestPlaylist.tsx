import Head from 'next/head';
import { trackListItalianResto } from '../../public/TrackLists/trackListItalianResto';
import PlayerBar from '../../src/components/PlayerBar/PlayerBar';

function Player() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Автор: Звук Бизнес, Категория: Музыкальный плейлист, Цена: Бесплатно, Длительность: 120 минут, Описание: Наслаждайтесь специально подобранным плейлистом для итальянского ресторана"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Плейлист для итальянского ресторана от Звук Бизнес</title>
      </Head>
      <PlayerBar trackList={trackListItalianResto} />
    </>
  );
}

export default Player;
