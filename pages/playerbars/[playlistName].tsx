import Head from 'next/head';
import Player from '../../src/components/Player/Player';
import { Redis } from '@upstash/redis';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Analytics } from '@vercel/analytics/react';

interface Params extends ParsedUrlQuery {
  playlistName: string;
}

type PlaylistProps = {
  playlist: string[];
  playlistName: string;
  queryString?: string;
};

export const getServerSideProps: GetServerSideProps<PlaylistProps> = async (context) => {
  const { playlistName, ...queryParams } = context.query;

  const playlistNameValue =
    typeof playlistName === 'string' ? playlistName : Array.isArray(playlistName) ? playlistName[0] : '';

  const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  const playlistData = await redis.get(playlistNameValue);
  const playlist = Array.isArray(playlistData) ? playlistData : Object.values(playlistData || {});

  const queryString =
    Object.keys(queryParams).length > 0
      ? '?' + new URLSearchParams(queryParams as Record<string, string>).toString()
      : '';

  return {
    props: { playlist, playlistName: playlistNameValue, queryString },
  };
};

const PlayerBar = ({ playlist, playlistName, queryString }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
      <Player trackList={playlist[2]} trackListName={playlistName} queryString={queryString} />
    </>
  );
};

export default PlayerBar;
