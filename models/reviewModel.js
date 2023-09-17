const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
    },
    rating: {
      type: Number,
      required: [true, 'Please give a number from 1-5!'],
      min: 1,
      max: 5,
    },
    createdAt: { type: Date, default: Date.now() },

    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//review/rating/createdAt/ref to tour/ref to user
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    //'this' always points to the current query
    path: 'user',
    select: 'name photo',
  });
  next();
});
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
