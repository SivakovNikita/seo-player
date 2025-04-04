import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp() {
  const router = useRouter();

  useEffect(() => {
    router.push('https://zvuk-b2b.com/?utm_source=seo-player&utm_medium=redirect-from-embed-player');
  }, [router]);

  return null;
}

export default MyApp;
