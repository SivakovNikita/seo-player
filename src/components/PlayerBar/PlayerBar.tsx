import styles from './PlayerBar.module.scss';
import Image from 'next/image';
import { usePlayer } from './usePalyer';
import useMediaSession from './useMediaSession';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useMemo } from 'react';
import React from 'react';
import Tracklist from '../TrackList/TrackList';
import { TrackProvider } from './TrackContex';
import VolumeBar from '../VolumeBar/VolumeBar';

const PlayerBar = ({ trackList }) => {
  const {
    isPlaying,
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

  useMediaSession({
    track,
    onPlay: play,
    onPause: pause,
    onPreviousTrack: prev,
    onNextTrack: next,
  });

  return (
    <div className={styles.player_container}>
      <div className={styles.controls_container}>
        <div className={styles.player_navigation}>
          <button className={styles.btn_navigate} disabled={isPrevDisabled} onClick={prev}>
            <Image
              src="/images/navigation/Icon_prev_36x36.svg"
              width={36}
              height={36}
              alt="stop button"
              priority={true}
            />
          </button>
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
          <button className={styles.btn_navigate} onClick={() => next()} disabled={isNextDisabled}>
            <Image
              src="/images/navigation/Icon_next_36x36.svg"
              width={36}
              height={36}
              alt="stop button"
              priority={true}
            />
          </button>
        </div>
        <div className={styles.controls_wrapper}>
          <ProgressBar currentTime={currentTrackDuration} duration={trackDuration} onSeek={handleSeek} />
        </div>
        <VolumeBar currentVolume={currentVolume} adjustVolume={adjustVolume} />
      </div>

      <TrackProvider
        trackList={trackList}
        play={play}
        pause={pause}
        next={setNext}
        state={isPlaying}
        currentIndex={currentTrackIndex}
      >
        <Tracklist />
      </TrackProvider>
    </div>
  );
};

export default PlayerBar;
