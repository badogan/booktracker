const express = require('express');
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, bookController.getAllBooks)
  .post(bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    bookController.deleteBook,
  );

module.exports = router;
