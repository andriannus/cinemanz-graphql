const { STATUS } = require('../../constants/status.const');
const { Movie } = require('../../models');
const { getIsoDate } = require('../../utils/date.util');

const movieResolver = {
  Query: {
    movie: async (_, { id }) => {
      let accessTimeOut = '';
      const accessTimeIn = getIsoDate();

      try {
        const result = await Movie.findById(id);

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

    movies: async (_, { skip, limit }) => {
      let accessTimeOut = '';
      const accessTimeIn = getIsoDate();

      try {
        const results = await Movie.find({})
          .skip(skip)
          .limit(limit);
        const total = await Movie.find({}).countDocuments();

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
    createMovie: async (_, { data }) => {
      let accessTimeOut = '';
      const accessTimeIn = getIsoDate();

      try {
        const movie = new Movie(data);
        const result = await movie.save();

        accessTimeOut = getIsoDate();

        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          result,
          status: STATUS.success
        };
      } catch (error) {
        return {
          access_time_in: accessTimeIn,
          access_time_out: accessTimeOut,
          message: error,
          status: STATUS.error
        };
      }
    },

    deleteMovie: async (_, { id }) => {
      let accessTimeOut = '';
      const accessTimeIn = getIsoDate();

      try {
        const result = await Movie.findByIdAndDelete(id);

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

module.exports = { movieResolver };
