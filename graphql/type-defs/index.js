const { query } = require('./query');
const { movieType, responseType, theaterType, userType } = require('./types');

const typeDefs = [query, movieType, responseType, theaterType, userType];

module.exports = { typeDefs };
