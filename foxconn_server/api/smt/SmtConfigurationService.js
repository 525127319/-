const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const SmtConfiguration = require('../../models/SmtConfiguration')(store, Sequelize);
class SmtConfigurationService extends BasicService{
  constructor(){
    super(SmtConfiguration);
  }
}
let  service =new SmtConfigurationService();
module.exports = service