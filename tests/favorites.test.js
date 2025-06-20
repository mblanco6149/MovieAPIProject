const request = require('supertest');
const app = require('../index');

let token;
let sampleMovie;

describe('Favorites API Endpoints', () => {
  const userData = {
    email: 'favuser@example.com',
    firstName: 'Fav',
    lastName: 'User',
    password: '123456'
  };

  beforeAll(async () => {
    await request(app).post('/api/auth/register').send(userData);
    const login = await request(app).post('/api/auth/login').send({ email: userData.email, password: userData.password });
    token = login.body.token;

    const moviesRes = await request(app)
      .get('/api/movies?keyword=matrix')
      .set('Authorization', `Bearer ${token}`);
    sampleMovie = moviesRes.body[0];
  });

  it('should add a movie to favorites', async () => {
    const res = await request(app)
      .post('/api/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleMovie);
    expect(res.statusCode).toEqual(201);
  });

  it('should get the list of favorite movies', async () => {
    const res = await request(app)
      .get('/api/favorites')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('suggestionForTodayScore');
  });
});
