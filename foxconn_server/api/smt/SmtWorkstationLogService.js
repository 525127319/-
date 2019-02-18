const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const SmtWorkstationLog = require('../../models/SmtWorkstationLog')(store, Sequelize);
class SmtWorkstationLogService extends BasicService{
  constructor(){
    super(SmtWorkstationLog);
  }
 
}
let  service =new SmtWorkstationLogService();
 
module.exports = service