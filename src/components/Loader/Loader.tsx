import styles from './Loader.module.scss';
import clsx from 'clsx';

interface LoaderInterface {
  isLoading: boolean;
}

const Loader = ({ isLoading = false }: LoaderInterface) => {
  return (
    <div className={clsx({ [styles.loader_container]: true, [styles.loader_container__active]: isLoading })}>
      <div className={styles.loader}></div>
    </div>
  );
};
export default Loader;
