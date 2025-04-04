import styles from './Playlist.module.scss';
import React from 'react';
import useMediaSession from '../../hooks/useMediaSession';
import ProgressBar from '../ProgressBar/ProgressBar';
import Tracklist from '../TrackList/TrackList';
import VolumeBar from '../VolumeBar/VolumeBar';
import PlayerNavigation from '../PlayerNavigation/PlayerNavigation';
import { usePlayer } from '../../hooks/usePalyer';
import { useMemo } from 'react';
import { TrackProvider } from './TrackContex';

const Playlist = ({ trackList }) => {
  const {
    audio,
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
          <ProgressBar audio={audio} duration={trackDuration} loadProgress={loadProgress} onSeek={handleSeek} />
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
Playlist.displayName = 'Playlist';

export default Playlist;
