import { useEffect } from 'react';
import { useRouter } from 'next/router';
import MobilePlayerBar from '../../components/MobilePlayerBar/MobilePlayerBar';
import playerbartest from '../../../public/TrackLists/playerbartest';

function MyApp() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push('https://zvuk-b2b.com/?utm_source=seo-player&utm_medium=redirect');
  // }, [router]);

  // return null;
  return <MobilePlayerBar trackList={playerbartest} />;
}

export default MyApp;
