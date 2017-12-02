const mongoose = require('mongoose');

const FoodItemsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: [String],
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

FoodItemsSchema.index({ name: 'text' });

module.exports = mongoose.model('FoodItem', FoodItemsSchema);
