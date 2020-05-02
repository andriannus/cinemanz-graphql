const { movieResolver } = require('./movie.resolver');
const { theaterResolver } = require('./theater.resolver');
const { userResolver } = require('./user.resolver');

const resolvers = [movieResolver, theaterResolver, userResolver];

module.exports = { resolvers };
