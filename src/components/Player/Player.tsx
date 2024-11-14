import clsx from 'clsx';
import Image from 'next/image';
import { usePlayer } from '../../../src/hooks/usePalyer';
import useMediaSession from '../../hooks/useMediaSession';
import PlayPauseControl from '../PlayPauseControl/PlayPauseControl';
import styles from './Player.module.scss';
import { useMemo, useState } from 'react';
import SideTimersProgressBar from '../SideTimersProgressBar/SideTimersProgressBar';
import Loader from '../Loader/Loader';
import Equalizer from '../Equalizer/Equalizer';

const Player = ({ trackList }) => {
  const {
    isPlaying,
    isLoading,
    pause,
    play,
    next,
    setNext,
    prev,
    adjustVolume,
    handleSeek,
    currentVolume,
    currentTrackIndex,
    isPrevDisabled,
    isNextDisabled,
    trackDuration,
    loadProgress,
    currentTrackDuration,
  } = usePlayer({
    queue: trackList,
    startIndex: 0,
    repeat: 'none',
  });

  const track = useMemo(() => {
    const trackData = trackList[currentTrackIndex];

    return trackData
      ? {
          title: trackData.title,
          artist: trackData.artist,
          duration: trackDuration,
          artwork: trackData.img,
          isPlaying: isPlaying,
          next: !isNextDisabled,
          prev: !isPrevDisabled,
        }
      : { title: '', artist: '', duration: '', artwork: [], next: false, prev: false };
  }, [currentTrackIndex, isNextDisabled, isPrevDisabled, trackDuration, trackList]);

  return (
    <div>
      <div
        style={{ height: isPlaying ? '100px' : '50px' }}
        className={clsx({ [styles.player_container]: true, [styles.player_container__active]: isPlaying })}
      >
        <div className={clsx({ [styles.player_cta_section]: true, [styles.player_cta_section__active]: isPlaying })}>
          <a>
            <div className={clsx({ [styles.player_cta_button]: true, [styles.player_cta_button__active]: isPlaying })}>
              ▶ Слушать весь плейлист!
            </div>
          </a>
        </div>
        <div className={clsx({ [styles.player_divider]: true, [styles.player_divider__active]: isPlaying })}></div>

        <div className={styles.player_controls_wrapper}>
          <div className={styles.images_wrapper}>
            <div className={styles.player_indicators_wrapper}>
              {isPlaying ? isLoading ? <Loader isLoading={isLoading} /> : <Equalizer /> : null}
            </div>
            <Image
              className={clsx({ [styles.track_image]: true, [styles.track_image__active]: isPlaying })}
              width={30}
              height={30}
              src="/images/trackImage/trackCover96x96.svg"
              alt={'Музыка для бизнеса:' + track.artist}
            />
          </div>

          <span>{track.title}</span>
          <PlayPauseControl isPlaying={isPlaying} pause={pause} play={play} />
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

export default Player;
