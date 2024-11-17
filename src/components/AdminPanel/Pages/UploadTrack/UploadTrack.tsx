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
      alert('Пожалуйста, выберите файл!');
      return;
    }

    const file = inputFileRef.current.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/uploadTrack', {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get('content-type') || '';
      const text = await response.text();

      if (!response.ok) {
        if (contentType.includes('application/json')) {
          const errorData = JSON.parse(text);
          throw new Error(errorData.error || 'Ошибка загрузки файла');
        } else {
          throw new Error(`Unexpected response from server: ${text}`);
        }
      }

      const result = JSON.parse(text);
      console.log(result);

      setBlob(result);
    } catch (error) {
      console.error('Ошибка загрузки файла:', error.message);
      alert(`Ошибка: ${error.message}`);
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
