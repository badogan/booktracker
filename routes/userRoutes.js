const express = require('express');
// const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/:userId/books')
  .post(authController.protect, bookController.createBook)
  .get(authController.protect, bookController.getAllBooks);

router
  .route('/:userId/books/:bookId')
  .get(authController.protect, bookController.getBook)
  .delete(authController.protect, bookController.deleteBook)
  .patch(authController.protect, bookController.updateBook);

module.exports = router;
