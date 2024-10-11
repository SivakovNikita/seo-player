import { trackList } from '../../public/TrackLists/trackListBarbershop';
import PlayerBar from '../../src/components/PlayerBar/PlayerBar';

function Player() {
  return (
    <>
      <meta
        name="description"
        content="Автор: Звук Бизнес, Категория: Музыкальный плейлист, Цена: Бесплатно, Длительность: 120 минут, Описание: Наслаждайтесь специально подобранным плейлистом для барбершопов и мужских парикмахерских, включающим расслабляющие и стильные треки для улучшения вашего опыта ухода."
      ></meta>
      <title>Плейлист для барбершопа от Звук Бизнес</title>
      <body>
        <PlayerBar trackList={trackList} />
      </body>
      ;
    </>
  );
}

export default Player;
