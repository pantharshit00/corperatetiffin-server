const mongoose = require('mongoose');

const FoodItemsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  subitems: [{ name: String, image: String }],
  image: [String],
});

FoodItemsSchema.index({ name: 'text' });

mongoose.model('FoodItem', FoodItemsSchema);
