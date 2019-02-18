const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const MaterialTracingLog = require('../../models/MaterialTracingLog')(store, Sequelize);
class MaterialTracingLogService extends BasicService{
  constructor(){
    super(MaterialTracingLog);
  }

  // insert(){
  //   super.create({ID: 1, MaterialNo: 'MaterialNo', MaterialName: 'MaterialName', Count: 200, StationType: '测试'});
  // }
}

let service = new MaterialTracingLogService();

// service.insert();

module.exports = service;