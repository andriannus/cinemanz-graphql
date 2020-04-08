const { Movie } = require('../../models');

const movieResolver = {
  Query: {
    movie: async (_, { id }) => {
      const result = await Movie.findById(id);

      return result;
    },

    movies: async (_, { skip, limit }) => {
      const results = await Movie.find({})
        .skip(skip)
        .limit(limit);
      const total = await Movie.find({}).countDocuments();

      return { results, total };
    }
  },

  Mutation: {
    createMovie: (_, { data }) => {
      const movie = new Movie(data);
      const result = movie.save();

      return { result };
    },

    deleteMovie: async (_, { id }) => {
      const deletedMovie = await Movie.findByIdAndDelete(id);

      if (!deletedMovie) return false;

      return {
        message: 'Movie has been deleted'
      };
    }
  }
};

module.exports = { movieResolver };
