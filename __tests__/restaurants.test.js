const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');

// Dummy user for testing

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

describe('restaurant routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /api/v1/restaurants should return a list of restaurants', async () => {
    const resp = await request(app).get('/api/v1/restaurants');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
          Array [
            Object {
              "cost": 1,
              "cuisine": "American",
              "id": "1",
              "image": "https://media-cdn.tripadvisor.com/media/photo-o/05/dd/53/67/an-assortment-of-donuts.jpg",
              "name": "Pip's Original",
              "website": "http://www.PipsOriginal.com",
            },
            Object {
              "cost": 3,
              "cuisine": "Italian",
              "id": "2",
              "image": "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/af/df/89/duck.jpg",
              "name": "Mucca Osteria",
              "website": "http://www.muccaosteria.com",
            },
            Object {
              "cost": 2,
              "cuisine": "Mediterranean",
              "id": "3",
              "image": "https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/f2/e5/0c/dinner.jpg",
              "name": "Mediterranean Exploration Company",
              "website": "http://www.mediterraneanexplorationcompany.com/",
            },
            Object {
              "cost": 2,
              "cuisine": "American",
              "id": "4",
              "image": "https://media-cdn.tripadvisor.com/media/photo-o/0d/d6/a1/06/chocolate-gooey-brownie.jpg",
              "name": "Salt & Straw",
              "website": "https://saltandstraw.com/pages/nw-23",
            },
          ]
        `);
  });

  it('GET /api/v1/restaurants/:id should return restaurant detail', async () => {
    const resp = await request(app).get('/api/v1/restaurants/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "cost": 1,
        "cuisine": "American",
        "id": "1",
        "image": "https://media-cdn.tripadvisor.com/media/photo-o/05/dd/53/67/an-assortment-of-donuts.jpg",
        "name": "Pip's Original",
        "reviews": Array [
          Object {
            "detail": "Best restaurant ever!",
            "id": "1",
            "restaurant_id": "1",
            "stars": 5,
            "user_id": "1",
          },
          Object {
            "detail": "Terrible service :(",
            "id": "2",
            "restaurant_id": "1",
            "stars": 1,
            "user_id": "2",
          },
          Object {
            "detail": "It was fine.",
            "id": "3",
            "restaurant_id": "1",
            "stars": 4,
            "user_id": "3",
          },
        ],
        "website": "http://www.PipsOriginal.com",
      }
    `);
  });

  it('POST /api/v1/restaurants/:id/reviews should create a new review when logged in', async () => {
    const agent = request.agent(app);
    await UserService.create(mockUser);
    await agent
      .post('/api/v1/users/sessions')
      .send({ email: mockUser.email, password: mockUser.password });
    const resp = await agent
      .post('/api/v1/restaurants/1/reviews')
      .send({ detail: 'This is a new review' });
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot();
  });

  afterAll(() => {
    pool.end();
  });
});
