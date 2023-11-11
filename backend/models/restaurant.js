const mongoose = require("mongoose");

const mealSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    zipcode: { type: String, required: true },
    calories: { type: Number, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
    glutenFree: { type: Boolean, required: true },
    vegan: { type: Boolean, required: true },
    vegetarian: { type: Boolean, required: true }
  });

const restaurantSchema = mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  rating: {type:String, required: true},
  meals: [mealSchema],
  pdfFile: { type: String }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);