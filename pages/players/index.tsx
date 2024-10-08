import Link from 'next/link';

export default function Page() {
  return (
    <div style={{ color: 'white' }}>
      <h1>List of Zvuk b2b players</h1>
      <ul>
        <Link href="/players/player" prefetch={true}>
          Барбершопы
        </Link>

        <li></li>
      </ul>
    </div>
  );
}
