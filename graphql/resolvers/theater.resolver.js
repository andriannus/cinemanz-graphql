const { Theater } = require('../../models');

const theaterResolver = {
  Query: {
    theaters: async () => {
      const dataTheaters = await Theater.find({});

      return dataTheaters;
    }
  }
};

module.exports = { theaterResolver };
