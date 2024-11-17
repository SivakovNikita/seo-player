import { useState } from 'react';
import CreatePlaylist from '../../src/components/AdminPanel/Pages/CreatePlaylist/CreatePlaylist';
import EditPlaylist from '../../src/components/AdminPanel/Pages/EditPlaylist/EditPlaylist';
import UploadTrack from '../../src/components/AdminPanel/Pages/UploadTrack/UploadTrack';
import styles from './index.module.scss';

function AdminPanel() {
  const [currentPage, setCurrentPage] = useState(<CreatePlaylist />);

  const handleClick = (component) => {
    setCurrentPage(component);
  };

  return (
    <div>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.links_container}>
            <ul className={styles.nav_list}>
              <li className={styles.nav_item} onClick={() => handleClick(<CreatePlaylist />)}>
                Создать плейлист
              </li>
              <li className={styles.nav_item} onClick={() => handleClick(<EditPlaylist />)}>
                Отредактировать плейлист
              </li>
              <li className={styles.nav_item} onClick={() => handleClick(<UploadTrack />)}>
                Загрузить трек
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {currentPage}
    </div>
  );
}

export default AdminPanel;
