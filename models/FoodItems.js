const mongoose = require('mongoose');

const FoodItemsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: [String],
});

mongoose.model('FoodItem', FoodItemsSchema);
