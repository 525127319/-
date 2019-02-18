const BasicService = require('../../services/BasicService');
const Sequelize = require('sequelize');
const db = require('../../config/db');
const store = db.getStore();
const user = require('../../models/User')(store, Sequelize);
class UserService extends BasicService{
    constructor(){
        super(user);
    }
}
module.exports = new UserService();