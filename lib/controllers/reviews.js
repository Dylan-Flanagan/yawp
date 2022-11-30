const { Review } = require('../models/Review.js');
const { Router } = require('express');
const reviewdelete = require('../middleware/reviewdelete.js');
const authenticate = require('../middleware/authenticate.js');

module.exports = Router().delete(
  '/:id',
  [authenticate, reviewdelete],
  async (req, res, next) => {
    try {
      await Review.delete(req.params.id);
      res.json({ message: 'this review is gone' });
    } catch (e) {
      next(e);
    }
  }
);
