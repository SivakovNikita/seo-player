import { useContext } from 'react';
import Track from '../Track/Track';
import styles from './TrackList.module.scss';
import { TrackContext } from '../PlayerBar/TrackContex';

const TrackList = () => {
  const { trackList } = useContext(TrackContext);

  return (
    <div className={styles.trackList_wrapper}>
      {trackList.map((track, index) => (
        <Track
          key={index}
          index={index}
          track={{
            ...track,
            src: track.src || '',
          }}
        />
      ))}
    </div>
  );
};

export default TrackList;
