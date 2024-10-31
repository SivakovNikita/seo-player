import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

async function POST(request: Request): Promise<NextResponse> {
  console.log('request.url', request.url);

  const { searchParams } = new URL(request.url, 'http://localhost:3000');
  const filename = searchParams.get('filename') || '';

  let blob;
  if (request.body) {
    blob = await put(filename, request.body, {
      access: 'public',
    });
  }

  return NextResponse.json(blob);
}

export default POST;
