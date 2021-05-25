const { Router } = require('express');
const Joi = require('joi');

const router = Router();

const { login, renewToken } = require('../controllers/auth.controller');
const { JoiValidate } = require('../middlewares/JoiValidate');
const validarJWT = require('../middlewares/verifity-jwt');

module.exports = () => {
  router.post('/login/', 
    JoiValidate(
      Joi.object({
        user: Joi.string().min(5).required().not().empty(),
        password: Joi.string().min(8).required().not().empty()
      }), 'body'), 
    login
  );

  router.get('/login/renew/', 
    validarJWT, 
    renewToken
  );

  return router;
};