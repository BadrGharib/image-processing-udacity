import path from 'path';
import { changeImageresolution } from '../utils/charpIntegration';
import { IsfileExists } from '../utils/helpers';
import fs from 'fs';

describe('Test Charp Integration ', () => {
  it('change resolution functionality', async () => {
    const thumpFilePath = path.join(
      __dirname,
      '..',
      '/assets/thump',
      'thump-santamonica-400-400.jpg'
    );
    const filePath = path.join(
      __dirname,
      '..',
      '/assets/full',
      'santamonica.jpg'
    );
    let isFileExist = await IsfileExists(thumpFilePath);
    if (isFileExist) fs.unlink(thumpFilePath, (err) => {});
    console.log(thumpFilePath);
    await changeImageresolution(filePath, thumpFilePath, 400, 400);
    const isFileCreated = await IsfileExists(thumpFilePath);
    expect(isFileCreated).toBe(true);
  });
});
