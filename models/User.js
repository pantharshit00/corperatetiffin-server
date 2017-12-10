const mongoose = require('mongoose');
const argon2 = require('argon2');

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    index: { unique: true, dropDups: true },
  },
  phn: Number,
  password: String,
  address: {
    type: [String],
    default: [],
  },
});

UserSchema.pre('save', async function createHash(next) {
  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (e) {
    throw e;
  }
});

mongoose.model('User', UserSchema);
