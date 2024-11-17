import styles from './UploadTrack.module.scss';
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import CopyLinkCard from '../../CopyLinkCard/CopyLinkCard';
import UploadTrackForm from '../../UploadTrackForm/UploadTrackForm';

const UploadTrack = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

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

      if (!response.ok) {
        throw new Error('Ошибка загрузки файла');
      }

      const result = await response.json();

      setBlob(result);
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
    }
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.admin_panel_container}>
        <h1>Загрузите новый трек</h1>

        <form className={styles.text_block} onSubmit={handleUpload}>
          <input className={styles.input} name="file" ref={inputFileRef} type="file" required />
          {!blob && (
            <button className={styles.button} type="submit">
              Загрузить
            </button>
          )}
          {blob && <span>Ура, трек загружен!</span>}
        </form>
        {blob && (
          <div>
            <CopyLinkCard src={blob.url} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadTrack;
