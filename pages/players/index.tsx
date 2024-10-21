import Link from 'next/link';

export default function Page() {
  return (
    <div style={{ color: 'white' }}>
      <h1>List of Zvuk b2b players</h1>
      <ul>
        <Link href="/players/BarbershopPlaylist" prefetch={true}>
          Барбершопы
        </Link>
        <Link href="/players/JazzCafePlaylist" prefetch={true}>
          Jazz Cafe
        </Link>

        <li></li>
      </ul>
    </div>
  );
}
