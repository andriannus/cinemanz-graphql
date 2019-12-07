const { Movie } = require('../../models');

const movieResolver = {
  Query: {
    movie: async (_, { id }) => {
      const dataMovie = await Movie.findById(id);

      return dataMovie;
    },

    movies: async (_, { skip, limit }) => {
      const dataMovies = await Movie.find({})
        .skip(skip)
        .limit(limit);
      const total = await Movie.find({}).countDocuments();

      return {
        results: dataMovies,
        total
      };
    }
  }
};

module.exports = { movieResolver };
