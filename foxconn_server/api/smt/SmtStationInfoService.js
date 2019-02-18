const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const SmtStationInfo = require('../../models/SmtStationInfo')(store, Sequelize);
class SmtStationInfoService extends BasicService{
  constructor(){
    super(SmtStationInfo);
  }

}
let  service =new SmtStationInfoService();

module.exports = service