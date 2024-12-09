'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { SignedIn, UserButton } from '@clerk/nextjs';
import useWindowWidth from '../../../utils/useWindowWidth';
import MobileHeader from '../../AdminPanel/MobileHeader/MobileHeader';

function Header() {
  const [isCurrent, setIsCurrent] = useState<string | null>(null);
  const isMobile = useWindowWidth() <= 770;

  const links = [
    { route: '/admin/CreatePlaylist', text: 'Создать плейлист' },
    { route: '/admin/EditPlaylist', text: 'Отредактировать плейлист' },
    { route: '/admin/UploadTrack', text: 'Загрузить трек' },
  ];

  const handleClick = (route: string) => {
    setIsCurrent(route);
  };

  return (
    <header className={styles.header}>
      {!isMobile ? (
        <div className={styles.nav}>
          <div className={styles.links_container}>
            <ul className={styles.nav_list}>
              <div className={styles.logo_image}>
                <Link href="/admin/">
                  <Image src="/images/zvuk business logo.png" alt="Звук Бизнес" width={105} height={28} />
                </Link>
              </div>

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
            <div className={styles.login_btn_wrapper}>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      ) : (
        <MobileHeader links={links} />
      )}
    </header>
  );
}

export default Header;
