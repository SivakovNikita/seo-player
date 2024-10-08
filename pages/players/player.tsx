import { trackList } from '../../public/TrackLists/trackListBarbershop';
import PlayerBar from '../../src/components/PlayerBar/PlayerBar';

function Player() {
  return <PlayerBar trackList={trackList} />;
}

export default Player;
