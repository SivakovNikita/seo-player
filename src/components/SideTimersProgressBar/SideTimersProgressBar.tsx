import { useRef, useState } from 'react';
import styles from './SideTimersProgressBar.module.scss';
import React from 'react';
import Timer from '../Timer/Timer';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  loadProgress: number;
  onSeek: (time: number) => void;
}

const SideTimersProgressBar = React.memo(({ currentTime, duration, loadProgress, onSeek }: ProgressBarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragginTimeRef = useRef<number | null>(null);
  const [dragginTime, setDragginTime] = useState<number | null>(null);

  const handleSeek = (e: MouseEvent | TouchEvent) => {
    if (ref.current) {
      const posX = (e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX) || 0;
      const { left: containerX, width: containerWidth } = ref.current.getBoundingClientRect();
      const newPosition = Math.max(Math.min(posX - containerX, containerWidth), 0) / containerWidth;
      const newTime = newPosition * duration;
      setDragginTime(newTime);
      dragginTimeRef.current = newTime;
    }
  };

  const handleStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    document.addEventListener('mousemove', handleSeek);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleSeek);
    document.addEventListener('touchend', handleMouseUp);

    handleSeek(e.nativeEvent);
  };

  const handleMouseUp = (e: MouseEvent | TouchEvent) => {
    document.removeEventListener('mousemove', handleSeek);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleSeek);
    document.removeEventListener('touchend', handleMouseUp);

    if (dragginTimeRef.current !== null) {
      onSeek(dragginTimeRef.current);
      setDragginTime(null);
    }
  };

  const progressPercentage = Math.round((currentTime / duration) * 100);
  const calculatedWidth = dragginTime !== null ? (dragginTime / duration) * 100 : progressPercentage;

  return (
    <div className={styles.progress_bar_wrapper}>
      <div className={styles.progress_bar_timer_wrapper}>
        <Timer time={currentTime} />
      </div>
      <div ref={ref} className={styles.progress_bar} onMouseDown={handleStart} onTouchStart={handleStart}>
        <div className={styles.track_loading_progress} style={{ width: `${loadProgress}%` }}></div>
        <div className={styles.track_progress} style={{ width: `${calculatedWidth}%` }}></div>
      </div>
      <div>
        <Timer time={duration} />
      </div>
    </div>
  );
});

SideTimersProgressBar.displayName = 'SideTimersProgressBar';
export default SideTimersProgressBar;
