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
  isLoading: boolean;
}

export const TrackContext = createContext<TrackContextProps>({
  trackList: [],
  next: () => {},
  pause: () => {},
  play: () => {},
  state: false,
  currentIndex: 0,
  isLoading: false,
});

interface TrackProviderProps {
  children?: ReactNode;
  trackList?: Track[];
  next?: (index?: number) => void;
  pause?: (index?: number) => void;
  play?: (index?: number) => void;
  state?: boolean;
  currentIndex?: number;
  isLoading?: boolean;
}

export const TrackProvider = ({
  children,
  trackList = [],
  next = () => {},
  pause = () => {},
  play = () => {},
  state = false,
  currentIndex = 0,
  isLoading = false,
}: TrackProviderProps) => {
  return (
    <TrackContext.Provider value={{ trackList, next, play, pause, state, currentIndex, isLoading }}>
      {children}
    </TrackContext.Provider>
  );
};
