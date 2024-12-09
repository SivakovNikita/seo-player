import styles from './Layout.module.scss';
import Header from '../Header/Header';
import { SignedIn } from '@clerk/nextjs';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout_contaier}>
      <Header />
      <SignedIn>{children}</SignedIn>
    </div>
  );
};

export default Layout;
