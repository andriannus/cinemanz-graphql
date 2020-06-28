const { STATUS } = require('../../constants/config.const');
const { FORMAT } = require('../../constants/date.const');
const { Theater } = require('../../models');
const { transformDate } = require('../../utils/date.util');

const theaterResolver = {
  Query: {
    theater: async (_, { id }) => {
      let accessTimeOut = '';
      const accessTimeIn = transformDate(new Date(), FORMAT.iso);

      try {
        const result = await Theater.findById(id);

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
    },

    theaters: async (_, { skip, limit }) => {
      let accessTimeOut = '';
      const accessTimeIn = transformDate(new Date(), FORMAT.iso);

      try {
        const results = await Theater.find({})
          .skip(skip)
          .limit(limit);
        const total = await Theater.find({}).countDocuments();

        accessTimeOut = transformDate(new Date(), FORMAT.iso);

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          results,
          status: STATUS.success,
          total
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
  },

  Mutation: {
    createTheater: async (_, { data }, { isAuthenticated }) => {
      let accessTimeOut = '';
      const accessTimeIn = transformDate(new Date(), FORMAT.iso);

      if (!isAuthenticated) {
        accessTimeOut = transformDate(new Date(), FORMAT.iso);

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          message: 'Unauthorized',
          status: STATUS.fail
        };
      }

      try {
        const theater = new Theater(data);
        const result = await theater.save();

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
    },

    updateTheater: async (_, { data }, { isAuthenticated }) => {
      let accessTimeOut = '';
      const accessTimeIn = transformDate(new Date(), FORMAT.iso);

      if (!isAuthenticated) {
        accessTimeOut = transformDate(new Date(), FORMAT.iso);

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          message: 'Unauthorized',
          status: STATUS.fail
        };
      }

      try {
        const { _id, ...updatedTheater } = data;

        const result = Theater.findByIdAndUpdate(_id, updatedTheater, {
          new: true
        });

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
    },

    deleteTheater: async (_, { id }, { isAuthenticated }) => {
      let accessTimeOut = '';
      const accessTimeIn = transformDate(new Date(), FORMAT.iso);

      if (!isAuthenticated) {
        accessTimeOut = transformDate(new Date(), FORMAT.iso);

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          message: 'Unauthorized',
          status: STATUS.fail
        };
      }

      try {
        const result = await Theater.findByIdAndDelete(id);

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

module.exports = { theaterResolver };
