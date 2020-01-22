var ConnectionPool = require('../schema/connectionPool.js').ConnectionPool;

exports.connectionPool = ConnectionPool({
  poolSize: 3
});