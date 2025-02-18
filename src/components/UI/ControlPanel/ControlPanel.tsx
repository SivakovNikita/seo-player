import Link from 'next/link';
import styles from './ControlPanel.module.scss';
import { useState } from 'react';
import clsx from 'clsx';

const ControlPanel = ({ play }) => {
  const [isHovered, setIshovered] = useState(false);

  return (
    <div className={styles.initial_controls_wrapper}>
      <button className={styles.button_play} onClick={play}>
        ▶ Воспроизвести
      </button>
      <div
        className={clsx({ [styles.navigation_wrapper]: true, [styles.navigation_wrapper__active]: isHovered })}
        onMouseEnter={() => setIshovered(true)}
        onMouseLeave={() => setIshovered(false)}
      >
        <Link className={styles.link} href="/players">
          <span>Открыть Звук Бизнес</span>
          <span style={{ fontSize: '10px' }}> ↗</span>
        </Link>
      </div>
    </div>
  );
};

export default ControlPanel;
