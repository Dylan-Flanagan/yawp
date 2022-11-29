const { Router } = require('express');
const { Restaurant } = require('../models/restaurant.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.getAll();
    res.json(restaurants);
  } catch (e) {
    next(e);
  }
});
