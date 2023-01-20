import express from 'express';
const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  console.log(`image ${req.query.filename} is requested with resolution ${req.query.width} x ${req.query.height}`);
  next();
};

export default logger;
