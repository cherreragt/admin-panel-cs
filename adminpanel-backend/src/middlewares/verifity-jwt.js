
const jwt = require('jsonwebtoken');

const response = require('../helpers/response');

module.exports = (req, res, next) =>{
  try {
    const { token } = req.headers;

    if(!token)
      return response(res, 401, `No hay token`, true);
      
    const { uid } = jwt.verify(token, process.env.JWTSECRET);
      
    req.uid = uid;

    next();
  } catch (error) {
    return response(res, 500, `Error al verificar token`, true);
  } 
}