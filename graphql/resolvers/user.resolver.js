const jwt = require('jsonwebtoken');

const { JWT, STATUS } = require('../../constants/config.const');
const { FORMAT } = require('../../constants/date.const');
const { User } = require('../../models');
const { transformDate } = require('../../utils/date.util');

const userResolver = {
  Mutation: {
    loginUser: async (_, { email, password }) => {
      let accessTimeOut = '';
      const accessTimeIn = transformDate(new Date(), FORMAT.iso);

      try {
        const user = await User.findOne({ email }).exec();

        if (!user) {
          accessTimeOut = transformDate(new Date(), FORMAT.iso);

          return {
            access_time_in: accessTimeIn,
            access_time_out: accessTimeOut,
            message: 'User not found',
            status: STATUS.fail
          };
        }

        const result = await new Promise((resolve, reject) => {
          user.comparePassword(password, (fault, isMatch) => {
            if (fault) {
              return reject(new Error(fault));
            }

            if (!isMatch) {
              return resolve({
                message: 'Password does not match',
                status: STATUS.fail
              });
            }

            const token = jwt.sign({ email }, JWT.secretKey, {
              expiresIn: JWT.expiresIn
            });

            return resolve({
              result: { token },
              status: STATUS.success
            });
          });
        });

        accessTimeOut = transformDate(new Date(), FORMAT.iso);

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          ...result
        };
      } catch (error) {
        accessTimeOut = transformDate(new Date(), FORMAT.iso);

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          message: error,
          status: STATUS.error
        };
      }
    },

    registerUser: async (_, { data }) => {
      let accessTimeOut = '';
      const accessTimeIn = transformDate(new Date(), FORMAT.iso);

      try {
        const user = new User(data);
        const result = await user.save();

        accessTimeOut = transformDate(new Date(), FORMAT.iso);

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          result,
          status: STATUS.success
        };
      } catch (error) {
        accessTimeOut = transformDate(new Date(), FORMAT.iso);

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          message: error,
          status: STATUS.error
        };
      }
    }
  }
};

module.exports = { userResolver };
