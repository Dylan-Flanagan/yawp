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

it('GET api/v1/restaurants should return a list of restaurants', async () => {
  const resp = await request(app).get('/api/v1/restaurants');
  expect(resp.status).toBe(200);
  expect(resp.body).toMatchInlineSnapshot(`
  Array [
    Object {
        "name": "Pip''s Original",
        "cuisine": "American",
        "cost": "1",
        "image": "https://media-cdn.tripadvisor.com/media/photo-o/05/dd/53/67/an-assortment-of-donuts.jpg",
        "website": "http://www.PipsOriginal.com",
    },
    Object {
        "name": "Mucca Osteria",
        "cuisine": "Italian",
        "cost": "3",
        "image": "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/af/df/89/duck.jpg",
        "website": "http://www.muccaosteria.com",
    },
    Object {
        "name": "Mediterranean Exploration Company",
        "cuisine": "Mediterranean",
        "cost": "2",
        "image": "https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/f2/e5/0c/dinner.jpg",
        "website": "http://www.mediterraneanexplorationcompany.com/",
    },
    Object {
        "name": "Salt & Straw",
        "cuisine": "American",
        "cost": "2",
        "image": "https://media-cdn.tripadvisor.com/media/photo-o/0d/d6/a1/06/chocolate-gooey-brownie.jpg",
        "website": "https://saltandstraw.com/pages/nw-23",
    },
  ]`);
});
