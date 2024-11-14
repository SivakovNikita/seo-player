import getFormattedTime from '../../utils/getFormattedTime';
import styles from './Timer.module.scss';

const TimerBar = ({ time }) => {
  const formattedTime = getFormattedTime(time);

  return (
    <div className={styles.timer_container}>
      <div className={styles.timer_wrapper}>
        <span>{formattedTime.min ? formattedTime.min : '00'}</span>
        <span>:</span>
        <span>{formattedTime.sec ? formattedTime.sec : '00'}</span>
      </div>
    </div>
  );
};

export default TimerBar;
