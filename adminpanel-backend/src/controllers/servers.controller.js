'use strict';

const responses = require('../helpers/response');

const { ModelServers } = require('../models/server.model');

const { model } = new ModelServers();

module.exports = {
  postServer: async (req, res) => {
    try {
      const exists = await model.findOne({
        where:{
          ipServer: req.body.ipServer
        }
      });

      if (exists) {
        return responses(res, 400, `Ya existe este server crack.`, true);
      }

      const result = await model.create({
        fk_user: req.uid,
        ...req.body
      });
      return responses(res, 200, result, false);
    } catch (error) {
      return responses(res, 500, error, true);
    }
  },
  getServers: async (req, res) => {
    try {
      const result = await model.findAll();
      return responses(res, 200, result, false);
    } catch (error) {
      return responses(res, 500, error, true);
    }
  },
  getServerByIp: async (req, res) => {
    try {
      const result = await model.findOne({
        where:{
          ipServer: req.query.ipServer,
          fk_user: req.uid
        }
      });

      return responses(res, 200, result, false);
    } catch (error) {
      return responses(res, 500, error, true);
    }
  },
  putServer: async (req, res) => {
    try {
      const [ register, exists ] = await Promise.all([
        model.findOne({
          where:{
            ipServer: req.body.ipServer,
            fk_user: req.uid,
          }
        }),
        model.findOne({
          where:{
            id: req.query.id,
            fk_user: req.uid
          }
        })
      ]);

      if (!exists) {
        return responses(res, 400, `El server que quieres actualizar no existe`, true);
      }

      if (register) {
        return responses(res, 400, `Ya esta registrado este server crack.`, true);
      }

      const result = await model.update(req.body, {
        where:{
          id: req.query.id
        }
      });

      return responses(res, 200, result, false);
    } catch (error) {
      return responses(res, 500, error, true);
    }
  },
  deleteServer: async (req, res) => {
    try {

      const exists = await model.findOne({
        where:{
          id: req.query.id
        }
      });

      if (!exists) {
        return responses(res, 400, `El server que quieres eliminar no existe`, true);
      }

      const result = await model.destroy({
        where:{
          id: req.query.id,
          fk_user: req.uid,
        }
      });
      return responses(res, 200, result, false);
    } catch (error) {
      return responses(res, 500, error, true);
    }
  },
};
