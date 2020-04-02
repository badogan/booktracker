/* eslint-disable arrow-parens */
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.check = () =>{
  
}

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
  const test = await Model.findById(req.params.id);
  if (String(test.user._id) !== String(req.user._id)) {
    console.log('Loggedin user trying delete doc which belongs to another user');
    return next(new AppError('No doc found with that ID', 404));
  }

  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No doc found with that id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No doc found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
  const newDoc = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newDoc,
    },
  });
});

exports.getOne = (Model, populateOptions) => catchAsync(async (req, res, next) => {
  let query = Model.findById(req.params.id).filter(
    el => el.user._id === req.user._id,
  );
    // const filter = { user: req.user._id };

  if (populateOptions) {
    query = query.populate(populateOptions);
  }

  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getAll = Model => catchAsync(async (req, res, next) => {
  //To make sure everything is filtered for allowed user
  const filter = { user: req.user._id };
  // console.log('====>getAll IS: ',req.user._id)
  // console.log('******>getAll IS: ',req.params.userId)

  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const docs = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      data: docs,
    },
  });
});
