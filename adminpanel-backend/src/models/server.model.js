'use strict';

const { Sequelize } = require('sequelize');

const { Connection } = require('../configs/db');

class ModelServers extends Connection {
  constructor() {
    super();

    this.model = this.connection.define('servers', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        required: true
      },
      fk_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        required: true
      },
      nameServer: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        required: true
      },
      ipServer: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true
      },
    }, {
      paranoid: true,
      underscored: true,
      timestamps: true,
      freezeTableName: true,
      tableName: 'servers'
    });
  }
}

module.exports = { ModelServers };
