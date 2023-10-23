import { createServer, Server } from 'http';
import request from 'supertest';

import app from '../../../src/app/index';

describe('ListCourseUseCase', () => {
  let server: Server;
  beforeEach(() => {
    server = createServer(app.callback());
  });

  afterEach(() => {
    server.close();
  });

  const id = 1;
  let name = 'Name 1';
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setFullYear(startDate.getFullYear() + 1);

  const id2 = 2;
  const name2 = 'Name 2';
  const startDate2 = new Date();

  const page = 1;
  const limit = 5;

  test('List courses with valid page and limit => should be OK', async () => {
    const course1 = { id, name, startDate, endDate };
    await request(server).post('/api/courses').send(course1);
    const course2 = { id: id2, name: name2, startDate: startDate2 };
    await request(server).post('/api/courses').send(course2);

    const response = await request(server).get('/api/courses').query({ page, limit });

    expect(response.status).toBe(200);
    const { count, rows } = response.body;
    expect(count).toBe(2);
    expect(rows).toEqual([
      { id: 1, name, startDate: startDate.toISOString(), endDate: endDate.toISOString() },
      { id: 2, name: name2, startDate: startDate2.toISOString() }
    ]);
  });

  test('List courses without page and limit => should be OK', async () => {
    const response = await request(server).get('/api/courses');

    expect(response.status).toBe(200);
    const { count, rows } = response.body;
    expect(count).toBe(2);
    expect(rows).toEqual([
      { id: 1, name, startDate: startDate.toISOString(), endDate: endDate.toISOString() },
      { id: 2, name: name2, startDate: startDate2.toISOString() }
    ]);
  });

  test('List courses with invalid page => should be OK', async () => {
    const response = await request(server).get('/api/courses').query({ page: -1 });

    expect(response.status).toBe(200);
    const { count, rows } = response.body;
    expect(count).toBe(2);
    expect(rows).toEqual([
      { id: 1, name, startDate: startDate.toISOString(), endDate: endDate.toISOString() },
      { id: 2, name: name2, startDate: startDate2.toISOString() }
    ]);
  });

  test('List courses with invalid limit => should be OK', async () => {
    const response = await request(server).get('/api/courses').query({ limit: 'abc' });

    expect(response.status).toBe(200);
    const { count, rows } = response.body;
    expect(count).toBe(2);
    expect(rows).toEqual([
      { id: 1, name, startDate: startDate.toISOString(), endDate: endDate.toISOString() },
      { id: 2, name: name2, startDate: startDate2.toISOString() }
    ]);
  });

  test('List courses with over exceeded page => should be OK', async () => {
    const response = await request(server).get('/api/courses').query({ limit: 3, page: 2 });

    expect(response.status).toBe(200);
    const { count, rows } = response.body;
    expect(count).toBe(2);
    expect(rows).toEqual([]);
  });
});
