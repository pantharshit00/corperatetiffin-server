/* eslint-disable no-console */
require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const Food = require('./models/FoodItems');

const stores = JSON.parse(fs.readFileSync(`${__dirname}/food.json`, 'utf-8'));

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Food.remove();
  console.log('Data Deleted. To load sample data, run\n\n\t npm run loadSample\n\n');
  process.exit();
}

async function loadData() {
  try {
    await Food.insertMany(stores);
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch (e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n');
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
