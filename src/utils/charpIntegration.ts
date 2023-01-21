import sharp from 'sharp';

export const changeImageresolution = async (
  filePath: string,
  thumpPath: string,
  width: number,
  height: number
): Promise<Buffer> => {
  const image = sharp(filePath).resize(width, height);
  const thump = await image.toBuffer();
  await image.toFile(thumpPath);
  return thump;
};

export const readImageBuffer = async (filePath: string): Promise<Buffer> => {
  const image = await sharp(filePath).toBuffer();
  return image;
};
