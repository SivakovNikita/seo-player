import formidable from 'formidable';
import { readFile } from 'fs/promises'; // Асинхронное чтение файла
import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false, // Отключаем встроенный парсер тела запроса
  },
};

const uploadTrack = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const form = formidable({
    multiples: false,
    keepExtensions: true,
    maxFileSize: 20 * 1024 * 1024, // Лимит файла 20MB
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing the form:', err);
      return res.status(500).json({ error: 'Failed to parse form data', details: err.message });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file || !file.filepath) {
      console.error('No file uploaded or invalid file object:', file);
      return res.status(400).json({ error: 'No file uploaded or file is invalid' });
    }

    try {
      const fileBuffer = await readFile(file.filepath);

      const blob = await put(`tracks/${file.originalFilename}`, fileBuffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      return res.status(200).json(blob);
    } catch (uploadError) {
      console.error('Error uploading file to Blob Storage:', uploadError);
      return res.status(500).json({
        error: 'Failed to upload file',
        details: uploadError.message,
      });
    }
  });
};

export default uploadTrack;
