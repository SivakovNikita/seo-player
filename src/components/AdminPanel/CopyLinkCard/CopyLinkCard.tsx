import { useState } from 'react';
import styles from './CopyLinkCard.module.scss';

const CopyLinkCard = (src) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copyContent() {
    try {
      const linkCard = document.getElementById('linkCard')?.textContent;

      if (linkCard && navigator) {
        await navigator.clipboard.writeText(linkCard);
        setIsCopied(!isCopied);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  return (
    <div className={styles.iframe_wrapper}>
      <div>
        <span className={styles.iframe_heading}>Готовая ссылка на трек для вставки в треклист:</span>
      </div>
      <div className={styles.code_wrapper}>
        <code className={styles.code} id="linkCard">
          {src.src}
        </code>
      </div>
      <button className={styles.copy_btn} type="button" onClick={copyContent}>
        {!isCopied ? 'Скоприровать ссылку' : 'Ссылка скоприрована!'}
      </button>
    </div>
  );
};

export default CopyLinkCard;
