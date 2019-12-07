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
  }
};

module.exports = { theaterResolver };
