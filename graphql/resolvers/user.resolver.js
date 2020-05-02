const { User } = require('../../models');

const userResolver = {
  Mutation: {
    registerUser: (_, { data }) => {
      const user = new User(data);
      const result = user.save();

      return { result };
    }
  }
};

module.exports = { userResolver };
