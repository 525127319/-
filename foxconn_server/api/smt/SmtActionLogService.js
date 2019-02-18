const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const SmtActionLog = require('../../models/SmtActionLog')(store, Sequelize);
class SmtActionLogService extends BasicService{
  constructor(){
    super(SmtActionLog);
  }
 
}
let  service =new SmtActionLogService();
 
module.exports = service