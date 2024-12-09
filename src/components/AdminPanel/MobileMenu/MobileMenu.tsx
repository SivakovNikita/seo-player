import Link from 'next/link';
import styles from './MobileMenu.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { SignedIn, SignOutButton, UserButton } from '@clerk/nextjs';

interface Link {
  route: string;
  text: string;
}

interface MobileMenuInterface {
  isActive: boolean;
  toggleMenu: () => void;
  links: Link[];
}

const MobileMenu = ({ isActive, toggleMenu, links }: MobileMenuInterface) => {
  const [isCurrent, setIsCurrent] = useState<string | null>(null);
  if (!isActive) return null;

  const handleClick = (route: string) => {
    toggleMenu();
    setIsCurrent(route);
  };

  return (
    <div className={clsx({ [styles.mobile_menu_overlay]: true, [styles.mobile_menu_overlay__active]: isActive })}>
      <div className={styles.mobile_menu_container}>
        <div className={styles.nav_list}>
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
          <div className={styles.separator}></div>
          <div className={styles.logout_button_wrapper}>
            <SignedIn>
              <SignOutButton>
                <button className={styles.logout_button}>Выйти</button>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MobileMenu;
