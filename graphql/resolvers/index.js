const { movieResolver } = require('./movie.resolver');
const { theaterResolver } = require('./theater.resolver');

const resolvers = [movieResolver, theaterResolver];

module.exports = { resolvers };
