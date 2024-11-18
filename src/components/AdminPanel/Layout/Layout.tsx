import Header from '../Header/Header';
import CreatePlaylist from '../Pages/CreatePlaylist/CreatePlaylist';
import EditPlaylist from '../Pages/EditPlaylist/EditPlaylist';
import UploadTrack from '../Pages/UploadTrack/UploadTrack';

export default function Layout({ page }: { page: string }) {
  let content;

  switch (page) {
    case 'CreatePlaylist':
      content = <CreatePlaylist />;
      break;
    case 'EditPlaylist':
      content = <EditPlaylist />;
      break;
    case 'UploadTrack':
      content = <UploadTrack />;
      break;
    default:
      content = <h1>Добро пожаловать в админ-панель!</h1>;
      break;
  }

  return (
    <>
      <Header />
      <>{content}</>
    </>
  );
}
