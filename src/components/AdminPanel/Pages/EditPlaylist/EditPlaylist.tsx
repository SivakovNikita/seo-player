import { useState, useEffect } from 'react';
import styles from './EditPlaylist.module.scss';
import Link from 'next/link';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface Track {
  title: string;
  src: string;
  artist: string;
  duration: string;
  img: { src: string; sizes: string; type: string }[];
}

function EditPlaylist() {
  const [playlists, setPlaylists] = useState<string[]>([]);
  const [playlistData, setPlaylistData] = useState<Track[]>([]);
  const [playlistToEdit, setPlaylistToEdit] = useState<string | null>(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/getPlaylists');
        const data = await response.json();

        setPlaylists(data.keys);
        setIsUpdated(false);
      } catch (error) {
        console.error('Failed to fetch playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  useEffect(() => {
    if (playlistToEdit) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/getPlaylistContent?name=${playlistToEdit}`);
          const data = await response.json();
          setPlaylistData(data.playlistData.tracks);
          setIsUpdated(false);
        } catch (error) {
          console.error('Failed to fetch playlist content:', error);
        }
      };
      fetchData();
    }
  }, [playlistToEdit]);

  const handleSave = async () => {
    try {
      await fetch(`/api/updatePlaylistContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playlistToEdit, data: playlistData }),
      });
      setIsUpdated(true);
    } catch (error) {
      console.error('Failed to save playlist changes:', error);
    }
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.admin_panel_container}>
        <h2>Редактирование плейлистов</h2>
        <h3>Выберите плейлист:</h3>
        <Dropdown
          options={playlists}
          placeholder="Выберите плейлист"
          onChange={(selectedOption) => {
            setIsUpdated(!isUpdated);
            if (selectedOption && selectedOption.value) {
              setPlaylistToEdit(selectedOption.value);
            }
          }}
        />

        {Array.isArray(playlistData) && playlistData.length > 0 ? (
          <form>
            {playlistData.map((track, index) => (
              <div key={index} className={styles.track_form}>
                <div className={styles.track_form_header}>
                  <span>Название трека:</span>
                </div>
                <input
                  className={styles.input}
                  disabled={isUpdated}
                  value={track.title || ''}
                  onChange={(e) => {
                    const updatedTrack = { ...track, title: e.target.value };
                    const updatedPlaylist = playlistData.map((t, i) => (i === index ? updatedTrack : t));
                    setPlaylistData(updatedPlaylist);
                  }}
                />
                <span>Путь к файлу с треком:</span>
                <input
                  className={styles.input}
                  disabled={isUpdated}
                  value={track.src || ''}
                  onChange={(e) => {
                    const updatedTrack = { ...track, src: e.target.value };
                    const updatedPlaylist = playlistData.map((t, i) => (i === index ? updatedTrack : t));
                    setPlaylistData(updatedPlaylist);
                  }}
                />
              </div>
            ))}
            {isUpdated ? (
              <span>Данные плейлиста успешно обновлены!</span>
            ) : (
              <button className={styles.button} type="button" onClick={handleSave}>
                Сохранить изменения
              </button>
            )}
          </form>
        ) : (
          <p>Нет данных для редактирования</p>
        )}
      </div>
    </div>
  );
}

export default EditPlaylist;
