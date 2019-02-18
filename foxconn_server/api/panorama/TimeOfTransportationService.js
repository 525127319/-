const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const TimeOfTransportation = require('../../models/TimeOfTransportation')(store, Sequelize);
class TimeOfTransportationService extends BasicService{
  constructor(){
    super(TimeOfTransportation);
  }
  // async insert(){
  //   await super.create({ID: 2, StartStationNo: 'StartStationNo', TargetStationNo: 'TargetStationNo', FeedingEquipmentNo: 'FeedingEquipmentNo', MaterialName: 'MaterialName', 'TransferAvgTime': 2.2, 'UpdateTime': 1234});
  // }
}
let service = new TimeOfTransportationService();
// service.insert();
module.exports = service;
