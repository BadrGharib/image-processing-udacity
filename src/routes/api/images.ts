import express from 'express';
import logger from '../../utils/logger';
import sharp from 'sharp';
import path from 'path';
import { IsfileExists } from '../../utils/helpers';

const images = express.Router();
images.get('/', logger, async (req, res) => {
  try {
    const fileName = req.query.filename;
    const width = req.query.width;
    const height = req.query.height;
    if (!fileName || !width || !height) {
      res
        .status(400)
        .send(
          'you have to request image url using filename & widht & height parameters'
        );
      return;
    }
    const filePath = path.join(
      __dirname,
      '../..',
      '/assets/full',
      `${fileName}.jpg`
    );
    const isFileExist = await IsfileExists(filePath);
    if (!isFileExist) {
      res.status(400).send('This image not exist');
      return;
    } else {
      const thumpFilePath = path.join(
        __dirname,
        '../..',
        '/assets/thump',
        `thump-${fileName}-${width}-${height}.jpg`
      );
      const isThumpExist = await IsfileExists(thumpFilePath);
      if (isThumpExist) {
        const thump = await sharp(thumpFilePath).toBuffer();
        res.set('Content-Type', 'image/jpeg');
        res.status(200).send(thump);
        return;
      }
      const image = await sharp(filePath).resize(
        parseInt(width as string),
        parseInt(height as string)
      );
      const thump = await image.toBuffer();
      image.toFile(thumpFilePath);
      res.set('Content-Type', 'image/jpeg');
      res.status(200).send(thump);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred');
  }
});

export default images;
