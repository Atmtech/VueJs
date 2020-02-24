var ConnectionPool = require('../models/connectionPool').ConnectionPool;

exports.connectionPool = ConnectionPool({
  poolSize: 3
});