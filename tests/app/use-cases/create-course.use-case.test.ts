import { createServer, Server } from 'http';
import request from 'supertest';

import app from '../../../src/app/index';

describe('CreateCourseUseCase', () => {
  let server: Server;
  beforeEach(() => {
    server = createServer(app.callback());
  });

  afterEach(() => {
    server.close();
  });

  test('Create course with valid input => should be OK', async () => {
    const payload = {
      name: 'course 1',
      startDate: new Date().toISOString()
    };
    const response = await request(server).post('/api/courses').send(payload);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      ...payload
    });
  });

  test('Create course without course name => should receive 400 error', async () => {
    const payload = {
      name: undefined as unknown as string,
      startDate: new Date().toISOString()
    };
    const response = await request(server).post('/api/courses').send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      code: 'COURSE_NAME_IS_REQUIRED',
      error: 'Course Name is required',
      status: 400
    });
  });

  test('Create course without start date => should receive 400 error', async () => {
    const payload = {
      name: 'course 1',
      startDate: undefined as unknown as string
    };
    const response = await request(server).post('/api/courses').send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      code: 'COURSE_START_DATE_IS_REQUIRED',
      error: 'Course Start Date is required',
      status: 400
    });
  });

  test('Create course with end date => should be OK', async () => {
    const payload = {
      name: 'course 1',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString()
    };
    const response = await request(server).post('/api/courses').send(payload);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 2,
      ...payload
    });
  });
});
