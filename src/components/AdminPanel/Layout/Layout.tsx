import Header from '../Header/Header';
import { ClerkProvider, SignedIn } from '@clerk/nextjs';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const PUBLISHABLE_KEY = 'pk_test_ZnVsbC1qb2V5LTgxLmNsZXJrLmFjY291bnRzLmRldiQ';

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Header />
      <SignedIn>{children}</SignedIn>
    </ClerkProvider>
  );
};

export default Layout;
