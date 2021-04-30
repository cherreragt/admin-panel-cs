'use strict';

const responses = require('../helpers/response');
const { ModelUser } = require('../models/users.model');

const { model } = new ModelUser();

module.exports = async (req, res, next) => {
  try {
    const { uid } = req;
    
    const userType = await model.findOne({
      where:{ id:uid }
    });

    if(!userType)
      return responses(res, 400, `Usuario no existente`, true);
      
    if(userType.role !== process.env.ADMIN_ROLE)
      return responses(res, 403, `User no autorizado`, true);

    next();

  } catch (error) {
    return responses(res, 500, `Error en el servidor`, true);
  }
}