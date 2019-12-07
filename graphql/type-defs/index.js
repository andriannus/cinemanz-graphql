const { query } = require('./query');
const { movieType, theaterType } = require('./types');

const typeDefs = [query, movieType, theaterType];

module.exports = { typeDefs };
