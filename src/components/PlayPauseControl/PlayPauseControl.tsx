import Image from 'next/image';
import styles from './PlayPauseControl.module.scss';
import React from 'react';

interface PlayPauseControlInterface {
  isPlaying: boolean;
  pause: () => void;
  play: () => void;
}

const PlayPauseControl = React.memo(({ isPlaying, pause, play }: PlayPauseControlInterface) => {
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
});
PlayPauseControl.displayName = 'PlayPauseControl';

export default PlayPauseControl;
