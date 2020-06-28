const { STATUS } = require('../../constants/config.const');
const { FORMAT } = require('../../constants/date.const');
const { SHOWING } = require('../../constants/movie.const');
const { Movie } = require('../../models');
const { transformDate } = require('../../utils/date.util');

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
      const accessTimeIn = transformDate(new Date(), FORMAT.iso);

      try {
        const result = await Movie.findById(id);

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

    movies: async (_, { skip, limit, showing }) => {
      let accessTimeOut = '';
      const accessTimeIn = transformDate(new Date(), FORMAT.iso);
      const filter = getMoviesFilter(showing);

      try {
        const results = await Movie.find(filter)
          .skip(skip)
          .limit(limit);
        const total = await Movie.find(filter).countDocuments();

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
    createMovie: async (_, { data }, { isAuthenticated }) => {
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
        const movie = new Movie(data);
        const result = await movie.save();

        accessTimeOut = transformDate(new Date(), FORMAT.iso);

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

    updateMovie: async (_, { data }, { isAuthenticated }) => {
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
        const { _id, ...updatedMovie } = data;

        const result = Movie.findByIdAndUpdate(_id, updatedMovie, {
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

    deleteMovie: async (_, { id }, { isAuthenticated }) => {
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
        const result = await Movie.findByIdAndDelete(id);

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

module.exports = { movieResolver };
