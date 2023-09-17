const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates! please use /updatePassword',
        400
      )
    );
  }
  //2) update user document};
  const filteredBody = filterObj(req.body, 'name', 'email'); // filter what the user can change
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  // 1) create error if user posts password data
  //2) update user document};
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined, please use sign up instead',
  });
};
exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
