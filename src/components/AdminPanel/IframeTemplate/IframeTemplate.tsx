import { useState } from 'react';
import styles from './IframeTemplate.module.scss';

const IframeTemplate = (src) => {
  const [isCopied, setIsCopied] = useState(false);
  async function copyContent() {
    try {
      const iframeCode = document.getElementById('iframeCode')?.textContent;

      if (iframeCode && navigator) {
        await navigator.clipboard.writeText(iframeCode);
        setIsCopied(!isCopied);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  return (
    <div className={styles.iframe_wrapper}>
      <div>
        <span className={styles.iframe_heading}>Готовый iframe для вставки на лендинг:</span>
      </div>
      <div className={styles.code_wrapper}>
        <code className={styles.code} id="iframeCode">
          {`
            <html>
            <iframe
                class="player"
                src="https://seo-player.vercel.app/players/${src.src}Playlist"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; encrypted-media"
                title="SEO Player"
                style="border: none;"
            ></iframe>
            </html>
        `}
        </code>
      </div>
      <button className={styles.copy_btn} type="button" onClick={copyContent}>
        {!isCopied ? 'Скоприровать' : 'Скоприровано!'}
      </button>
    </div>
  );
};

export default IframeTemplate;
