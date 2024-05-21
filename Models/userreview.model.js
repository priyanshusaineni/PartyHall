const mongoose = require("mongoose");

const singleReviewSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
  },
});

const hallReviewSchema = new mongoose.Schema({
  hall_id: {
    type: String,
    required: true,
  },
  hall_rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: [singleReviewSchema],
});

const reviewSchema = new mongoose.Schema({
  hallReviews: [hallReviewSchema],
});

const ReviewModel = mongoose.model("UserReviews", reviewSchema);

module.exports = ReviewModel;