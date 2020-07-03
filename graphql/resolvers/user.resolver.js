const { formatISO } = require('date-fns');
const { sign, verify } = require('jsonwebtoken');

const { JWT } = require('../../constants/auth.const');
const { STATUS } = require('../../constants/config.const');
const { User } = require('../../models');

const userResolver = {
  Mutation: {
    async loginUser(_, { email, password }) {
      let accessTimeOut = '';
      const accessTimeIn = formatISO(new Date());

      try {
        const user = await User.findOne({ email }).exec();

        if (!user) {
          accessTimeOut = formatISO(new Date());

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

            const token = sign({ email }, JWT.secretKey, {
              expiresIn: JWT.expiresIn
            });

            return resolve({
              result: { token },
              status: STATUS.success
            });
          });
        });

        accessTimeOut = formatISO(new Date());

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          ...result
        };
      } catch (error) {
        accessTimeOut = formatISO(new Date());

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          message: error,
          status: STATUS.error
        };
      }
    },

    async registerUser(_, { data }) {
      let accessTimeOut = '';
      const accessTimeIn = formatISO(new Date());

      try {
        const user = new User(data);
        const result = await user.save();

        accessTimeOut = formatISO(new Date());

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          result,
          status: STATUS.success
        };
      } catch (error) {
        accessTimeOut = formatISO(new Date());

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          message: error,
          status: STATUS.error
        };
      }
    },

    checkTokenUser(_, { token }) {
      let accessTimeOut = '';
      const accessTimeIn = formatISO(new Date());

      try {
        const decodedToken = verify(token, JWT.secretKey);

        accessTimeOut = formatISO(new Date());

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          result: decodedToken,
          status: STATUS.success
        };
      } catch (error) {
        accessTimeOut = formatISO(new Date());

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
