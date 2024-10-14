import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const {
    query: { file },
  } = req;

  const imagePath = path.join(process.cwd(), 'public', file);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).send('File not found');
  }

  const extname = path.extname(imagePath).toLowerCase();
  let contentType;

  switch (extname) {
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/png';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    default:
      return res.status(400).send('Unsupported file type');
  }

  res.setHeader('Content-Type', contentType);
  fs.createReadStream(imagePath)
    .on('error', (err) => {
      console.error('Stream Error:', err);
      res.status(500).send('Internal Server Error');
    })
    .pipe(res);
}
