'use strict';

module.exports = (res, status, msg, error) => {
  return res.status(status).json({
    error,
    msg
  });
}