import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test resolution image endpoints', () => {
  it('if the image not exist', async () => {
    const response = await request.get(
      '/api/images?filename=test&width=400&height=400'
    );
    expect(response.text).toEqual('This image not exist');
  });

  it('if request without filename paramter', async () => {
    const response = await request.get('/api/images?width=400&height=400');
    expect(response.text).toEqual(
      'you have to request image url using filename & widht & height parameters'
    );
  });

  it('change image resolution and save it in thump folder', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=400&height=400'
    );
    expect(response.status).toBe(200);
  });
});
