import clsx from 'clsx';
import Image from 'next/image';
import { usePlayer } from '../../../src/hooks/usePalyer';
import PlayPauseControl from '../PlayPauseControl/PlayPauseControl';
import styles from './Player.module.scss';
import { useEffect, useMemo, useState } from 'react';
import SideTimersProgressBar from '../SideTimersProgressBar/SideTimersProgressBar';
import Loader from '../Loader/Loader';
import Equalizer from '../Equalizer/Equalizer';
import useMediaSession from '../../hooks/useMediaSession';
import useWindowWidth from '../../utils/useWindowWidth';
import MobilePlayerBar from '../MobilePlayerBar/MobilePlayerBar';

const Player = ({ trackList, trackListName }) => {
  const width = useWindowWidth();
  const isMobile = width <= 700;
  const REG_LINK = 'https://app.zvuk-b2b.com/register?promocode=playerbar';
  const href = REG_LINK + trackListName;

  const {
    audio,
    isPlaying,
    isLoading,
    pause,
    play,
    prev,
    handleSeek,
    currentTrackIndex,
    isPrevDisabled,
    isNextDisabled,
    trackDuration,
    loadProgress,
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
  }, [currentTrackIndex, isNextDisabled, isPrevDisabled, trackDuration, trackList, isPlaying]);

  useMediaSession({
    track,
    onPlay: play,
    onPause: pause,
    onPreviousTrack: prev,
  });

  useEffect(() => {
    const newHeight = isPlaying ? '100px' : '50px';
    window.parent.postMessage({ height: newHeight }, '*');
    window.parent.postMessage({ reachGoal: 'playerbar-test' }, '*');
  }, [isPlaying]);

  return isMobile ? (
    <MobilePlayerBar
      audio={audio}
      isLoading={isLoading}
      isPlaying={isPlaying}
      play={play}
      pause={pause}
      trackDuration={trackDuration}
      loadProgress={loadProgress}
      handleSeek={handleSeek}
      track={track}
      link={href}
    />
  ) : (
    <div className={clsx({ [styles.player_container]: true, [styles.player_container__active]: isPlaying })}>
      <div className={clsx({ [styles.player_cta_section]: true, [styles.player_cta_section__active]: isPlaying })}>
        <a href={href} target="_blank">
          <div className={clsx({ [styles.player_cta_button]: true, [styles.player_cta_button__active]: isPlaying })}>
            Слушать весь плейлист бесплатно!
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

        <span className={styles.track_title}>{track.title}</span>

        <div className={styles.playPause_btn_wrapper}>
          <PlayPauseControl isPlaying={isPlaying} pause={pause} play={play} />
        </div>
        <div className={styles.progress_bar_wrapper}>
          <SideTimersProgressBar
            audio={audio}
            duration={trackDuration}
            loadProgress={loadProgress}
            onSeek={handleSeek}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
