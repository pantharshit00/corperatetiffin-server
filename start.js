require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URI, {
  useMongoClient: true,
});

mongoose.connection.on('error', (e) => {
  // eslint-disable-next-line no-console
  console.log(`MongoDB Error --> ${e}`);
});

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log('Connected to mongodb!');
});

require('./models/FoodItems');
require('./models/User');
require('./models/Orders');

require('./app');
