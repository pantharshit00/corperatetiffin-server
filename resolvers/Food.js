const mongoose = require('mongoose');
const Remarkable = require('remarkable');

const Food = mongoose.model('FoodItem');
const md = new Remarkable();

module.exports = {
  Food: {
    description: ({ description }) => md.render(description),
  },
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
    getFoodItemById: async (parent, { id }) => {
      const foodItem = await Food.findOne({
        _id: id,
      });
      return foodItem;
    },
    getHotFoodItems: async () => {
      const foodItems = await Food.aggregate([
        {
          $sort: {
            created_at: -1,
          },
        },
      ]).limit(12);
      return foodItems;
    },
  },
};
