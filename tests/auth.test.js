const request = require('supertest');
const app = require('../index');

describe('Auth API Endpoints', () => {
  const userData = {
    email: 'testuser@example.com',
    firstName: 'Test',
    lastName: 'User',
    password: '123456'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(userData);
    expect(res.statusCode).toEqual(201);
  });

  it('should login the user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: userData.email, password: userData.password });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });
});