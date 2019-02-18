const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const CurEnvRecord = require('../../models/CurEnvRecord')(store, Sequelize);
class curEnvRecordService extends BasicService{
  constructor(){
    super(CurEnvRecord);
  }
 
 
}
let  service =new curEnvRecordService();
 
module.exports = service