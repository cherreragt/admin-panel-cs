const { Router } = require('express');
const Joi = require('joi');

const router = Router();

const { JoiValidate } = require('../middlewares/JoiValidate');
const { postAdmin, getAdmins, getAdminsByAuthId, putAdminById, deleteAdminById } = require('../controllers/admins.controller');

const jwt_validator = require('../middlewares/verifity-jwt');
const userole = require('../middlewares/check-user');

const schema = {
  post: Joi.object({
    fk_ServerId: Joi.number().min(1).not().empty().required(),
    authid: Joi.string().min(3).not().empty().required(),
    password:  Joi.string().min(4).not().empty().required(),
    role: Joi.string().min(4).not().empty().required(),
    flags: Joi.string().min(4).not().empty().required(),
    vencimiento: Joi.date().not().empty().required(),
    playername: Joi.string().min(4).not().empty().required(),
    steam: Joi.bool().not().empty().required(),
  }),
  get: Joi.object({
    fk_ServerId: Joi.number().min(1).not().empty().required(),
  }),
  getAdmin: Joi.object({
    authid: Joi.string().min(3).not().empty().required(),
    fk_ServerId: Joi.number().min(1).not().empty().required(),
  }),
  delete: Joi.object({
    id: Joi.number().min(1).not().empty().required(),
  }),
  update: Joi.object({
    fk_ServerId: Joi.number().min(1).not().empty().required(),
    id: Joi.number().min(1).not().empty().required(),
  }),
};

module.exports = () => {
  router.post('/admins/', [
      jwt_validator,
      JoiValidate(schema.post, 'body')
    ], postAdmin
  );

  router.put('/admins/', [
      jwt_validator,
      JoiValidate(schema.update, 'query'),
      JoiValidate(schema.post, 'body'),
    ], putAdminById
  );

  router.get('/admins/', [
      jwt_validator,
      JoiValidate(schema.get, 'query')
    ], getAdmins
  )
  
  router.get('/admins/server', [
      jwt_validator,
      JoiValidate(schema.getAdmin, 'query')
    ], getAdminsByAuthId
  )

  router.delete(`/admins/`, [
      jwt_validator,
      userole,
      JoiValidate(schema.delete, 'query')
    ], deleteAdminById
  );

  return router;
};
