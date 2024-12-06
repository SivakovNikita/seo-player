import Header from '../Header/Header';
import { SignedIn } from '@clerk/nextjs';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <SignedIn>{children}</SignedIn>
    </>
  );
};

export default Layout;
