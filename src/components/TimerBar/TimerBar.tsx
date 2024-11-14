import getFormattedTime from '../../utils/getFormattedTime';
import styles from './TimerBar.module.scss';

const TimerBar = ({ currentTrackDuration, duration }) => {
  console.log(currentTrackDuration, duration);

  const formattedTime = getFormattedTime(currentTrackDuration);
  const formattedTrackDuration = getFormattedTime(duration);

  return (
    <div className={styles.timer_container}>
      <div className={styles.timer_wrapper}>
        <span>{formattedTime.min ? formattedTime.min : '00'}</span>
        <span>:</span>
        <span>{formattedTime.sec ? formattedTime.sec : '00'}</span>
      </div>
      <div className={styles.timer_wrapper}>
        <span>{formattedTrackDuration.min ? formattedTrackDuration.min : '00'}</span>
        <span>:</span>
        <span>{formattedTrackDuration.sec ? formattedTrackDuration.sec : '00'}</span>
      </div>
    </div>
  );
};

export default TimerBar;
