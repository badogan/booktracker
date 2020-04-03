const express = require('express');
// const authController = require('../controllers/authController');
// const bookController = require('../controllers/bookController');

const router = express.Router();

// router
//   .route('/')
//   .get(
//     authController.protect,
//     bookController.getAllBooks,
//   )
//   .post(
//     authController.protect,
//     bookController.createBook,
//   );

// router
//   .route('/:id')
//   .get(authController.protect, bookController.getBook)
//   .patch(authController.protect, bookController.updateBook)
//   .delete(
//     authController.protect,
//     // authController.restrictTo('user'),
//     bookController.deleteBook,
//   );

module.exports = router;
