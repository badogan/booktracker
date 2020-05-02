// const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const fetch = require('node-fetch');

exports.searchBook = catchAsync(async (req, res, next) => {
  console.log('inside Book Search controller code', req.body);
  const { title, author } = req.body;
  if (title === undefined && author === undefined) {
    return next(new AppError('Search book request incorrect', 400));
  }

  let url1 = 'https://www.googleapis.com/books/v1/volumes?q=';
  if (title) {
    url1 += title;
  }
  if (author) {
    url1 += '+inauthor:' + author;
  }
  url1 += '&key=' + process.env.GoogleBooksAPIKey;

  const rawResponse = await fetch(url1).then(res => res.json());
  //TODO: error handling!
  let result = rawResponse.items.map(item => item.volumeInfo);

  res.status(200).json({
    status: 'success',
    data: {
      length: result.length,
      data: result
    }
  });
});
