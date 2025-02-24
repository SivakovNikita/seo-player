import Head from 'next/head';
import Player from '../../src/components/Player/Player';
import { Redis } from '@upstash/redis';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Analytics } from '@vercel/analytics/react';
import MobileEmbedPlayer from '../../src/components/EmbedPlayer/MobileEmbedPlayer/MobileEmbedPlayer';

interface Params extends ParsedUrlQuery {
  playlistName: string;
}

type PlaylistProps = {
  playlist: string[];
  playlistName: string;
};

export const getServerSideProps: GetServerSideProps<PlaylistProps> = async (context) => {
  const { playlistName } = context.params as Params;

  const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  const playlistData = await redis.get(playlistName);
  console.log(typeof playlistData);
  const playlist = Array.isArray(playlistData) ? playlistData : Object.values(playlistData || {});

  return {
    props: { playlist, playlistName },
  };
};

const PlayerBar = ({ playlist, playlistName }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!playlist || playlist.length === 0) {
    return <div style={{ color: 'white' }}>Ошибка загрузки данных плейлиста.</div>;
  }

  return (
    <>
      <Analytics mode="production" />
      <Head>
        <meta name="description" content={playlist[1]} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{playlist[0]}</title>
      </Head>
      <MobileEmbedPlayer playlist={playlist} playlistName={playlistName} />
    </>
  );
};

export default PlayerBar;
