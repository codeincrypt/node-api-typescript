import express, { Request, Response } from 'express';
const routes = express.Router();

import fs from 'fs';
import path from 'path';

routes.get('/movie/:movieId', (req: Request, res: Response) => {
  const movieId = req.params.movieId;
  const moviePath = path.join(__dirname, '../../data/', `${movieId}`);
  const stat = fs.statSync(moviePath);
  const fileSize = stat.size;

  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = (end - start) + 1;
    console.log('chunkSize :: ', chunkSize)
    const file = fs.createReadStream(moviePath, { start, end });
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, headers);
    file.pipe(res);
  } else {
    const headers = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, headers);
    fs.createReadStream(moviePath).pipe(res);
  }
});

module.exports = routes