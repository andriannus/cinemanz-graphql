const { Movie } = require('../../models');

const movieResolver = {
  Query: {
    movies: async () => {
      const dataMovies = await Movie.find({});

      return dataMovies;
    }
  }
};

module.exports = { movieResolver };
