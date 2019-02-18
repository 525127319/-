const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const ProductWorkstationLog = require('../../models/ProductWorkstationLog')(store, Sequelize);
class ProductWorkstationLogService extends BasicService{
  constructor(){
    super(ProductWorkstationLog);
  }
}
let  service =new ProductWorkstationLogService();
module.exports = service