'use strict';
var Sequelize = require('sequelize');
const logUtil = require('../utils/LogUtil');
const config = require('./index');


var sequelize = new Sequelize(config.dbName, 'root', 'Hello!!!123', {
  host: 'db-mysql',
  dialect: 'mysql',
  logging: logUtil.dbInfo,
  timezone:'+08:00',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
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
