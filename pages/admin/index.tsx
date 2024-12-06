import React, { Suspense } from 'react';
import Layout from '../../src/components/AdminPanel/Layout/Layout';
import WelcomePage from '../../src/components/AdminPanel/Pages/WelcomePage/WelcomePage';

const AdminPanelPage = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <WelcomePage />
      </Suspense>
    </Layout>
  );
};

export default AdminPanelPage;
