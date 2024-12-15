import Image from 'next/image';
import styles from './PlayPauseControl.module.scss';

const PlayPauseControl = ({ isPlaying, pause, play }) => {
  return (
    <div className={styles.player_navigation}>
      <button className={styles.btn_play_pause} onClick={isPlaying ? pause : play}>
        {isPlaying ? (
          <Image
            src="/images/navigation/Icon_pause_36x36.svg"
            width={36}
            height={36}
            alt="stop button"
            priority={true}
          />
        ) : (
          <Image
            src="/images/navigation/Icon_play_36x36.svg"
            width={36}
            height={36}
            alt="play button"
            priority={true}
          />
        )}
      </button>
    </div>
  );
};

export default PlayPauseControl;
