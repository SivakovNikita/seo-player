import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const {
    query: { file },
  } = req;

  const audioPath = path.join(process.cwd(), 'public', file);

  if (!fs.existsSync(audioPath)) {
    return res.status(404).send('File not found');
  }

  const stats = fs.statSync(audioPath);
  const fileSize = stats.size;
  const range = req.headers.range;

  if (!range) {
    return res.status(400).send('Requires Range header');
  }

  const match = range.match(/bytes=(\d+)-(\d+)?/);
  if (!match) {
    return res.status(400).send('Invalid Range');
  }

  const start = parseInt(match[1], 10);
  const end = match[2] ? parseInt(match[2], 10) : fileSize - 1;

  if (start >= fileSize || end >= fileSize || start < 0) {
    return res.status(416).send('Requested Range Not Satisfiable');
  }

  res.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': end - start + 1,
    'Content-Type': 'audio/mpeg',
    'Cache-Control': 'no-store',
  });

  const readStream = fs.createReadStream(audioPath, { start, end });
  readStream.on('error', (err) => {
    console.error('Stream Error:', err);
    res.end();
  });

  readStream.pipe(res);
}
