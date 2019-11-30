const { query } = require('./query');
const { theaterType } = require('./types');

const typeDefs = [query, theaterType];

module.exports = { typeDefs };
