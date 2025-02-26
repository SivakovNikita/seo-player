import styles from './MobileEmbedPlayer.module.scss';
import Image from 'next/image';
import { TrackProvider } from '../../Playlist/TrackContex';
import { usePlayer } from '../../../hooks/usePalyer';
import MobileTrackList from '../../MobileTrackList/MobileTrackList';
import ProgressBar from '../../ProgressBar/ProgressBar';
import PlayerNavigation from '../../PlayerNavigation/PlayerNavigation';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from '../../UI/Modal/Modal';
import ControlPanel from '../../UI/ControlPanel/ControlPanel';
import useModal from '../../../hooks/useModal';
import useMediaSession from '../../../hooks/useMediaSession';
import Link from 'next/link';

interface Track {
  title?: string;
  artist?: string;
  src?: string;
  img?: { src: string; sizes: string; type: string }[];
  duration?: string;
}

interface MobileEmbedPlayerInterface {
  title: string;
  subtitle: string;
  imageSrc: string;
  content: string;
  tracks: Track[];
}

const MobileEmbedPlayer = ({ playlist }) => {
  console.log(playlist);
  const [title, subtitle, imageSrc, , tracks] = playlist;
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  const { isOpen, content, openModal, closeModal, handlePlaybackChange } = useModal();

  useEffect(() => {
    setPortal(document.getElementById('portal'));
  }, []);

  const {
    audio,
    isPlaying,
    isLoading,
    pause,
    play,
    next,
    setNext,
    prev,
    handleSeek,
    currentTrackIndex,
    isPrevDisabled,
    isNextDisabled,
    trackDuration,
    loadProgress,
  } = usePlayer({ queue: tracks, startIndex: 0, repeat: 'none' });

  const track = useMemo(() => {
    return tracks[currentTrackIndex];
  }, [currentTrackIndex]);

  useMediaSession({
    track,
    onPlay: play,
    onPause: pause,
    onPreviousTrack: prev,
  });

  useEffect(() => {
    handlePlaybackChange(isPlaying);
  }, [isPlaying]);

  return (
    <div className={styles.background}>
      <div className={styles.mobile_player_container}>
        <div id="portal"></div>
        {isOpen && portal && createPortal(<Modal onClose={closeModal}>{content}</Modal>, portal)}
        <div className={styles.mobile_player_header}>
          <Image
            className={styles.logo}
            src="/images/zvuk business logo.png"
            width={112}
            height={30}
            alt="Звук Бизнес"
          />
          <Link href="https://zvuk-b2b.com/?utm_source=embed&utm_campaign=log-in&utm_content=button">
            <button className={styles.button}>Войти</button>
          </Link>
        </div>
        <div className={styles.mobile_player_metadata_wrapper}>
          <Image className={styles.playlist_cover} src={imageSrc} width={48} height={48} alt={title} />
          <div className={styles.mobile_player_metadata}>
            <div className={styles.mobile_palyer_metadata_title}>
              <span className={styles.title}>{title}</span>
              <span className={styles.sub_title}>{subtitle}</span>
            </div>
          </div>
        </div>
        <div className={styles.mobile_palyer_tracklist}>
          <TrackProvider
            isLoading={isLoading}
            trackList={tracks}
            play={play}
            pause={pause}
            next={setNext}
            state={isPlaying}
            currentIndex={currentTrackIndex}
          >
            <MobileTrackList />
          </TrackProvider>
        </div>
        <div className={styles.mobile_player_controls}>
          <div className={styles.controls_container}>
            {isPlaying ? (
              <div className={styles.controls_wrapper}>
                <PlayerNavigation
                  isPlaying={isPlaying}
                  isPrevDisabled={isPrevDisabled}
                  isNextDisabled={isNextDisabled}
                  prev={prev}
                  next={next}
                  pause={pause}
                  play={play}
                />
                <ProgressBar audio={audio} duration={trackDuration} loadProgress={loadProgress} onSeek={handleSeek} />
              </div>
            ) : (
              <ControlPanel play={play} />
            )}
            <div className={styles.legal_link_wrapper}>
              <span className={styles.legal_link} onClick={() => openModal('click')}>
                Условия использования
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileEmbedPlayer;
