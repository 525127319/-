const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const SmtTestLine = require('../../models/SmtTestLine')(store, Sequelize);
class SmtTestLineService extends BasicService{
  constructor(){
    super(SmtTestLine);
  }
 
}
let  service =new SmtTestLineService();
 
module.exports = service