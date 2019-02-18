const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const consume_statistic = require('../../models/ConsumeStatistic')(store, Sequelize);
class consumeStatistic extends BasicService{
  constructor(){
    super(consume_statistic);
  }
}
module.exports = new consumeStatistic();