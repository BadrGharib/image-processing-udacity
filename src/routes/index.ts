import express from 'express';
import images from './api/images';
const routes = express.Router();
routes.get('/', (req, res) =>
  res.send(
    'welcom in image processing service to change image resolution please request the url in this format  /images?filename=imagename&width=newWidth&height=newHeight'
  )
);
routes.use('/images', images);

export default routes;
