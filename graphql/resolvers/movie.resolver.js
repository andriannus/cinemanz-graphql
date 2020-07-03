const { format, formatISO } = require('date-fns');

const { STATUS } = require('../../constants/config.const');
const { SHOWING } = require('../../constants/movie.const');
const { Movie } = require('../../models');

const getMoviesFilter = showing => {
  let filter;
  const currentDate = format(new Date(), 'yyyy-MM-dd');

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
    async movie(_, { id }) {
      let accessTimeOut = '';
      const accessTimeIn = formatISO(new Date());

      try {
        const result = await Movie.findById(id);

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

    async movies(_, { skip, limit, showing }) {
      let accessTimeOut = '';
      const accessTimeIn = formatISO(new Date());
      const filter = getMoviesFilter(showing);

      try {
        const results = await Movie.find(filter)
          .skip(skip)
          .limit(limit);
        const total = await Movie.find(filter).countDocuments();

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
    async createMovie(_, { data }, { isAuthenticated }) {
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
        const movie = new Movie(data);
        const result = await movie.save();

        accessTimeOut = formatISO(new Date());

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

    async updateMovie(_, { data }, { isAuthenticated }) {
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
        const { _id, ...updatedMovie } = data;

        const result = Movie.findByIdAndUpdate(_id, updatedMovie, {
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

    async deleteMovie(_, { id }, { isAuthenticated }) {
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
        const result = await Movie.findByIdAndDelete(id);

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

module.exports = { movieResolver };
