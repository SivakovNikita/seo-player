import { useState } from 'react';
import styles from './CheckBox.module.scss';

const CheckBox = ({ handler, selected }) => {
  const handleChange = (e) => {
    handler(e.target.name);
  };
  return (
    <div className={styles.checkbox_container}>
      <label>Создаем: </label>
      <div>
        <input
          onChange={handleChange}
          checked={selected === 'playlist'}
          type="checkbox"
          id="playlist"
          name="playlist"
        />
        <label>Плейлист</label>
      </div>
      <div>
        <input
          onChange={handleChange}
          checked={selected === 'playerbar'}
          type="checkbox"
          id="playerbar"
          name="playerbar"
        />
        <label>Плеербар</label>
      </div>
      <div>
        <input
          onChange={handleChange}
          checked={selected === 'embedplayer'}
          type="checkbox"
          id="embed"
          name="embedplayer"
        />
        <label>Embed плеер</label>
      </div>
    </div>
  );
};

export default CheckBox;
