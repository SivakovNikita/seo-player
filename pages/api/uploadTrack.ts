import formidable from 'formidable';
import fs from 'fs';
import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadTrack = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const form = formidable();

  form.parse(req, async (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to parse form data' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const fileStream = fs.createReadStream(file.filepath);
      const blob = await put(`tracks/${file.originalFilename}`, fileStream, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      return res.status(200).json(blob);
    } catch (uploadError) {
      return res.status(500).json({ error: 'Failed to upload file', details: uploadError.message });
    }
  });
};

export default uploadTrack;
