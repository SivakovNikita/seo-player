import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from '../../src/components/AdminPanel/Layout/Layout';

const CreatePlaylist = dynamic(() => import('../../src/components/AdminPanel/Pages/CreatePlaylist/CreatePlaylist'));
const EditPlaylist = dynamic(() => import('../../src/components/AdminPanel/Pages/EditPlaylist/EditPlaylist'));
const UploadTrack = dynamic(() => import('../../src/components/AdminPanel/Pages/UploadTrack/UploadTrack'));

const AdminPanel = () => {
  const router = useRouter();
  const { adminpanel } = router.query;

  const renderComponent = () => {
    switch (adminpanel) {
      case 'CreatePlaylist':
        return <CreatePlaylist />;
      case 'EditPlaylist':
        return <EditPlaylist />;
      case 'UploadTrack':
        return <UploadTrack />;
      default:
    }
  };

  return <Layout>{renderComponent()}</Layout>;
};

export default AdminPanel;
