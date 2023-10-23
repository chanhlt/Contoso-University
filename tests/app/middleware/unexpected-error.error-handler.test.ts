import { createServer, Server } from 'http';
import request from 'supertest';

import app from '../../../src/app/index';

describe('ErrorHandler', () => {
  let server: Server;
  beforeEach(() => {
    server = createServer(app.callback());
  });

  afterEach(() => {
    server.close();
  });

  test('Unexpected error occurs => should be handled correctly', async () => {
    const response = await request(server).post('/');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: 'UNKNOWN_ERROR',
      status: 500,
      error: 'Unknown error'
    });
  });
});
