
'use strict';

const bcrypt = require('bcryptjs');

const { ModelUser } = require('../models/users.model');
const responses = require('../helpers/response');
const jwt = require('../helpers/jwt');

const { model } = new ModelUser();

module.exports = {
  login: async(req, res)=>{
    try {
      const { user, password } = req.body;

      const result = await model.findOne({ where: { user } });
      
      if(!result)
        return responses(res, 400, `user no valido`, true);
  
      const validPw = bcrypt.compareSync(password, result.password);

      if(!validPw)
        return responses(res, 400, `password no valido`, true);

      const token = await jwt(result.id);

      return responses(res, 200, {token/*, menu:menu(result.role)*/}, false);
    } catch (error) {
      return responses(res, 500, `Error en el servidor`, true);
    }
  },
  renewToken:async(req, res)=>{
    try {
      const { uid } = req;

      const [ token, data ] = await Promise.all([
        jwt(uid),
        model.findOne({ where: { id:uid } })
      ]);

      return responses(res, 200, {token, data/*, menu:menu(data.role)*/}, false);
    } catch (error) {
      return responses(res, 500, `*renew token ${error}`, true);
    }
  }
};
