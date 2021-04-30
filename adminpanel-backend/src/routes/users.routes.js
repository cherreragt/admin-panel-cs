const { Router } = require('express');
const Joi = require('joi');

const router = Router();

const { JoiValidate } = require('../middlewares/JoiValidate');
const jwt_validator = require('../middlewares/verifity-jwt');
const userole = require('../middlewares/check-user');
const { cback_createUser, cback_deleteUser, cback_findUser, cback_updateUser } = require('../controllers/users.controllers');

module.exports = () => {

  router.get('/users/', [
    jwt_validator,
    userole
  ], cback_findUser);

  router.post('/users/', 
    [
      JoiValidate(
        Joi.object({
          user:Joi.string().required().not().empty(),
          password:Joi.string().required().not().empty()
        }),
        'body'
      )
    ], cback_createUser
  );
          
  router.put('/users/', 
    [
      jwt_validator,
      userole,
      JoiValidate(
        Joi.object({
          id: Joi.number().required().not().empty()
        }),
        'query'
      ),
      JoiValidate(
        Joi.object({
          user:Joi.string().required().not().empty(),
          role:Joi.string().required().not().empty()
        }),
        'body'
      )
    ], cback_updateUser
  );

  router.delete('/users/', 
    [
      jwt_validator,
      userole,
      JoiValidate(
        Joi.object({
          id: Joi.number().required().not().empty()
        }),
        'query'
      )
    ], cback_deleteUser
  );
  
  return router;
}