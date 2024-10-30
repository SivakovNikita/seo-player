import Link from 'next/link';

export default async function NotFound() {
  return (
    <div>
      <h2>Тут полная тишина, но скоро зазвучит красиво!</h2>
      <p>
        Страница не найдена. Вернуться на главную <Link href="https://zvuk-b2b.com/">главную</Link>
      </p>
    </div>
  );
}
