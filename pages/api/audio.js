import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send('Requires Range header');
    return;
  }

  const { file } = req.query;
  if (!file) {
    res.status(400).send('File query parameter is missing');
    return;
  }

  const audioPath = path.resolve(`./public/${file}`);
  if (!fs.existsSync(audioPath)) {
    res.status(404).send('File not found');
    return;
  }

  const audioSize = fs.statSync(audioPath).size;

  const CHUNK_SIZE = 500 * 1024;
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE, audioSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${audioSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'audio/mpeg',
  };
  console.log(`bytes ${start}-${end}/${audioSize}`);
  res.writeHead(206, headers);

  const audioStream = fs.createReadStream(audioPath, { start, end });
  audioStream.pipe(res);
}
