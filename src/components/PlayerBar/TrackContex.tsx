import { createContext, ReactNode } from 'react';

interface Track {
  title?: string;
  artist?: string;
  src?: string;
  img?: { src: string; sizes: string; type: string }[];
  duration?: string;
}

interface TrackContextProps {
  trackList: Track[];
  next: (index?: number) => void;
  pause: (index?: number) => void;
  play: (index?: number) => void;
  state: boolean;
  currentIndex: number;
}

export const TrackContext = createContext<TrackContextProps>({
  trackList: [],
  next: () => {},
  pause: () => {},
  play: () => {},
  state: false,
  currentIndex: 0,
});

interface TrackProviderProps {
  children?: ReactNode;
  trackList?: Track[];
  next?: (index?: number) => void;
  pause?: (index?: number) => void;
  play?: (index?: number) => void;
  state?: boolean;
  currentIndex?: number;
}

export const TrackProvider = ({
  children,
  trackList = [],
  next = () => {},
  pause = () => {},
  play = () => {},
  state = false,
  currentIndex = 0,
}: TrackProviderProps) => {
  return (
    <TrackContext.Provider value={{ trackList, next, play, pause, state, currentIndex }}>
      {children}
    </TrackContext.Provider>
  );
};
