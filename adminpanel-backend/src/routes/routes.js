
'strict use';

const users = require('./users.routes');
const auth = require('./auth.routes');

module.exports = [].concat(users(), auth());