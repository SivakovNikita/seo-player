import styles from './WelcomePage.module.scss';
import FAQ from '../../FAQ/FAQ';
import FAQData from '../../../../../public/data/faqData';

const WelcomePage = () => {
  return (
    <div className={styles.page_container}>
      <div className={styles.page_wrapper}>
        <h1 className={styles.heading}>Управление SEO-плейлистами</h1>

        <div className={styles.paragraph}>
          <FAQ FAQData={FAQData} />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
