const mongoose = require('mongoose');
const Remarkable = require('remarkable');

const Food = mongoose.model('FoodItem');
const md = new Remarkable();

module.exports = {
  Food: {
    description: ({ description }) => md.render(description),
  },
  Query: {
    foodItems: async (parent, { page = 1 }) => {
      const limit = 5;
      // prettier-ignore
      const skip = (limit * page) - limit;

      const itemsPromise = Food.find()
        .skip(skip)
        .limit(limit)
        .sort({ created_at: 'desc' });

      const noPromise = Food.count();

      const [items, totalPages] = await Promise.all([itemsPromise, noPromise]);
      return { items, totalPages: Math.ceil(totalPages / limit) };
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
