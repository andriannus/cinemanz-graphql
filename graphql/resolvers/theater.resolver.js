const { formatISO } = require('date-fns');

const { STATUS } = require('../../constants/config.const');
const { Theater } = require('../../models');

const theaterResolver = {
  Query: {
    async theater(_, { id }) {
      let accessTimeOut = '';
      const accessTimeIn = formatISO(new Date());

      try {
        const result = await Theater.findById(id);

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

    async theaters(_, { skip, limit }) {
      let accessTimeOut = '';
      const accessTimeIn = formatISO(new Date());

      try {
        const results = await Theater.find({})
          .skip(skip)
          .limit(limit);
        const total = await Theater.find({}).countDocuments();

        accessTimeOut = formatISO(new Date());

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          results,
          status: STATUS.success,
          total
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
  },

  Mutation: {
    async createTheater(_, { data }, { isAuthenticated }) {
      let accessTimeOut = '';
      const accessTimeIn = formatISO(new Date());

      if (!isAuthenticated) {
        accessTimeOut = formatISO(new Date());

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

    async updateTheater(_, { data }, { isAuthenticated }) {
      let accessTimeOut = '';
      const accessTimeIn = formatISO(new Date());

      if (!isAuthenticated) {
        accessTimeOut = formatISO(new Date());

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

    async deleteTheater(_, { id }, { isAuthenticated }) {
      let accessTimeOut = '';
      const accessTimeIn = formatISO(new Date());

      if (!isAuthenticated) {
        accessTimeOut = formatISO(new Date());

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          message: 'Unauthorized',
          status: STATUS.fail
        };
      }

      try {
        const result = await Theater.findByIdAndDelete(id);

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
    }
  }
};

module.exports = { theaterResolver };
