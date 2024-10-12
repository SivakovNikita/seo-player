import { trackList } from '../../public/TrackLists/trackListBarbershop';
import PlayerBar from '../../src/components/PlayerBar/PlayerBar';

function Player() {
  return (
    <>
      <meta
        name="description"
        content="Автор: Звук Бизнес, Категория: Музыкальный плейлист, Цена: Бесплатно, Длительность: 120 минут, Описание: Наслаждайтесь специально подобранным плейлистом для барбершопов и мужских парикмахерских, включающим расслабляющие и стильные треки."
      ></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <title>Плейлист для барбершопа от Звук Бизнес</title>
      <PlayerBar trackList={trackList} />;
    </>
  );
}

export default Player;
