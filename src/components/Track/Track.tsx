import clsx from 'clsx';
import { TrackContext } from '../PlayerBar/TrackContex';
import styles from './Track.module.scss';
import { useContext, useEffect, useState } from 'react';
import Equalizer from '../Equalizer/Equalizer';
import useWindowWidth from './useWindowWidth';
import { CgPlayButton } from 'react-icons/cg';
import { CgPlayPause } from 'react-icons/cg';
import Image from 'next/image';
import React from 'react';

const Track = ({ track, index }) => {
  const { play, pause, next, state, currentIndex } = useContext(TrackContext);
  const [isCurrentPlaying, setIsCurrentPlaying] = useState(state && currentIndex === index);
  const [playing, setPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isCurrent = currentIndex === index;
  const showPlayButtonMobile = isCurrent && !state && playing;
  const currentTrackNotPlaying = isCurrent && !playing;
  const showPlayButton = (isHovered && !isCurrent) || (isHovered && currentTrackNotPlaying);
  const width = useWindowWidth();
  const isMobile = width <= 768;

  useEffect(() => {
    setIsCurrentPlaying(state && currentIndex === index);
  }, [state, currentIndex, index]);

  useEffect(() => {
    if (playing !== true) {
      setPlaying(isCurrent && state);
    } else if (!isCurrent) {
      setPlaying(false);
    }
  }, [isCurrent, playing, state]);

  return (
    <div
      className={clsx({ [styles.track_wrapper]: true, [styles.track_wrapper__active]: isCurrentPlaying })}
      onMouseEnter={!isMobile ? () => setIsHovered(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsHovered(false) : undefined}
    >
      {!isMobile ? (
        <div className={styles.images_wrapper}>
          {showPlayButton ? (
            <button className={styles.play_pause} onClick={() => next(index)}>
              <CgPlayButton />
            </button>
          ) : null}
          <Image
            className={clsx({ [styles.track_image]: true, [styles.track_image__active]: isCurrent && state })}
            width={30}
            height={30}
            src="/images/trackImage/trackCover96x96.svg"
            alt={'Музыка для бизнеса:' + track.artist}
          />
          {playing ? (
            <button className={styles.play_pause} onClick={state ? () => pause() : () => play()}>
              {state ? !isHovered ? <Equalizer /> : <CgPlayPause /> : <CgPlayButton />}
            </button>
          ) : null}
        </div>
      ) : (
        // onClick={(event) => event.stopPropagation()}
        <div className={styles.images_wrapper}>
          <button
            className={styles.play_pause__mobile}
            // onClick={(event) => {
            //   event.stopPropagation();
            //   if (isCurrent) {
            //     state ? pause() : play();
            //   } else {
            //     next(index);
            //   }
            // }}
          >
            {showPlayButtonMobile ? <CgPlayButton /> : null}
            {isCurrent && state ? <Equalizer /> : null}
          </button>
          <Image
            className={clsx({ [styles.track_image]: true, [styles.track_image__active]: isCurrent && state })}
            width={30}
            height={30}
            src="/images/trackImage/trackCover96x96.svg"
            alt={'Музыка для бизнеса: ' + track.artist}
          />
        </div>
      )}
      <div className={styles.track_name_wrapper}>
        <span className={styles.artist_title}>{track.artist}</span>
        <span className={styles.track_title}>{track.title}</span>
      </div>
      <div className={styles.track_time_wrapper}>
        <span className={styles.track_time}>{track.duration}</span>
      </div>
    </div>
  );
};

export default Track;
