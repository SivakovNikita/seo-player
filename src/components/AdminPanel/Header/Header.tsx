'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

function Header() {
  const [isCurrent, setIsCurrent] = useState<string | null>(null);

  useEffect(() => {
    setIsCurrent(window.location.pathname);
  }, []); // Запускаем эффект только один раз, при монтировании компонента

  const links = [
    { route: '/admin?page=CreatePlaylist', text: 'Создать плейлист' },
    { route: '/admin?page=EditPlaylist', text: 'Отредактировать плейлист' },
    { route: '/admin?page=UploadTrack', text: 'Загрузить трек' },
  ];

  const handleClick = (route: string) => {
    setIsCurrent(route);
  };

  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.links_container}>
          <ul className={styles.nav_list}>
            <Link href="/admin/">
              <Image src="/images/zvuk business logo.png" alt="Звук Бизнес" width={105} height={25} />
            </Link>
            {links.map((link) => (
              <li key={link.route} className={styles.nav_item}>
                <Link
                  href={link.route}
                  className={clsx(styles.nav_item__link, {
                    [styles.nav_item__link__active]: isCurrent === link.route,
                  })}
                  onClick={() => handleClick(link.route)}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
