import clsx from 'clsx';
import Image from 'next/image';
import PlayPauseControl from '../PlayPauseControl/PlayPauseControl';
import styles from './MobilePlayerBar.module.scss';
import SideTimersProgressBar from '../SideTimersProgressBar/SideTimersProgressBar';
import Loader from '../Loader/Loader';
import Equalizer from '../Equalizer/Equalizer';

const MobilePlayerBar = ({
  isPlaying,
  isLoading,
  play,
  pause,
  trackDuration,
  currentTrackDuration,
  loadProgress,
  handleSeek,
  track,
  link,
}) => {
  return (
    <div className={clsx(styles.player_container, { [styles.player_container__active]: isPlaying })}>
      <div className={clsx(styles.player_cta_section, { [styles.player_cta_section__active]: isPlaying })}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className={clsx(styles.player_cta_button, { [styles.player_cta_button__active]: isPlaying })}>
            Слушать весь плейлист бесплатно!
          </div>
        </a>
      </div>

      <div className={clsx(styles.player_divider, { [styles.player_divider__active]: isPlaying })}></div>

      <div className={styles.player_controls_wrapper}>
        <div className={styles.track_title_wrapper}>
          <span className={styles.track_title}>{track?.title || 'Демо плейлист'}</span>
        </div>

        <div className={styles.player_controls}>
          <div className={styles.playPause_btn_wrapper}>
            <div className={styles.player_indicators_wrapper}>
              <PlayPauseControl isPlaying={isPlaying} pause={pause} play={play} />
              {isPlaying && isLoading && <Loader isLoading={isLoading} />}
            </div>
          </div>

          <div className={styles.progress_bar_wrapper}>
            <SideTimersProgressBar
              currentTime={currentTrackDuration}
              duration={trackDuration}
              loadProgress={loadProgress}
              onSeek={handleSeek}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePlayerBar;
