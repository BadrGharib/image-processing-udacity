import express from 'express';
const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  console.log(`${req.baseUrl} is visited`);
  next();
};

export default logger;
