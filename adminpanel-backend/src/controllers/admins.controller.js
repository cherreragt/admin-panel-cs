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

      const result = await model.create({
        fk_UserId: req.uid,
        ...req.body,
      });
      return responses(res, 200, result, false);
    } catch (error) {
      return responses(res, 500, error, true);
    }
};

const getAdmins = async (req, res) => {
  try {
    const result = await model.findAll({
      where: {
        fk_UserId: req.uid,
        fk_ServerId: req.query.fk_ServerId,
        vencimiento: {
          $gte: new Date()
        },
      }
    });
    return responses(res, 200, result, false);
  } catch (error) {
    return responses(res, 500, error, true);
  }
};

const getAdmins2 = async (req, res) => {
  try {
    const result = await model.findAll({
      where: {
        fk_UserId: req.uid,
        fk_ServerId: req.query.fk_ServerId,
      }
    });
    return responses(res, 200, result, false);
  } catch (error) {
    return responses(res, 500, error, true);
  }
};

const getAdminsByAuthId = async (req, res) => {
  try {
    const result = await model.findAll({
      where: {
        fk_UserId: req.uid,
        ...req.query,
        vencimiento: {
          $gte: new Date()
        }
      }
    });
    return responses(res, 200, result, false);
  } catch (error) {
    return responses(res, 500, error, true);
  }
};


const putAdminById = async (req, res) => {
  try {

    const [ exists, register ] = await Promise.all([
      model.findOne({
        where: {
          fk_UserId: req.uid,
          fk_ServerId: req.query.fk_ServerId,
          id: req.query.id,
        }
      }),
      model.findOne({
        where: {
          fk_UserId: req.uid,
          fk_ServerId: req.query.fk_ServerId,
          authid: req.body.authid,
        }
      }),
    ]);

    if (!exists) {
      return responses(res, 400, `User Inexistente`, true);
    }

    if (register && exists.authid !== req.body.authid) {
      return responses(res, 400, `Admin ya registrado`, true);
    }

    const result = await model.update(req.body, {
      where:{
        id: req.query.id,
        fk_UserId: req.uid,
      }
    });
    return responses(res, 200, result, false);
  } catch (error) {
    return responses(res, 500, error, true);
  }
};

const deleteAdminById = async (req, res) => {
  try {

    const exists = await model.findOne({
      where:{
        id: req.query.id
      }
    });

    if (!exists) {
      return responses(res, 400, `El admin que quieres eliminar no existe.`, true);
    }

    const result = await model.destroy({
      where: {
        id: req.query.id,
        fk_UserId: req.uid,
      }
    });
    return responses(res, 200, result, false);
  } catch (error) {
    return responses(res, 500, error, true);
  }
};

module.exports = {
  postAdmin,
  getAdmins,
  getAdmins2,
  getAdminsByAuthId,
  putAdminById,
  deleteAdminById,
}