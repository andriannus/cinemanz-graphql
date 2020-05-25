const { STATUS } = require('../../constants/config.const');
const { Theater } = require('../../models');
const { getIsoDate } = require('../../utils/date.util');

const theaterResolver = {
  Query: {
    theater: async (_, { id }) => {
      let accessTimeOut = '';
      const accessTimeIn = getIsoDate();

      try {
        const result = await Theater.findById(id);

        accessTimeOut = getIsoDate();

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          result,
          status: STATUS.success
        };
      } catch (error) {
        accessTimeOut = getIsoDate();

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          message: error,
          status: STATUS.error
        };
      }
    },

    theaters: async (_, { skip, limit }) => {
      let accessTimeOut = '';
      const accessTimeIn = getIsoDate();

      try {
        const results = await Theater.find({})
          .skip(skip)
          .limit(limit);
        const total = await Theater.find({}).countDocuments();

        accessTimeOut = getIsoDate();

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          results,
          status: STATUS.success,
          total
        };
      } catch (error) {
        accessTimeOut = getIsoDate();

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          message: error,
          status: STATUS.error
        };
      }
    }
  },

  Mutation: {
    createTheater: async (_, { data }) => {
      let accessTimeOut = '';
      const accessTimeIn = getIsoDate();

      try {
        const theater = new Theater(data);
        const result = await theater.save();

        accessTimeOut = getIsoDate();

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          result,
          status: STATUS.success
        };
      } catch (error) {
        accessTimeOut = getIsoDate();

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          message: error,
          status: STATUS.error
        };
      }
    },

    deleteTheater: async (_, { id }) => {
      let accessTimeOut = '';
      const accessTimeIn = getIsoDate();

      try {
        const result = await Theater.findByIdAndDelete(id);

        accessTimeOut = getIsoDate();

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          result,
          status: STATUS.success
        };
      } catch (error) {
        accessTimeOut = getIsoDate();

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

module.exports = { theaterResolver };
