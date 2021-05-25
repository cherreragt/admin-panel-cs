const { Router } = require('express');
const Joi = require('joi');

const router = Router();

const { JoiValidate } = require('../middlewares/JoiValidate');
const { postServer, getServers, putServer, deleteServer, getServerByIp } = require('../controllers/servers.controller');
const validarJWT = require('../middlewares/verifity-jwt');
const checkUser = require('../middlewares/check-user');

const validations = {
  postServer: Joi.object({
    fk_user: Joi.number().min(1).not().empty().required(),
    nameServer: Joi.string().min(5).not().empty().required(),
    ipServer: Joi.string().min(8).not().empty().required(),
  }),
  getServerByIp: Joi.object({
    ipServer: Joi.string().min(8).not().empty().required(),
    fk_user: Joi.number().min(1).not().empty().required(),
  }),
  putServer: Joi.object({
    nameServer: Joi.string().min(5).not().empty().required(),
    ipServer: Joi.string().min(8).not().empty().required(),
  }),
  ById: Joi.object({
    id: Joi.number().min(1).not().empty().required()
  }),
}

module.exports = () => {

  router.post('/servers/', [
      validarJWT,
      JoiValidate(validations.postServer, 'body')
    ], postServer
  );

  router.get('/servers/', [ 
      validarJWT, 
      checkUser 
    ], getServers
  );

  router.get('/servers/Ip', [
      validarJWT,
      JoiValidate(validations.getServerByIp, 'query')
    ], getServerByIp
  );

  router.put('/servers/', [
      validarJWT,//validar que updatee un server del fk_user
      JoiValidate(validations.ById, 'query'),
      JoiValidate(validations.putServer, 'body')
    ], putServer
  );

  router.delete('/servers/', [
      checkUser,
      validarJWT,
      JoiValidate(validations.ById, 'query')
    ],  deleteServer
  );

  return router;
};
