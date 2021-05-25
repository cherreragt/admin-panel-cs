
'strict use';

const users = require('./users.routes');
const auth = require('./auth.routes');
const admins = require('./admins.routes');
const servers = require('./servers.routes');

module.exports = [].concat(users(), auth(), admins(), servers());