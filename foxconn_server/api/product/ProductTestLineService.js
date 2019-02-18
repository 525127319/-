const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const ProductTestLine = require('../../models/ProductTestLine')(store, Sequelize);
class ProductTestLineService extends BasicService{
  constructor(){
    super(ProductTestLine);
  }
}
let  service =new ProductTestLineService();
module.exports = service