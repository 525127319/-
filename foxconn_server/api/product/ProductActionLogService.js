const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const ProductActionLog = require('../../models/ProductActionLog')(store, Sequelize);
class ProductActionLogService extends BasicService{
  constructor(){
    super(ProductActionLog);
  }
 
}
let  service =new ProductActionLogService();
 
module.exports = service