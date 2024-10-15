import Image from 'next/image';
import styles from './PlayerNavigation.module.scss';
import useWindowWidth from '../Track/useWindowWidth';

const PlayerNavigation = ({ isPlaying, isPrevDisabled, isNextDisabled, prev, next, pause, play }) => {
  const width = useWindowWidth();
  const isMobile = width <= 430;

  return (
    <div className={styles.player_navigation}>
      <button className={styles.btn_navigate} disabled={isPrevDisabled} onClick={prev}>
        <Image
          src="/images/navigation/Icon_prev_36x36.svg"
          width={isMobile ? 56 : 36}
          height={isMobile ? 56 : 36}
          alt="stop button"
          priority={true}
        />
      </button>
      <button className={styles.btn_play_pause} onClick={isPlaying ? pause : play}>
        {isPlaying ? (
          <Image
            src="/images/navigation/Icon_pause_36x36.svg"
            width={isMobile ? 56 : 36}
            height={isMobile ? 56 : 36}
            alt="stop button"
            priority={true}
          />
        ) : (
          <Image
            src="/images/navigation/Icon_play_36x36.svg"
            width={isMobile ? 56 : 36}
            height={isMobile ? 56 : 36}
            alt="play button"
            priority={true}
          />
        )}
      </button>
      <button className={styles.btn_navigate} onClick={() => next()} disabled={isNextDisabled}>
        <Image
          src="/images/navigation/Icon_next_36x36.svg"
          width={isMobile ? 56 : 36}
          height={isMobile ? 56 : 36}
          alt="stop button"
          priority={true}
        />
      </button>
    </div>
  );
};

export default PlayerNavigation;
