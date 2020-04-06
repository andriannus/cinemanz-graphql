const { Theater } = require('../../models');

const theaterResolver = {
  Query: {
    theater: async (_, { id }) => {
      const result = await Theater.findById(id);

      return result;
    },

    theaters: async (_, { skip, limit }) => {
      const results = await Theater.find({})
        .skip(skip)
        .limit(limit);
      const total = await Theater.find({}).countDocuments();

      return { results, total };
    }
  },

  Mutation: {
    createTheater: async (_, { data }) => {
      const theater = new Theater(data);
      const result = theater.save();

      return { result };
    },

    deleteTheater: async (_, { id }) => {
      const deletedTheater = await Theater.findByIdAndDelete(id);

      if (!deletedTheater) return false;

      return {
        message: 'Theater has been deleted'
      };
    }
  }
};

module.exports = { theaterResolver };
