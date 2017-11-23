const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  items: [
    {
      item_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'FoodItem',
      },
      quantity: Number,
    },
  ],
});

mongoose.model('Order', OrdersSchema);
