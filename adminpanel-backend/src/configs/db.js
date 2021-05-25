'use strict';

const { Sequelize } = require("sequelize");
require('dotenv').config();
const Op = Sequelize.Op;

const operatorsAliases = {
  $gt: Op.gt,
  $gte: Op.gte,
}

const { DB_NAME, DB_USER, DB_PASS, DB_PORT, DB_HOST } = process.env;

class Connection {
  constructor() {
    this.connection = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
      operatorsAliases,
      port: DB_PORT,
      host: DB_HOST,
      dialect: 'mysql',
      define:{
        timestamps: false
      },
      pool:{
        min: 0,
        max:5,
        acquire: 30000,
        idle: 10000
      }
    });

    this.connection.sync({ force: false });
  }
}

module.exports = { Connection };
