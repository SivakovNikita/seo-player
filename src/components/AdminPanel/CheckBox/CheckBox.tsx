import styles from './CheckBox.module.scss';

const CheckBox = () => {
  return (
    <div className={styles.checkbox_container}>
      <label>Создаем: </label>
      <div>
        <input type="checkbox" id="playlist" name="playlist" />
        <label>Плейлист</label>
      </div>
      <div>
        <input type="checkbox" id="playerbar" name="playerbar" />
        <label>Плеербар</label>
      </div>
    </div>
  );
};

export default CheckBox;
