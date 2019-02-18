const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const StatusOfStation = require('../../models/StatusOfStation')(store, Sequelize);
class StatusOfStationService extends BasicService{
  constructor(){
    super(StatusOfStation);
  }

  // insert(){
  //   super.create({ID: 2, StationName: 'StationName', StationOrder: 0, MaterialStatus: 'MaterialStatus', Count: 12, Capacity: 200,'MaterialNo': 'MaterialNo', 'StationNo': 'StationNo', 'UpdateTime': 1234});
  // }

}
let service = new StatusOfStationService();
module.exports = service;