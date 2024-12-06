import React, { Suspense } from 'react';
import Layout from '../../src/components/AdminPanel/Layout/Layout';
import WelcomePage from '../../src/components/AdminPanel/Pages/WelcomePage/WelcomePage';
import { ClerkProvider } from '@clerk/nextjs';

const AdminPanelPage = () => {
  const PUBLISHABLE_KEY = 'pk_test_ZnVsbC1qb2V5LTgxLmNsZXJrLmFjY291bnRzLmRldiQ';
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <WelcomePage />
        </Suspense>
      </Layout>
    </ClerkProvider>
  );
};

export default AdminPanelPage;
