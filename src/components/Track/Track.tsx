import clsx from 'clsx';
import { TrackContext } from '../Playlist/TrackContex';
import styles from './Track.module.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import Equalizer from '../Equalizer/Equalizer';
import useWindowWidth from '../../utils/useWindowWidth';
import Image from 'next/image';
import React from 'react';
import Loader from '../Loader/Loader';

type TrackImage = {
  src: string;
  sizes: string;
  type: string;
};

type Track = {
  title?: string;
  src?: string;
  artist?: string;
  duration?: string;
  img?: TrackImage[];
};

interface TrackInterface {
  track: Track;
  index: number;
}

const Track = React.memo(({ track, index }: TrackInterface) => {
  const { play, pause, next, state, currentIndex, isLoading } = useContext(TrackContext);

  const [isCurrentPlaying, setIsCurrentPlaying] = useState(state && currentIndex === index);
  const [playing, setPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isCurrent = currentIndex === index;
  const showPlayButtonMobile = isCurrent && !state && playing;
  const currentTrackNotPlaying = isCurrent && !playing;
  const showPlayButton = (isHovered && !isCurrent) || (isHovered && currentTrackNotPlaying);
  const width = useWindowWidth();
  const isMobile = width <= 430;

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
          <button
            className={clsx(styles.play_pause, {
              [styles.visible]: showPlayButton,
              [styles.hidden]: !showPlayButton,
            })}
            onClick={() => next(index)}
          >
            <Image src="/images/navigation/Icon_play_36x36.svg" width={36} height={36} alt="play button" />
          </button>

          <Image
            className={clsx({ [styles.track_image]: true, [styles.track_image__active]: isCurrent && state })}
            width={30}
            height={30}
            src="/images/trackImage/trackCover96x96.svg"
            alt={'Музыка для бизнеса:' + track.artist}
          />
          {playing ? (
            <button className={styles.play_pause} onClick={state ? () => pause() : () => play()}>
              {state ? (
                !isHovered ? (
                  isLoading ? (
                    <Loader isLoading={isLoading} />
                  ) : (
                    <Equalizer />
                  )
                ) : (
                  <Image src="/images/navigation/Icon_pause_36x36.svg" width={36} height={36} alt="pause button" />
                )
              ) : (
                <Image src="/images/navigation/Icon_play_36x36.svg" width={36} height={36} alt="play button" />
              )}
            </button>
          ) : null}
        </div>
      ) : (
        <div className={styles.images_wrapper}>
          <button
            className={styles.play_pause__mobile}
            onClick={(event) => {
              event.stopPropagation();
              if (isCurrent) {
                state ? pause() : play();
              } else {
                next(index);
              }
            }}
          >
            {showPlayButtonMobile ? (
              <Image src="/images/navigation/Icon_play_36x36.svg" width={48} height={48} alt="play button" />
            ) : null}
            {isCurrent && isLoading ? <Loader isLoading={isLoading} /> : null}
            {isCurrent && state && !isLoading ? <Equalizer /> : null}
          </button>
          <Image
            className={clsx({ [styles.track_image]: true, [styles.track_image__active]: isCurrent && state })}
            width={30}
            height={30}
            src="/images/trackImage/trackCover96x96.svg"
            alt={'Музыка для бизнеса: ' + track.artist}
            priority
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
});

export default Track;
