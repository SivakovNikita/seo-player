import { useCallback, useRef, useState } from 'react';
import TrackForm from '../../NewTrackForm/NewTrackForm';
import styles from './CreatePlaylist.module.scss';
import { trackImagePaths } from '../../../../../public/Tracks/trackImagePaths';
import Link from 'next/link';
import clsx from 'clsx';
import debounce from 'lodash.debounce';
import toPascalCase from '../../../../utils/toPascalCase';
import IframeTemplate from '../../IframeTemplate/IframeTemplate';
import CheckBox from '../../CheckBox/CheckBox';
import UploadTrackForm from '../../UploadTrackForm/UploadTrackForm';
import UploadTrack from '../UploadTrack/UploadTrack';

interface Track {
  title: string;
  src: string;
  artist: string;
  duration: string;
  img: { src: string; sizes: string; type: string }[];
}

function CreatePlaylist() {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [createdPlaylist, setCreatedPlaylist] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const inputRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOption((prev) => (prev === option ? '' : option));
    console.log(option);
  };
  const playlistContent = `Автор: Звук Бизнес, Категория: Музыкальный плейлист, Цена: Бесплатно, Длительность: 120 минут, Описание: ${playlistTitle}`;
  const regex = /([a-zA-Z]*\s*\d*)/gm;

  const handleAddTrack = (event) => {
    event.preventDefault();
    setTracks([...tracks, { title: '', src: '', artist: 'Звук Бизнес', duration: '', img: trackImagePaths }]);
  };

  const handleDeleteTrack = (index) => {
    const updatedTracks = [...tracks];
    updatedTracks.splice(index, 1);
    setTracks(updatedTracks);
  };

  const checkPlaylistNameValidity = useCallback(
    debounce(async (name) => {
      try {
        const response = await fetch(`/api/checkPlaylistName?name=${encodeURIComponent(name)}`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setIsValidName(data.isAvailable);
      } catch (error) {
        console.error('Ошибка проверки имени:', error);
      }
    }, 500),
    [],
  );

  const onPlaylistNameChange = (e) => {
    const name = `${e.target.value}`;

    setPlaylistName(name);
    checkPlaylistNameValidity(name);
  };

  const handleChange = (
    index: number,
    field: keyof Track,
    value: string | { src: string; sizes: string; type: string }[],
  ) => {
    const updatedTracks = tracks.map((track, i) => (i === index ? { ...track, [field]: value } : track));
    setTracks(updatedTracks);
  };

  const createPlaylist = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/createPlaylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: playlistName.trim(),
          playlistData: JSON.stringify({
            title: playlistTitle.trim(),
            content: playlistContent,
            tracks: JSON.parse(JSON.stringify(tracks)),
          }),
        }),
      });

      const result = await response.json();
      setIsValidName(result.success);

      if (!response.ok || !result.success) {
        throw new Error(result.message || `Error ${response.status}: ${response.statusText}`);
      }
      setCreatedPlaylist(true);
    } catch (error) {
      console.error('Failed to create playlist page:', error);
    }
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.admin_panel_container}>
        <h1>Создайте новый SEO-плейлист</h1>

        <form>
          <div className={styles.text_block}>
            <label className={styles.text_block_label}>Введите название нового плейлиста</label>
            <input
              ref={inputRef}
              className={clsx(styles.input, {
                [styles.input_valid]: isValidName,
                [styles.input_not_valid]: !isValidName,
              })}
              type="text"
              placeholder="NewCoolPlayList"
              value={playlistName}
              onChange={onPlaylistNameChange}
              required
            />
            {!isValidName ? (
              <div className={styles.error_plate}>
                <span>Плейлист с таким названием уже существует 😭</span>
              </div>
            ) : null}
            <label>Введите title нового плейлиста</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Новогодний плейлист от Звук Бизнес"
              value={playlistTitle}
              onChange={(e) => setPlaylistTitle(e.target.value)}
              required
            />
            <CheckBox handler={handleOptionChange} selected={selectedOption} />
          </div>
          {tracks.map((track, index) => (
            <TrackForm
              key={index}
              track={track}
              index={index}
              handleChange={handleChange}
              handleDeleteTrack={handleDeleteTrack}
            />
          ))}
          {selectedOption === 'embedplayer' ? <UploadTrack /> : null}
        </form>

        <button className={styles.button} onClick={handleAddTrack}>
          {tracks.length > 0 ? 'Добавить еще один трек' : 'Добавить трек'}
        </button>
        {playlistName && (
          <button className={styles.button} onClick={createPlaylist}>
            Сохранить и опубликовать плейлист
          </button>
        )}

        {createdPlaylist && (
          <div>
            <Link href={`/players/${toPascalCase(playlistName)}Playlist`}>
              <button className={styles.button}>Cсылка на новый плейлист!</button>
            </Link>
            <IframeTemplate src={toPascalCase(playlistName)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePlaylist;
