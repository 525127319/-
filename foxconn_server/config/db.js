'use strict';
const Sequelize = require('sequelize');
const logUtil = require('../utils/LogUtil');
const config = require('../db');

var sequelize = new Sequelize(config.dbName, config.user, config.password, {
  host: config.ip,
  port: config.port,
  dialect: config.dialect,
  logging: logUtil.dbInfo,
  timezone:'+08:00',
  pool: {
    max: 100,
    min: 0,
    idle: 100
  },
  define: {
      timestamps:false,
      freezeTableName: true,
  },

  // SQLite only
  //storage: 'path/to/database.sqlite'
});

sequelize.sync({force: false});

function getStore(){
  return sequelize;
}
module.exports = {
  Sequelize: Sequelize, 
  store:　sequelize,
  getStore:getStore
};


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)});


    