import styles from './MobileEmbedPlayer.module.scss';
import Image from 'next/image';

import { trackListNewYear } from '../../../../public/TrackLists/trackListNewYear';
import { TrackProvider } from '../../Playlist/TrackContex';
import { usePlayer } from '../../../hooks/usePalyer';
import MobileTrackList from '../../MobileTrackList/MobileTrackList';
import ProgressBar from '../../ProgressBar/ProgressBar';
import PlayerNavigation from '../../PlayerNavigation/PlayerNavigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from '../../UI/Modal/Modal';

const MobileEmbedPlayer = ({}) => {
  const text = `Звук Бизнес — аудиосервис для бизнеса. C 2016 года мы создаём музыкальную атмосферу в заведениях и помогаем брендам звучать красиво, увеличивать продажи и нравиться людям. Аудиосервис позволяет формировать музыкальные волны под любую целевую аудиторию, управлять удалённо музыкальным оформлением в сети заведений и добавлять любой аудиоконтент в свой музыкальный поток.`;
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    setPortal(document.getElementById('portal'));
  }, []);

  const handleOpenModal = (children) => {
    setModalContent(children);
    setShowModal(true);
  };

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
  } = usePlayer({
    queue: trackListNewYear,
    startIndex: 0,
    repeat: 'none',
  });

  const isPaused = portal && !isPlaying && showModal;

  useEffect(() => {
    isPlaying ? setShowModal(true) : null;
    setModalContent(<div>{text}</div>);
  }, [isPlaying]);

  return (
    <div className={styles.mobile_player_container}>
      <div id="portal"></div>
      {/* Оверлей и модальное окно */}
      {isPaused && createPortal(<Modal onClose={toggleModal}>{modalContent}</Modal>, portal)}
      {/* хедер */}
      <div className={styles.mobile_player_header}>
        <Image className={styles.logo} src="/images/zvuk business logo.png" width={112} height={30} alt="Звук Бизнес" />
        <button className={styles.button}>Войти</button>
      </div>
      <div className={styles.mobile_player_metadata_wrapper}>
        <Image
          className={styles.playlist_cover}
          src="/images/playlistCovers/playlist_cover.png"
          width={48}
          height={48}
          alt="Звук Бизнес"
        />
        <div className={styles.mobile_player_metadata}>
          <div className={styles.mobile_palyer_metadata_title}>
            <span className={styles.title}>Музыка для салона красоты</span>
            <span className={styles.sub_title}>Легальная фоновая музыка для бизнеса</span>
          </div>
          <div role="button" className={styles.circle_button}>
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </div>
        </div>
      </div>
      {/* треклист */}
      <div className={styles.mobile_palyer_tracklist}>
        <TrackProvider
          isLoading={isLoading}
          trackList={trackListNewYear}
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
            // это 100000 вынести в компонент
            <div className={styles.initial_controls_wrapper}>
              <button className={styles.button_play} onClick={play}>
                ▶ Воспроизвести
              </button>
              <div className={styles.navigation_wrapper}>
                <Link className={styles.link} href="/players">
                  Открыть Звук Бизнес
                </Link>
                <Image src="/images/navigation/Arrow.svg" width={10} height={10} alt="arrow" />
              </div>
            </div>
          )}
          <div className={styles.legal_link_wrapper}>
            <Link
              className={styles.legal_link}
              href=""
              onClick={() =>
                handleOpenModal(
                  <div>
                    Треки, содержащиеся в настоящем разделе, размещены исключительно в ознакомительных целях. В случае
                    фиксации публичного исполнения указанных треков представителями РАО/ВОИС, иными третьими лицами, и
                    последующего предъявления ими требований, претензий и/или исков относительно нарушения их прав при
                    использовании музыкальных произведений и фонограмм, ООО «Звук Бизнес» (ОГРН 1 077 847 544 642) не
                    будет нести ответственность за нарушения прав таких третьих лиц при использовании музыкальных
                    произведений и фонограмм, в том числе не сможет оказать содействие в защите ваших прав и законных
                    интересов. Для правомерного использования музыки необходимо заключить лицензионный договор с ООО
                    «Звук Бизнес», в том числе путем акцепта оферты.
                  </div>,
                )
              }
            >
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileEmbedPlayer;
