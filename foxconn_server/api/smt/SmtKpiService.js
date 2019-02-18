const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const SmtKpi = require('../../models/SmtKpi')(store, Sequelize);
class SmtKpiService extends BasicService{
  constructor(){
    super(SmtKpi);
  }
 
}
let  service =new SmtKpiService();
 
module.exports = service