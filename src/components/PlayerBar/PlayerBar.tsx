import styles from './PlayerBar.module.scss';
import { usePlayer } from './usePalyer';
import useMediaSession from './useMediaSession';
import { CgPlayButton } from 'react-icons/cg';
import { CgPlayPause } from 'react-icons/cg';
import { CgPlayTrackNext } from 'react-icons/cg';
import { CgPlayTrackPrev } from 'react-icons/cg';
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
          artwork: trackData.img,
          next: !isNextDisabled,
          prev: !isPrevDisabled,
        }
      : { title: '', artist: '', artwork: [], next: false, prev: false };
  }, [currentTrackIndex, isNextDisabled, isPrevDisabled, trackList]);

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
            <CgPlayTrackPrev />
          </button>
          <button className={styles.btn_play_pause} onClick={isPlaying ? pause : play}>
            {isPlaying ? <CgPlayPause /> : <CgPlayButton />}
          </button>
          <button className={styles.btn_navigate} onClick={() => next()} disabled={isNextDisabled}>
            <CgPlayTrackNext />
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
