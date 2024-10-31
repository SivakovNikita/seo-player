import Link from 'next/link';

function MyApp() {
  return (
    <>
      <button>
        <Link href="/admin/CreatePlaylist">Создать новый плейлист</Link>
      </button>
      <button>
        <Link href="/admin/EditPlaylist">Отредактировать существующий плейлист</Link>
      </button>
    </>
  );
}

export default MyApp;
