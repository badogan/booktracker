const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title cannot be empty'],
      maxlength: [50, 'A title must have less or equal than 50 characters'],
      minlength: [1, 'A review must have more or equal than 1 character'],
    },
    releaseDate: {
      type: Date,
      required: [true, 'Release date cannot be empty'],
    },
    lentTo: {
      type: String,
    },
    coverURL: {
      type: String,
      required: [true, 'Cover URL cannot be empty'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Book must belong to a user'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

bookSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: 'tour',
  //     select: '-__v'
  //   }).populate({
  //     path: 'user',
  //     select: 'name photo'
  //   });

  this.populate({
    path: 'user',
    select: 'name',
  });

  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
