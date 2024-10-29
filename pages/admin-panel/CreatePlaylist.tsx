import { useState, ChangeEvent } from 'react';
import { trackImagePaths } from './trackImagePaths';
import Link from 'next/link';

const toPascalCase = (str) => {
  return str.replace(/\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).replace(/\s+/g, '');
};

interface Track {
  title: string;
  src: string;
  artist: string;
  duration: string;
  img: { src: string; sizes: string; type: string }[];
}

export default function AdminPanel() {
  const [playlistName, setPlaylistName] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [createdPlaylist, setcreatedPlaylist] = useState('');

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

      setcreatedPlaylist(toPascalCase(playlistName));
    } catch (error) {
      console.error('Failed to create playlist page:', error);
      alert('Error creating playlist page. Please try again.');
    }
  };

  return (
    <div>
      <h1 style={{ color: 'white' }}>Создайте новый SEO-плейлист</h1>
      <input
        type="text"
        placeholder="Playlist Name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />

      {tracks.map((track, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Track Title"
            value={track.title}
            onChange={(e) => handleChange(index, 'title', e.target.value)}
          />
          <input
            type="text"
            placeholder="Source URL"
            value={track.src}
            onChange={(e) => handleChange(index, 'src', e.target.value)}
          />
          <input
            type="text"
            placeholder="Duration"
            value={track.duration}
            onChange={(e) => handleChange(index, 'duration', e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleAddTrack}>Add Track</button>
      <button onClick={createPlaylist}>Create Playlist</button>
      {createdPlaylist ? (
        <Link href={`http://localhost:3000/players/${toPascalCase(playlistName)}Playlist`}>
          ссылка на новый плейлист
        </Link>
      ) : null}
    </div>
  );
}
