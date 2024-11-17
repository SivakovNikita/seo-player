import styles from './UploadTrackForm.module.scss';

const UploadTrackForm = ({ inputFileRef, setBlob, blob }) => {
  const handleUpload = async (event) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error('No file selected');
    }
    const file = inputFileRef.current.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/uploadTrack', {
        method: 'POST',
        body: formData,
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();

      setBlob(result);
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
    }
  };

  return (
    <form className={styles.text_block} onSubmit={handleUpload}>
      <input className={styles.input} name="file" ref={inputFileRef} type="file" required />
      {!blob && (
        <button className={styles.button} type="submit">
          Загрузить
        </button>
      )}
      {blob && <span>Ура, трек загружен!</span>}
    </form>
  );
};

export default UploadTrackForm;
