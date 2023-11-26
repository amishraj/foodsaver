const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const mealSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  zipcode: { type: String, required: true },
  calories: { type: Number, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
  glutenFree: { type: Boolean, required: true },
  vegan: { type: Boolean, required: true },
  vegetarian: { type: Boolean, required: true },
  status: {type:String, required:true}
});

const restaurantSchema = mongoose.Schema({
  title: { type: String, required: true},
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  rating: {type:String, required: true},
  meals: [mealSchema],
  pdfFile: { type: String }
});

const reservationSchema = mongoose.Schema({
  meal: mealSchema,
  restaurant: {type:String, required:true},
  reservationTime: {type:String, required:true}
});

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  address: {type:String, required:true},
  phone: {type:String, required:true},
  status: {type:String, required:true},
  type: {type:String, required:true},
  ongoingReservations:[reservationSchema],
  historyReservations:[reservationSchema],
  canceledReservations:[reservationSchema]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
