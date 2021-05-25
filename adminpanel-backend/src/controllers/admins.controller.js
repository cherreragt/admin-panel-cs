const responses = require('../helpers/response');


const { ModelAdmin } = require('../models/admins.model');

const { model } = new ModelAdmin();

const postAdmin = async (req, res) => {
    try {
      const exists = await model.findOne({
        where: {
          fk_ServerId: req.body.fk_ServerId,
          authid: req.body.authid,
        }
      });

      if (exists) {
        return responses(res, 400, `El usuario ya existe`, true);
      }

      const result = await model.create(req.body);
      return responses(res, 200, result, false);
    } catch (error) {
      return responses(res, 500, `Error en el servidor`, true);
    }
};

const getAdmins = async (req, res) => {
  try {
    const result = await model.findAll({
      where: {
        fk_UserId: req.query.fk_UserId,
        fk_ServerId: req.query.fk_ServerId,
      }
    });
    return responses(res, 200, result, false);
  } catch (error) {
    return responses(res, 500, `Error en el servidor`, true);
  }
};

const getAdminsByAuthId = async (req, res) => {
  try {
    const result = await model.findAll({
      where: {
        fk_UserId: req.query.fk_UserId,
        authid: req.query.authid,
        fk_ServerId: req.query.fk_ServerId,
        vencimiento: {
          $gte: new Date()
        }
      }
    });
    return responses(res, 200, result, false);
  } catch (error) {
    return responses(res, 500, `Error en el servidor`, true);
  }
};

module.exports = {
  postAdmin,
  getAdmins,
  getAdminsByAuthId,
}