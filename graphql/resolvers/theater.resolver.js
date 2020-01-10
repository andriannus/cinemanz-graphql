const { Theater } = require('../../models');

const theaterResolver = {
  Query: {
    theater: async (_, { id }) => {
      const dataTheater = await Theater.findById(id);

      return dataTheater;
    },

    theaters: async (_, { skip, limit }) => {
      const dataTheaters = await Theater.find({})
        .skip(skip)
        .limit(limit);
      const total = await Theater.find({}).countDocuments();

      return {
        results: dataTheaters,
        total
      };
    }
  },

  Mutation: {
    createTheater: async (_, { dataTheater }) => {
      const theater = new Theater(dataTheater);
      const createdTheater = theater.save();

      return {
        result: createdTheater
      };
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
