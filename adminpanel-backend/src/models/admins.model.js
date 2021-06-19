'use strict';

const { Sequelize } = require('sequelize');

const { Connection } = require('../configs/db');

class ModelAdmin extends Connection {
  constructor() {
    super();

    this.model = this.connection.define('admins', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        required: true
      },
      fk_UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        required: true
      },
      fk_ServerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        required: true
      },
      authid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        required: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
        required: true
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'USER_ROLE',
        unique: false
      },
      flags: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      vencimiento: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false
      },
      playername: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        defaultValue: 'Player',
        required: true
      },
      steam: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: false,
        required: true
      },
    }, {
      
      paranoid: true,
      underscored: true,
      timestamps: true,
      freezeTableName: true,
      tableName: 'admins'
    });
  }
}

module.exports = { ModelAdmin };
