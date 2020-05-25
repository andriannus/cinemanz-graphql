const { STATUS } = require('../../constants/config.const');
const { FORMAT } = require('../../constants/date.const');
const { SHOWING } = require('../../constants/movie.const');
const { Movie } = require('../../models');
const { getIsoDate, transformDate } = require('../../utils/date.util');

const getMoviesFilter = showing => {
  let filter;
  const currentDate = transformDate(new Date(), FORMAT.international);

  switch (showing) {
    case SHOWING.nowPlaying:
      filter = {
        start: {
          $lte: currentDate
        },
        end: {
          $gte: currentDate
        }
      };
      break;

    case SHOWING.upcoming:
      filter = {
        start: {
          $gte: currentDate
        }
      };
      break;

    default:
      filter = {};
      break;
  }

  return filter;
};

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

    movies: async (_, { skip, limit, showing }) => {
      let accessTimeOut = '';
      const accessTimeIn = getIsoDate();
      const filter = getMoviesFilter(showing);

      try {
        const results = await Movie.find(filter)
          .skip(skip)
          .limit(limit);
        const total = await Movie.find(filter).countDocuments();

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
