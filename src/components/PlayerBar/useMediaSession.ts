import { useEffect } from 'react';

export interface MediaSessionProps {
  track: {
    title?: string;
    artist?: string;
    artwork?: MediaImage[];
    next?: boolean;
    prev?: boolean;
  };

  onPlay?: (...args: any[]) => any;
  onPause?: (...args: any[]) => any;
  onPreviousTrack?: (...args: any[]) => any;
  onNextTrack?: (...args: any[]) => any;
}

const useMediaSession = (props: MediaSessionProps) => {
  const { track, onPlay, onPause, onPreviousTrack, onNextTrack } = props;

  const loadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    });
  };

  const loadArtwork = async (artwork) => {
    return Promise.all(artwork.map((img) => loadImage(img.src)));
  };

  useEffect(() => {
    if ('mediaSession' in navigator) {
      const { mediaSession } = navigator;

      const updateMediaSession = async () => {
        const loadedArtwork = await loadArtwork(track.artwork);
        mediaSession.metadata = new MediaMetadata({
          title: track.title || '',
          artist: track.artist || '',
          artwork: loadedArtwork.filter(Boolean),
        });

        console.log(mediaSession.metadata.artwork);
      };

      updateMediaSession();

      const events = [
        { action: 'play', handler: onPlay },
        { action: 'pause', handler: onPause },
        { action: 'previoustrack', handler: track.prev ? onPreviousTrack : null },
        { action: 'nexttrack', handler: track.next ? onNextTrack : null },
      ];

      events.forEach(({ action, handler }) => {
        if (handler) {
          mediaSession.setActionHandler(action, async () => {
            try {
              await handler();
            } catch (error) {
              console.error(`Error handling ${action}:`, error);
            }
          });
        }
      });

      return () => {
        events.forEach(({ action }) => {
          mediaSession.setActionHandler(action, null);
        });
      };
    }
  }, [track, onPlay, onPause, onPreviousTrack, onNextTrack]);
};

export default useMediaSession;
