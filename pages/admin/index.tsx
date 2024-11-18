'use client';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../src/components/AdminPanel/Layout/Layout';

export default function AdminPanelPage() {
  const router = useRouter();
  const { page } = router.query;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Layout page={page as string} />;
}
