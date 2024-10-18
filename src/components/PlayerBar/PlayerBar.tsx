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
import PlayerNavigation from '../PlayerNavigation/PlayerNavigation';
import Loader from '../Loader/Loader';

const PlayerBar = ({ trackList }) => {
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
        <PlayerNavigation
          isPlaying={isPlaying}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prev={prev}
          next={next}
          pause={pause}
          play={play}
        />

        <div className={styles.controls_wrapper}>
          <ProgressBar
            currentTime={currentTrackDuration}
            duration={trackDuration}
            loadProgress={loadProgress}
            onSeek={handleSeek}
          />
        </div>
        <VolumeBar currentVolume={currentVolume} adjustVolume={adjustVolume} />
      </div>

      <TrackProvider
        isLoading={isLoading}
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
