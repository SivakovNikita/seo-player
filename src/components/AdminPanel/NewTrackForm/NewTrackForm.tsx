import styles from './NewTrackForm.module.scss';

function NewTrackForm({ track, index, handleChange, handleDeleteTrack }) {
  return (
    <div className={styles.track_form} key={index}>
      <div className={styles.track_form_header}>
        <div>Трек</div>
        <button className={styles.tracks_list_btn} onClick={() => handleDeleteTrack(index)}>
          ⛌
        </button>
      </div>
      <div className={styles.tracks_list_track_wrapper}>
        <label className={styles.tracks_list_span}>Название трека</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Cool track"
          value={track.title}
          onChange={(e) => handleChange(index, 'title', e.target.value)}
          required
        />
        <label className={styles.tracks_list_span}>Укажите путь, по которому доступен трек</label>
        <input
          className={styles.input}
          type="text"
          placeholder="URL"
          value={track.src}
          onChange={(e) => handleChange(index, 'src', e.target.value)}
          required
        />
        <label className={styles.tracks_list_span}>Укажите продолжительность трека в формате 00:00</label>
        <input
          className={styles.input}
          type="text"
          placeholder="03:12"
          value={track.duration}
          onChange={(e) => handleChange(index, 'duration', e.target.value)}
          required
        />
      </div>
    </div>
  );
}

export default NewTrackForm;
