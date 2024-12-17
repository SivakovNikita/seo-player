import { useContext } from 'react';
import styles from './MobileTrackList.module.scss';
import { TrackContext } from '../Playlist/TrackContex';
import MobileTrack from '../MobileTrack/MobileTrack';

const MobileTrackList = () => {
  const { trackList } = useContext(TrackContext);

  return (
    <div className={styles.trackList_container}>
      <div className={styles.trackList_wrapper}>
        {trackList.map((track, index) => (
          <MobileTrack key={index} index={index} track={{ ...track, src: track.src || '' }} />
        ))}
      </div>
    </div>
  );
};

export default MobileTrackList;
