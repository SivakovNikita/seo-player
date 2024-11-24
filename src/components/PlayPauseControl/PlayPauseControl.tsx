import Image from 'next/image';
import styles from './PlayPauseControl.module.scss';
import useWindowWidth from '../../utils/useWindowWidth';

const PlayPauseControl = ({ isPlaying, pause, play }) => {
  const width = useWindowWidth();
  const isMobile = width <= 430;

  return (
    <div className={styles.player_navigation}>
      <button className={styles.btn_play_pause} onClick={isPlaying ? pause : play}>
        {isPlaying ? (
          <Image
            src="/images/navigation/Icon_pause_36x36.svg"
            width={isMobile ? 46 : 36}
            height={isMobile ? 46 : 36}
            alt="stop button"
            priority={true}
          />
        ) : (
          <Image
            src="/images/navigation/Icon_play_36x36.svg"
            width={isMobile ? 46 : 36}
            height={isMobile ? 46 : 36}
            alt="play button"
            priority={true}
          />
        )}
      </button>
    </div>
  );
};

export default PlayPauseControl;
