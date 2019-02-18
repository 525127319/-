const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const ProductStationInfo = require('../../models/ProductStationInfo.js')(store, Sequelize);
class ProductStationInfoService extends BasicService{
  constructor(){
    super(ProductStationInfo);
  }
  
}
let  service =new ProductStationInfoService();
 
module.exports = service