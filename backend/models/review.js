const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  restaurantTitle: { type: String, required: true},
  rating: {type:String, required: true},
  meal: {type:String, required: false},
  comment: {type:String, required: false},
  type: {type:String, required: true}
});

module.exports = mongoose.model("Review", reviewSchema);