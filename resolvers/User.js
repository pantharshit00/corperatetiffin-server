const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  Query: {
    getUserById: async (parent, { id }) => {
      try {
        const user = await User.find({ _id: id });
        return user;
      } catch (e) {
        if (e.message.match(new RegExp(/Cast to ObjectId failed/))) {
          throw new Error('Provide a valid id');
        }
        throw e;
      }
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        const user = new User(args);
        user.save();
        return {
          ok: true,
          user,
        };
      } catch (e) {
        return {
          ok: false,
          errors: e,
        };
      }
    },
  },
};
