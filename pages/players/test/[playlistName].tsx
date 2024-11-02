import Head from 'next/head';
import PlayerBar from '../../../src/components/PlayerBar/PlayerBar';
import { Redis } from '@upstash/redis';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface Params extends ParsedUrlQuery {
  playlistName: string;
}

type PlaylistProps = {
  playlist: string[];
};

export const getServerSideProps: GetServerSideProps<PlaylistProps> = async (context) => {
  const { playlistName } = context.params as Params;

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const playlistData = await redis.get(playlistName);
  const playlist = Array.isArray(playlistData) ? playlistData : Object.values(playlistData || {});

  return {
    props: { playlist },
  };
};

export default function Player({ playlist }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!playlist || playlist.length === 0) {
    return <div style={{ color: 'white' }}>Ошибка загрузки данных плейлиста.</div>;
  }

  return (
    <>
      <Head>
        <meta name="description" content={playlist[1]} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{playlist[0]}</title>
      </Head>
      <PlayerBar trackList={playlist[2]} />
    </>
  );
}
