import styles from './Modal.module.scss';
import Image from 'next/image';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.pop_up_overlay} onClick={handleOverlayClick}>
      <div className={styles.pop_up} onClick={handleModalClick}>
        <Image
          className={styles.logo}
          src="/images/zvuk business logo.png"
          width={112}
          height={30}
          alt="Звук Бизнес"
          priority={true}
        />
        <div className={styles.children}>{children}</div>
        <a href="https://zvuk-b2b.com/?utm_source=player&utm_medium=embed&utm_content=about" target="_blank">
          <button onClick={handleOverlayClick} className={styles.button}>
            Тестируйте Звук Бизнес бесплатно!
          </button>
        </a>
      </div>
    </div>
  );
};

export default Modal;
