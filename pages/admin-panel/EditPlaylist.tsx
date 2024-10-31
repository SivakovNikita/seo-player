import { useState, useEffect } from 'react';
import styles from './EditPlaylist.module.scss';
import Link from 'next/link';

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

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/getPlayLists');
        const data = await response.json();
        setPlaylists(data.playlists);
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
          setPlaylistData(data);
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
    } catch (error) {
      console.error('Failed to save playlist changes:', error);
    }
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.admin_panel_container}>
        <h2>Редактирование плейлистов</h2>
        <h3>Плейлисты в базе</h3>
        <ul>
          {playlists.map((playlist) => (
            <li onClick={() => setPlaylistToEdit(playlist)} key={playlist}>
              {playlist}
            </li>
          ))}
        </ul>
        {Array.isArray(playlistData) && playlistData.length > 0 ? (
          <form>
            {playlistData.map((track, index) => (
              <div key={index}>
                <span>Название трека:</span>
                <input
                  value={track.title || ''}
                  onChange={(e) => {
                    const updatedTrack = { ...track, title: e.target.value };
                    const updatedPlaylist = playlistData.map((t, i) => (i === index ? updatedTrack : t));
                    setPlaylistData(updatedPlaylist);
                  }}
                />
                <span>Путь к файлу с треком:</span>
                <input
                  value={track.src || ''}
                  onChange={(e) => {
                    const updatedTrack = { ...track, src: e.target.value };
                    const updatedPlaylist = playlistData.map((t, i) => (i === index ? updatedTrack : t));
                    setPlaylistData(updatedPlaylist);
                  }}
                />
              </div>
            ))}
            <button type="button" onClick={handleSave}>
              Сохранить изменения
            </button>
          </form>
        ) : (
          <p>Нет данных для редактирования</p>
        )}
        <button>
          <Link href="/admin/CreatePlaylist">Создать новый плейлист</Link>
        </button>
      </div>
    </div>
  );
}

export default EditPlaylist;
