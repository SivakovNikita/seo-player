import { useState } from 'react';
import styles from './CreatePlaylist.module.scss';
import { trackImagePaths } from '../../public/Tracks/trackImagePaths';
import Link from 'next/link';

const toPascalCase = (str: string) => {
  return str.replace(/\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).replace(/\s+/g, '');
};

interface Track {
  title: string;
  src: string;
  artist: string;
  duration: string;
  img: { src: string; sizes: string; type: string }[];
}

function CreatePlaylist() {
  const [playlistName, setPlaylistName] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [createdPlaylist, setCreatedPlaylist] = useState('');

  const handleAddTrack = () => {
    setTracks([...tracks, { title: '', src: '', artist: 'Звук Бизнес', duration: '', img: trackImagePaths }]);
  };

  const handleChange = (
    index: number,
    field: keyof Track,
    value: string | { src: string; sizes: string; type: string }[],
  ) => {
    const updatedTracks = tracks.map((track, i) => (i === index ? { ...track, [field]: value } : track));
    setTracks(updatedTracks);
  };

  const createPlaylist = async () => {
    try {
      const response = await fetch('/api/createPlaylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playlistName, tracks: JSON.parse(JSON.stringify(tracks)) }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setCreatedPlaylist(toPascalCase(playlistName));
    } catch (error) {
      console.error('Failed to create playlist page:', error);
      alert('Error creating playlist page. Please try again.');
    }
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.admin_panel_container}>
        <h1 style={{ color: 'white' }}>Создайте новый SEO-плейлист</h1>
        <div>
          <div className={styles.new_player_name}>
            <span>Введите название нового плейлиста</span>
            <input
              type="text"
              placeholder="NewCoolPlayList"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
          </div>

          {tracks.map((track, index) => (
            <div className={styles.tracks_list} key={index}>
              <span className={styles.tracks_list_span}>Название трека</span>
              <input
                type="text"
                placeholder="Cool track"
                value={track.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
              />
              <span className={styles.tracks_list_span}>Укажите путь, по которому доступен трек</span>
              <input
                type="text"
                placeholder="URL"
                value={track.src}
                onChange={(e) => handleChange(index, 'src', e.target.value)}
              />
              <span className={styles.tracks_list_span}>Укажите продолжительность трека в формате 00:00</span>
              <input
                type="text"
                placeholder="03:12"
                value={track.duration}
                onChange={(e) => handleChange(index, 'duration', e.target.value)}
              />
              <button>Удалить трек</button>
            </div>
          ))}
        </div>

        <button onClick={handleAddTrack}>Добавить трек</button>
        <button onClick={createPlaylist}>Сохранить плейлист</button>
        {createdPlaylist && (
          <Link href={`http://localhost:3000/players/${toPascalCase(playlistName)}Playlist`}>
            ссылка на новый плейлист
          </Link>
        )}
        <button>
          <Link href="/admin/EditPlaylist">Отредактировать существующий плейлист</Link>
        </button>
      </div>
    </div>
  );
}

export default CreatePlaylist;
