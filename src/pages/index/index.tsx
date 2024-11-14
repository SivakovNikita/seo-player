import { useEffect } from 'react';
import { useRouter } from 'next/router';
import TimerBar from '../../components/TimerBar/TimerBar';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import SideTimersProgressBar from '../../components/SideTimersProgressBar/SideTimersProgressBar';

function MyApp() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push('https://zvuk-b2b.com/?utm_source=seo-player&utm_medium=redirect');
  // }, [router]);
  const currentTime = 7.235716;
  const duration = 18.076735;
  // return null;
  return (
    <div style={{ margin: '50px' }}>
      <SideTimersProgressBar currentTrackDuration={currentTime} duration={duration} />
    </div>
  );
}

export default MyApp;
