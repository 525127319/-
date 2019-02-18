const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const ProductConfiguration = require('../../models/ProductConfiguration.js')(store, Sequelize);
class ProductConfigurationService extends BasicService{
  constructor(){
    super(ProductConfiguration);
  }
}
let  service =new ProductConfigurationService();
module.exports = service