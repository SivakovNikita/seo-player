import Head from 'next/head';
import { trackListBarbershopAudio } from '../../public/TrackLists/trackListBarbershopAudio';
import PlayerBar from '../../src/components/PlayerBar/PlayerBar';

function Player() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Автор: Звук Бизнес, Категория: Музыкальный плейлист, Цена: Бесплатно, Длительность: 120 минут, Описание: Cпециально созданные аудиоролики для барбершопа от Звук Бизнес"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Аудиоролики для барбершопа от Звук Бизнес</title>
      </Head>
      <PlayerBar trackList={trackListBarbershopAudio} />
    </>
  );
}

export default Player;
