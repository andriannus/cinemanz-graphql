const { query } = require('./query');
const { movieType, theaterType, userType } = require('./types');

const typeDefs = [query, movieType, theaterType, userType];

module.exports = { typeDefs };
