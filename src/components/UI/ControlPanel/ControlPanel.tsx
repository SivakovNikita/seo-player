import styles from './ControlPanel.module.scss';

const ControlPanel = ({ play }) => {
  const REG_LINK = 'https://app.zvuk-b2b.com/register?promocode=embed-player';
  return (
    <div className={styles.initial_controls_wrapper}>
      <button className={styles.button_play} onClick={play}>
        <img src="/images/navigation/embed-play.svg"></img> Воспроизвести
      </button>
      <div>
        <a className={styles.text_link} href={REG_LINK} target="_blank">
          <span>Открыть Звук Бизнес </span>
          <img src="/images/navigation/embed-arrow.svg"></img>
        </a>
      </div>
    </div>
  );
};

export default ControlPanel;
