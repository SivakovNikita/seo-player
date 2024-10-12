import { useState, useEffect, useCallback } from 'react';

export const usePlayer = <T extends { src: string }>({
  queue,
  repeat,
  startIndex,
}: {
  queue: T[];
  repeat: 'all' | 'one' | 'none';
  startIndex: number;
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentTrackDuration, setCurrentTrackDuration] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(0);
  const [isPrevDisabled, setPrevDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(true);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isFirstPlay, setIsFirstPlay] = useState(false);

  useEffect(() => {
    const newAudio = new Audio();
    newAudio.volume = 0.5;
    setCurrentVolume(newAudio.volume);
    setAudio(newAudio);

    return () => {
      newAudio.pause();
    };
  }, []);

  const loadAndPlay = useCallback(
    async (src: string) => {
      if (audio && src) {
        try {
          audio.src = src;

          const awaiter = new Promise<void>((resolve) => {
            const callback = () => {
              audio.removeEventListener('loadstart', callback);
              audio.removeEventListener('abort', callback);
              try {
                resolve();
              } catch (error) {
                console.log(error.message);
              }
            };
            audio.addEventListener('loadstart', callback);
            audio.addEventListener('abort', callback);
          });

          audio.load();
          await awaiter;
          await audio.play();
        } catch (error) {
          if (error instanceof MediaError && error.code !== MediaError.MEDIA_ERR_ABORTED) {
            console.error('Ошибка:', error);
          }
        }
      }
    },
    [audio],
  );

  useEffect(() => {
    const handleUserGesture = () => {
      if (window.AudioContext) {
        const newAudioCtx = new window.AudioContext();

        newAudioCtx.resume();
        setAudioContext(newAudioCtx);

        document.removeEventListener('click', handleUserGesture);
        document.removeEventListener('touchend', handleUserGesture);
      }
    };

    document.addEventListener('click', handleUserGesture);
    document.addEventListener('touchend', handleUserGesture);

    return () => {
      document.removeEventListener('click', handleUserGesture);
      document.removeEventListener('touchend', handleUserGesture);
    };
  }, []);

  const play = useCallback(() => {
    if (audio) {
      if (!isFirstPlay) {
        setIsFirstPlay(true);
      }
      if (audio.readyState === HTMLMediaElement.HAVE_NOTHING) {
        loadAndPlay(queue[currentTrackIndex].src);
      } else {
        audio.play();
      }
    }
  }, [audio, isFirstPlay, loadAndPlay, queue, currentTrackIndex]);

  const pause = useCallback(() => {
    if (audio) {
      audio.pause();
      setIsPlaying(!audio.paused);
    }
  }, [audio]);

  const setNext = useCallback(
    async (index: number) => {
      setCurrentTrackIndex(index);
      await loadAndPlay(queue[index].src);
    },
    [queue, loadAndPlay],
  );

  const next = useCallback(async () => {
    let newIndex = currentTrackIndex + 1;

    if (newIndex >= queue.length) {
      if (repeat === 'all') {
        newIndex = 0;
      } else {
        return audio?.pause();
      }
    }

    setCurrentTrackIndex(newIndex);
    await loadAndPlay(queue[newIndex].src);

    if (audioContext && audioContext.state !== 'running') {
      await audioContext.resume();
    }

    if (audio?.paused) {
      audio.play();
    }
  }, [currentTrackIndex, queue, repeat, loadAndPlay, audio, audioContext]);

  const prev = useCallback(async () => {
    let newIndex = currentTrackIndex - 1;

    setIsPlaying(false);

    if (newIndex < 0) {
      if (repeat === 'all') {
        newIndex = queue.length - 1;
      } else {
        newIndex = 0;
      }
    }

    setCurrentTrackIndex(newIndex);
    await loadAndPlay(queue[newIndex].src);
  }, [currentTrackIndex, queue, repeat, loadAndPlay]);

  const handleSeek = (time: number) => {
    if (audio) {
      audio.currentTime = time;
      setCurrentTrackDuration(time);
    }
  };

  const adjustVolume = (volume: number) => {
    if (audio) {
      const volumeValue = Number(volume);
      audio.volume = volumeValue;
      setCurrentVolume(volumeValue);
    }
  };

  useEffect(() => {
    if (!audio) return;

    const handleLoadedMetadata = () => {
      const duration = audio.duration;
      setTrackDuration(duration);
    };

    const updateTime = () => {
      setCurrentTrackDuration(audio.currentTime);
    };

    const handleEnd = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        next();
      }
    };

    const handlePlayStop = () => {
      setIsPlaying(!audio.paused);
    };

    audio.addEventListener('play', handlePlayStop);
    audio.addEventListener('pause', handlePlayStop);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlayStop);
      audio.removeEventListener('pause', handlePlayStop);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [audio, currentTrackIndex, next, repeat]);

  useEffect(() => {
    setPrevDisabled(currentTrackIndex === 0 && repeat !== 'all');
  }, [currentTrackIndex, audio, repeat]);

  useEffect(() => {
    setNextDisabled(currentTrackIndex === queue.length - 1 && repeat !== 'all');
  }, [currentTrackIndex, queue.length, repeat]);

  return {
    isPlaying,
    audioContext,
    pause,
    play,
    next,
    setNext,
    prev,
    adjustVolume,
    handleSeek,
    setCurrentTrackIndex,
    currentVolume,
    currentTrackIndex,
    isPrevDisabled,
    isNextDisabled,
    trackDuration,
    currentTrackDuration,
  };
};
