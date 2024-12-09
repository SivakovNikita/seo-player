import clsx from 'clsx';
import styles from './MobileHeader.module.scss';
import { useEffect, useState } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/images/zvuk business logo.png';
import { createPortal } from 'react-dom';

const MobileHeader = ({ links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortal(document.getElementById('portal'));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo_image}>
          <Link href="/admin/">
            <Image src={logo} alt="Звук Бизнес" width={105} height={28} />
          </Link>
        </div>

        <div
          className={styles.burger_menu}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          role="button"
        >
          <div className={clsx({ [styles.hamburger]: true, [styles.active]: isMenuOpen })}>
            <span className={styles.line1}></span>
            <span className={styles.line2}></span>
            <span className={styles.line3}></span>
          </div>
        </div>

        {isMenuOpen &&
          portal &&
          createPortal(<MobileMenu isActive={isMenuOpen} toggleMenu={toggleMenu} links={links} />, portal)}
      </div>
      <div id="portal"></div>
    </>
  );
};

export default MobileHeader;
