const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const { JWT } = require('../../constants/config.const');

const userResolver = {
  Mutation: {
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email }).exec();

      if (!user) {
        return {
          message: 'User not found'
        };
      }

      const result = await new Promise(resolve => {
        user.comparePassword(password, (fault, isMatch) => {
          if (fault) {
            return resolve({
              message: fault
            });
          }

          if (!isMatch) {
            return resolve({
              message: 'Password doest not match'
            });
          }

          const token = jwt.sign({ email }, JWT.secretKey, {
            expiresIn: JWT.expiresIn
          });

          return resolve({
            message: 'Success',
            token
          });
        });
      });

      return result;
    },

    registerUser: (_, { data }) => {
      const user = new User(data);
      const result = user.save();

      return { result };
    }
  }
};

module.exports = { userResolver };
