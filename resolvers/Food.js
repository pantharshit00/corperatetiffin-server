const mongoose = require('mongoose');

const Food = mongoose.model('FoodItem');

module.exports = {
  Query: {
    foodItems: async () => {
      const items = await Food.find();
      return items;
    },
    getFoodItems: async (parent, { name }) => {
      const searchedData = await Food.find(
        {
          $text: {
            $search: name,
          },
        },
        {
          score: { $meta: 'textScore' },
        },
      ).sort({
        score: { $meta: 'textScore' },
      });
      return searchedData;
    },
  },
};
