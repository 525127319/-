const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const ProductKpi = require('../../models/ProductKpi.js')(store, Sequelize);
class ProductKpiService extends BasicService{
  constructor(){
    super(ProductKpi);
  }
 
}
let  service =new ProductKpiService();
 
module.exports = service