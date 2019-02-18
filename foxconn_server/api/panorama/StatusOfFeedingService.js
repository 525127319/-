const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const statusOfFeeding = require('../../models/StatusOfFeeding')(store, Sequelize);
class StatusOfFeedingService extends BasicService{
  constructor(){
    super(statusOfFeeding);
  }
  // insert(){
  //   super.create({ID: 2, FeedingEquipmentNo: 'FeedingEquipmentNo', TargetStationNo: 'TargetStationNo', MaterialName: 'MaterialName', Count: 12, 'StartStationNo': 'StartStationNo', 'UpdateTime': 1234});
  // }
}

let service = new StatusOfFeedingService();
// service.insert();
module.exports = service;