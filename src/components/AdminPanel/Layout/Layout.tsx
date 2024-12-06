import CreatePlaylist from '../Pages/CreatePlaylist/CreatePlaylist';
import EditPlaylist from '../Pages/EditPlaylist/EditPlaylist';
import UploadTrack from '../Pages/UploadTrack/UploadTrack';
import WelcomePage from '../Pages/WelcomePage/WelcomePage';
import Header from '../Header/Header';
import { ClerkProvider, SignedIn, SignIn } from '@clerk/nextjs';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Header />
      <SignedIn>{children}</SignedIn>
    </ClerkProvider>
  );
};

export default Layout;
