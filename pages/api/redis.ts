import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis
const redis = Redis.fromEnv();

const POST = async () => {
  // Fetch data from Redis
  const result = await redis.get('item');

  // Return the result in the response
  return new NextResponse(JSON.stringify({ result }), { status: 200 });
};

export default POST;
