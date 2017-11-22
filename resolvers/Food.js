const mongoose = require('mongoose');

const Food = mongoose.model('FoodItem');

module.exports = {
  Query: {
    foodItems: async () => {
      const items = await Food.find();
      return items;
    },
  },
};
